import store from '@/store'

class Game {
    constructor() {
      this.players = []

      //Combinations to win
      this.winningCondition = [
        ["00", "01", "02"], 
        ["00", "11", "22"],
        ["00", "10", "20"],
        ["20", "11", "02"],
        ["10", "11", "12"],
        ["02", "12", "22"],
        ["01", "11", "21"],
        ["20", "21", "22"]
      ];

      this.currentTurn = "X";
      this.isGameEnded = false;

      //Join the combinations and separate them with commas
      this._winningConditions = this.winningCondition.map(x => x.join(","));

    }

    changeTurn(id) {
      this.currentTurn = this.currentTurn == this.players[0].sign ? this.players[1].sign : this.players[0].sign;

      store.dispatch('updateTurn',{id, turn: this.currentTurn});
    }

    reset() {
      this.currentTurn = this.players[0].sign;
      this.players.forEach(x => {
        x.clicks = [];
      })
    }
  
    checkWinner(btn) {
      if (btn.innerText == this.players[0].sign) {
        this.players[0].clicks.push(btn.id);
      } else {
        this.players[1].clicks.push(btn.id);
      }
      
      this.players.forEach(x => {
        x.sortClicks()
        x.setPosition();
      })
  
  
      if (this.players[0].positions.length > 2 || this.players[1].positions.length > 2) {
  
        let player1_combinations = this.getCombination(this.players[0].positions, 3, 0);
        console.log(player1_combinations)
        let player2_combinations = this.getCombination(this.players[1].positions, 3, 0);
  
        //find p1,p2 common with winning conditions
        let player1_common = this._winningConditions.filter(value =>
          player1_combinations.includes(value)
        );
        let player2_common = this._winningConditions.filter(value =>
          player2_combinations.includes(value)
        );
  
        return this.isGameOver(player1_common, player2_common);
      } else {
        return false;
      }
    }

    isGameOver(player1_common, player2_common) {
  
      if (player1_common.length < 1 && player2_common.length < 1)
        return false;
  
      let gameOver = false;
      if (player1_common > player2_common) {
        gameOver = true
        this.players[0].score += 1;
        alert("Player One Won");
      } else if (player2_common > player1_common) {
        gameOver = true
        this.players[1].score += 1;
        alert("Player Two Won");
      } else if (this.players[0].clicks.length > 4 || this.players[1].clicks.length > 4) {
        gameOver = true
        this.drawScore += 1;
        alert("Draw");
      } else {
        gameOver = false
      }
      return gameOver;
    }
  
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
    }
  }

  export default Game;
  