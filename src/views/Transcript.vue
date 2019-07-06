<template>
  <div> 
    <v-container text-xs-center>
      <div>{{ transcriptTitle }}</div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'transcript',
  components: {
  },
  data () {
    return {
      transcriptTitle : "",
    } 
  },
  created() {
    console.log(this.$route);
    this.transcriptTitle = this.$route.query.title;
    console.log(this.transcriptTitle);
  },

}
</script>
