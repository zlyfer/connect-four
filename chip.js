class Chip {
  constructor(team, row, col, size) {
    if (team == "yellow") {
      this.color1 = "#FFA000";
      this.color2 = "#FFC107";
    } else if (team == "blue") {
      this.color1 = "#303F9F";
      this.color2 = "#3F51B5";
    } else {
      this.color1 = 110;
      this.color2 = 110;
    }
    this.team = team;
    this.row = row;
    this.col = col;
    this.size = size;
  }

  isValid(chips) {
    let valid = true;
    for (let col = 1; col < 10; col++) {
      for (let row = 1; row < 10; row++) {
        if (chips[col][row]) {
          chip = chips[col][row];
          if (chip.row <= this.row && chip.col == this.col && chip != this && chip.team) {
            valid = false;
          }
        }
      }
    }
    return valid;
  }


  move(chips) {
    let move = true;
    let chip;
    if (this.row >= 9) {
      move = false;
    }
    for (let row = 1; row < 10; row++) {
      chip = chips[this.col][row];
      if (this != chip && this.row + 1 == chip.row && chip.team) {
        move = false;
        return false;
      }
    }
    if (move) {
      chips[this.col][this.row] = new Chip(false, this.row, this.col, chipsize);
      this.row++;
      chips[this.col][this.row] = this;
      return true;
    }
  }

  show() {
    stroke(this.color1);
    fill(this.color2);
    strokeWeight(this.size / 6);
    ellipse((this.col * this.size), (this.row * this.size), this.size / 1.18, this.size / 1.18);
  }
}