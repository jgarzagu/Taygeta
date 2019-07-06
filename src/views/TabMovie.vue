<template>
  <div class="columns is-multiline">
    <div class="card column is-4" v-for="movie in movies">
      <div class="card-image">
          <iframe :src="embedable(movie.url)" sandbox="allow-same-origin allow-scripts allow-presentation" width="100%" height="200" frameborder="0"></iframe>
      </div>
      <div class="card-content">
        {{ movie.title }}
      </div>
      <p> {{ $props.category }} </p>
    </div>
  </div>
</template>

<script>
import { db } from '../main';

export default {
    name: 'TabMovie',
    props: {
      category: String,
      categories: Array
    },
    data () {
      return {
        movies: []
      }
    },
    mounted () {
      if (this.$props.category === 'Newest') {
        for (var i=0; i < this.$props.categories.length; i++) {
          console.log("CAT",this.$props.categories[i].title);
          db.collection("categories").doc(this.$props.categories[i].title).collection('movies').get().then(snapshot => {
            snapshot.forEach(doc  => {

              if (this.movies.length < 7) {
                this.movies.push( {
                  "title": doc.data().title, 
                  "url": doc.data().url
                });
              }
              
            });
          });
        }
      }
    },
    created () {
      if (this.$props.category != 'Newest') {
        db.collection("categories")
          .onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("Added Movies", change.doc.data());

                    if (this.$props.category === change.doc.data().title) {
                      db.collection("categories").doc(this.$props.category).collection('movies').get().then(snapshot => {
                        snapshot.forEach(doc => {
                          this.movies.push( {
                            "title": doc.data().title, 
                            "url": doc.data().url
                          });

                          // TODO Value movies not updating 
                          console.log(this.movies);
                        });
                      });
                    } 
                    
                }
                if (change.type === "modified") {
                    console.log("Modified", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed", change.doc.data());
                }
              });
          }, function(error) {
              //...
        });
      }
    },
    methods: {
      embedable(url) {
        return 'https://youtube.com/embed/' + url.split("=")[1]
      }
    }
}
</script>