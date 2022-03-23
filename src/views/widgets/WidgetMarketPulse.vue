<template>
  <div>
    <CCard>
      <CCardHeader class="title-block pl-2">
        <div class="d-flex justify-content-between">
          <div class="pt-1 d-flex align-items-center">
            <div style="height: 40px; width: 40px">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 49.542 40.535"
                enable-background="new 0 0 49.542 40.535"
                xml:space="preserve"
              >
                <path
                  fill="#FFF"
                  stroke="#282828"
                  stroke-miterlimit="10"
                  d="M44.562,39.899H5.271c-2.585,0-4.682-2.097-4.682-4.683V5.282 	c0-2.585,2.097-4.674,4.682-4.674h29.935c2.586,0,4.674,2.089,4.674,4.674v29.935C39.879,37.802,41.977,39.899,44.562,39.899z"
                ></path>
                <path
                  fill="none"
                  stroke="#282828"
                  stroke-miterlimit="10"
                  d="M48.977,32.284v2.934c0,2.54-2.021,4.607-4.549,4.675 	c-2.526-0.067-4.549-2.135-4.549-4.675v-2.934H48.977z"
                ></path>
                <polygon
                  points="6.407,21.885 6.407,13.703 8.116,13.703 11.523,19.679 11.523,13.703 13.043,13.703 13.043,21.885 11.361,21.885 	7.927,15.925 7.927,21.885 "
                ></polygon>
                <polygon
                  points="14.606,21.885 14.606,13.703 19.003,13.703 19.003,15.173 16.126,15.173 16.126,17.056 18.884,17.056 	18.884,18.526 16.126,18.526 16.126,20.415 19.003,20.415 19.003,21.885 "
                ></polygon>
                <polygon
                  points="22.075,21.885 19.69,13.703 21.242,13.703 22.67,19.424 24.076,13.703 25.185,13.703 26.57,19.424 28.008,13.703 	29.561,13.703 27.182,21.885 25.975,21.885 24.644,16.472 23.281,21.885 "
                ></polygon>
                <path
                  d="M29.739,19.582h1.585c0,0.31,0.113,0.562,0.341,0.757c0.212,0.18,0.478,0.271,0.796,0.271c0.144,0,0.278-0.024,0.404-0.07 	c0.126-0.047,0.242-0.12,0.348-0.217c0.209-0.198,0.313-0.445,0.313-0.741c0-0.281-0.072-0.517-0.217-0.708 	c-0.114-0.148-0.295-0.287-0.541-0.417c-0.154-0.076-0.379-0.162-0.67-0.259c-0.364-0.119-0.616-0.213-0.758-0.282 	c-0.248-0.119-0.47-0.275-0.662-0.47s-0.349-0.437-0.467-0.725c-0.059-0.14-0.102-0.281-0.131-0.419 	c-0.029-0.139-0.044-0.283-0.044-0.43c0-0.66,0.237-1.212,0.709-1.658c0.474-0.445,1.04-0.668,1.704-0.668 	c0.639,0,1.197,0.229,1.678,0.687c0.479,0.458,0.719,1.004,0.719,1.639h-1.563c0-0.238-0.092-0.44-0.276-0.606 	c-0.184-0.166-0.397-0.249-0.643-0.249c-0.242,0-0.438,0.082-0.585,0.246s-0.222,0.371-0.222,0.62c0,0.205,0.064,0.384,0.195,0.535 	c0.151,0.173,0.428,0.327,0.832,0.46c0.473,0.162,0.752,0.263,0.84,0.303c0.283,0.122,0.537,0.274,0.756,0.454 	c0.578,0.458,0.865,1.078,0.865,1.861c0,0.721-0.261,1.333-0.781,1.836c-0.521,0.503-1.147,0.754-1.879,0.754 	c-0.703,0-1.32-0.241-1.851-0.725S29.739,20.284,29.739,19.582"
                ></path>
                <rect x="0.588" y="7.787" width="39.291" height="0.724"></rect>
                <rect
                  x="6.261"
                  y="25.957"
                  fill="#2F9E2E"
                  width="27.948"
                  height="6.459"
                ></rect>
              </svg>
            </div>
            <div style="flex: 1" class="pl-2">
              <span class="font-weight-bold h5 mb-0"
                >Nhịp đập thị trường IBD VIỆT NAM
              </span>
              <span
                class="font-weight-bold h5 mb-0"
                style="white-space: nowrap"
              >
                KUNGFU STOCKS PRO
              </span>
            </div>
          </div>
        </div>
      </CCardHeader>
      <CCardBody class="p-0">
        <div class="wrap-main-content">
          <div class="main-content">
            <div
              class="row-content d-flex align-items-center border-bottom"
              v-for="(item, i) in list_main_content"
              :key="i"
            >
              <div
                class="row-content__icon mx-2"
                style="height: 40px; width: 40px"
                v-html="item.image"
              ></div>
              <div
                class="row-content__detail px-2 border-left"
                style="flex: 100%"
              >
                <p class="row-content__detail-title mb-0 font-weight-bold">
                  {{ item.title }}
                </p>
                <p class="row-content__detail-text mb-0">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mack-up-down d-flex" v-if="false">
          <div class="list-mack-up py-4" style="flex: 50%">
            <div class="d-flex justify-content-center">
              <svg
                width="24px"
                height="24px"
                fill="#007c01"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M414,321.94,274.22,158.82a24,24,0,0,0-36.44,0L98,321.94c-13.34,15.57-2.28,39.62,18.22,39.62H395.82C416.32,361.56,427.38,337.51,414,321.94Z"
                />
              </svg>
              <p class="text-center font-weight-bold text-upchange mb-0">
                Cổ phiếu tăng
              </p>
            </div>
            <p class="text-center font-weight-bold mb-0">
              Dẫn đầu về khối lượng
            </p>
            <div class="list-mack">
              <span
                class="text-upchange font-weight-bold"
                v-for="(item, i) in list_mack_up"
                :key="i"
                >{{ i + 1 }}. {{ item.mack }}</span
              >
            </div>
          </div>
          <div class="list-mack-down" style="flex: 50%">
            <div class="d-flex justify-content-center">
              <svg
                width="24px"
                height="24px"
                fill="#ff0017"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>ionicons-v5-b</title>
                <path
                  d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z"
                />
              </svg>
              <p class="text-center font-weight-bold text-downchange mb-0">
                Cổ phiếu giảm
              </p>
            </div>
            <p class="text-center font-weight-bold mb-0">
              Dẫn đầu về khối lượng
            </p>
            <div class="list-mack">
              <span
                class="text-upchange font-weight-bold"
                v-for="(item, i) in list_mack_down"
                :key="i"
                >{{ i + 1 }}. {{ item.mack }}</span
              >
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "WidgetMarketPulse",
  data() {
    return {
      list_mack_up: [],
      list_mack_down: [],
      list_main_content: [],
    };
  },
  created() {
    this.getContent();
  },
  methods: {
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
          this.list_mack_up = content.list_mack_up;
          this.list_mack_down = content.list_mack_down;
          this.list_main_content = content.list_main_content;
        })
        .catch((error) => {
          this.list_mack_up = [];
          this.list_mack_down = [];
          this.list_main_content = [];
          console.error(error);
        });
    },
  },
};
</script>
<style lang="scss">
.bg-watermark {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.09;
  img {
    width: 100%;
    height: 100%;
  }
}
.wrap-main-content{
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: -1;
    background: url("/img/bg_watermark.jpg");
    background-size: cover;
  }
}
.main-content {
  font-size: 16px;
  height: 355px;
  overflow-y: scroll;
  .row-content {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    &__icon {
      svg {
        width: 40px;
        height: 40px;
      }
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
.mack-up-down {
  font-size: 16px;
  display: flex;
  .list-mack-up {
    height: 145px;
    background-color: #f0faef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .list-mack {
      display: flex;
      flex-wrap: wrap;
      span {
        flex: 33.33%;
        text-align: center;
      }
    }
  }
  .list-mack-down {
    height: 145px;
    background-color: #faeeee;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .list-mack {
      display: flex;
      flex-wrap: wrap;
      span {
        flex: 33.33%;
        text-align: center;
      }
    }
  }
}
.c-dark-theme {
  .list-mack-up {
    background-color: #475c37;
  }
  .list-mack-down {
    background-color: #624747;
  }
}
.widget-market-pulse {
  font-family: "Lato, sans-serif";
  font-size: 18px;
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
  p {
    margin-bottom: 0;
  }
}
</style>
