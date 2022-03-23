<template>
  <body>
   <nav v-bind:class="active" v-on:click.prevent>

		<!-- When a link in the menu is clicked, we call the makeActive method, defined in the JavaScript Vue instance. -->

		<a href="#" class="home" @click="goto_home()">Home</a>
		<a href="#" class="ourteam" @click="goto_ourteam()">OurTeam</a>
		<a href="#" class="project" @click="goto_project()">Projects</a>
		<a href="#" class="contact" @click="goto_contact()">Contact</a>
	</nav>

 	<!-- The mustache expression will be replaced with the value of "active".
 		 It will automatically update to reflect any changes. -->
          <p>You chose <b>{{content}}</b></p>
</body>
</template>
<script>
export default {
  name: "Project",
  data() {
    return {
      active: 'project',
      content: 'Project Page',
    };
  },
  components: {
  },
  methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        goto_home() {
            let self = this;
            self.$router.push({ path: "/home" });
        },
        goto_ourteam() {
            let self = this;
            self.$router.push({ path: "/ourteam" });
        },
        goto_project() {
            let self = this;
            self.$router.push({ path: "/project" });
        },
        goto_contact() {
            let self = this;
            self.$router.push({ path: "/contact" });
        },
    },
};
</script>
<style scoped>

	*{
		margin:0;
		padding:0;
	}

	body{
		font:15px/1.3 'Open Sans', sans-serif;
		color: #5e5b64;
		text-align:center;
	}

	a, a:visited {
		outline:none;
		color:#389dc1;
	}

	a:hover{
		text-decoration:none;
	}

	section, footer, header, aside, nav{
		display: block;
	}

	/*-------------------------
		The menu
	--------------------------*/

	nav{
		display:inline-block;
		margin:60px auto 45px;
		background-color:#5597b4;
		box-shadow:0 1px 1px #ccc;
		border-radius:2px;
	}

	nav a{
		display:inline-block;
		padding: 18px 30px;
		color:#fff !important;
		font-weight:bold;
		font-size:16px;
		text-decoration:none !important;
		line-height:1;
		text-transform: uppercase;
		background-color:transparent;

		-webkit-transition:background-color 0.25s;
		-moz-transition:background-color 0.25s;
		transition:background-color 0.25s;
	}

	nav a:first-child{
		border-radius:2px 0 0 2px;
	}

	nav a:last-child{
		border-radius:0 2px 2px 0;
	}

	nav.home .home,
	nav.project .project,
	nav.ourteam .ourteam,
	nav.contact .contact{
		background-color:#e35885;
	}

	p{
		font-size:22px;
		font-weight:bold;
		color:#7d9098;
	}

	p b{
		color:#ffffff;
		display:inline-block;
		padding:5px 10px;
		background-color:#c4d7e0;
		border-radius:2px;
		text-transform:uppercase;
		font-size:18px;
	}

    </style>