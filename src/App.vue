<template>
  <div id="app">
  <v-app id="inspire">

    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <span>.</span> <!-- Added because height was modified -->
      <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
      <v-list dense>
        <v-list-tile v-for="navitem in navitems" :key="navitem.text" @click="">
          <v-list-tile-action>
            <v-icon>{{ navitem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ navitem.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark extended fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Taygeta Embassy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="signIn" icon large fab color="rgba(0,0,0,0.3)">
          <span>SIGN IN</span>
        </v-btn>
      </v-toolbar-items>

      <!-- https://codepen.io/pen/?editors=1010 -->
      <v-tabs slot="extension" v-model="currentItem" color="transparent"
          fixed-tabs slider-color="yellow">
          <v-tab onloadedmetadata=""v-for="item in items" :href="'#tab-' + item"
            :key="item">
            {{ item }}
          </v-tab>
      </v-tabs>

    </v-toolbar>

    <!-- Modals -->
    <v-dialog v-model="dialogSignIn" width="600">
      <v-card>
        <v-card-title class="headline white" primary-title>
          <v-subheader class="blue--text text--darken-1">ACCOUNT LOGIN</v-subheader>
        </v-card-title>
      </v-card>
      <v-card-text class="white">
        <v-form v-model="valid">
          <v-text-field v-model="name" :rules="nameRules" :counter="10"
          label="USERNAME" required>
          </v-text-field>
          <v-text-field v-model="email" :rules="emailRules"
          label="PASSWORD" required>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="white">
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="dialog = false">
          SIGN IN
        </v-btn>
      </v-card-actions>
    </v-dialog>

    <router-view/>

  </v-app>
</div>
  <!-- <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/login">
          VueTube
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" v-if="!isAuthenticated">
              <p class="control">
                <router-link to="/signup" class="button is-primary">Sign Up</router-link>
              </p>
              <p class="control">
                <router-link to="/login" class="button is-info">LogIn</router-link>
              </p>
            </div>
            <div class="field" v-else>
              <div class="field is-grouped">
                <p class="control">
                  <button @click="showCategoryForm = !showCategoryForm" class="button is-primary">Add Category</button>
                </p>
                <p class="control">
                   <button @click="showMovieForm = !showMovieForm" class="button is-primary">Add Movie</button>
                </p>
                <p class="control">
                  <button @click="logoutMethod" class="button is-danger">Log Out</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="modal" :class="{ 'is-active': showCategoryForm}" >
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addCategory">
          <div class="field">
            <input type="text" class="input" v-model="title" placeholder="Title">
          </div>
          <div class="field">
            <button class="button is-success">Add</button>
          </div>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showCategoryForm = !showCategoryForm"></button>
    </div>

    <div class="modal" :class="{ 'is-active': showMovieForm}" >
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addMovie">
          <div class="field">
            <input type="text" class="input" v-model="title" placeholder="Title">
          </div>

          <div class="field">
            <input type="text" class="input" v-model="url" placeholder="URL">
          </div>

          <div class="field">
            <select v-model="category">
              <option value="empty" selected>Choose Category</option>
              <option v-for="category in categories" :value="category.title"> {{ category.title }}</option>
            </select>
          </div>

          <div class="field">
            <button class="button is-success">Add</button>
          </div>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showMovieForm = !showMovieForm"></button>
    </div> -->

    <!-- <router-view/>
  </div> -->
</template>

<script>
  import { db } from './main';
  import * as firebase from 'firebase/app';
  import 'firebase/auth';


  export default {
    data () {
      return {
        isAuthenticated: false,
        showCategoryForm: false,
        showMovieForm: false,
        title: "",
        url:'',
        category: 'empty',
        categories: [],
        items: [
          'Home', 'Shopping', 'Videos', 'Images'
        ],
        drawer: false,
        navitems: [
          { icon: 'trending_up', text: 'Most Popular' },
          { icon: 'subscriptions', text: 'Subscriptions' },
          { icon: 'history', text: 'History' },
          { icon: 'featured_play_list', text: 'Playlists' },
          { icon: 'watch_later', text: 'Watch Later' }
        ],
        dialogSignIn:false
      }
    },
    created () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
        }
      })

      db.collection("categories")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                  console.log("Added2", change.doc.data());
                  this.categories.push(change.doc.data());
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
    },
    methods : {
      addCategory () {
        const category = {
          title: this.title
        }

        db.collection('categories').add(category);

        this.showCategoryForm = false;
        this.title = '';
      },
      addMovie () {

        if (this.title && this.category !=='empty') {
            const movie = {
              title: this.title,
              url: this.url
            }

            //console.log(this.category, movie);
            db.collection('categories').doc(this.category).collection('movies').add(movie)
        }

        this.showMovieForm = false;
        this.title = '';
        this.url = '';
        this.category = 'empty';
      },
      logoutMethod () {
        firebase.auth().signOut()
          .then(() => {
            this.isAuthenticated = false
            this.$router.push('/login')
          })
      },
      signIn () {
        console.log("signIn");
        this.dialogSignIn = true;
      }
    }
  }
</script>

<style>

@import "../node_modules/bulma/css/bulma.min.css";
/* @import '~vuetify/src/stylus/main'; */
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-toolbar {
  background-image: url("./assets/banner-1.jpg") !important;
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-position: center;
}

.v-toolbar__content {
  height: 100px !important;
}
.v-toolbar__extension {
  background:rgba(0,0,0,0.3) !important;
  /* background:rgba(1,1,1,0.5) !important; */
}
</style>
