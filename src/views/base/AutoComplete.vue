<template>
  <div style="position: relative" v-bind:class="{ show: openSuggestion }">
    <CInput
      v-model="mack"
      prependHtml="<i class='cui-user'></i>"
      placeholder="Mã CK"
      @keydown.enter="enter"
      @keydown.down="down"
      @keydown.up="up"
      @input="change"
      :addInputClasses="{
        'is-invalid': mack_trade,
        'text-right': text_right
      }"
      class="mb-1"
    >
      <template #prepend-content>
        <CIcon name="cil-laptop" v-if="show_prepend_content"/>
      </template>
    </CInput>
    <CListGroup
      v-if="openSuggestion"
      class="dropdown-menu pb-0 pt-0"
      style="width: 200%"
      :class="{ show: open }"
    >
      <CListGroupItem
        href="#"
        v-for="(item, index) in suggestions"
        :key="index"
        @click="suggestionClick(index)"
        :class="{ active: isActive(index) }"
      >
        <table style="width: 100%">
          <tr>
            <td class="font-weight-bold" style="width: 20%">
              {{ item.mack }}
            </td>
            <td>{{ item.ten_cong_ty }}</td>
          </tr>
        </table>
      </CListGroupItem>
    </CListGroup>
  </div>
</template>

<script>

export default {
  data() {
    return {
      open: false,
      current: 0,
      mack: "HPG",
      timer: 0,
      suggestions: [],
      mack_trade: false,
    };
  },

  props: {
    show_prepend_content:{
      type: Boolean
    },
    text_right:{
      type: Boolean
    }
  },

  created() {
    this.mack = this.$store.state.mack;
  },

  computed: {
    openSuggestion() {
      return (
        this.mack !== "" && this.suggestions.length != 0 && this.open === true
      );
    },
  },

  methods: {
    enter() {
      if (this.openSuggestion) {
        this.$emit("update:selection", this.suggestions[this.current].mack);
        this.mack = this.suggestions[this.current].mack;
        this.$store.state.mack = this.suggestions[this.current].mack;
        this.$store.state.type_mack = this.suggestions[this.current].nhom;
        this.$store.state.description_mack = this.suggestions[this.current].ten_cong_ty;
        this.$store.state.department = this.suggestions[this.current].nganh;
        this.open = false;
      }
    },

    up() {
      if (this.current > 0) this.current--;
    },

    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
    },

    isActive(index) {
      return index === this.current;
    },

    searchMack(mack){
      mack = mack.toUpperCase();
      let return_data = [];
      const limit = 5;
      if(this.$store.state.list_mack.length > 0 && mack != ""){
        for (let i = 0; i < this.$store.state.list_mack.length; i++) {
          if(this.$store.state.list_mack[i].mack.includes(mack)){
            return_data.push(this.$store.state.list_mack[i]);
          }
          if(return_data.length == limit)
            break;
        }
      }
      return return_data;
    },

    change() {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
      let list_key = /[\s~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/;
      if(list_key.test(this.mack)) {
          this.mack_trade = true;
      } else {
        this.mack_trade = false;
      }

      this.$emit("update:selection", this.mack);
      this.searchMack(this.mack);
      this.suggestions = this.searchMack(this.mack);
    },

    suggestionClick(index) {
      this.$emit("update:selection", this.suggestions[index].mack);
      this.mack = this.suggestions[index].mack;
      this.$store.state.mack = this.suggestions[index].mack;
      this.$store.state.type_mack = this.suggestions[index].nhom;
      this.$store.state.description_mack = this.suggestions[index].ten_cong_ty;
      this.$store.state.department = this.suggestions[index].nganh;
      this.open = false;
    },
  },

  watch: {
    "$store.state.mack": {
      handler() {
        this.mack = this.$store.state.mack;
      },
    },
  }
  
};
</script>
