class Day {
  constructor() {
    this.dayNumber = 1;
    this.isWeekend = false;
  }

  nextDay() {
    this.dayNumber++;
    if (this.dayNumber % 7 <= 1) {
      this.isWeekend = true;
    } else {
      this.isWeekend = false;
    }
  }
}

class Game {
  constructor() {
    this.name = 'game' + Math.floor(Math.random() * 10000)
    this.price = Math.floor(Math.random() * 55) + 5;
    this.contentLength = Math.floor(Math.random() * 25) + 5;
  }

  play(playTime) {
    this.contentLength = this.contentLength <= playTime ? 0 : this.contentLength - playTime; 
  }
}

class User {
  constructor() {
    this.cash = 100;
    this.monthlyIncome = 50;
    this.games = [];
    this.availableGamesCount = 0;
  }

  dailyThings() {
    if (day.dayNumber % 7 === 0) {
      this.gotMonthlyIncome();
    }
    if (this.availableGamesCount > 2) {
      if (Math.random() >= 1 - 0.4/this.games.length) {
        this.checkSteam();
      } else {
        this.playGame();
      }
    } else if (this.availableGamesCount > 0) {
      if (Math.random() >= 0.7) {
        this.checkSteam();
      } else {
        this.playGame();
      }
    } else {
      if (Math.random() >= 0.3) {
        this.checkSteam();
      }
    }
    console.log(`games left: ${this.availableGamesCount}`);
  }

  gotMonthlyIncome() {
    this.cash += this.monthlyIncome;
    console.log(`user got ${this.monthlyIncome}$ monthlyIncome`);
  }

  checkSteam() {
    console.log(`user opened Steam`);
    this.evaluateGame(new Game());
    this.evaluateGame(new Game());
  }

  evaluateGame(game) {
    console.log(`user checked ${game.name}`);
    if (game.price < this.cash) {
      console.log(`user found ${game.name} is affordable`);
      this.buyGame(game);
    } else {
      console.log(`user found ${game.name} is not affordable`);
    }
  }

  buyGame(game) {
    console.log(`user bought ${game.name} for ${game.price}$`);
    this.cash -= game.price;
    this.games.push(game);
    this.availableGamesCount++;
  }

  playGame() {
    let game, playTime;
    for (let g of this.games) {
      if (g.contentLength > 0) {
        game = g;
        break;
      }
    }
    if (day.isWeekend) {
      playTime = Math.floor(Math.random() * 4) + 4;
    } else {
      playTime = Math.floor(Math.random() * 4) + 1;
    }
    console.log(`user played ${game.name} for ${playTime} hour(s)`);
    game.play(playTime);
    if (game.contentLength === 0) {
      console.log(`user beated ${game.name}`);
      this.availableGamesCount--;
    }
  }

}

let day = new Day();
let user = new User();

const timeGoes = () => {
  setTimeout(() => {
    timeGoes();
  }, 5000);
  console.log(day.isWeekend ? `day ${day.dayNumber}, weekend` : `day ${day.dayNumber}`);
  user.dailyThings();
  day.nextDay();
};

timeGoes();