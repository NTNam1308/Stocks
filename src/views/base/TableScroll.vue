<template>
  <table
    ref="table"
    class="scrolling table table-fixed table-hover"
    :class="{ scrolly: scrollVertical, scrollx: scrollHorizontal }"
  >
    <thead
      name="thead"
      ref="thead"
      :class="{ scrollsync: syncHeaderScroll }"
      :style="syncHeaderScroll"
    >
      <slot name="thead" />
    </thead>
    <tbody name="tbody" ref="tbody" @scroll.passive="updateSyncedScroll">
      <slot name="tbody" />
    </tbody>
    <tfoot
      name="tfoot"
      ref="tfoot"
      v-if="includeFooter"
      :class="{ scrollsync: syncFooterScroll }"
      :style="syncFooterScroll"
    >
      <slot name="tfoot" />
    </tfoot>
  </table>
</template>
<script>
export default {
  name: "TableScroll",
  props: {
    deadAreaColor: { type: String, required: false, default: "#CCC" },
    includeFooter: { type: Boolean, required: false, default: false },
    syncHeaderScroll: { type: Boolean, required: false, default: true },
    syncFooterScroll: { type: Boolean, required: false, default: true },
    scrollHorizontal: { type: Boolean, required: false, default: true },
    scrollVertical: { type: Boolean, required: false, default: true },
  },
  mounted() {
    this.updateSyncedScroll();
  },
  methods: {
    updateSyncedScroll() {
      const b = this.$refs.tbody;
      const l = b.scrollLeft;
      if (this.scrollHorizontal) {
        if (this.syncHeaderScroll) {
          const h = this.$refs.thead;
          if (h.scrollLeft !== l) {
            h.scrollLeft = l;
          }
        }
        if (this.includeFooter && this.syncFooterScroll) {
          const f = this.$refs.tfoot;
          f.style;
          if (f.scrollLeft !== l) {
            f.scrollLeft = l;
          }
        }
      }
      this.$emit("scroll", b.scrollTop, l, b.scrollHeight, b.scrollWidth);
    },
  },
};
</script>
<style lang="scss">
.table-scroll {
  clear: both;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
}
table.scrolling {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  padding: 0;

  thead {
    flex: 0 0 auto;
    display: block;
    overflow: hidden;
    position: sticky;
    position: -webkit-sticky;
    top: 74px;
    z-index: 1;
  }
  tbody {
    display: block;
    flex: 1 1 auto;
    overflow: hidden;
    &:nth-child(3) {
      display: none;
    }
  }
  td {
    width: 10em;
    min-width: 10em;
    max-width: 10em;
    overflow: hidden;
    word-wrap: break-word;
    text-align: right;
    vertical-align: middle;
    padding-right: 10px;
  }
  th {
    width: 10em;
    min-width: 10em;
    max-width: 10em;
    overflow: hidden;
    word-wrap: break-word;
    text-align: right;
    vertical-align: middle;
    background-color: #fff;
  }
  .w2 {
    width: 20em;
    min-width: 20em;
    max-width: 20em;
  }
}
table.scrolling.scrolly {
  tbody {
    overflow-y: scroll;
  }
  thead.scrollsync {
    overflow-y: scroll;
  }
}
table.scrolling.scrollx {
  tbody {
    overflow-x: scroll;
  }
}
.c-dark-theme {
  table.freezeFirstColumn {
    thead {
      th {
        &:first-child {
          background-color: #7030a0;
        }
        background-color: #7030a0;
      }
      td {
        &:first-child {
          background-color: #7030a0;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          td {
            &:first-child {
              background-color: #8c58b3 !important;
            }
            background-color: #8c58b3 !important;
          }
        }
      }
      th {
        &:first-child {
          background-color: #7030a0;
        }
      }
      td {
        &:first-child {
          background-color: #7030a0;
        }
      }
    }
  }
}
@media only screen and (min-width: 1024px) {
  table.freezeFirstColumn {
    thead {
      tr {
        display: block;
        width: min-content;
      }
      td {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 35em;
          min-width: 35em;
          max-width: 35em;
          text-align: center;
        }
      }
      th {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 35em;
          min-width: 35em;
          max-width: 35em;
          text-align: center;
        }
      }
      .column-chart-sticky {
        position: sticky;
        position: -webkit-sticky;
        widows: 50%;
        left: 35em;
        background-color: #fff;
        width: 5em;
        min-width: 5em;
        max-width: 5em;
        padding-left: 0px;
        text-align: right;
      }
    }
    tbody {
      tr {
        // display: block;
        width: min-content;
      }
      td {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 35em;
          min-width: 35em;
          max-width: 35em;
          text-align: left;
        }
      }
      th {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 35em;
          min-width: 35em;
          max-width: 35em;
          padding-left: 0px;
          text-align: left;
        }
      }
      .column-chart-sticky {
        position: sticky;
        position: -webkit-sticky;
        widows: 50%;
        left: 35em;
        background-color: #fff;
        width: 5em;
        min-width: 5em;
        max-width: 5em;
        padding-left: 0px;
        text-align: right;
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  table.freezeFirstColumn {
    thead {
      top: 55px;
      tr {
        display: block;
        width: min-content;
      }
      td {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 30vw;
          min-width: 30vw;
          max-width: 30vw;
          text-align: center;
        }
      }
      th {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 30vw;
          min-width: 30vw;
          max-width: 30vw;
          text-align: center;
        }
      }
      .column-chart-sticky {
        position: sticky;
        position: -webkit-sticky;
        widows: 50%;
        left: 30vw;
        background-color: #fff;
        width: 20vw;
        min-width: 20vw;
        max-width: 20vw;
        padding-left: 0px;
        text-align: right;
      }
    }
    tbody {
      tr {
        display: block;
        width: min-content;
      }
      td {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 30vw;
          min-width: 30vw;
          max-width: 30vw;
          text-align: left;
          padding-left: 0px !important;
        }
      }
      th {
        &:first-child {
          position: sticky;
          position: -webkit-sticky;
          widows: 50%;
          left: 0;
          background-color: #fff;
          width: 30vw;
          min-width: 30vw;
          max-width: 30vw;
          padding-left: 0px;
          text-align: left;
        }
      }
      .column-chart-sticky {
        position: sticky;
        position: -webkit-sticky;
        widows: 50%;
        left: 30vw;
        background-color: #fff;
        width: 20vw;
        min-width: 20vw;
        max-width: 20vw;
        padding-left: 0px;
        text-align: right;
      }
    }
  }
}
</style>