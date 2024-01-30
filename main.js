const readline = require("readline");


class Main {
  static async play() {
    let isRunning = true;

    this.displayMenu();

    let answer
    while (isRunning){
      answer = await this.input("\nWhat would you like to do ?\n");
      if (answer == 1){
        console.log(">>> Continue")
      }
      else if (answer == 2){
        console.log(">>> New")
      }
      else if(answer == 3) {
        isRunning = false
      }
      else {
        console.log("\n>>> I didn't understand. Can you repeat ?")
      }
    } 
  }

  
  static displayMenu(){
    console.log("--------------------------");
    console.log("C O D E M O N   W O R L D");
    console.log("--------------------------\n");
    console.log("PRESS :");
    console.log("1. Continue");
    console.log("2. New game");
    console.log("3. Exit")
  }

  static loadGame(){

  }

  static input(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(message, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }
}

Main.play();
