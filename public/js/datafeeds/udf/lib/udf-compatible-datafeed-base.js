import { getErrorMessage, logMessage, } from './helpers';
import { HistoryProvider, } from './history-provider';
import { DataPulseProvider } from './data-pulse-provider';
import { QuotesPulseProvider } from './quotes-pulse-provider';
import { SymbolsStorage } from './symbols-storage';

function extractField(data, field, arrayIndex) {
    const value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
}

function getNextDailyBarTime(barTime) {
    const temp_time = barTime;
    const date = new Date(temp_time);
    date.setHours(0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date.getTime();
}

function parseStockcodeFromChannelString(channelString) {
    const match = channelString.match(/^([a-zA-Z0-9]+)_#_([a-zA-Z0-9]+)$/);
    if (!match) {
        return null;
    }

    return {
        stockcode: match[1],
        resolution: match[2],
    };
}

function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID
) {
    const lastDailyBar = lastBarsCache[symbolInfo.full_name];
    const handler = {
        id: subscribeUID,
        callback: onRealtimeCallback
    }
    let subscriptionItem = channelToSubscription[symbolInfo.full_name];
    if (subscriptionItem) {
        // already subscribed to the channel, use the existing subscription
        subscriptionItem.handlers.push(handler);
        return
    }
    subscriptionItem = {
        subscribeUID,
        resolution,
        lastDailyBar,
        handlers: [handler]
    }
    channelToSubscription[symbolInfo.full_name] = subscriptionItem;
    // window.socket_send.emit('join', [symbolInfo.full_name]);
}

function unsubscribeFromStream(subscriberUID) {
    // find a subscription with id === subscriberUID
    if (window.list_mack_in_tab.includes(parseStockcodeFromChannelString(subscriberUID)['stockcode'])) {
        return;
    }
    Object.keys(channelToSubscription).forEach(channelString => {
        const subscriptionItem = channelToSubscription[channelString]
        const handlerIndex = subscriptionItem.handlers.findIndex(
            handler => handler.id === subscriberUID
        )
        if (handlerIndex !== -1) {
            // remove from handlers
            subscriptionItem.handlers.splice(handlerIndex, 1);

            if (subscriptionItem.handlers.length === 0) {
                // unsubscribe from the channel, if it was the last handler
                // window.socket_send.emit('leave', [channelString]);
                delete channelToSubscription[channelString];
                if (lastBarsCache.hasOwnProperty(channelString)) {
                    delete lastBarsCache[channelString];
                }
                return;
            }
        }
    })
}

const lastBarsCache = {};
const channelToSubscription = {};
const data_high = {};
const data_low = {};
const is_loading_data_getliveohlc = {};
/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
export class UDFCompatibleDatafeedBase {
    constructor(datafeedURL, quotesProvider, requester, updateFrequency = 10 * 1000) {
        this._configuration = defaultConfiguration();
        this._symbolsStorage = null;
        this._datafeedURL = datafeedURL;
        this._requester = requester;
        this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
        this._quotesProvider = quotesProvider;
        this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
        this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);

	// not use this
        // this._configurationReadyPromise = this._requestConfiguration()
        //     .then((configuration) => {
        //         if (configuration === null) {
        //             configuration = defaultConfiguration();
        //         }
        //         this._setupWithConfiguration(configuration);
        //     });
    }
    onReady(callback) {
        // this._configurationReadyPromise.then(() => {
        //     callback(this._configuration);
        // });
        window.socket_send.emit('getconfig', configuration => {
            if (configuration === null) {
                configuration = defaultConfiguration()
            }
            this._setupWithConfiguration(configuration)
            callback(this._configuration)
        })
        window.socket_send.on('updatelive', data => {
            const tradePrice = parseFloat(data.price) / 1000;
            const tradeVol = parseFloat(data.vol);
            const tradeTotalVol = parseFloat(data.totalvol);
            let tradeTime = Date.parse(data.time);
            const stockcode = data.stockcode;
            const subscriptionItem = channelToSubscription[stockcode];
            if (subscriptionItem === undefined) {
                return;
            }
            if (subscriptionItem.lastDailyBar === undefined) {
                return;
            }
            const lastDailyBar = subscriptionItem.lastDailyBar;
            const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
            let bar;
            if (tradeTime >= nextDailyBarTime) {
                tradeTime = new Date(tradeTime);
                bar = lastDailyBar;
                bar.time = tradeTime;
                bar.open = tradePrice;
                bar.high = tradePrice;
                bar.low = tradePrice;
                bar.close = tradePrice;
                bar.volume = tradeTotalVol;
                subscriptionItem.lastDailyBar = bar;
                subscriptionItem.handlers.forEach(handler => handler.callback(bar));
            } else {
                if (!data_high.hasOwnProperty(stockcode) || !data_low.hasOwnProperty(stockcode)) {
                    data_high[stockcode] = [];
                    data_low[stockcode] = [];
                    if (!is_loading_data_getliveohlc.hasOwnProperty(stockcode)) {
                        window.socket_send.emit("getliveohlc", stockcode, (res) => {
                            if (!res) return;
                            if (Object.keys(res).length == 0) return;
                            if (res.stockcode.length > 0) {
                                if (res.stockcode[0] == stockcode) {
                                    data_high[stockcode] = res.h.map(item => parseFloat(item) / 1000);
                                    data_low[stockcode] = res.l.map(item => parseFloat(item) / 1000);
                                    is_loading_data_getliveohlc[stockcode] = true;
                                }
                            }
                        });
                    }
                    bar = lastDailyBar;
                    bar.high = Math.max(lastDailyBar.high, tradePrice, ...data_high[stockcode]);
                    bar.low = Math.min(lastDailyBar.low, tradePrice, ...data_low[stockcode]);
                    bar.close = tradePrice;
                    bar.volume = tradeTotalVol;
                    subscriptionItem.lastDailyBar = bar;
                    subscriptionItem.handlers.forEach(handler => handler.callback(bar));
                } else {
                    bar = lastDailyBar;
                    bar.high = Math.max(lastDailyBar.high, tradePrice, ...data_high[stockcode]);
                    bar.low = Math.min(lastDailyBar.low, tradePrice, ...data_low[stockcode]);
                    bar.close = tradePrice;
                    bar.volume = tradeTotalVol;
                    subscriptionItem.lastDailyBar = bar;
                    subscriptionItem.handlers.forEach(handler => handler.callback(bar));
                }
            }
        })
        window.socket_send.on('updateliveindex', data => {
            const tradePrice = parseFloat(data.price);
            const tradeVol = parseFloat(data.vol);
            const tradeTotalVol = parseFloat(data.totalvol);
            let tradeTime = Date.parse(data.time);
            const stockcode = data.stockcode;
            const subscriptionItem = channelToSubscription[stockcode];
            if (subscriptionItem === undefined) {
                return;
            }
            if (subscriptionItem.lastDailyBar === undefined) {
                return;
            }
            const lastDailyBar = subscriptionItem.lastDailyBar;
            const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
            let bar = {
                time: 0,
                open: 0,
                high: 0,
                low: 0,
                close: 0,
                volume: 0
            };
            if (tradeTime >= nextDailyBarTime) {
                tradeTime = new Date(tradeTime);
                bar = lastDailyBar;
                bar.time = tradeTime;
                bar.open = tradePrice;
                bar.high = tradePrice;
                bar.low = tradePrice;
                bar.close = tradePrice;
                bar.volume = tradeTotalVol;
                subscriptionItem.lastDailyBar = bar;
                subscriptionItem.handlers.forEach(handler => handler.callback(bar));
            } else {
                if (!data_high.hasOwnProperty(stockcode) || !data_low.hasOwnProperty(stockcode)) {
                    data_high[stockcode] = [];
                    data_low[stockcode] = [];
                    if (!is_loading_data_getliveohlc.hasOwnProperty(stockcode)) {
                        window.socket_send.emit("getliveohlc", stockcode, (res) => {
                            if (!res) return;
                            if (Object.keys(res).length == 0) return;
                            if (res.stockcode.length > 0) {
                                if (res.stockcode[0] == stockcode) {
                                    data_high[stockcode] = res.h.map(item => parseFloat(item));
                                    data_low[stockcode] = res.l.map(item => parseFloat(item));
                                    is_loading_data_getliveohlc[stockcode] = true;
                                }
                            }
                        });
                    }
                    bar = lastDailyBar;
                    bar.high = Math.max(lastDailyBar.high, tradePrice, ...data_high[stockcode]);
                    bar.low = Math.min(lastDailyBar.low, tradePrice, ...data_low[stockcode]);
                    bar.close = tradePrice;
                    bar.volume = tradeTotalVol;
                    subscriptionItem.lastDailyBar = bar;
                    subscriptionItem.handlers.forEach(handler => handler.callback(bar));
                } else {
                    bar = lastDailyBar;
                    bar.high = Math.max(lastDailyBar.high, tradePrice, ...data_high[stockcode]);
                    bar.low = Math.min(lastDailyBar.low, tradePrice, ...data_low[stockcode]);
                    bar.close = tradePrice;
                    bar.volume = tradeTotalVol;
                    subscriptionItem.lastDailyBar = bar;
                    subscriptionItem.handlers.forEach(handler => handler.callback(bar));
                }
            }
        })
    }
    getQuotes(symbols, onDataCallback, onErrorCallback) {
        // this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
    }
    subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
        // this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
    }
    unsubscribeQuotes(listenerGuid) {
        // this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
    }
    getMarks(symbolInfo, from, to, onDataCallback, resolution) {
        // if (!this._configuration.supports_marks) {
        //     return;
        // }
        // const requestParams = {
        //     symbol: symbolInfo.ticker || '',
        //     from: from,
        //     to: to,
        //     resolution: resolution,
        // };
        // this._send('marks', requestParams)
        //     .then((response) => {
        //         if (!Array.isArray(response)) {
        //             const result = [];
        //             for (let i = 0; i < response.id.length; ++i) {
        //                 result.push({
        //                     id: extractField(response, 'id', i),
        //                     time: extractField(response, 'time', i),
        //                     color: extractField(response, 'color', i),
        //                     text: extractField(response, 'text', i),
        //                     label: extractField(response, 'label', i),
        //                     labelFontColor: extractField(response, 'labelFontColor', i),
        //                     minSize: extractField(response, 'minSize', i),
        //                 });
        //             }
        //             response = result;
        //         }
        //         onDataCallback(response);
        //     })
        //     .catch((error) => {
        //         logMessage(`UdfCompatibleDatafeed: Request marks failed: ${getErrorMessage(error)}`);
        //         onDataCallback([]);
        //     });
    }
    getTimescaleMarks(symbolInfo, from, to, onDataCallback, resolution) {
        if (!this._configuration.supports_timescale_marks) {
            return;
        }
        window.socket_send.emit(
            'gettimescalemarks',
            symbolInfo.ticker,
            from,
            to,
            resolution,
            response => {
                if (!Array.isArray(response)) {
                    var result = []
                    for (var i = 0; i < response.id.length; ++i) {
                        result.push({
                            id: extractField(response, 'id', i),
                            time: extractField(response, 'time', i),
                            color: extractField(response, 'color', i),
                            label: extractField(response, 'label', i),
                            tooltip: extractField(response, 'tooltip', i)
                        })
                    }
                    response = result
                }
                onDataCallback(response)
            }
        )
        // const requestParams = {
        //     symbol: symbolInfo.ticker || '',
        //     from: from,
        //     to: to,
        //     resolution: resolution,
        // };
        // this._send('timescale_marks', requestParams)
        //     .then((response) => {
        //         if (!Array.isArray(response)) {
        //             const result = [];
        //             for (let i = 0; i < response.id.length; ++i) {
        //                 result.push({
        //                     id: extractField(response, 'id', i),
        //                     time: extractField(response, 'time', i),
        //                     color: extractField(response, 'color', i),
        //                     label: extractField(response, 'label', i),
        //                     tooltip: extractField(response, 'tooltip', i),
        //                 });
        //             }
        //             response = result;
        //         }
        //         onDataCallback(response);
        //     })
        //     .catch((error) => {
        //         logMessage(`UdfCompatibleDatafeed: Request timescale marks failed: ${getErrorMessage(error)}`);
        //         onDataCallback([]);
        //     });
    }
    getServerTime(callback) {
        // if (!this._configuration.supports_time) {
        //     return;
        // }
        // this._send('time')
        //     .then((response) => {
        //         const time = parseInt(response);
        //         if (!isNaN(time)) {
        //             callback(time);
        //         }
        //     })
        //     .catch((error) => {
        //         logMessage(`UdfCompatibleDatafeed: Fail to load server time, error=${getErrorMessage(error)}`);
        //     });
    }
    searchSymbols(userInput, exchange, symbolType, onResult) {
        if (this._configuration.supports_search) {
            // const params = {
            //     limit: 30 /* SearchItemsLimit */ ,
            //     query: userInput.toUpperCase(),
            //     type: symbolType,
            //     exchange: exchange,
            // };
            window.socket_send.emit('getsearch', userInput.toUpperCase(), data => {
                onResult(data)
            })
            // this._send('search', params)
            //     .then((response) => {
            //         if (response.s !== undefined) {
            //             logMessage(`UdfCompatibleDatafeed: search symbols error=${response.errmsg}`);
            //             onResult([]);
            //             return;
            //         }
            //         onResult(response);
            //     })
            //     .catch((reason) => {
            //         logMessage(`UdfCompatibleDatafeed: Search symbols for '${userInput}' failed. Error=${getErrorMessage(reason)}`);
            //         onResult([]);
            //     });
        } else {
            if (this._symbolsStorage === null) {
                throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
            }
            this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30 /* SearchItemsLimit */)
                .then(onResult)
                .catch(onResult.bind(null, []));
        }
    }
    resolveSymbol(symbolName, onResolve, onError, extension) {
        logMessage('Resolve requested');
        window.socket_send.emit('getsymbolinfo', symbolName, data => {
            onResolve(data)
        })
        // const currencyCode = extension && extension.currencyCode;
        // const unitId = extension && extension.unitId;
        // const resolveRequestStartTime = Date.now();

        // function onResultReady(symbolInfo) {
        //     logMessage(`Symbol resolved: ${Date.now() - resolveRequestStartTime}ms`);
        //     onResolve(symbolInfo);
        // }
        // if (!this._configuration.supports_group_request) {
        //     const params = {
        //         symbol: symbolName,
        //     };
        //     if (currencyCode !== undefined) {
        //         params.currencyCode = currencyCode;
        //     }
        //     if (unitId !== undefined) {
        //         params.unitId = unitId;
        //     }
        //     this._send('symbols', params)
        //         .then((response) => {
        //             if (response.s !== undefined) {
        //                 onError('unknown_symbol');
        //             } else {
        //                 onResultReady(response);
        //             }
        //         })
        //         .catch((reason) => {
        //             logMessage(`UdfCompatibleDatafeed: Error resolving symbol: ${getErrorMessage(reason)}`);
        //             onError('unknown_symbol');
        //         });
        // } else {
        //     if (this._symbolsStorage === null) {
        //         throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
        //     }
        //     this._symbolsStorage.resolveSymbol(symbolName, currencyCode, unitId).then(onResultReady).catch(onError);
        // }
    }
    getBars(symbolInfo, resolution, periodParams, onResult, onError) {
        this._historyProvider
            .getBars(symbolInfo, resolution, periodParams)
            .then(function (result) {
                onResult(result.bars, result.meta)
                if (resolution == "1D") {
                    if (!lastBarsCache.hasOwnProperty(symbolInfo.ticker)) {
                        lastBarsCache[symbolInfo.ticker] = JSON.parse(
                            JSON.stringify(result.bars[result.bars.length - 1])
                        )
                        if (channelToSubscription.hasOwnProperty(symbolInfo.ticker)) {
                            channelToSubscription[symbolInfo.ticker].lastDailyBar = JSON.parse(
                                JSON.stringify(result.bars[result.bars.length - 1])
                            )
                        }
                    }
                }
            })
            .catch(onError)
    }
    subscribeBars(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
        if (resolution == "1D" || resolution == "D") {
            subscribeOnStream(symbolInfo, resolution, onTick, listenerGuid)
        } else {
            this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
        }
    }
    unsubscribeBars(listenerGuid) {
        let symbolInfo = parseStockcodeFromChannelString(listenerGuid);
        if (symbolInfo.resolution == "1D") {
            unsubscribeFromStream(listenerGuid)
        } else {
            this._dataPulseProvider.unsubscribeBars(listenerGuid);
        }
    }
    _requestConfiguration() {
        return this._send('config')
            .catch((reason) => {
                logMessage(`UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=${getErrorMessage(reason)}`);
                return null;
            });
    }
    _send(urlPath, params) {
        return this._requester.sendRequest(this._datafeedURL, urlPath, params);
    }
    _setupWithConfiguration(configurationData) {
        this._configuration = configurationData;
        if (configurationData.exchanges === undefined) {
            configurationData.exchanges = [];
        }
        if (!configurationData.supports_search && !configurationData.supports_group_request) {
            throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
        }
        if (configurationData.supports_group_request || !configurationData.supports_search) {
            this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
        }
        logMessage(`UdfCompatibleDatafeed: Initialized with ${JSON.stringify(configurationData)}`);
    }
}

function defaultConfiguration() {
    return {
        supports_search: false,
        supports_group_request: true,
        supported_resolutions: [
            '1',
            '5',
            '15',
            '30',
            '60',
            '1D',
            '1W',
            '1M',
        ],
        supports_marks: false,
        supports_timescale_marks: false,
    };
}
