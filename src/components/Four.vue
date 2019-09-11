<template>
  <div class="flex-container">
    <div class="row align-items-center">
			<div class="flex-item">
		  	<Screen :width="screenwidth" :height="screenheight"></Screen>
			</div>
			<div class="flex-item">
		  	<Screen :width="screenwidth" :height="screenheight"></Screen>
			</div>
			<div class="flex-item">
		  	<Screen :width="screenwidth" :height="screenheight"></Screen>
			</div>
			<div class="flex-item">
		  	<Screen :width="screenwidth" :height="screenheight"></Screen>
			</div>
    </div>
  </div>
</template>

<script>
import VueTwitchPlayer from 'vue-twitch-player';	
import Screen from '@/components/Screen.vue'
export default {
  name: 'Four',
  components: {
  	VueTwitchPlayer, Screen
  },
  data() {
	  return {
	  	window: {
	      width: 0,
	      height: 0
	    },
	    screenwidth: '400',
	    screenheight: '300'
	  }
	},
  props: {
    msg: String
  },
  watch: {
  	window() {
  		this.screenwidth = (this.window.width / 2 - 50).toString();
  	}
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
  	setStream(stream, channel) {
  		this[stream] = channel;
  	},
  	handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.screenwidth = (window.innerWidth / 2 - 35).toString();
      this.screenheight = (window.innerHeight / 2 - 35).toString();
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flex-item {
  min-width: 50%;
  min-height: 50%;
}
</style>
