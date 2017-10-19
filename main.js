const dummyData = [
  { name: 'game1', price: 60, contentLength: 10 },
  { name: 'game2', price: 30, contentLength: 20 },
  { name: 'game3', price: 40, contentLength: 50 },
  { name: 'game4', price: 10, contentLength: 15 },
  { name: 'game5', price: 50, contentLength: 5 }
];

class User {
  constructor() {
    this.cash = 100;
    this.monthlyIncome = 50;
    this.games = [];
  }

  dailyThings(day) {
    if (day % 7 === 0) {
      this.gotMonthlyIncome();
    }
    if (this.games.length > 2) {
      if (Math.random() >= 1 - 0.4/this.games.length) {
        this.checkSteam();
      } else {
        this.playGame(this.games[0]);
      }
    } else if (this.games.length > 0) {
      if (Math.random() >= 0.7) {
        this.checkSteam();
      } else {
        this.playGame(this.games[0]);
      }
    } else {
      if (Math.random() >= 0.3) {
        this.checkSteam();
      }
    }
    console.log(`games left: ${this.games.length}`);
  }

  gotMonthlyIncome() {
    this.cash += this.monthlyIncome;
    console.log(`user got ${this.monthlyIncome}$ monthlyIncome`);
  }

  checkSteam() {
    console.log(`user opened Steam`);
    let check1 = Math.floor(Math.random() * 5);
    let check2 = Math.floor(Math.random() * 5);
    this.evaluateGame(dummyData[check1]);
    this.evaluateGame(dummyData[check2]);
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
  }

  playGame(game) {
    let playTime = Math.floor(Math.random() * 4) + 1;
    console.log(`user played ${game.name} for ${playTime} hour(s)`);
    game.contentLength = game.contentLength <= playTime ? 0 : game.contentLength - playTime;
    if (game.contentLength === 0) {
      console.log(`user beated ${game.name}`);
      this.games.shift();
    }
  }

}

let day = 1;
let user = new User();

const timeGoes = () => {
  setTimeout(() => {
    timeGoes();
  }, 5000);
  console.log(`day ${day}`);
  user.dailyThings(day);
  day++;
};

timeGoes();