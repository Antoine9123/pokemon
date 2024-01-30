const fs = require("fs").promises;
const Player = require("./player");

class SavesManager {
  static async loadSaves() {
    const fileContent = await fs.readFile("saves.json", "utf-8");
    return JSON.parse(fileContent);
  }

  static async savePlayer(player) {
    let saves = await this.loadSaves();
    if (player.ID == null) {
      player.ID = await this.checkFreeSpace(saves);
    }
    saves[player.ID] = await player.convertToJson();
    await fs.writeFile("saves.json", JSON.stringify(saves, null, 2));
  }
  static async checkFreeSpace(object) {
    for (let i = 0; i < 200; i++) {
      if (object[i] == undefined) {
        return i;
      }
    }
  }
}

module.exports = SavesManager;
