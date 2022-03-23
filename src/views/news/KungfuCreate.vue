<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard no-header>
        <CCardHeader>
          <CForm>
            <CRow>
              <CCol>
                <div class="p-avatar">
                <img
                  :src="url"
                  class="p-avatar-img"
                />
              </div>
                <CInputFile
                label="Ảnh Thumbnail"
                type="file"
                v-on:change="uploadPreviewThumbnail"
              />
              </CCol>
            </CRow>
            <CAlert
                      color="danger"
                      closeButton
                      :show.sync="showMessageUploadError"
                  >
                    {{messageUploadError}}
                  </CAlert>
            <CRow class="btn-profile">
              
              <CCol col="12" lg="6">
                <CInput type="text" label="Mã Chứng Khoán" placeholder="Mã Chứng Khoán" v-model="mack"></CInput>
                   <CAlert
                      color="danger"
                      closeButton
                      :show.sync="showMessageMack"
                  >
                    {{messageMack}}
                   </CAlert>
              </CCol>
              <CCol col="12" lg="6">
                  <CSelect
                        label="Danh Mục"
                        :value.sync="category_id"
                        :options="category_news"
                        class="modifi-input"
                      />
              </CCol>        
            </CRow>
 
            <CInput type="text" label="Tiêu Đề" placeholder="Tiêu Đề" v-model="title"></CInput>
              <CAlert
                  color="danger"
                  closeButton
                  :show.sync="showMessageTitle"
              >
                {{messageTitle}}
              </CAlert>
              <CRow class="container-content-new">
                <CCol col="12" class="title-content-new">
                  <p>Nội Dung</p>
                </CCol>
                <CCol col="12" class="editor-new">
                  <quill-editor
                    class="editor-form"
                    :options="editorOption"
                    v-model.trim="content"
                    @change="onEditorChange($event)"
                />
                </CCol>
             </CRow>
               
               <CAlert
                  color="danger"
                  closeButton
                  :show.sync="showMessageContent"
              >
                {{messageContent}}
              </CAlert>
            <CRow class="btn-profile">

            <CCol  lg="4"/>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" @click="goBack">Trở Lại</CButton>
              </CCol>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" id="saveNew" @click="createNew()">Tạo</CButton>
              </CCol>
              <CCol  lg="4"/>        
            </CRow>
            <CRow>
              <CCol col="12">
                  <CAlert
                      color="success"
                      closeButton
                      :show.sync="showMessage"
                  >
                    {{message}}
                  </CAlert>
                  <CAlert
                      color="danger"
                      closeButton
                      :show.sync="showMessageError"
                  >
                    {{messageError}}
                  </CAlert>
                  </CCol>
            </CRow>
          </CForm>
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
import Quill from 'quill';
window.Quill = require('quill');
import  ImageResize  from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize)


export default {
  name: 'KungfuCreate',
  components: {

  },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        url: '',
        thumbnail: '',
        mack: '',
        title: '',
        slug: '',
        content: '',
        category_id: 1,
        category_news: [],
        showMessage: false,
        showMessageMack: false,
        showMessageSlug: false,
        showMessageTitle: false,
        showMessageContent: false,
        showMessageError:false,
        showMessageUploadError: false,
        message: '',
        messageError: '',
        messageMack: '',
        messageSlug: '',
        messageTitle: '',
        messageContent: '',
        messageUploadError: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        editorOption: {
             modules: {
               toolbar: [
                          ['bold', 'italic', 'underline'],
                          ['blockquote', 'code-block'],
                          [{ 'header': 1 }, { 'header': 2 },{ 'header': 3 }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],

                          [{ 'indent': '-1' }, { 'indent': '+1' }],
                          [{ 'direction': 'rtl' }],
                          [{ 'size': ['small', false, 'large', 'huge'] }],
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'align': [] }],
                          ['clean'],
                          ['link', 'image']
                        ],
                imageResize: {
                   displayStyles: {
                              backgroundColor: 'black',
                              border: 'none',
                              color: 'white'
                            },
                    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                }
            }
      },
    }
  },
  watch: {
  },
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
  },
  methods: {
      uploadPreviewThumbnail(files, event){
        let self = this;
        let formData = new FormData();
        formData.append('file', files[0]);
        console.log("FIle:", files[0]);
        axios.post( this.$apiAdress + '/api/preview-image?token=' + localStorage.getItem("api_token"),
            formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        ).then(response => {
            localStorage.setItem('image-preview', response.data.storedPath);
            self.url = response.data.storedPath;
            self.thumbnail = response.data.fileName;
        })
        .catch(function(error){
            self.showMessageUploadError = true;
            self.messageUploadError = 'Vui lòng kiểm tra lại file upload không quá 2048kb và thuộc các định dạng sau jpeg,png,jpg,gif.';
              setTimeout(function () {
                  self.showMessageUploadError = false;
              }, 15000);
        });
    },
      onEditorChange({ quill, html, text }) {
        this.content = html
      },
    goBack() {
      this.$router.go(-1)
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    createNew() {
        let self = this;
        axios.post(  this.$apiAdress + '/api/kungfu-news' + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'POST',
            thumbnail: self.thumbnail,
            mack: self.mack,
            title: self.title,
            content: self.content,
            category_id: self.category_id,
        })
        .then(function (response) {
            self.showMessage = true;
            self.message = 'Tạo tin tức thành công.';
            setTimeout(function () {
                  self.showMessage = false;
              }, 3000);
        }).catch(function (error) {
          self.showMessageError = true;
            if(error.response){
              if( error.response.data.errors.thumbnail ){
                  self.showMessageUploadError = true;
                  self.messageUploadError = error.response.data.errors.thumbnail[0];
                  self.messageError = 'Tạo tin tức thất bại.';
              }
              if( error.response.data.errors.mack ){
                  self.showMessageMack = true;
                  self.messageMack = error.response.data.errors.mack[0];
                  self.messageError = 'Tạo tin tức thất bại.';
              }
              if( error.response.data.errors.title ){
                self.showMessageTitle = true;
                  self.messageTitle = error.response.data.errors.title[0];
                  self.messageError = 'Tạo tin tức thất bại.';
              } 
              if( error.response.data.errors.content ){
                self.showMessageContent = true;
                  self.messageContent = error.response.data.errors.content[0];
                  self.messageError = 'Tạo tin tức thất bại.';
              } 
            }else {
                 self.messageError = 'Tạo tin tức thất bại.';
            }
           
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000);
            setTimeout(function () {
                   self.showMessageMack = false;
                  self.showMessageTitle = false;
                  self.showMessageContent = false;
                  self.showMessageUploadError = false;
              }, 10000);
            
            
        });
    },
     getCategoryNews() {
      let self = this;
      axios.get(  this.$apiAdress + '/api/category-news' + '?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.category_news = [];
        for (var key in response.data) {
          self.category_news.push({value: response.data[key].id, label: response.data[key].title});
        } 
        if (self.category_news.length > 0) {
          self.category_new = response.data[0].id
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  mounted: function(){
    this.getCategoryNews();
    let self = this;
     window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.title != '' ){
          document.getElementById("saveNew").click();
        }
      }
    });
  }
}


</script>
<style scoped>

.editor-new{
  background: white;
   color: black;
}
.container-content-new{
   margin-bottom: 20px;
}
.title-content-new{
  margin-bottom: 5px;
}
.btn-profile{
  margin-bottom: 15px;
}
.p-avatar{
  margin-bottom:20px;
}
.p-avatar-img{
  width: 120px;
  height: auto;
  border-radius: 10px;
}
.btn-edit-center{
  text-align: center;
}
</style>
