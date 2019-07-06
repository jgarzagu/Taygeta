<template>
  <div> 
    <v-container grid-list-md text-xs-center>
      <h2 class="text-sm-left">Latest Transcripts</h2>
      <v-layout row wrap>
        <v-flex v-for="tanscript in latestTranscripts" :key="`${tanscript.title}`" @click="transcript_click(tanscript.title)">
          <!-- Transcript Preview -->
          <v-card  max-width="300" text-xs-center hover >
            <v-img
              class="white--text"
              height="100px"
              src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
            >
              <v-layout align-end fill-height pa-3 white--text>
                <div class="title font-weight-light">{{ tanscript.title }}</div>
              </v-layout>
            </v-img>
            <v-card-title>
              <div>Message date: </div>
              <v-spacer></v-spacer>
              <div>May, 23, 2014</div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="indigo"><strong>Read More</strong> </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-flex>
      </v-layout>
      <h2 class="text-sm-left">All Transcripts</h2>
      <v-layout row wrap>
        <v-flex v-for="i in 5" :key="`3${i}`">
          <v-card dark color="secondary">
            <v-card-text class="px-0">3</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      latestTranscripts: [
        { title: 'trending up', text: 'Most Popular' },
        { title: 'subscriptions', text: 'Subscriptions' },
        { title: 'history', text: 'History' },
        { title: 'featured_play_list', text: 'Playlists' },
        { title: 'watch_later', text: 'Watch Later' }
      ]
    } 
  },
  methods: {
    transcript_click(title) {
      console.log("Click"+title);
      this.$router.push({ name: 'transcript', query: { title: title } })
    }
  }
}
</script>
