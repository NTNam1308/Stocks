<template>
  <div>
    <CCardHeader>
      <CRow>
        <CCol sm="12">
          <CCardHeader>
            <p class="h3">Quản lý nội dung hộp nhịp đập thị trường</p>
          </CCardHeader>
        </CCol>
        <CCol md="6">
          <p class="h5">Danh sách nội dung</p>
          <CButton class="mb-2" color="success" @click="addRowContent()"
            ><CIcon name="cibAddthis" /> Thêm dòng mới</CButton
          >
          <draggable
            :list="list_main_content"
            class="list-group px-0"
            handle=".handle"
          >
            <div
              class="d-flex align-items-center py-2 border"
              v-for="(element, idx) in list_main_content"
              :key="idx"
            >
              <div class="px-2" style="cursor: pointer">
                <CIcon name="cilMove" class="handle" />
              </div>
              <div class="flex-fill">
                <div class="d-flex">
                  <CInput
                    v-model="element.image"
                    class="mb-0"
                    label="Ảnh"
                    placeholder="Nhập ảnh dạng svg"
                    style="flex: 1"
                  />
                  <div
                    role="group"
                    class="mb-0 form-group pl-4"
                    style="
                      align-items: center;
                      text-align: center;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <label for="uid-tyx6f4e5mjrddddd" class="">
                      Ảnh xem trước</label
                    >
                    <div
                      id="uid-tyx6f4e5mjrddddd"
                      class="d-flex justify-content-center"
                      style="width: 30px;height: 30px"
                      v-html="element.image"
                    ></div>
                  </div>
                </div>
                <CInput
                  v-model="element.title"
                  class="mb-0"
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
                />
                <CTextarea
                  label="Nội dung"
                  class="mb-0"
                  v-model="element.content"
                />
              </div>
              <div
                class="px-2"
                style="cursor: pointer"
                @click="removeRowContent(idx)"
              >
                <CIcon name="cilXCircle" />
              </div>
            </div>
          </draggable>
        </CCol>
        <CCol md="3">
          <p class="h5">Danh sách các mã cổ phiếu tăng</p>
          <CButton class="mb-2" color="success" @click="addRowMackUp()"
            ><CIcon name="cibAddthis" /> Thêm dòng mới</CButton
          >
          <draggable
            :list="list_mack_up"
            class="list-group px-0"
            handle=".handle"
          >
            <div
              class="d-flex align-items-center py-2 border"
              v-for="(element, idx) in list_mack_up"
              :key="idx"
            >
              <div class="px-2" style="cursor: pointer">
                <CIcon name="cilMove" class="handle" />
              </div>
              <CInput
                v-model="element.mack"
                class="mb-0 flex-fill"
                placeholder="Nhập mã"
              />
              <div
                class="px-2"
                style="cursor: pointer"
                @click="removeRowMackUp(idx)"
              >
                <CIcon name="cilXCircle" />
              </div>
            </div>
          </draggable>
        </CCol>
        <CCol md="3">
          <p class="h5">Danh sách các mã cổ phiếu giảm</p>
          <CButton class="mb-2" color="success" @click="addRowMackDown()"
            ><CIcon name="cibAddthis" /> Thêm dòng mới</CButton
          >
          <draggable
            :list="list_mack_down"
            class="list-group px-0"
            handle=".handle"
          >
            <div
              class="d-flex align-items-center py-2 border"
              v-for="(element, idx) in list_mack_down"
              :key="idx"
            >
              <div class="px-2" style="cursor: pointer">
                <CIcon name="cilMove" class="handle" />
              </div>
              <CInput
                v-model="element.mack"
                class="mb-0 flex-fill"
                placeholder="Nhập mã"
              />
              <div
                class="px-2"
                style="cursor: pointer"
                @click="removeRowMackDown(idx)"
              >
                <CIcon name="cilXCircle" />
              </div>
            </div>
          </draggable>
        </CCol>
        <CCol sm="12" class="mt-2 text-center">
          <CButton color="primary" @click="saveContent"
            ><CIcon name="cilSave" /> Lưu lại
          </CButton>
        </CCol>
      </CRow>
    </CCardHeader>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
let id = 3;
export default {
  name: "MarketPulse",
  components: {
    draggable,
  },
  data() {
    return {
      list_mack_up: [],
      list_mack_down: [],
      list_main_content: [],
      dragging: false,
    };
  },
  created() {
    this.getContent();
  },

  methods: {
    removeRowMackUp(idx) {
      this.list_mack_up.splice(idx, 1);
    },
    removeRowMackDown(idx) {
      this.list_mack_down.splice(idx, 1);
    },
    removeRowContent(idx) {
      this.list_main_content.splice(idx, 1);
    },
    addRowContent() {
      this.list_main_content.push({
        image: "",
        title: "",
        content: "",
      });
    },
    addRowMackUp() {
      this.list_mack_up.push({ mack: "" });
    },
    addRowMackDown() {
      this.list_mack_down.push({ mack: "" });
    },
    getContent() {
      this.list_mack_up = [];
      this.list_mack_down = [];
      this.list_main_content = [];
      axios
        .get(this.$apiAdress + "/api/stocks/market_pulse/getContent", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          const content = JSON.parse(res.data.content);
          this.list_mack_up =
            content.list_mack_up.length > 0
              ? content.list_mack_up
              : [{ mack: "" }];
          this.list_mack_down =
            content.list_mack_up.length > 0
              ? content.list_mack_down
              : [{ mack: "" }];
          this.list_main_content =
            content.list_main_content.length > 0
              ? content.list_main_content
              : [{ image: "", title: "", content: "" }];
        })
        .catch((error) => {
          this.list_mack_up = [];
          this.list_mack_down = [];
          this.list_main_content = [];
          console.error(error);
        });
    },
    saveContent() {
      axios
        .post(this.$apiAdress + "/api/stocks/market_pulse/updateContent", {
          content: this.content,
          token: localStorage.getItem("api_token"),
        })
        .then((res) => {
          this.$toast.success("Cập nhật nội dung thành công");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
  },
  computed: {
    content() {
      let return_data = {
        list_main_content: [],
        list_mack_up: [],
        list_mack_down: [],
      };
      for (const item of this.list_mack_up) {
        if (item.mack != "") {
          return_data.list_mack_up.push(item);
        }
      }
      for (const item of this.list_mack_down) {
        if (item.mack != "") {
          return_data.list_mack_down.push(item);
        }
      }
      for (const item of this.list_main_content) {
        if (item.image == "" && item.title == "" && item.content == "") {
          continue;
        } else {
          return_data.list_main_content.push(item);
        }
      }
      return return_data;
    },
  },

  watch: {},
};
</script>
<style lang="scss">
</style>
