const readline = require("readline");
const SavesManager = require("./saves_manager")
const Player = require("./player");

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
      answer = await this.input("\nWhat would you like to do ?\n");

      if (answer == 1) {
        console.log(">>> Continue");
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
  continue() {}

  static async newGame() {
    console.log("Welcome new Codemoner !");
    console.log("You're about to discover the wonderfull world of Codemon.");
    let name = await this.input("Can you tell me your name ?\n");
    const codemoner = new Player(name);
    await SavesManager.savePlayer(codemoner)
    
  }

//// INPUT ------------------------------------------------------------------------------------->
  static input(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(message, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }
}

Main.play()

module.exports = Main;
