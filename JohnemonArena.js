const Johnemon = require("./Johnemon");
const PlayerManager = require("./PlayerManager");
const Terminal = require("./Terminal");

class JohnemonArena {
  constructor(master) {
    this.MASTER = master;
    this.johnemon = null;
    this.opponent = this.generateWildJohnemon();
    this.round = 0;
  }

  async startBattle() {
    await Terminal.print(`A wild johnemon appears !\n`, this.MASTER);
    await Terminal.print("What will you do ?", this.MASTER);
    await Terminal.print("1. Fight", this.MASTER);
    await Terminal.print("2. Run", this.MASTER);


    let answer;
    do {
      answer = await Terminal.input("\nChoose an option [1-2]", this.MASTER);
      answer = parseInt(answer, 10);
    } while (!(answer >= 1 && answer <= 2));

    switch (answer) {
      case 1:
        await Terminal.print("\nFIGHT!", this.MASTER);
        await Terminal.print(`A wild level ${this.opponent.level}, ${this.opponent.name} appears!`, this.MASTER);
        await Terminal.print(`It has ${this.opponent.health} HP`, this.MASTER);
        await Terminal.print(`${this.opponent.name} says : "${this.opponent.sayCatchPhrase()}"`)
        await this.startRound();
        break;
      case 2:
        await Terminal.print("\nYou ran! What a weak!", this.MASTER);
        break;
    }
  }

  async startRound() {
    await this.chooseJohnemon();
    let isFighting = true;
    while (isFighting === true) {
      if (this.opponent.isAlive == 0) {
        Terminal.print(`\n${this.opponent.name} is dead !`, this.MASTER);
        Terminal.print(`\nGood job !`, this.MASTER);
        this.johnemon.gainExperience(this.opponent);
        break;
      }
      else if (this.johnemon.isAlive == 0) {
        Terminal.print(`\n- - - YOUR JOHNEMON IS DEAD ! - - -`, this.MASTER);
        break;
      }
      this.round += 1;
      await Terminal.print(`--- Round ${this.round} ---\n`, this.MASTER);
      await Terminal.print(`[HP] ${this.johnemon.name} : ${this.johnemon.health}`, this.MASTER);
      await Terminal.print(`[HP] ${this.opponent.name} : ${this.opponent.health}\n`, this.MASTER);
      isFighting = await this.playerAction();
    }
  }

  async playerAction() {
    await Terminal.print(`1. Attack`, this.MASTER);
    await Terminal.print(`2. Try to catch`, this.MASTER);
    await Terminal.print(`3. Run away`, this.MASTER);
    let answer;
    while (true) {
      answer = await Terminal.input("Choose an option [1/2/3]: ", this.MASTER);
      if (["1", "2", "3"].includes(answer)) {
        break;
      } else {
        await Terminal.print("I didn't understand, can you repeat ?", this.MASTER);
      }
    }
    switch (answer) {
      case "1":
        await this.johnemon.attack(this.opponent);
        this.checkBattleStatus();
        if (this.opponent.isAlive === 1) {
          await this.opponent.attack(this.johnemon);
          this.checkBattleStatus();
        }
        return true;

      case "2":
        let isCatched = false;
        let isStillFighting = true;

        if (this.MASTER.JOHNEBALLS > 0) {
          isCatched = await this.tryToCatch();
        } else {
          console.log("You don't have any Johneball", this.MASTER);
          return isStillFighting;
        }

        if (isCatched === true) {
          isStillFighting = false
          return isStillFighting;
        } else {
          await this.opponent.attack(this.johnemon);
          return isStillFighting;
        }

      case "3":
        let isFighting = false;
        return isFighting;
    }
  }

  async tryToCatch() {
    await Terminal.print(`${this.MASTER.name} throws a Johneball`, this.MASTER);
    this.MASTER.JOHNEBALLS -= 1;
    let probabilityToCatch = Math.random();
    let percentageHealth = this.opponent.health / this.opponent.healthPool;

    if (probabilityToCatch > percentageHealth) {
      this.MASTER.johnemonCollection.push(this.opponent);
      await Terminal.print(`The wild ${this.opponent.name} has been caught !`, this.MASTER);
      await PlayerManager.saveNewJohnemon(this.opponent, this.MASTER)
      return true;
    } else {
      await Terminal.print(`The wild ${this.opponent.name} dodged the Johneball !`, this.MASTER);
      return false;
    }
  }

  checkBattleStatus() {
    if (this.johnemon.health <= 0) {
      this.johnemon.isAlive = 0;
      this.johnemon.health = 0
    } else if (this.opponent.health <= 0) {
      this.opponent.isAlive = 0;
    }
  }
  generateWildJohnemon() {
    let wildOne = new Johnemon();
    let sumLevel = 0;
    for (let i = 0; i < this.MASTER.johnemonCollection.length; i++) {
      sumLevel += this.MASTER.johnemonCollection[i].level;
    }
    let meanLevel = Math.floor(sumLevel / this.MASTER.johnemonCollection.length);
    
    for (let level = 1; level < meanLevel; level++) {
      wildOne.evolve();
    }
    return wildOne;
  }
  async chooseJohnemon() {
    await Terminal.print("\nChoose a Johnemon from you collection: ", this.MASTER);
    await this.MASTER.showCollection();
    let answer;

    do {
      answer = (await Terminal.input("Enter the number of the Johnemon: ", this.MASTER)) - 1;
    } while (!(answer >= 0 && answer < this.MASTER.johnemonCollection.length));

    this.johnemon = this.MASTER.johnemonCollection[answer];
    await Terminal.print(`\n${this.johnemon.name} is sent out ! Let's fight\n`, this.MASTER);
    await Terminal.print(`${this.johnemon.name} says : "${this.johnemon.sayCatchPhrase()}"\n`)
  }
}

module.exports = JohnemonArena;
