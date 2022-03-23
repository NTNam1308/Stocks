<template>
  <div style="display: flex; flex-direction: row; flex: 1 1 0%">
    <div class="column-tradingdate">{{ source.tradingdate.substring(11) }}</div>
    <div
      class="column-price"
      :class="
        $function_global.getClassTextColorFromPrice(source.price, price_eod_yesterday, board)
      "
    >
      {{ formatMoney(source.price, 2, 2) }}
    </div>
    <div
      class="column-change"
      :class="
        $function_global.getClassTextColorFromPrice(source.price, price_eod_yesterday, board)
      "
    >
      {{
        formatMoney(
          parseFloat(source.price) - parseFloat(price_eod_yesterday),
          2,
          2
        )
      }}
    </div>
    <div class="column-vol">
      {{ formatMoney(source.vol, 0, 2) }}
    </div>
    <div
      class="column-side"
      :class="source.side == 'M' ? 'text-upchange' : 'text-downchange'"
    >
      {{ source.side }}
    </div>
  </div>
</template>

<script>
export default {
  name: "infinite-loading-item",
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    price_eod_yesterday: {
      type: Number,
      default: 0,
    },
    board: {
      type: String,
      default: "",
    },
  },
  methods: {
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.column-tradingdate {
  display: flex;
  flex-direction: row;
  flex: 2 1 0%;
}
.column-price {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2 1 0%;
  font-weight: bold;
}
.column-change {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2 1 0%;
  font-weight: bold;
}
.column-vol {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2 1 0%;
}
.column-side {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 30px;
  font-weight: bold;
}
</style>