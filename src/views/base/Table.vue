<template>
  <CCard>
    <CCardBody>
      <slot name="title">
      </slot>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :sorter="sorter"
        :header="header"
        :items-per-page="itemsPerPage"
        :addTableClasses="addTableClasses"
        :noItemsView="{
          noResults: 'Không có dữ liệu',
          noItems: 'Không có dữ liệu',
        }"
        :pagination="pagination"
        :tableFilter="tableFilter"
      >
        <template #mack="{ item }">
          <td>
            <CLink @click="getInfo(item.mack)" color="light">
              {{ item.mack }}
            </CLink>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: "Table",

  props: {
    items: Array,
    itemsPerPage: Number,
    tableFilter: Object,
    fields: {
      type: Array,
      default() {
        return ["thong_tin", "gia_tri"];
      },
    },
    caption: {
      type: String,
      default: "Table",
    },
    sorter: Boolean,
    sorterValue: Object,
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
    pagination: Boolean,
    isFilterUnit: Boolean,
    addTableClasses: String,
    header: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status === "Pending"
        ? "warning"
        : status === "Banned"
        ? "danger"
        : "primary";
    },
    getInfo(mack) {
      this.$store.commit("set", ["mack", mack]);
      this.$router.push("/phan-tich-doanh-nghiep");
    },
  },
};
</script>
