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
firebase.initializeApp(firebaseConfig);

export default new Vuex.Store({
    state:{
        user: '',
        feedback: '',
        exists: false,
        gameInfo: '',
        gameSession: '',
        matrix: '',
        turn: ''
    },
    mutations: {
        setGame(state, game){
            state.gameInfo = game;
        },
        setGameSession(state, gameSession){
            state.gameSession = gameSession;
        },
        socketUpdateMatrix(state, matrix){
            state.matrix = matrix
        },
        updateTurn(state, turn){
            state.turn = turn
        }
    },
    actions: {
        signup({state}, payload){
            if(payload.username && payload.name && payload.idGame){
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
                            axios.get(`${server.mainServe}/users/${response.data.id}`)
                            .then(response => {
                                axios.put(`${server.mainServe}/games/edit/${payload.idGame}`, {
                                    guest: response.data.user.username
                                })
                                .then(response => {
                                    axios.post(`${server.mainServe}/gameSessions`, {
                                        idGame: payload.idGame,
                                        number: '1',
                                        matrix: [
                                            //00 01 02
                                            [{
                                                position: '00',
                                                text: ' '
                                            }, 
                                            {
                                                position: '01',
                                                text: ' '
                                            },
                                            {
                                                position: '02',
                                                text: ' '
                                            }], 
                                            //10 11 12
                                            [{
                                                position: '10',
                                                text: ' '
                                            }, 
                                            {
                                                position: '11',
                                                text: ' '
                                            },
                                            {
                                                position: '12',
                                                text: ' '
                                            }], 
                                            //20 21 22
                                            [{
                                                position: '20',
                                                text: ' '
                                            }, 
                                            {
                                                position: '21',
                                                text: ' '
                                            },
                                            {
                                                position: '22',
                                                text: ' '
                                            }]
                                        ],
                                        turn: 'X'
                                    })
                                    .then(response => {
                                        router.push({path: `/game/${payload.idGame}`})
                                    })
                                })
                            })
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
            else if(payload.username && payload.name){
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
                            axios.post(`${server.mainServe}/games`, {
                                owner: payload.username
                            })
                            .then(res => {
                                router.push({path: `/game/${res.data.id}`})
                            })
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
        },
        getGame({commit}, payload){
            axios.get(`${server.mainServe}/games/${payload.id}`)
            .then(response => {
                var game = response.data.game;
                commit('setGame', game);
            })
        },
        getGameSession({commit, state}, payload){
            axios.get(`${server.mainServe}/gameSessions`)
            .then(response => {
                response.data.forEach(session => {
                    if(session.idGame == payload.id){
                        var gameSession = session;
                        state.matrix = session.matrix;
                        state.turn = session.turn;
                        
                        commit('setGameSession', gameSession);
                    }
                })
                
            })
        },
        updateMatrix({state}, payload){
            axios.put(`${server.mainServe}/gameSessions/edit/${payload.id}`, { 
                data: payload.data 
            })
            .then(response => {
                // console.log(response);
            })
        },
        socketMatrix({commit}, payload){
            const matrix = payload.matrix
            commit('socketUpdateMatrix', matrix)
        },
        updateTurn({commit}, payload){
            axios.put(`${server.mainServe}/gameSessions/turn/${payload.id}`,{
                turn: payload.turn
            })
            .then(response => {
                const turn = payload.turn
                commit('updateTurn', turn)
            })
            
        },
    },
    getters: {
        
    }
});