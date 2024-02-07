const readline = require("readline");

class Terminal {
  static async input(message, master = false) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(message + "\n> ", (answer) => {
        if (master) {
          master.addLog(message + "\n> ");
          master.addLog(answer);
        }
        resolve(answer);
        rl.close();
      });
    });
  }
  static async print(message, master = false) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(message);
        if (master) {
          master.addLog(message);
        }
        resolve();
      }, 350);
    });
  }
}

module.exports = Terminal;
