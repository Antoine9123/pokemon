const fs = require("fs").promises;
const readline = require("readline");

class Tools {
  static async input(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      Tools.print(message, false);
      rl.question(message, (answer) => {
        Tools.print(">>>>  " + answer, false);
        resolve(answer);
        rl.close();
      });
    });
  }

  /// LOGS !!!!!!!!!!!!!!!!!!! --------------------------------------------------->>>>
  static async print(message, print = true) {
    if (print == true) {
      console.log(message);
    }
    this.insterOutput(message);
  }
  static async insterOutput(message) {
    const fileExists = await fs
      .access("logs/output.txt")
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      await fs.writeFile("logs/output.txt", message + "\n");
    } else {
      const existingContent = await fs.readFile("logs/output.txt", "utf-8");
      const newContent = existingContent + message + "\n";
      await fs.writeFile("logs/output.txt", newContent);
    }
  }
  static async cleanOutput() {
    await fs.writeFile("logs/output.txt", "");
  }

  static async saveOutputs(playerID) {
    const currentOutput = await fs.readFile("logs/output.txt", "utf-8");
    await fs.writeFile(`logs/logsIndex[${playerID}].txt`, currentOutput);
  }

  static async loadOutput(playerID) {
    const fileContent = await fs.readFile(
      `logs/logsIndex[${playerID}].txt`,
      "utf-8"
    );
    await fs.writeFile("logs/output.txt", fileContent);
  }
}

module.exports = Tools;
