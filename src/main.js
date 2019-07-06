import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';


Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(Vuetify);

var config = {
	apiKey: "AIzaSyC1IC0bH0Wb89ptef-qaCwWW2SDDhlCLuc",
	authDomain: "vuetube-9bf73.firebaseapp.com",
	databaseURL: "https://vuetube-9bf73.firebaseio.com",
	projectId: "vuetube-9bf73",
	storageBucket: "vuetube-9bf73.appspot.com",
	messagingSenderId: "133399887101"
};
firebase.initializeApp(config);

// To disable warning
export  const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export  const database = firebase.database();

// // Get All Documents data
// db.collection('categories').get().then(snapshot => {
//   snapshot.forEach(doc => {
//     console.log( doc.data() );
//   });
// });

// // Get A Documentary
// db.collection('categories').doc('CAT').get().then(function(doc) {
// 	if (doc.exists) {
//       console.log("Document data:", doc.data());
//   } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//   }
// });



export var vm  = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
