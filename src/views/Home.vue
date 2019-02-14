<template>
  <div class="home" style="height: 500px">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <vue-twitch-player
    channel="shroud"
    height="500px"
  	></vue-twitch-player> -->
  	<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="num in screens">
				<div class="card">
		      <div class="card-body">
		        <h5 class="card-title">{{num}} Screens</h5>
		        <p class="card-text">View up to {{num}} simultaneous Twitch streams at once</p>
		        <!-- <a href="#" class="btn btn-primary">Watch Now!</a> -->
		        <router-link :to="'/screens/' + num">Watch Now!</router-link>
		      </div>
		    </div>
			</div>
		</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import VueTwitchPlayer from 'vue-twitch-player';
export default {
  name: 'home',
  data() {
	  return {
	    screens: [2, 4, 6, 8, 10, 12, 14, 16]
	  }
	},
  components: {
    HelloWorld,
    VueTwitchPlayer
  }
}
</script>

<style lang="scss">
.card {
	margin:10px;
}
</style>