<template>
  <div
    class="table-scroll-sticky"
    style="display: flex; flex-direction: column; overflow-y: scroll"
  >
    <div
      class="border-bottom"
      style="display: flex; flex-direction: row"
      v-for="(item, index) in data_price_world_index_change"
      :key="index"
    >
      <div
        class="text-upchange"
        style="
          display: flex;
          flex-direction: row;
          flex: 2 1;
          justify-content: flex-start;
          font-weight: bold;
          white-space: nowrap;
        "
      >
        <CIcon
          class="color-icon-oil"
          :name="getIcon(item.index)"
          style="margin-top: 2px; margin-right: 10px"
        />{{ item.index }}
      </div>
      <div
        :class="getClassColorByChange(item.change)"
        style="
          display: flex;
          flex-direction: row;
          flex: 1 1;
          justify-content: flex-end;
          white-space: nowrap;
        "
      >
        <transition
          :name="getAnimationChangeBlinkByValue(item.change)"
          mode="out-in"
        >
          <span :key="item.last">
            {{ formatMoney(item.last,0,2) }}
          </span>
        </transition>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          flex: 2 1;
          justify-content: flex-end;
          padding-right: 5px;
          white-space: nowrap;
        "
      >
        <transition
          :name="getAnimationChangeBlinkByValue(item.change)"
          mode="out-in"
        >
          <span
            :key="item.change"
            v-html="getSpanColorByValue(item.change, item.changePc)"
          >
          </span>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WidgetPriceWorldIndexChange",
  props: {
    data_price_world_index_change: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getAnimationChangeBlinkByValue(change) {
      change = parseFloat(change);
      if (change > 0) {
        return "upchange";
      } else if (change == 0) {
        return "nochange";
      } else {
        return "downchange";
      }
    },
    getSpanColorByValue(change, perchange) {
      perchange = parseFloat(perchange);
      change = parseFloat(change);
      if (perchange >= 0) {
        return `<span class="text-upchange">+${this.formatMoney(
          change,
          2,
          2
        )} (+${this.formatMoney(perchange, 2, 2)}%)</span>
        `;
      } else {
        return `<span class="text-downchange">${this.formatMoney(
          change,
          2,
          2
        )} (${this.formatMoney(perchange, 2, 2)}%)</span>`;
      }
    },
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getClassColorByChange(change) {
      change = parseFloat(change);
      if (change >= 0) {
        return "text-upchange";
      } else {
        return "text-downchange";
      }
    },
    getIcon(board) {
      board = board.trim();
      if (board.toLowerCase().includes("oil")) return "cilDrop";
      else if (board.toLowerCase().includes("gas")) return "iconGas";
      else if (board.toLowerCase().includes("gold")) return "iconGoldBar";
      else {
        switch (board) {
          case "Dow Jones":
            return "cifUs";
          case "S&P 500":
            return "cifUs";
          case "Nasdaq":
            return "cifUs";
          case "Nikkei 225":
            return "cifJp";
          case "Shanghai":
            return "cifCn";
          case "Hang Seng":
            return "cifHk";
          case "DJ Future":
            return "cifUs";
          default:
            return "";
        }
      }
    },
  },
};
</script>
<style lang="scss">
.table-scroll-sticky {
  height: 175px;
  overflow-y: scroll;
  thead {
    position: sticky;
    top: -1px;
    z-index: 2;
    tr {
      background-color: #fff;
      z-index: 2;
    }
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
}
.c-dark-theme {
  .color-icon-oil {
    color: #fff;
  }
}
.color-icon-oil {
  color: #000;
}
</style>
