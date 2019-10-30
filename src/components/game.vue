<template>
    <div>
        <div class="text-center">
            <h1>Juego X-0</h1>
            <h4 id="turnText">Turno de: {{this.game.currentTurn}}</h4>

            <div class="score" v-if="game.players">
                <span>PUNTAJE</span>
                <br>
                <span id="p1_score">Jugador 1 - {{gameInfo.owner}} : {{this.game.players[0].score}}</span>
                <br>
                <span 
                    id="p2_score"
                    v-if="gameInfo.guest"
                >
                    Jugador 2 - {{gameInfo.guest}} : {{this.game.players[1].score}}
                </span>

                <a v-if="!gameInfo.guest" target="_blank" :href="link">Invitar jugador</a>
            </div>
        
        </div>

        <div class="gamebox">
            <div 
                v-for="(matrix, index) in gameSession.matrix" 
                :key="index"
            >
                <button 
                    v-for="(mat, i) in matrix" 
                    :key="i"
                    :id="mat.position" 
                    @click="onClick($event)"
                >
                    {{mat.text}}
                </button>
            </div>
        </div>
    </div>
</template>

<script src="./js/game.js"></script>

<style scoped src="./css/game.css"></style>
