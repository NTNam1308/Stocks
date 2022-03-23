<template>
  <div style="max-height: 350px;" class="TVChartContainer" :id="containerId" />
</template>

<script>
import { widget } from "../../../public/js/charting_library";

export default {
  name: "Chart",
  props: {
    symbol: {
      default: "VNINDEX",
      type: String,
    },
    interval: {
      default: "1D",
      type: String,
    },
    containerId: {
      default: "simple_tranding_chart",
      type: String,
    },
    datafeedUrl: {
      default: `${process.env.VUE_APP_URL_API_TRADING_CHART}:${process.env.VUE_APP_API_TRADING_CHART_PORT}`,
      type: String,
    },
    libraryPath: {
      default: "/js/charting_library/",
      type: String,
    },
    chartsStorageUrl: {
      default: "https://saveload.tradingview.com",
      type: String,
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String,
    },
    clientId: {
      default: "tradingview.com",
      type: String,
    },
    userId: {
      default: "public_user_id",
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    },
  },
  tvWidget: null,
  mounted() {
    const widgetOptions = {
      symbol: this.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,

      locale: "vi",
      disabled_features: ["use_localstorage_for_settings"],
			preset: "mobile",
      overrides: {
						"paneProperties.background": "#222222",
						"paneProperties.vertGridProperties.color": "#454545",
						"paneProperties.horzGridProperties.color": "#454545",
						"scalesProperties.textColor" : "#AAA"
			},
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      timezone: "Asia/Ho_Chi_Minh",
    };
    
    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
  },
  watch: {
    "$store.state.darkMode": function () {
      this.tvWidget.changeTheme(this.$store.state.darkMode ? "Dark" : "Light");
    },
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
};
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 190px);
}
.c-main {
  padding-top: 0px;
  .container-fluid {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
