class Player {
    constructor(sign) {
      this.sign = sign;
      this.clicks = [];
      this.score = '0';
      this.positions = [];
    }

    setPosition() {
      this.positions = this.clicks.join(",").split(",");
    }

    //Tidy up the positions
    sortClicks() {
      this.clicks.sort();
    }
  
  }
  export default Player;
  