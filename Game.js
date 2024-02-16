const JohnemonMaster = require("./JohnemonMaster");
const JohnemonWorld = require("./JohnemonWorld");
const Johnemon = require("./Johnemon");
const PlayerManager = require("./PlayerManager");
const Terminal = require("./Terminal");
const DBM = require("./DataBaseManager");

class Game {
  static async startGame() {
    let isRunning = true;
    let MASTER;

    let saveExists = await DBM.executeQuery("SELECT * FROM johnemonMaster;");

    if (saveExists.length === 0) {
      await Terminal.print("No previous game found!\n");
      MASTER = await this.createNewMaster();
      let newWorld = new JohnemonWorld(MASTER);
      await newWorld.enterTheWorld();
    } else {
      await Terminal.print("Previous game found!\n");
    }

    while (isRunning) {
      let answer;
      await Terminal.print("-----------------------------");
      await Terminal.print(" J O H N E M O N   W O R L D");
      await Terminal.print("-----------------------------\n");
      await Terminal.print("What would you like to do ?\n");
      await Terminal.print("1. Continue");
      await Terminal.print("2. New game");
      await Terminal.print("3. Exit");
      answer = await Terminal.input("\nChoose an option [1/2/3]:");

      switch (answer) {
        case "1":      
          MASTER = await this.chooseMaster();
          let World = new JohnemonWorld(MASTER);
          await World.enterTheWorld();
          break;

        case "2":
          MASTER = await this.createNewMaster();
          let newWorld = new JohnemonWorld(MASTER);
          await newWorld.enterTheWorld();
          break;

        case "3":
          isRunning = false;
          process.exit();
      }
    }
  }

  static async createNewMaster() {
    await Terminal.print("\nLet's create a new Master!\n");
    const name = await Terminal.input("What's your Master name ?");
    const newMaster = new JohnemonMaster(name);

    await this.proposeFirstJohnemon(newMaster);
    await PlayerManager.saveNewMaster(newMaster);
    await PlayerManager.saveNewJohnemon(newMaster.johnemonCollection[0], newMaster);

    return newMaster;
  }

  static async chooseMaster() {
    await PlayerManager.displayingMasters();
    await Terminal.print("\nWhich master would you like to play ?");
    let answer = await Terminal.input("\nChoose a Master:");
    return await PlayerManager.loadMaster(answer);
  }

  static async proposeFirstJohnemon(master) {
    let first = new Johnemon();
    let second = new Johnemon();
    let third = new Johnemon();
    let choices = [first, second, third];
    for (let i = 1; i <= 3; i++) {
      let johnemon = choices[i - 1];
      await Terminal.print(`${i}. [LVL ${johnemon.level}] ${johnemon.name}
       Attack Range: ${johnemon.attackRange}, Defense Range: ${johnemon.defenseRange}, Health: ${johnemon.healthPool}`);
    }
    let userChoice = 0;
    while (userChoice !== "1" && userChoice !== "2" && userChoice !== "3") {
      userChoice = await Terminal.input("\nWhich Johnemon you want ?");
    }
    switch (userChoice) {
      case "1":
        master.johnemonCollection.push(first);
        break;
      case "2":
        master.johnemonCollection.push(second);
        break;
      case "3":
        master.johnemonCollection.push(third);
        break;
    }
    console.log(`${master.name} received ${master.johnemonCollection[0].name} !\n`);
  }
}

Game.startGame();

module.exports = Game;
