<template>
  <div>
    <h1>Điểm 4M</h1>
    <CTableWrapper
      :itemsPerPage="20"
      :items="items"
      hover
      :sorter="true"
      column-filter
      striped
      bordered
      small
      fixed
      :fields="fields"
      :pagination="true"
      :tableFilter="true"
    />
  </div>
</template>
<script>
import CTableWrapper from "../base/Table.vue";
import axios from "axios";

export default {
  name: "abc",
  data() {
    return {
      items: [],
      fields: [
        {
          key: "mack",
          label: "Mã Mack",
        },
        {
          key: "diem",
          label: "Điểm",
        },
      ],
    };
  },
  props: {
    itemsPerPage: {
      type: Number,
    },
  },
  components: {
    CTableWrapper,
  },
  created() {
    axios
      .get(this.$apiAdress + "/api/stocks/fourm/all", {
        params: {
          token: localStorage.getItem("api_token"),
        },
      })
      .then((res) => {
        this.items = res.data;
        this.items.forEach((item) => {
          item.diem = parseFloat(item.diem.toFixed(2));
          if (item.diem < 0) item.diem = 0;
        });
      })
      .catch((err) => console.log(err));
  },
};
</script>