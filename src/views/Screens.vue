<template>
  <div class="full-screen">
    <Two v-if="numberofscreens === '2'"></Two>
    <Four v-if="numberofscreens === '4'"></Four>
    <Six v-if="numberofscreens === '6'"></Six>
    <Eight v-if="numberofscreens === '8'"></Eight>
    <Ten v-if="numberofscreens === '10'"></Ten>
    <Twelve v-if="numberofscreens === '12'"></Twelve>
    <Fourteen v-if="numberofscreens === '14'"></Fourteen>
    <Sixteen v-if="numberofscreens === '16'"></Sixteen>
  </div>
</template>

<script>
// @ is an alias to /src
import Two from '@/components/Two.vue'
import Four from '@/components/Four.vue'
import Six from '@/components/Six.vue'
import Eight from '@/components/Eight.vue'
import Ten from '@/components/Ten.vue'
import Twelve from '@/components/Twelve.vue'
import Fourteen from '@/components/Fourteen.vue'
import Sixteen from '@/components/Sixteen.vue'
export default {
  name: 'screens',
  data() {
	  return {
	    
	  }
	},
  components: {
    Two, Four, Six, Eight, Ten, Twelve, Fourteen, Sixteen
  },
  props: {
  	numberofscreens: {
  		type: String,
  		default: null
  	}
  }
}
</script>

<style lang="scss">

</style>