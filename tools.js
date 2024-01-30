const fs = require("fs").promises;
const readline = require("readline");

class Tools {
  static async input(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      Tools.print(message,false)
      rl.question(message, (answer) => {
        Tools.print(">>>>  " + answer,false)
        resolve(answer);
        rl.close();
      });
    });
  }

  /// LOGS !!!!!!!!!!!!!!!!!!! --------------------------------------------------->>>>
  static async print(message,print = true) {
    if (print == true){
      console.log(message)
    }
    
    try {
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
    } catch (error) {
      console.error("Error handling file:", error.message);
    }
  }
  static async eraseOutput() {
    try {
      await fs.unlink("logs/output.txt");
    } catch (error) {
      console.error("Error erasing output.txt:", error.message);
    }
  }

  static async saveOutputs(playerID) {
    try {
      const currentOutput = await fs.readFile("logs/output.txt", "utf-8");

      await fs.writeFile(`logs/logsIndex[${playerID}].txt`, currentOutput);

      console.log(`logs/logsIndex[${playerID}].txt saved successfully.`);
    } catch (error) {
      console.error(`Error saving logsIndex[${playerID}].txt:`, error.message);
    }
  }

  static async loadOutput(playerID) {
    try {
      const fileContent = await fs.readFile(
        `logs/logsIndex[${playerID}].txt`,
        "utf-8"
      );
      await fs.writeFile("logs/output.txt", fileContent);
      console.log(
        `logsIndex[${playerID}].txt loaded into output.txt successfully.`
      );
    } catch (error) {
      console.error(`Error loading logsIndex${playerID}.txt:`, error.message);
    }
  }
}

module.exports = Tools;

