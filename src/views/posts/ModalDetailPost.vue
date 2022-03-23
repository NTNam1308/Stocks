<template>
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper" @click="outside">
      <div class="modal-container" @click.stop="onside">
        <div class="modal-body">
          <slot name="body">
            <h2>{{ title }}</h2>
            <br />
            <br />
            <div v-html="content"></div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDetailPost",
  components: {},
  data: () => {
    return {};
  },
  watch: {},
  computed: {
    show() {
      return this.$store.state.show;
    },
    title() {
      return this.$store.state.title;
    },
    content() {
      return this.$store.state.content;
    },
  },

  methods: {
    closeModal() {
      this.$store.state.show = false;
    },
    outside() {
      this.$store.state.show = false;
      return false;
    },
    onside() {
      return false;
    },
  },
  mounted: function () {},
};
</script>

<style scoped>
@media screen and (max-width: 768px){
    .modal-container {
      margin: -100px auto;
      width: 350px;
      height: 500px;
    }
}
@media screen and (min-width: 768px){
    .modal-container {
      margin: -350px auto;
      width: 1000px;
      height: 800px;
    }
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: auto;
  color: black;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
    * the following styles are auto-applied to elements with
    * v-transition="modal" when their visiblity is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
