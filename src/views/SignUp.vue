<template>
    <div class="columns">
        <div class="column is-4 is-offset-4">
            <h1 class="title">Sign Up</h1>

            <form @submit.prevent="signupMethod">
                <div class="field">
                    <div class="control">
                        <input type="email" placeholder="Email" v-model="email" class="input"><br>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input type="password" placeholder="Password" v-model="password" class="input"><br>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-success">Submit</button>
                    </div>
                </div>
            </form>

            <article class="message is-danger" v-if="error">
                <div class="message-body">
                    {{ error }}
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'signup',
    data () {
        return {
        	email:'',
        	password:'',
        	isAuthenticated: false,
            error:null
        }
    },
    created () {
    	firebase.auth().onAuthStateChanged(user => {
    		if (user) {
    			this.isAuthenticated = true;
                this.$router.push('/dashboard');
    		}
    	})
    },
    methods: {
    	signupMethod () {
    		console.log("Is working");
    		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .catch(error => this.error = error.message);
    	}
    }
}
</script>