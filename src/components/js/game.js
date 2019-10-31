import Player from "../../Player";
import Game from "../../Game";
import { mapActions, mapState } from 'vuex';
import store from '@/store';

const game = new Game();
game.players.push(new Player("X"));
game.players.push(new Player("O"));

export default {
    name: "Game",
    data() {
        return {
            id: this.$route.params.id,
            game: game,
            buttons: [],
            btnText: [],
            link: `/signup/${this.$route.params.id}`,
            id:  this.$route.params.id
        }
    },
    methods: {
        ...mapActions(['getGame', 'getGameSession']),
        onClick($event) {
        let btn = $event.target;
        let text = this.game.currentTurn;

        //fill X/O

        const newMatrix = []
        for (let i = 0; i < 3; i++) {
            var column = document.getElementById(i).childNodes;
            const matrix = []
            column.forEach(data => {
                if(data.id == btn.id){
                    var info = {
                        position: data.id,
                        text
                    }
                    matrix.push(info)
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
        })

        this.game.changeTurn(this.gameSession.id);

        //check if game won
        setTimeout(() => {
            if (this.game.checkWinner(btn) == true) {
                this.resetGame();
            }
        }, 100);
        },
        resetGame() {
        //UI reset
        this.game.reset();
        [...this.buttons].forEach(btn => {
            // this.btnText[btn.id] = "";
        });
        }
    },
    mounted() {
        this.$nextTick(() => {
        this.buttons = this.$el.querySelectorAll(".gamebox button");
        this.resetGame();
        });
        
    },
    created(){
        this.getGame({id: this.$route.params.id}),
        this.getGameSession({id: this.$route.params.id}),
        this.sockets.subscribe('sessionUpdate', (data) => {
            store.dispatch('socketMatrix',{matrix: data.matrix })
        });
    },
    computed: {
        ...mapState(['gameInfo', 'gameSession', 'matrix', 'turn'])
    }
};