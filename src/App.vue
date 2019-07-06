<template>
  <!-- 
    TODOS:
      - Download Nunito Fontfamily (vue ui)
      - Add icons next to copyrygt and remove green footer. 

   -->
  <div id="app">
  <v-app>

    <!-- <v-navigation-drawer fixed clipped v-model="drawer" app>
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
    </v-navigation-drawer> -->

    <!-- Toolbar -->
    <v-toolbar dark fixed clipped-left app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      
      <v-btn @click="toolbar_titleclick()" flat>
        <v-toolbar-title>
          Taygeta<span id="tootlbar_nextTitle">Transcripts</span>
        </v-toolbar-title>
      </v-btn>
      
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="signIn" flat>
          <span>Login</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Content -->
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    

    <!-- Modals -->
    <v-dialog v-model="dialogSignIn" persistent width="600">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn icon large target="_blank" @click="dialogSignIn = false" slot="activator">
              <v-icon large>clear</v-icon>
            </v-btn>
            <span>Close</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <span id="dialog_infoText"><strong>Login is currently only available to human admins and United Federation of Planets extraterrestrials.</strong></span>
            <v-text-field prepend-icon="person" name="login" label="Login" type="text" autocomplete="username"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" autocomplete="current-password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Footer -->
    <v-footer dark height="auto" app>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">Get connected with us on social networks!</strong>

          <v-spacer></v-spacer>

          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-3"
            dark
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-actions class="grey darken-3 justify-center">
          <strong>Taygeta Transcripts Team &copy; {{ new Date().getFullYear() }}</strong>
        </v-card-actions>

      </v-card>
    </v-footer>

  </v-app>
</div>

</template>

<script>

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
        icons: [
          'fab fa-facebook',
          'fab fa-twitter',
          'fab fa-google-plus',
          'fab fa-linkedin',
          'fab fa-instagram'
        ],
        dialogSignIn:false
      }
    },
    created () {
     
    },
    methods : {
      signIn () {
        console.log("signIn");
        this.dialogSignIn = true;
      },
      toolbar_titleclick() {
        this.$router.push({ name: 'home'})
      }
    }
  }
</script>

<style>

#app {
  font-family: Nunito;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4a4a4a;
}

.v-toolbar {
  background-image: url("./assets/banner-1.jpg") !important;
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-position: center;
}

#dialog_infoText {
  color: red;
}

#tootlbar_nextTitle {
  color:#4a4a4a;
}
</style>
