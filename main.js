const dummyData = [
  { name: 'game1', price: 60 },
  { name: 'game2', price: 30 },
  { name: 'game3', price: 40 },
  { name: 'game4', price: 10 },
  { name: 'game5', price: 50 }
];

class User {
  constructor() {
    this.cash = 50;
    this.monthlyIncome = 50;
  }

  dailyThings(day) {
    if (day % 7 === 0) {
      this.gotMonthlyIncome();
    }
    if (Math.random() >= 0.5) {
      this.checkSteam();
    }
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