<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Maintenance',
  mounted () {

    var status = this.$route.query.status
    if(status == 'on') {
        this.$store.state.maintenance = 'true';
        localStorage.setItem('maintenance', 'true');
        setTimeout(() => {
            this.$router.push({ path: 'dashboard' });
        }, 1)
    } 
    else if(status == 'off') {
        this.$store.state.maintenance = 'false';
        localStorage.setItem('maintenance', 'false');
        setTimeout(() => {
            this.$router.push({ path: 'dashboard' });
        }, 1)
    } 

  }
}
</script>
