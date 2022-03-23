<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4 mg-verify" >
                <h2>{{message}}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

  <script>
    import axios from 'axios'
    export default {
      data() {
        return {
            message: "",
        }
      },    
      methods: {
        verifyEmail() {
          let self = this;
          axios.post(  this.$apiAdress + '/api/verify', {
            email: this.$route.query.email,
            key: this.$route.query.key
          }).then(function (response) {
            self.message = "Cảm ơn bạn đã xác thực tài khoản thành công. Tài khoản của bạn sẽ được kích hoạt sau khi thủ tục thanh toán được hoàn tất. Vui lòng kiểm tra email để được hướng dẫn các bước tiếp theo."
          })
          .catch(function (error) {
            self.message = "Link xác thực không hợp lệ";
          });
        }
      },
      mounted(){
        this.verifyEmail();
      }
    }
  
  </script>
  <<style scoped>
  .mg-verify{
    font-family: system-ui, Helvetica, sans-serif;
    font-style: italic;
  }
  </style>
