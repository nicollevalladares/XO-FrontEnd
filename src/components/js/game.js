import { mapActions, mapState } from 'vuex';
import store from '@/store';

export default {
    name: "Game",
    data() {
        return {
            id: this.$route.params.id,
            buttons: [],
            btnText: [],
            link: `/signup/${this.$route.params.id}`,
            text: null,
            winningCondition: [
                ["00", "01", "02"],
                ["00", "11", "22"],
                ["00", "10", "20"],
                ["02", "11", "20"],
                ["10", "11", "12"],
                ["02", "12", "22"],
                ["01", "11", "21"],
                ["20", "21", "22"]
            ],
            isGameEnded: false,
            _winningConditions: '',
            owner: [],
            guest: []
        }
    },
    methods: {
        ...mapActions(['getGame', 'getGameSession']),
        onClick($event) {
        let btn = $event.target;

        if (this.currentPlayer == '1') {
            this.text = 'X';
        } 
        else if(this.currentPlayer == '2'){
            this.text = 'O';
        }

        //fill X/O
        const newMatrix = []
        for (let i = 0; i < 3; i++) {
            var column = document.getElementById(i).childNodes;
            const matrix = []
            column.forEach(data => {
                if(data.id == btn.id){
                    if (data.innerText.length > 0) {
                        alert("Already filled");
                        var info = {
                            position: data.id,
                            text: data.innerText
                        }
                        matrix.push(info)
                    }
                    else{
                        var info = {
                            position: data.id,
                            text: this.text
                        }
                        matrix.push(info)

                        store.dispatch('updatePosition', {
                            position: data.id,
                            text: this.text,
                            id: this.gameSession.id
                        })
                    }
                }
                else{ 
                    var info = {
                        position: data.id,
                        text: data.innerText
                    }
                    matrix.push(info)    
                }
            })
            newMatrix.push(matrix)
        }
        
        store.dispatch('updateMatrix', {
            data: newMatrix,
            id: this.gameSession.id
        });

        //check if game won
        setTimeout(() => {
            console.log(this.checkWinner());
            if (this.checkWinner() == true) {
                
                this.resetGame();
            }
        }, 100);
        },
        checkWinner() {
            this._winningConditions = this.winningCondition.map(x => x.join(","));

            if (this.owner.length > 2 || this.guest.length > 2) {
              let owner_combinations = this.getCombination(this.owner.sort(), 3, 0);
              
              let guest_combinations = this.getCombination(this.guest.sort(), 3, 0);
        
              //find p1,p2 common with winning conditions
              let owner_common = this._winningConditions.filter(value =>
                owner_combinations.includes(value)
              );
              let guest_common = this._winningConditions.filter(value =>
                guest_combinations.includes(value)
              );
        
              return this.isGameOver(owner_common, guest_common);
            } else {
              return false;
            }
        },
        isGameOver(owner_common, guest_common) {
  
            if (owner_common.length < 1 && guest_common.length < 1)
              return false;
        
            let gameOver = false;
            if (owner_common > guest_common) {
                gameOver = true
                store.dispatch('saveWinner', {
                    winner: this.gameInfo.owner,
                    id: this.gameSession.id
                })
            } else if (guest_common > owner_common) {
              gameOver = true
              store.dispatch('saveWinner', {
                winner: this.gameInfo.guest,
                id: this.gameSession.id
            })
            } 
            // else if (this.players[0].clicks.length > 4 || this.players[1].clicks.length > 4) {
            //   gameOver = true
            //   this.drawScore += 1;
            //   alert("Draw");
            // } 
            else {
              gameOver = false
            }
            return gameOver;
        },
        getCombination(input, len, start) {
            const result = new Array(3);
            let combinations = new Array();
            combine(input, len, start);
        
            function combine(input, len, start) {
              if (len === 0) {
                combinations.push(result.join(","));
                return;
              }
              for (var i = start; i <= input.length - len; i++) {
                result[result.length - len] = input[i];
                combine(input, len - 1, i + 1);
              }
            }
            return combinations;
        },
        // resetGame() {
        // //UI reset
        // this.game.reset();
        // [...this.buttons].forEach(btn => {
        //     // this.btnText[btn.id] = "";
        // });
        // }
    },
    mounted() {
        this.$nextTick(() => {
            this.buttons = this.$el.querySelectorAll(".gamebox button");
            this.resetGame();
        });
        
    },
    created(){
        this.getGame({id: this.$route.params.id})

        this.getGameSession({id: this.$route.params.id})

        this.sockets.subscribe('sessionUpdate', (data) => {
            store.dispatch('socketMatrix',{matrix: data.matrix});

            this.owner = data.owner;
            this.guest = data.guest;
        });


        this.sockets.subscribe('gameUpdate', (data) => {
            store.dispatch('getGame',{id: data.idGame})
        });

        this.sockets.subscribe('sessionAdded', (data) => {
            store.dispatch('getGameSession',{id: this.$route.params.id})
        });
    },
    computed: {
        ...mapState(['gameInfo', 'gameSession', 'matrix', 'turn', 'currentPlayer'])
    }
};