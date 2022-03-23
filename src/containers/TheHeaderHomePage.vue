<template>
    <nav v-bind:class="active" v-on:click.prevent>

		<!-- When a link in the menu is clicked, we call the makeActive method, defined in the JavaScript Vue instance. -->

		<a href="#" class="home" v-on:click="makeActive('home')">Home</a>
		<a href="#" class="projects" v-on:click="makeActive('projects')">Projects</a>
		<a href="#" class="services" v-on:click="makeActive('services')">Services</a>
		<a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
	</nav>
</template>
<script>
export default {
  name: "TheHeaderHomePage",
  components: {
  },
};
</script>