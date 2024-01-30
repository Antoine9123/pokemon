const SavesManager = require("./saves_manager")
const Tools = require("./tools")
const Player = require("./player");
const World = require("./world");

class Main {
  static async play() {
    this.displayMenu();
  }
//// MENU ------------------------------------------------------------------------------------>
  static async displayMenu() {
    let isRunning = true;
    
    while (isRunning) {
      console.log("--------------------------");
      console.log("C O D E M O N   W O R L D");
      console.log("--------------------------\n");
      console.log("PRESS :");
      console.log("1. Continue");
      console.log("2. New game");
      console.log("3. Exit");

      let answer;
      answer = await Tools.input("\nWhat would you like to do ?\n", false);

      if (answer == 1) {
        await this.continue()
      } else if (answer == 2) {
        await this.newGame();
      } else if (answer == 3) {
        isRunning = false;
      } else {
        console.log("\n>>> I didn't understand. Can you repeat ?");
      }
    }
  }
//// NEW / CONTINUE ---------------------------------------------------------------------------->
  static async continue() {
    await SavesManager.displayPlayers()
    let indexPlayer = await Tools.input("Which character do you want to play ?")
    const codemoner = await SavesManager.loadPlayer(indexPlayer)
    World.enterTheWorld(codemoner)

  }

  static async newGame() {
    await Tools.cleanOutput();
    await Tools.print("Welcome new Codemoner !");
    await Tools.print("You're about to discover the wonderfull world of Codemon.");

    let name = await Tools.input("Can you tell me your name ?\n");
    const codemoner = new Player(name);

    await SavesManager.savePlayer(codemoner)
    World.enterTheWorld(codemoner)
    
  }
}

Main.play()

module.exports = Main;
