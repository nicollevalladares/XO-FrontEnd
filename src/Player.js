class Player {
    constructor(sign) {
      this.sign = sign;
      this.clicks = [];
      this.score = 0;
      this.combinations = [];
      this.positions = []
    }
    setPosition() {
      this.positions = this.clicks.join(",").split(",");
    }
    sortClicks() {
      this.clicks.sort();
    }
  
  }
  export default Player;
  