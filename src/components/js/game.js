import Player from "../../Player";
import Game from "../../Game";
import { mapActions, mapState } from 'vuex';
// import store from '@/store';

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
            link: `/signup/${this.$route.params.id}`
        }
    },
    methods: {
        ...mapActions(['getGame', 'getGameSession']),
        onClick($event) {
        let btn = $event.target;
        
        //check if filled already
        if (this.btnText[btn.id].length > 0) {
            alert("Already filled");
            return;
        }

        //fill X/O

        //AQUI DEBO MODIFICAR LA MATRIZ EN LA BD 

        this.btnText[btn.id] = this.game.currentTurn;
        this.game.changeTurn();

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
            this.btnText[btn.id] = "";
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
        this.getGameSession({id: this.$route.params.id})
        // setInterval(function(){ 
        //     window.location.reload();
        // }, 3000)
    },
    computed: {
        ...mapState(['gameInfo', 'gameSession'])
    }
};