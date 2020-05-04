<template>
	<div class="text-center">
  	
		<!-- <div class="mb-3" v-if="stream === null">
		  <input type="text" placeholder="Channel Name" aria-label="Channel Name" aria-describedby="button-addon2" v-model="s">
		  <div class="">
		    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="setStream('stream', s)">Stream!</button>
		  </div>
		</div> -->

		<!-- <div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Channel Name" v-model="s">
			<div class="input-group-append">
				<button class="btn btn-primary" type="submit" @click="setStream('stream', s)">Stream!</button> 
			</div>
		</div> -->
		<div class="row " v-if="stream === null">
			<div class="col-3"></div>
			<div class="col-6">
				<div class="btn-group">
					<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Select a Game
					</button>
					<div class="dropdown-menu game-dropdown">
						<span v-for="game in games" :key="game.id" @click="selectGame(game)" class="dropdown-item">
							<img :src="artUrl(game.box_art_url, 150, 100)" :alt="game.name" class="img-thumbnail"> {{ game.name }}
						</span>
						<span @click.prevent="getGames(game_cursor)">Get More Games...</span>
					</div>
				</div>
			</div>
			<div class="col-3"></div>
		</div>

		<div class="row " v-if="selected_game !== null">
			<div class="col-3"></div>
			<div class="col-6">
				<div class="btn-group">
					<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Select a Stream
					</button>
					<div class="dropdown-menu stream-dropdown">
						<span v-for="stream in streams" :key="stream.id" @click="selectStream(stream)" class="dropdown-item">
							<img :src="artUrl(stream.thumbnail_url, 125, 200)" :alt="stream.user_name" class="img-thumbnail"> <br>
							<span><b>{{ stream.user_name }}</b></span><br>
							<span>{{ stream.viewer_count}} viewers</span>
						</span>
						<span @click.prevent="getStreams(stream_cursor)">Get More Streams...</span>
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
			s: '',
			client_id: 'p8wft3p1jfgqftgexxyl0ra1054vjg',
			helix: null,
			games: null,
			game_cursor: null,
			selected_game: null,
			streams: null,
			stream_cursor: null
	  }
	},
	mounted () {
     this.helix = axios.create({
      baseURL: 'https://api.twitch.tv/helix/',
      headers: {'Client-ID': this.client_id}
		});
		this.getGames();
	},
  props: {
    width: {
    	type: String
    },
    height: {
    	type: String
    }
	},
	watch: {
		selected_game() {
			this.getStreams(this.stream_cursor);
		}
	},
  methods: {
  	setStream(stream, channel) {
  		this[stream] = channel;
  	},
  	stopStream() {
  		this.stream = null;
  		this.s = '';
		},
		artUrl(url, height, width) {
			return url.replace('{height}', height).replace('{width}', width);
		},
		getGames(game_cursor) {
			let oldGames = this.games;
			let self = this;
			if (game_cursor) {
				self.helix.get(`games/top?after=${cursor}`).then(function (response) {
					self.games = oldGames.concat(response.data.data);
					self.cursor = response.data.pagination.cursor;
				});
			} else {
				self.helix.get('games/top').then(function (response) {
					self.games = response.data.data;
					self.game_cursor = response.data.pagination.cursor;
				});
			}
		},
		selectGame(game) {
			console.log(game.name)
			this.selected_game = game.id;
		},
		getStreams(stream_cursor) {
			let oldStreams = this.streams;
			let self = this;
			if (stream_cursor) {
				self.helix.get(`streams?game_id=${this.selected_game}&after=${stream_cursor}`).then(function (response) {
					self.streams = oldStreams.concat(response.data.data);
					self.stream_cursor = response.data.pagination.cursor;
				});
			} else {
				self.helix.get(`streams?game_id=${this.selected_game}`).then(function (response) {
					self.streams = response.data.data;
					self.stream_cursor = response.data.pagination.cursor;
				});
			}
		},
		selectStream(stream) {
			console.log(stream.user_name)
			this.stream = stream.user_name;
		},
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

.game-dropdown {
	max-height: 300px !important;
	overflow-y: auto;
	min-width: 500px !important;
}
.stream-dropdown {
	max-height: 300px !important;
	overflow-y: auto;
	min-width: 500px !important;
}
</style>
