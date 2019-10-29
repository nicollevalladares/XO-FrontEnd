import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
import server from '../config/server'
import router from './router';

Vue.use(Vuex)

var firebaseConfig = {
    apiKey: "AIzaSyB3lHOp217Je8D32Wlkor-cnoB3up0fPi8",
    authDomain: "xo-game-3b986.firebaseapp.com",
    databaseURL: "https://xo-game-3b986.firebaseio.com",
    projectId: "xo-game-3b986",
    storageBucket: "xo-game-3b986.appspot.com",
    messagingSenderId: "793733670868",
    appId: "1:793733670868:web:2a57060bc4ae0175125841"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig)

export default new Vuex.Store({
    state:{
        user: '',
        feedback: '',
        exists: false
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
        }
    },
    actions: {
        detectUser({commit}, payload){
            commit('setUser', payload)
        },
        signup({commit, state}, payload){
            if(payload.username && payload.name){
                state.feedback = '';

                axios.get(`${server.mainServe}/users`)
                .then(response => {
                    response.data.forEach(user => {
                        if(user.username == payload.username){
                            state.feedback = 'Usuario ya registrado, ingrese otro.';
                            state.exists = true;
                        }
                    })

                    if(!state.exists){
                        axios.post(`${server.mainServe}/users`, {
                            name: payload.name,
                            username: payload.username
                        })
                        .then(response => {
                            console.log(response.data);
                            
                            router.push({path: `/game/${response.data.id}`})
                        })
                        .catch(err => {
                            console.log(err);
                            
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    
                })
            }
            else{
                state.feedback = 'Por favor debe llenar todos los campos.';
            }
        }
    },
    getters: {
        
    }
})