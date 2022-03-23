<template>
<div class="page page-about " id="body-home">
      <header id="header" class="header about-header">
        <nav id="navbar-top" class="navbar navbar-expand-md navbar-dark " aria-label="Third navbar example" v-bind:class=" { 'navbarOpen': show }">
            <div class="container d-flex">
                <div class="navbar-brand ">
                    <a href="#" class="nav-logo">
                        <img id="stock-logo" src="/img/logo-stocks.png" alt="" class="logo">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse"  data-target="#navbarsMainMenu"
                     aria-controls="navbarsMainMenu" aria-expanded="false" @click="toggleNavbar()">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarsMainMenu" v-bind:class="{ 'show': show }">
                    <ul class="navbar-nav" v-bind:class="active">
                        <li class="nav-item"><a href="#gioi-thieu" id="gioi-thieu-active" class="nav-link active " @click="makeActive('gioi-thieu-active')" aria-current="page">Giới thiệu</a>
                        </li>
                        <li class="nav-item"><a href="#mua" id="mua-active" class="nav-link " @click="makeActive('mua-active')">Mua</a></li>
                        <li class="nav-item"><a href="#hoi-dap" id="hoi-dap-active" class="nav-link hoi-dap" @click="makeActive('hoi-dap-active')">Hỏi đáp</a></li>
                        <li class="nav-item"><a href="#lien-he" id="lien-he-active" class="nav-link lien-he" @click="makeActive('lien-he-active')">Liên hệ</a></li>
                    </ul>
                    <div class="d_flex justify-content-center">
                      <template v-if="isShowButtonLogin">
                        <a href="/login" id="link-login-db" class="link-login py-1 px-3 text-decoration-none"> Đăng nhập</a>
                      </template>
                      <template v-else>
                        <a href="/dashboard"  class="link-login-user">
                          <span class="bg-img-btn-login">
                         <img class="img-btn-login" :src="url_avatar" />
                          </span> 
                          <span class="btn-login-name">
                          ĐĂNG NHẬP
                          </span> 
                          </a>
                      </template>
                    </div>
                </div>
            </div>
            <div id="nav-sm" class="container"></div>
        </nav>
        <div class="container" >
            <div class="row ad-one">
                <img src="/img/about/about-ad1.png" alt="" />
            </div>
            <!-- END AD One -->
        </div>
    </header>
    <!-- End Header -->

    <section class="service" id="gioi-thieu">
        <div class="service-one w-100">
            <div class="container">
                <div class="row-wrap">
                    <h2 class="col-12 title title-one text-primary">
                        SẢN PHẨM CỦA CHÚNG TÔI
                    </h2>
                    <div class="col-12 subtitle">
                        Giải pháp hỗ trợ đầu tư
                        chứng
                        khoán cho nhà đầu tư cá nhân
                    </div>
                </div>
              </div>
        </div>
        <div class="service-solution-support w-100">
            <div class="container">
                <div class="row justify-content-start">
                    <div class="col-sm-12 col-md-6 service-info">
                        <h3 class="title title-two text-primary">
                            Giải pháp hỗ trợ nhà đầu tư cá nhân trên nền
                            tảng
                            Web
                        </h3>
                        <div>
                            KungFuStocksPro không chỉ là một giải pháp phân tích đa
                            năng,
                            kết
                            nối bạn với cộng đồng đầu tư tinh hoa 1% của
                            Việt
                            Nam mà
                            còn giúp bạn tiếp cận và khai thác nhiều thông
                            tin
                            có
                            giá trị từ cơ sở dữ liệu chứng khoán chính xác,
                            đầy
                            đủ
                            và có tính hệ thống.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="service-two w-100">
            <div class="container service-notification">
                <div class="row">
                    <div class="col-sm-12 col-md-6 align-items-center text-center service-image">
                        <img src="/img/about/ring-icon.png" alt="" />
                    </div>
                    <div class="col-sm-12 col-md-6 text-white">
                        <h3 class="title title-two">
                            Hệ thống cảnh báo thông minh
                        </h3>
                        <div>
                            Giúp bạn phát hiện sớm điểm mua/bán tiềm năng
                            nhằm tối ưu hóa lợi nhuận, thông tin chủ động
                            thay vì mất nhiều thời gian theo dõi và
                            tìm kiếm (Đang phát triển, sẽ hoàn thiện sau 3-4 tháng phát hành).
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="service-three w-100">
            <div class="container service-solution">
                <div class="row justify-content-start">
                    <div class="col-sm-12 offset-col-sm-0 col-md-6
                        offset-col-md-6">
                        <h3 class="title title-two">
                            Bộ tiêu chí độc quyền và phát triển bởi đội ngũ Happy Live
                        </h3>
                        <div>
                            Cho phép nhà đầu tư cá nhân tìm kiếm và phát hiện các cổ phiếu tiềm năng,
                            giúp bạn tránh bỏ lỡ các cơ hội đầu tư.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="service-four w-100">
            <div class="container service-tech">
                <div class="row tech-row">
                  <div class="col-sm-12 col-md-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-4 justify-content-center service-image">
                              <img src="/img/about/chip-icon.png" alt="" />
                          </div>
                          <div class="col-xs-12 col-sm-8">
                              <h3 class="title title-two text-primary">
                                  Áp dụng công nghệ hiện đại
                              </h3>
                              <div>
                                  KungFuStocksPro đem đến những trải nghiệm vượt trội kết hợp
                                  phân tích FA - TA, nhật ký giao dịch, hệ thống cảnh
                                  báo...tất cả đều được cập nhật realtime với tốc độ nhanh chóng.
                              </div>
                          </div>
                        </div>
                      </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="row">
                      <div class="col-xs-12 col-sm-4 justify-content-center service-image">
                          <img src="/img/about/light-icon.png" alt="" />
                      </div>
                      <div class="col-xs-12 col-sm-8">
                          <h3 class="title title-two text-primary">
                              Thông tin được bố trí khoa học, dễ sử dụng
                          </h3>
                          <div>
                              Với tiêu chí: giúp bạn tiếp cận thông tin một cách
                              nhanh nhất với ít thao tác nhất.
                          </div>
                      </div>
                  </div>
                 </div>
                </div>

                <div class="row row-service-detail justify-content-center" id="mua">
                    <div class="service-detail justify-content-center">
                        <a class=" justify-content-center link text-white text-uppercase bt-service-detail">chi tiết sản
                            phẩm</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="product" >
        <div class="container position-relative">
              <div class="row-wrap row-wrap">
                <div class="col-12 justify-content-center product-title">Kungfu Stock Pro</div>
                <div class="col-12">
                    <div class="row w-100">
                        <div class="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 product-options justify-content-center">
                            <div class="row-fruid">
                                <div class="col-sm-8 ofset-sm-2 shadow option product-two">
                                    <div class="option-title">hội viên vàng</div>
                                    <div class="row">
                                      <div class="col-6  ">
                                        <div class="row justify-content-center ">
                                          <div class="col-11 product-box">
                                              <div class="title-produce-plan ">
                                                <h3>GÓI 1 NĂM</h3>
                                              </div>
                                              <div class="plan-product-one">
                                                Chỉ với 
                                                <span class="text-primary fw-bold product-price">
                                                    566,667
                                                </span>
                                                VNĐ/tháng
                                              </div>
                                              <div>
                                                <span class="text-primary fw-bold price-product-two">
                                                    6,800,000 
                                                </span>
                                                VNĐ/năm 
                                              </div>
                                              <div class="row btn-plan-one">
                                                <div class="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                                <button type="button" @click.once="goto_register()"><span class="text-btn-plan-dk">ĐĂNG KÝ NGAY</span> <span class="text-btn-plan text-btn-plan-one">6,800,000 VNĐ/năm</span></button>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-6  ">
                                        <div class="row justify-content-center">
                                          <div class="col-11 product-box">
                                              <div class="title-produce-plan ">
                                                <h3>GÓI 2 NĂM</h3>
                                              </div>
                                              <div class="plan-product-two">
                                                Chỉ với 
                                                <del>
                                                    566,667 VNĐ/tháng
                                                </del>
                                              </div>
                                              <div>
                                                -> 
                                                <span class="text-primary fw-bold product-price">
                                                    450,000 
                                                </span>
                                                VNĐ/tháng 
                                              </div>
                                              <div>
                                                <del>
                                                    6,800,000 VNĐ/năm 
                                                  </del>
                                              </div>
                                              <div>
                                                -> 
                                                <span class="text-primary fw-bold price-product-two">
                                                     5,400,000 
                                                </span>
                                                VNĐ/năm 
                                              </div>
                                              <div class="row btn-plan-two">
                                                <div class="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                                <button type="button" @click.once="goto_register2()"><span class="text-btn-plan-dk">ĐĂNG KÝ NGAY</span> <span class="text-btn-plan">10,800,000 VNĐ/2năm</span></button>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 w-100 product-info">
                        <div class="row-wrap w-100">
                            <div class="col-12 product-info-title fw-bold">Quyền lợi hội viên Kungfustockspro</div>
                            <div class="col-12 product-info-cell">
                                <div><strong>Công cụ phân tích</strong></div>
                                <div class="text-italic">
                                    (Bộ công cụ phân tích kỹ thuật, phân tích cơ bản,
                                    bộ lọc cổ phiếu độc quyền)
                                </div>
                            </div>

                            <div class="col-12 product-info-cell">
                                <div><strong>Nhật ký giao dịch</strong></div>
                                <div class="text-italic">
                                    (Cập nhật giá realtime, giả lập chính xác danh mục
                                    đang giao dịch,…)
                                </div>
                            </div>

                            <div class="col-12 product-info-cell">
                                <div><strong> Hỗ trợ</strong></div>
                                <div class="text-italic">
                                    (Bộ tài liệu hướng dẫn sử dụng công cụ, tính năng;
                                    group hỗ trợ hội viên)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 product-slogan justify-content-center" id="hoi-dap">
                  <div class="product-slogan-text">
                    KungFuStocksPro luôn sáng tạo và phát triển thêm các tính năng mới<br>
                    để nâng cao hiệu quả đầu tư cho quý hội viên
                  </div>
                </div>
            </div>
        </div>
        <div class="free-support w-100">
            <div class="container">
              <div class="row">
                    <div class="col-12 d-flex form-title free-support-title justify-content-center">
                      Đăng ký tư vấn miễn phí
                    </div>
                </div>
                <form class="row" @submit.prevent="send_contact1" method="POST">
                    <div class="col-xs-6 offset-xs-3 col-sm-12 col-md-6">
                        <div class="form-item">
                            <input type="text" class="form-input" v-model="name1" placeholder="Họ tên">
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageName1"
                            >
                              <div class="alert alert-danger al-mg-sc-dk" role="alert">
                                {{messageName1}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">
                            <input type="text" class="form-input" v-model="phone1" placeholder="Điện thoại">
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messagePhone1"
                            >
                              <div class="alert alert-danger al-mg-sc-dk" role="alert">
                                {{messagePhone1}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">
                            <input type="email" class="form-input" v-model="email1" placeholder="Email">
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageEmail1"
                            >
                              <div class="alert alert-danger al-mg-sc-dk" role="alert">
                                {{messageEmail1}}
                              </div>                                 
                            </calert-stub>
                        </div>
                    </div>
                    <div class="col-xs-6 offset-xs-3 col-sm-12 col-md-6">
                        <div class="form-item">
                            <textarea placeholder="Bạn có thắc mắc gì về phần mềm cần trao đổi với chúng tôi? " v-model="content1"></textarea>
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageContent1"
                            >
                              <div class="alert alert-danger al-mg-sc-dk" role="alert">
                                {{messageContent1}}
                              </div>                                 
                            </calert-stub>
                        </div>    
                    </div>

                    <div class="col-12 d-flex ">
                        <div class="col-lg-4 col-md-4 ">
                        </div>
                        <div class="col-lg-4 col-md-4  col-xs-12 free-support-title  justify-content-center">
                          <button class="btn btn-primary py-2 " type="submit" :disabled="send_consultation_loading"
                           style="font-size: 20px !important;position: relative !important">
                              <span 
                              class="btn_cons"
                              :class="{'spinner-border':send_consultation_loading, 'spinner-border-sm':send_consultation_loading}"  role="status" aria-hidden="true"></span>
                              Gửi
                            </button>
                            <calert-stub
                              color="success"
                              fade="true"
                              show="true"
                              v-if="success_message1"
                            >
                              <div class="alert alert-success al-mg-sc al-mg-sc-lh-s " role="alert">
                                {{success_message1}}
                              </div>                                 
                            </calert-stub>
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="error_message1"
                            >
                              <div class="alert alert-danger al-mg-sc-lh-s" role="alert">
                                {{error_message1}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="col-4  ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
   <section class="stock">
        <div class="container position-relative">
            <div class="row-wrap">
                <div class="col-12 stock-title justify-content-center stock-title">KUNGFU chứng khoán</div>
                <div class="col-12 text-italic text-center stock-info" id="lien-he">
                    Để ứng dụng phần mềm trong đầu tư chứng khoán và trở thành Nhà đầu tư chứng khoán thành công theo
                    phương pháp độc đáo kết hợp giữa phân tích cơ bản và phân tích kỹ thuật, bạn có thể tham gia khóa
                    học KungFu Chứng Khoán của chúng tôi.
                </div>
                <div class="col-12 text-center stock-join" >
                    <a href="https://thaipham.live/khoa-hoc/" target="_blank" class="link stock-join-link text-uppercase">tham gia ngay</a>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer order-footer" >
        <div class="container">
            <div class="row">
                <div class="col-xs-6 offset-xs-3 col-sm-12 col-md-6">
                    <div class="contact-info text-white">
                        <div>
                            <a href="https://happy.live/" target="_blank" class="link advance-link text-uppercase text-white">
                                <img src="/img/about/link-icon.png" alt="" class="pe-3" />
                                Chuyên trang tin tức về đầu tư
                            </a>
                        </div>
                        <div class="mt-5">
                            <p class="fw-bold text-uppercase">
                                Liên hệ: 
                            </p>
                            <p>
                                Số 9 đường 9A, Khu Dân Cư Nam Phú, Phường Tân Thuận Đông, Quận   7, Thành phố Hồ Chí Minh
                            </p>
                            <p>
                                (+84) 038 9843068 (Liên hệ từ 8h30 -12h; 13h30 - 18h Từ Thứ 2 đến Thứ 6, Thứ 7 từ 8h30 - 12h)
                            </p>
                            <p>      
                                 kungfustockspro@happy.live
                            </p>
                        </div>
                    </div>
                    <div class="text-uppercase mt-5 text-white">
                        Theo dõi chúng tôi tại
                    </div>
                    <div class="socials flex-inline ">
                        <a href="https://www.facebook.com/happy.live.invest/" class="text-white mx-1 " target="_blank" title="">
                              <img src="/img/fb.png" alt="" class="pe-3" width="45px"/>
                            </a>
                        <a href="https://www.youtube.com/channel/UCGxpaaT3V3hztKDppity_GA" class="text-white mx-1 " target="_blank" title="">
                            <img src="/img/youtube.png" alt="" class="pe-3" width="45px"/>
                            </a>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <form class="form-subscribe shadow" @submit.prevent="send_contact" method="POST">
                        <div class="text-center text-uppercase text-primary fw-bold py-4 contact-title">liên hệ với
                            chúng tôi</div>
                        <div class="form-item">
                            <input type="text" class="form-input" v-model="name" placeholder="Họ tên">
                              <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageName"
                            >
                              <div class="alert alert-danger al-mg-sc-lh" role="alert">
                                {{messageName}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">
                            <input type="text" class="form-input" v-model="phone" placeholder="Điện thoại">
                              <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messagePhone"
                            >
                              <div class="alert alert-danger al-mg-sc-lh" role="alert">
                                {{messagePhone}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">
                            <input type="email" class="form-input" v-model="email" placeholder="Email">
                              <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageEmail"
                            >
                              <div class="alert alert-danger al-mg-sc-lh" role="alert">
                                {{messageEmail}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">
                            <textarea placeholder="Nội dung liên hệ" v-model="content"></textarea>
                              <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="messageContent"
                            >
                              <div class="alert alert-danger al-mg-sc-lh" role="alert">
                                {{messageContent}}
                              </div>                                 
                            </calert-stub>
                        </div>
                        <div class="form-item">

                            <button class="btn btn-primary py-2 position-relative" type="submit" :disabled="send_contact_loading" style="font-size: 20px !important">
                              <span 
                               class="btn_contact"
                              :class="{'spinner-border':send_contact_loading, 'spinner-border-sm':send_contact_loading}" role="status" aria-hidden="true"></span>
                              Gửi
                            </button>
                            <calert-stub
                              color="success"
                              fade="true"
                              show="true"
                              v-if="success_message"
                            >
                              <div class="alert alert-success al-mg-sc-lh-s" role="alert">
                                {{success_message}}
                              </div>                                 
                            </calert-stub>
                            <calert-stub
                              color="danger"
                              fade="true"
                              show="true"
                              v-if="error_message"
                            >
                              <div class="alert alert-danger al-mg-sc-lh-s" role="alert">
                                {{error_message}}
                              </div>                                 
                            </calert-stub>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {
      active: 'gioi-thieu',
      productPrice: '6.800.000 VNĐ',
      name: '',
      name1: '',
      email: '',
      email1: '',
      phone: '',
      phone1: '',
      content: '',
      content1: '',
      key:"1",
      show: false,
      success_message: null,
      error_message: null,
      error_message1: null,
      success_message1: null,
      messageName1: null,
      messageName: null,
      messagePhone: null,
      messagePhone1: null,
      messageEmail: null,
      messageEmail1: null,
      messageContent: null,
      messageContent1: null,
      isShowButtonLogin: true,
      userName: '',
      url_avatar: '',
      send_contact_loading: false,
      send_consultation_loading: false,
    };
  },
  components: {
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
     window.addEventListener("resize", this.myEventHandler);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener("resize", this.myEventHandler);
  },

  methods: {
      makeActive: function(item){
        if (item == 'gioi-thieu-active') {
              document.getElementById('gioi-thieu-active').classList.add('active');
              document.getElementById('mua-active').classList.remove('active');
              document.getElementById('hoi-dap-active').classList.remove('active');
              document.getElementById('lien-he-active').classList.remove('active');
              window.location = "#gioi-thieu";
              this.show = !this.show
         } 
        if (item == 'mua-active') {
              document.getElementById('mua-active').classList.add('active');
              document.getElementById('gioi-thieu-active').classList.remove('active');
              document.getElementById('hoi-dap-active').classList.remove('active');
              document.getElementById('lien-he-active').classList.remove('active');
              window.location = "#mua";
              this.show = !this.show
         } 
         if (item == 'hoi-dap-active') {
              document.getElementById('hoi-dap-active').classList.add('active');
              document.getElementById('gioi-thieu-active').classList.remove('active');
              document.getElementById('mua-active').classList.remove('active');
              document.getElementById('lien-he-active').classList.remove('active');
              window.location = "#hoi-dap";
              this.show = !this.show
         } 
         if (item == 'lien-he-active') {
              document.getElementById('lien-he-active').classList.add('active');
              document.getElementById('gioi-thieu-active').classList.remove('active');
              document.getElementById('hoi-dap-active').classList.remove('active');
              document.getElementById('mua-active').classList.remove('active');
              window.location = "#lien-he";
              this.show = !this.show
         } 

        },
      send_contact() {
          var self = this;
          self.send_contact_loading = true;
          axios.post(  
            this.$apiAdress + '/api/send-contact-feedback'
            , {
            name: self.name,
            email: self.email,
            phone: self.phone,
            content: self.content,
          }).then(function (response) {
            self.send_contact_loading = false;
            self.success_message = "Gửi liên hệ thành công ";
              setTimeout(function () {
                  self.success_message = "";
              }, 3000);
          })
          .catch(function (error) {
            if(error.response){
              if( error.response.data.errors.phone ){
                  self.messagePhone = error.response.data.errors.phone[0];
              }
              if( error.response.data.errors.email ){
                  self.messageEmail = error.response.data.errors.email[0];
              }
              if( error.response.data.errors.content ){
                  self.messageContent = error.response.data.errors.content[0]; 
              }
              if( error.response.data.errors.name ){
                  self.messageName = error.response.data.errors.name[0]; 
              }
              self.error_message = 'Gửi liên hệ thất bại.';
              self.send_contact_loading = false;
            }else {
              self.error_message = 'Gửi liên hệ thất bại.';
              self.send_contact_loading = false;
            }
           
            setTimeout(function () {
                  self.error_message = null;
              }, 3000);
            setTimeout(function () {
                  self.messagePhone = null;
                  self.messageEmail = null;
                  self.messageContent = null;
                  self.messageName = null;

              }, 10000);
          });
  
        },
      send_contact1() {
          var self = this;
          self.send_consultation_loading = true;
          axios.post( 
             this.$apiAdress + '/api/send-contact-feedback'
             , {
            name: self.name1,
            email: self.email1,
            phone: self.phone1,
            content: self.content1,
          }).then(function (response) {
            self.send_consultation_loading = false;
            self.success_message1 = "Gửi đăng ký thành công";
            setTimeout(function () {
                self.success_message1 = "";
            }, 3000);
          })
          .catch(function (error) {
                   console.log(error.response);
            if(error.response){
              if( error.response.data.errors.phone ){
                  self.messagePhone1 = error.response.data.errors.phone[0];
              }
              if( error.response.data.errors.email ){
                  self.messageEmail1 = error.response.data.errors.email[0];
              }
              if( error.response.data.errors.content ){
                  self.messageContent1 = error.response.data.errors.content[0]; 
              }
              if( error.response.data.errors.name ){
                  self.messageName1 = error.response.data.errors.name[0]; 
              }
              self.error_message1 = 'Gửi đăng ký thất bại.';
              self.send_consultation_loading = false;
            }else {
                 self.error_message1 = 'Gửi đăng ký thất bại.';
                 self.send_consultation_loading = false;
            }
           
            setTimeout(function () {
                  self.error_message1 = null;
              }, 3000);
            setTimeout(function () {
                  self.messagePhone1 = null;
                  self.messageEmail1 = null;
                  self.messageContent1 = null;
                  self.messageName1 = null;

              }, 10000);
          });
  
        },
        handleScroll (event) {
          if (window.scrollY > 50) {
            document.getElementById('navbar-top').classList.add('fixed-top');
            document.getElementById('stock-logo').classList.add('logo-scoll');
            document.getElementById("stock-logo").src = "/img/stocks-logo-small.png";
          } else {
            document.getElementById('navbar-top').classList.remove('fixed-top');
              document.getElementById('stock-logo').classList.remove('logo-scoll');
            document.getElementById("stock-logo").src = "/img/logo-stocks.png";
          }
        },
        onChange(event) { 
            if(event.target.value == 1)
            {
              this.productPrice = '6.800.000 VNĐ';
            } else {
              this.productPrice = '10.800.000 VNĐ';
            }
        },
        toggleNavbar() {
          this.show = !this.show
        },
        goto_register() {
            let self = this;
            this.$store.state.time_plan = 1;
            console.log( this.$store.state.time_plan);
            self.$router.push({ path: "/register" });
        },
        goto_register2() {
            let self = this;
            this.$store.state.time_plan = 2;
            console.log( this.$store.state.time_plan);
            self.$router.push({ path: "/register" });
        }
    },
     mounted: function () {
        let self = this;
        if(localStorage.getItem("user_name")){
          var fullName = localStorage.getItem("user_name");
          var arrayName = fullName.split(" ");
           self.userName = arrayName[arrayName.length-1];
        }
        if(localStorage.getItem("avatar")){
          self.url_avatar = localStorage.getItem("avatar")
        }
        axios.get(self.$apiAdress + '/api/check-token?token=' + localStorage.getItem("api_token"))
        .then(function (response) {
          self.isShowButtonLogin = false;
        }).catch(function (error) {
          self.isShowButtonLogin = true;
        });
     },
};
</script>
<style lang="scss" scoped>

@charset "utf-8";

::placeholder {
  color: #71308a;
  opacity: 1;
}
::-webkit-input-placeholder {
  color: #71308a;
}
::-moz-placeholder {
  color: #71308a;
}

:-ms-input-placeholder {
  color: #71308a;
}

::-ms-input-placeholder {
  color: #71308a;
}

html,
#body-home {
  height: 100%;
  min-height: 100%;
}

html {
  -webkit-font-smoothing: antialiased;
}
a.nav-link.gioi-thieu{
   color:black;
}
.title-produce-plan{
  margin-top: 15px;
  border-bottom: 2px dashed #b8b8b8 ;
    font-weight: 900;
    color: #71308a;
    font-size: 25px;
}
.title-produce-plan h3{
  font-weight: 900;
}
.text-btn-plan{
  display: inline-block;
  margin-top: -10px;
  font-size: 16px;
}
.text-btn-plan-dk{
display: inline-block;
}
.btn-plan-two{
  margin-top: 15px;
  margin-bottom: 15px;
}
.btn-plan-one{
  margin-bottom: 15px;
}
.plan-product-two{
  margin-top: 20px;
}

.al-mg-sc-dk{
  margin-top: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 3px;
  text-transform: none;
  font-weight: 100;
}

.al-mg-sc-lh{
  margin-top: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 4px;
  text-transform: none;
  font-weight: 100;
}
.al-mg-sc-lh-s{
  margin-top: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 10px 4px;
  text-transform: none;
  font-weight: 100;
}

#body-home {
  font-family: Cambria, Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #000;
  position: relative;
}
img {
  max-width: 100%;
  max-height: 100%;
  border: 0;
}

.position-absolute {
  position: absolute !important;
}
.position-relative {
  position: relative;
}
/* .top-overlay {
  background: url("/img/about/about-header.jpg") no-repeat bottom center;
  min-height: 970px;
  top: 0;
  width: 100%;
  z-index: -1;
} */

/* ABOUT Page */
.navbar {
  width: 100%;
}
.page .navbar-dark .navbar-nav .nav-link,
.page .nav-link {
  color: #fff;
  text-transform: uppercase;
}
.navbar-dark .navbar-nav .nav-link,
.nav-link {
  color: #fff;
}
.navbar.fixed-top {
  background-color: rgba(113, 48, 138, 0.9);
}
.page .navbar .nav-item,
.navbar .nav-item {
  padding: 0 10px;
}

.page .navbar .nav-link:hover,
.navbar .nav-link:hover {
  color: #ea8626;
}

.page .navbar .nav-link.active,
.page .navbar .show > .nav-link {
  color: #ea8626;
}
.navbar .nav-link.active,
.navbar .show > .nav-link {
  background-color: transparent;
}

.page .header .link-login {
  border: 1px solid #fff;
  color: #fff;
  border-radius: 25px;
  text-transform: uppercase;
  padding-left: 20px;
  padding-right: 20px;
  display: block;
  text-align: center;
}
.link-login-user{
  border: 1px solid #fff;
  color: #fff;
  border-radius: 21px;
  text-transform: capitalize;
  padding-right: 20px;
  display: inline-block;
  text-align: center;
}
.about-header .link-login {
  border-color: white;
  color: #fff;
}

.page .header .link-login:hover,
.page .header .link-login-user:hover,
.about-header .link-login:hover {
  background-color: rgba(113, 48, 138, 0.5);
}

.page .header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.page .header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.about-header {
  /* background: linear-gradient(#3f1d49, transparent); */
  background: url("/img/about/about-header.jpg") no-repeat bottom center;
  min-height: 200px;
}

.ad-one {
  display: block;
  height: 770px;
  padding-top: 145px;
}
.page{
   background: #fff;
}
.service {
   background: #fff;
}
.service-one {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: #fff;
}

.service-solution-support::before {
  content: " ";
  width: 100%;
  height: 648px;
  margin-top: 190px;
  position: absolute;
  z-index: 2;
  background: transparent url("/img/about/service-bg1.png") no-repeat
    center top;
}

.service-two {
   display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  	  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: url("/img/about/service-bg2.jpg") no-repeat bottom center;
  min-height: 605px;
  z-index: 1;
   padding-top: 200px;
  box-sizing: content-box;
}

.service-three {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
   -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
    -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  
  background: url("/img/about/service-bg3.jpg") no-repeat bottom center;
  min-height: 585px;
}

.service-four {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
   background: #0090ba url("/img/about/service-bg4.jpg") no-repeat bottom
    center;
  min-height: 545px;
   padding-bottom: 90px;
  box-sizing: content-box;
}

.page .footer {
  min-height: 745px;
  background: transparent url("/img/footer-bg.png") no-repeat bottom center;
}
.about-footer {
  background-image: url("/img/about/footer-bg.png");
  margin-top: -350px;
}

.text-primary {
  color: #71308a !important;
}

.text-white {
  color: #fff;
}
.text-green {
  color: green;
}

.text-italic {
  font-style: italic;
}

.bg-primary {
  background-color: #71308a;
}

.bg-white {
  background-color: #fff;
}

.page .title,
.title {
  margin-top: 80px;
  font-family: Cambria, Arial, Helvetica, sans-serif;
}

.page .subtitle,
.subtitle {
  text-align: center;
}

.title-one {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
}

.title-two {
  font-size: 26px;
  font-weight: 600;
}

.title-two::before,
.service-info .title-two::before {
  position: absolute;
  width: 85px;
  height: 10px;
  content: " ";
  margin-top: -20px;
  background-color: #71308a;
}

.service-notification .title-two::before {
  background-color: #fff;
}

.service-info {
    margin-top: 300px;
}

.service-two .service-notification {
  margin-top: 218px;
}

.service-three .service-solution {
  padding-top: 120px;
}

.service-four .service-tech {
  padding-top: 50px;
}

.service-four .service-tech .tech-row {
  min-height: 370px;
}

.service-four .service-tech .service-detail {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}

.service-four .service-tech .bt-service-detail {
  	  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-content: center;
  justify-content: center;
    -webkit-box-pack: center;
  -ms-flex-pack: center;
    background: transparent url("/img/about/btn-detail.png") no-repeat center center;
  min-width: 610px;
  height: 92px;
  line-height: 92px;
  overflow: hidden;
  font-size: 120%;
  font-weight: bold;
  text-decoration: none;
}

.page .footer .contact-info {
  padding-top: 150px;
}
.about-footer .contact-info {
  padding-top: 200px;
}

.page .footer .contact-info .advance-link,
.about-footer .contact-info .advance-link {
  display: block;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
}

.page .footer .form-subscribe,
.about-footer .form-subscribe {
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 0;
}

.page form .form-title,
.page .footer .form-subscribe .contact-title,
.about-footer .form-subscribe .contact-title {
  font-size: 120%;
}

.page .form-item,
.about-footer .form-item {
  padding: 10px 20px;
}

.page .footer .form-subscribe input:focus-visible {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.page .footer .form-subscribe textarea:focus-visible {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.page .footer .form-subscribe input {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.page .footer .form-subscribe textarea {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.about-footer .form-subscribe input:focus-visible {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.about-footer .form-subscribe textarea:focus-visible {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.about-footer .form-subscribe input {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}
.about-footer .form-subscribe textarea {
  width: 100%;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 15px;
  color: #71308a;
  font-style: italic;
  outline: none;
}

.page .footer .form-subscribe textarea,
.about-footer .form-subscribe textarea {
  min-height: 150px;
}

.page .footer .form-subscribe button,
.about-footer .form-subscribe button {
  width: 100%;
  background-color: #71308a;
  border-radius: 10px;
  border: 0;
  padding: 5px;
  box-shadow: none;
  color: white;
  font-weight: bold;
}

.page .nav-logo {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

  .logo{
    max-height: 135px;
    height: 100%;
    width: auto;
    display: inline-block;
 }

.logo-scoll{
    max-height: 50px;
    height: 100%;
    width: auto;
    display: inline-block;
 }

/* ORDER PAGE */
/* .page-order  {
  background-color: #fff;
} */

.order-header {
  background-color: transparent;
}

/* .page-order  */
/* .order-header .navbar {
  background-color: rgba(255, 255, 255, 0.9);
} */
.order-header .navbar-dark .navbar-toggler:focus {
  color: #71308a;
}
.order-header .navbar-dark .navbar-toggler {
  border-color: #71308a;
  background: #71308a;
}


.product {
  background: transparent url("/img/order/stock-pro-bg.jpg") no-repeat
    bottom center;
  min-height: 500px;
}

.stock .stock-title,
.product .product-title {
  font-size: 150%;
  font-style: italic;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  min-height: 200px;
  padding-top: 50px;
display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 50px;
}
.stock .stock-title::before,
.product .product-title::before {
  position: absolute;
 display: -webkit-box;
  display: -ms-flexbox;
  left: 45%;
  width: 10%;
  height: 10px;
  content: " ";
  margin-top: -20px;
  background-color: #fff;
}

.product-options {
  position: absolute;
  z-index: 1;
  margin-top: -100px;
}
.product .option {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
    -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
    -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  background-color: #fff;
  padding: 40px;
  padding-top: 15px;
  border-radius: 10px;
}
.product .option-title {
    -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
    -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 25px;
  color: #71308a;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  background-image: linear-gradient( 90deg, rgb(129,90,35) 0%, rgb(173,128,54) 15%, rgb(218,176,85) 29%, rgb(231,216,128) 45%, rgb(209,182,98) 59%, rgb(194,147,70) 73%, rgb(209,177,96) 86%, rgb(233,221,129) 100%);
}
.product button {
  border: 0;
  background-color: #71308a;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
}
.product select {
  font-weight: bold;
  border: 2px solid #71308a;
  border-radius: 10px;
  padding: 5px 10px;
  color: #71308a;
  font-style: italic;
  background-color: transparent;
}
.product .product-price {
  font-size: 130%;
  font-weight: bold;
}
.product .product-one {
  min-height: 200px;
}
.product .product-two {
  min-height: 200px;
  max-width: 1000px;
}
.product .product-info {
  background-color: #fff;
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 200px 40px 40px 40px;
  min-height: 400px;
  margin-bottom: 0px;
  border-radius: 10px;
}
.product .product-info .product-info-title {
  text-transform: uppercase;
}

.product .product-info .product-info-title,
.product .product-info .product-info-cell {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #71308a;
}
.product .product-info .product-info-cell.no-border {
  border-bottom: 0;
}

.product .product-slogan {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 100px;
}

.product-slogan-text {
  max-width: 700px;
  color: #fff;
  font-weight: bold;
  font-style: italic;
  text-transform: uppercase;
  text-align: center;
}

.product .free-support ::placeholder {
  color: #fff !important;
  opacity: 1;
}

.product .free-support ::-webkit-input-placeholder {
  color: #fff !important;
}
.product .free-support ::-moz-placeholder {
  color: #fff !important;
}
.product .free-support :-ms-input-placeholder {
  color: #fff !important;
}
.product .free-support ::-ms-input-placeholder {
  color: #fff !important;
}

.product .free-support-title {
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 30px;
  padding-bottom: 30px;
}

.product .free-support input:focus-visible {
  width: 100%;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  font-style: italic;
  outline: none;
  background-color: transparent;
}
.product .free-support textarea:focus-visible {
  width: 100%;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  font-style: italic;
  outline: none;
  background-color: transparent;
}
.product .free-support input {
  width: 100%;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  font-style: italic;
  outline: none;
  background-color: transparent;
}
.product .free-support textarea {
  width: 100%;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  font-style: italic;
  outline: none;
  background-color: transparent;
}

.product .free-support textarea {
  min-height: 205px;
}

.product .free-support button {
  width: 100%;
  background-color: #71308a;
  border-radius: 10px;
  border: 0;
  padding: 5px;
  box-shadow: none;
  color: white;
  font-weight: bold;
}

/* STOCK section */
.stock .stock-title {
  color: #71308a;
  min-height: auto;
  margin-bottom: 20px;
}
.stock .stock-title::before {
  background-color: #71308a;
}
.stock .stock-info {
  /* padding-top: 20px; */
  padding-bottom: 40px;
}
.stock .stock-join {
  margin-bottom: 50px;
}
.stock .stock-join-link {
  border: 1px solid #71308a;
  color: #71308a;
  padding: 5px 30px;
  border-radius: 10px;
  text-decoration: none;
   -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
   -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.bg-img-btn-login{
  display: inline-block;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background: #000;
}
.img-btn-login{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.btn-login-name{
  display: inline-block;
  text-align: center;
  margin-left: 10px;
  position: relative;
  top: 2px;
}
@media (max-width: 960px) {
  .page .navbar-dark .navbar-nav .nav-link {
    text-align: right;
  }
  /* .top-overlay {
    min-height: 450px;
  } */
  .pages .header,
  .about-header {
    min-height: auto;
  }
  .page .nav-logo {
    max-width: 150px;
  }


  .ad-one {
    height: auto;
    padding-top: 50px;
    padding-bottom: 150px;
  }
  .title {
    margin-top: 0;
  }
  .product .product-title {
    padding-top: 100px;
    padding-bottom: 150px;
  }
  .service-one {
    min-height: auto;
    padding-bottom: 50px;
  }
  .service-solution-support::before  {
    display: none;
  }
  .service-info {
    margin-top: 100px;
  }
  .service-two {
    min-height: auto;
     padding-top: 50px;
  }
  .service-two .service-notification {
    margin-top: 0;
    padding-top: 100px;
    padding-bottom: 10px;
  }
  .service-image img {
    max-height: 200px;
  }
  .service-image:first-child {
    margin-top: 10px;
  }
  .service-three {
    min-height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .service-three .service-solution {
    margin-top: 50px;
    margin-bottom: 50px;

  }

  .service-four {
    background-color: #008ab6;
  }
  .service-four .service-tech {
    margin-top: 10px;
  }
  .service-four .service-tech img {
    max-height: 150px;
  }

  .title-two,
  .service-info .title-two {
    margin-top: 40px;
  }

  .service-four .service-tech .service-detail {
    padding-top: 50px;
  }

  .service-four .service-tech .bt-service-detail {
     min-width: 0 !important;
    padding-left: 20px;
    padding-right: 20px;
    background-size: cover;
    font-size: 100%;
  }
  .page .footer {
    min-height: auto;
    padding-bottom: 10px;
  }
  .about-footer {
    margin-top: -420px;
  }
  .page .footer .container .row,
  .about-page .about-footer .container .row {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .page .footer .form-subscribe,
  .page .footer .socials,
  .about-footer .form-subscribe,
  .about-footer .socials {
    margin-bottom: 50px;
  }

  .page .footer .contact-info,
  .about-footer .contact-info {
    padding-top: 0;
  }
  .page .footer .contact-info .advance-link,
  .about-footer .contact-info .advance-link {
    font-size: 18px;
    font-weight: bold;
    display: block;
    padding: 5px 10px;
  }
  /* PRODUCT PAGE */
.product {
    background-position: top center;
    background-color: #8560b5;
  }
 .product .option {
     -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
}
.product-box{
  border: 1px solid #b8b8b8;
  border-collapse: collapse;
}
.price-product-two{
  font-weight: 900;
  font-style: italic;
}

.service-three h3 {
    color: #71308a;
  }
.product-info-title{
    margin-top: 140px;
  }
  .plan-product-one{
    margin-top: 50px;
  }
  .btn-plan-one{
    margin-top: 45px;
  }

@media screen and (max-width: 734px){
  .link-login-user{
    display: inline !important;
    float: right !important;
  }
}
@media screen and (min-width: 734px) and (max-width: 750px){
  .link-login-user{
    display: inline !important;
    float: right !important;
  }
}
@media screen and (min-width: 750px) and (max-width: 1183px){
  .btn-login-name{
    margin-left: 0px;
  }
  .link-login-user{
    padding-right: 0px;
  }
}
@media screen and (max-width: 328px) {
  .text-btn-plan{
    margin-top: 5px;
  }
  .text-btn-plan-dk{
    font-size: 18px;
  }
  .product-info-title{
    margin-top: 230px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 105px;
  }
.product .product-two {
    margin-top: 40px;
  }

.product .product-info {
    padding-top: 400px;
  }
}
@media screen and (min-width: 328px) and (max-width: 332px){
  .product-info-title{
    margin-top: 230px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 105px;
  }
  /* .page-order  */.product .product-two {
    margin-top: 40px;
  }

  /* .page-order  */.product .product-info {
    padding-top: 400px;
  }
}
@media screen and (min-width: 332px) and (max-width: 360px){
    .text-btn-plan{
    margin-top: 5px;
  }
  .product-info-title{
    margin-top: 380px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 105px;
  }
}
// @media screen and (min-width: 360px) and (max-width: 361px){
//     .text-btn-plan{
//     margin-top: 5px;
//   }
//   .product-info-title{
//     margin-top: 350px;
//   }
//   .plan-product-one{
//     margin-top: 110px;
//   }
//   .btn-plan-one{
//     margin-top: 75px;
//   }
// }
// @media screen and (min-width: 380px) and (max-width: 381px){
//    .text-btn-plan{
//     margin-top: 5px;
//   }
//   .product-info-title{
//     margin-top: 290px;
//   }
//   .plan-product-one{
//     margin-top: 80px;
//   }
//   .btn-plan-one{
//     margin-top: 75px;
//   }
// }
@media screen and (min-width: 361px) and (max-width: 440px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 15px;
  }
  .product-info-title{
    margin-top: 460px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 105px;
  }
}
@media screen and (min-width: 440px) and (max-width: 460px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 13px;
  }
  .product-info-title{
    margin-top: 390px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 460px) and (max-width: 491px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 16px;
  }
  .product-info-title{
    margin-top: 340px;
  }
  .plan-product-one{
    margin-top: 80px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 491px) and (max-width: 512px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 14px;
  }
  .product-info-title{
    margin-top: 310px;
  }
  .plan-product-one{
    margin-top: 50px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 512px) and (max-width: 520px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 16px;
  }
  .product-info-title{
    margin-top: 310px;
  }
  .plan-product-one{
    margin-top: 50px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 520px) and (max-width: 558px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 13px;
  }
  .product-info-title{
    margin-top: 260px;
  }
  .plan-product-one{
    margin-top: 50px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 558px) and (max-width: 576px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 13px;
  }
  .product-info-title{
    margin-top: 280px;
  }
  .plan-product-one{
    margin-top: 110px;
  }
  .btn-plan-one{
    margin-top: 45px;
  }
}

@media screen and (min-width: 576px) and (max-width: 768px){
  .text-btn-plan{
    margin-top: 5px;
    font-size: 13px;
  }
  .product-info-title{
    margin-top: 290px;
  }
  .plan-product-one{
    margin-top: 80px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .page .footer .contact-info,
  .about-footer .contact-info {
    padding-top: 100px;
  }
  .page .service-tech .title,
  .service-tech .title {
       margin-top: 0;
  }
}

/* .service-four .service-tech .row-service-detail{
  
} */
.service-two .service-notification .row,
.product .free-support .row,
.service-four .service-tech .row {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.service-four .service-tech {
  margin-top: 0;
}
.service-four .service-tech .service-image:first-child img {
  padding-top: 0;
}
.service-four .service-tech .service-image img {
  margin-bottom: 50px;
}

/* -xs, -sm */
/* Fix for main menu */
@media (max-width: 767px) {
  .stock-title{
     text-align: center;
  }
  .service-four .service-tech .service-image{
    text-align: center;
  }
  .navbar {
    display: block;
  }
  .navbar #nav-sm {
    display: block;
  }
  .navbar .navbar-brand {
    display: block;
    width: calc(100%-80px);
  }
  .navbar-toggler:not(:disabled):not(.disabled) {
    width: 50px;
    clear: both;
  }

   .page .header .link-login {
    display: inline;
    float: right;
  }
  
  .page .footer .contact-info {
    padding-top: 50px !important;
  }
   
}

/* *-sm */
@media (min-width: 576px) {
  .service-four .service-tech .tech-row,
  .service-four .service-tech .tech-row .row,
  .service-two .service-notification .row,
  .product .free-support .row {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .service-two .service-notification {
    margin-top: 200px;
  }
}

/* *-md */
@media (min-width: 768px) {
  #nav-sm {
    display: none;
  }

  .page .title,
  .title {
    margin-top: 0;
    }
  .service-two {
    min-height: auto;
    padding-top: 100px;
  }
  .service-two .service-notification {
    padding-bottom: 60px;
  }
  .service-three {
    padding-top: 0;
    padding-bottom: 0;
  }

  .page .footer {
    padding-bottom: 100px;
  }

  .service-four .service-tech .service-image img {
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .service-four .service-tech .tech-row,
  .service-four .service-tech .tech-row .row,
  .service-two .service-notification .row,
  .page .footer .container .row,
  .about-page .about-footer .container .row,
  .product .free-support .row {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .service-solution-support::before {
    display: block;
    background-size: contain;
  }
  .service-two .service-notification {
    margin-top: 200px;
  }
}
.btn_cons {
  position: absolute; top: 16px; left: 165px;
}
@media screen and (max-width: 430px) {
  .btn_cons {
    position: absolute; top: 16px; left: 7px
  }
}
.btn_contact {
  position: absolute; top: 16px; left: 245px;
}
@media screen and (max-width: 430px) {
  .btn_contact {
    position: absolute; top: 16px; left: 110px
  }
}
/* *-lg */
@media (min-width: 992px) {
  .service-solution-support::before {
    display: block;
    background-size: cover;
  }
  .service-two .service-notification {
    padding-top: 50px;
  }
}
/* *-xl */
@media (min-width: 1200px) {
}

@media screen and (min-width: 768px) and (max-width: 992px){
  .text-btn-plan{
    margin-top: 5px;
  }
  .product-info-title{
    margin-top: 300px;
  }
  .plan-product-one{
    margin-top: 80px;
  }
  .btn-plan-one{
    margin-top: 75px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px){
  .text-btn-plan{
    margin-top: 5px;
  }

  .product-info-title{
    margin-top: 260px;
  }
  .plan-product-one{
    margin-top: 75px;
  }
  .btn-plan-one{
    margin-top: 50px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .product-info-title{
    margin-top: 140px;
  }
  .plan-product-one{
    margin-top: 50px;
  }
  .btn-plan-one{
    margin-top: 44px;
  }
  .text-btn-plan{
  display: inline-block;
  margin-top: -10px;
  font-size: 14px;
}
}
a{
   color:black;
}

.shadow {
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  -moz-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-sm {
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  -moz-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  -moz-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.shadow-none {
  -webkit-box-shadow: none !important;
  -moz-window-shadow: none !important;
  box-shadow: none !important;
}
@media  (max-width: 1200px) {
 .product .free-support ::placeholder {
    color: rgb(11, 39, 5) !important;
    opacity: 1;
  }
  .product .free-support ::-webkit-input-placeholder {
    color: rgb(11, 39, 5) !important;
  }
  .product .free-support ::-moz-placeholder {
    color: rgb(11, 39, 5) !important;
  }
  .product .free-support :-ms-input-placeholder {
    color: rgb(11, 39, 5) !important;
  }
  .product .free-support ::-ms-input-placeholder {
    color: rgb(11, 39, 5) !important;
  }
}

</style>