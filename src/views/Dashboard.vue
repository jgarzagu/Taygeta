<template>
    <div>
        <h1 class="title">Dashboard</h1>
        <div class="tabs">
            <ul>
                <li :class="{'is-active': activeCategory === 'Newest'}">
                  <a @click="setCategory('Newest')">Newest</a>
                </li>
                <li v-for="category in categories" :class="{'is-active': activeCategory === category.title}">
                  <a @click="setCategory(category.title)">{{category.title}}</a>
                </li>
            </ul>
        </div>

        <tab-movie category="Newest" v-if="activeCategory == 'Newest'" :key="categories.id" :categories="categories"></tab-movie>

        <tab-movie v-for="category in categories" :category="category.title" v-if="activeCategory == category.title"></tab-movie>
    </div>
</template>

<script>
import { db, vm } from '../main';
import TabMovie from './TabMovie.vue'

export default {
    name: 'dashboard',
    components: { TabMovie },
    data () {
      return {
          categories: [],
          activeCategory: ''
      }
    },
    created () {
      db.collection("categories")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                  console.log("Added", change.doc.data());
                  this.categories.push(change.doc.data());
              }
              if (change.type === "modified") {
                  console.log("Modified", change.doc.data());
              }
              if (change.type === "removed") {
                  console.log("Removed", change.doc.data());
              }
            });
            this.activeCategory = 'Newest'; // Set Newst Contnet after connection to DB.
        }, function(error) {
            //...
        });
    },
    methods: {
      setCategory (title) {
        this.activeCategory = title;
      }
    }
}
</script>