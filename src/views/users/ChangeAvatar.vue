<template>
  <CRow>
    <CCol >
        <CCard no-header>
          <CCardHeader>
            Thay đổi ảnh đại diện
          
            <CForm>
              <CAlert
                >
                {{ message }}
              </CAlert>
              <CInputFile
                label="File input"
                type="file"
                v-on:change="uploadAvatar"
              />
            </CForm>
            </CCardHeader>
        </CCard>
      </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChangeAvatar',
  props: {
  },
  data: () => {
    return {
      message: ''
    }
  },
  methods: {
    uploadAvatar(files, event){
        let self = this;
        let formData = new FormData();
        formData.append('file', files[0]);
        console.log("FIle:", files[0]);
        axios.post( this.$apiAdress + '/api/users/' + localStorage.getItem("user_id") + '/chavatar?token=' + localStorage.getItem("api_token"),
            formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        ).then(response => {
            localStorage.setItem('avatar', response.data.storedPath);
            console.log('avatar', response.data.storedPath);
            this.$root.$emit('TheHeaderDropdownAccnt');
        })
        .catch(function(error){
            console.log(error);
        });
    },
  },
  mounted: function(){
  }
}

</script>
