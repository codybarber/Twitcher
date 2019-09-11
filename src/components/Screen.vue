<template>
	<div class="text-center">
  	
		<!-- <div class="mb-3" v-if="stream === null">
		  <input type="text" placeholder="Channel Name" aria-label="Channel Name" aria-describedby="button-addon2" v-model="s">
		  <div class="">
		    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="setStream('stream', s)">Stream!</button>
		  </div>
		</div> -->
		<div class="row " v-if="stream === null">
			<div class="col-3"></div>
			<div class="col-6">
				<div class="input-group mb-3">
				  <input type="text" class="form-control" placeholder="Channel Name" v-model="s">
				  <div class="input-group-append">
				    <button class="btn btn-primary" type="submit" @click="setStream('stream', s)">Stream!</button> 
				  </div>
				</div>
			</div>
			<div class="col-3"></div>
		</div>
		
		<div class="row screen-div" v-if="stream !== null">
			<div class="col-11 text-center ">
				<vue-twitch-player
			    :channel="stream"
			    :volume="0.0"
			    quality="high"
			    :width="width"
			    :height="height"
		  	></vue-twitch-player>
			</div>
			<div class="col-1 my-auto text-center">
				<i class="fas fa-trash float-right" @click="stopStream"></i>
			</div>
		</div>
	</div>
</template>

<script>
import VueTwitchPlayer from 'vue-twitch-player';
export default {
  name: 'Screen',
  components: {
  	VueTwitchPlayer
  },
  data() {
	  return {
	  	stream: null,
	  	s: ''
	  }
	},
  props: {
    width: {
    	type: String
    },
    height: {
    	type: String
    }
  },
  methods: {
  	setStream(stream, channel) {
  		this[stream] = channel;
  	},
  	stopStream() {
  		this.stream = null;
  		this.s = '';
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
	width: 50%;
}
i:hover {
	cursor: pointer;
	color: blue;
}
.screen-div {
	height: 100%;
	border: 1px solid #696969;
}
</style>
