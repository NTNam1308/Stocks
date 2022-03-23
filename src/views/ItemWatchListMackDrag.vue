<template>
  <div
    class="row-watchlist-mack border-top"
    :class="currentMack == source.mack && 'bg-hover-current'"
    @click.stop="onItemClick(source.mack, $event)"
  >
    <div class="d-flex justify-content-between">
      <div class="text-left font-weight-bold d-flex">
        <div>{{ source.mack }}</div>
        <CDropdown
          v-if="currentCategoryId.includes('watchlist')"
          placement="bottom-start"
          add-menu-classes=""
          class="pl-1 mr-1 dropdown-watchlist-item"
        >
          <template #toggler>
            <CIcon
              name="cilOptions"
              style="margin-top: -5px"
              class="dropdown-watchlist-item"
            />
          </template>
          <div class="px-1">
            <CDropdownItem class="dropdown-watchlist-item" @click="onDeleteItemClick(source.id)">
              <CIcon name="cilTrash" class="text-danger dropdown-watchlist-item" />
              <span class="pl-2 dropdown-watchlist-item">Xóa khỏi Wacthlist</span>
            </CDropdownItem>
          </div>
        </CDropdown>
      </div>
      <div
        class="text-right font-weight-bold"
        :class="$function_global.getClassTextColorFromCL(info.cl)"
      >
        <transition
          :name="$function_global.getAnimationNameFromCL(info.cl)"
          mode="out-in"
        >
          <span :key="info.price">
            {{ formatMoney(info.price, 2, 2) }}
          </span>
        </transition>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="text-left text-truncate">{{ info.ten_cong_ty }}</div>
      <div class="text-right font-weight-bold pl-1" style="white-space: nowrap">
        <transition
          :name="$function_global.getAnimationNameFromCL(info.cl)"
          mode="out-in"
        >
          <span
            :key="info.change"
            v-html="
              $function_global.getSpanColorByPerchange(
                info.change,
                info.perchange,
                info.cl
              )
            "
          >
          </span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemWatchListMack",
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    info: {
      type: Object,
      default() {
        return {};
      },
    },
    currentCategoryId: {
      type: String,
      default: "",
    },
    currentMack: {
      type: String,
      default: "",
    },
    onItemClick: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onDeleteItemClick: {
      type: Function,
      default() {
        return () => {};
      },
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
    getClassColorByChange(change) {
      change = parseFloat(change);
      if (change > 0) {
        return "text-upchange";
      } else if (change == 0) {
        return "text-nochange";
      } else {
        return "text-downchange";
      }
    },
    getSpanColorByPerchange(change, perchange) {
      change = parseFloat(change);
      perchange = parseFloat(perchange);
      if (perchange > 0) {
        return `<span class="text-upchange">+${change} (+${perchange}%)</span>
        `;
      } else if (perchange == 0) {
        return `<span class="text-nochange">${change} (${perchange}%)</span>
        `;
      } else {
        return `<span class="text-downchange">${change} (${perchange}%)</span>`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row-watchlist-mack {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  flex-wrap: nowrap;
  cursor: pointer;
  padding: 5px;
  &:hover {
    color: #fff;
    background-color: #8c58b3;
  }
  &__info {
    display: flex;
    flex-direction: column;
    width: 60%;
  }
  &__price {
    display: flex;
    flex-direction: column;
    width: 39%;
    padding-right: 1%;
  }
}
.c-dark-theme {
  .row-watchlist-mack {
  }
}
</style>