const fs = require("fs").promises;
const Tools = require("./tools");
const Player = require("./player")

class SavesManager {
  static async loadSaves() {
    const fileContent = await fs.readFile("saves.json", "utf-8");
    return JSON.parse(fileContent);
  }
  static async displayPlayers() {
    let object = await this.loadSaves();
    for (const key in object) {
      console.log(`[${key}] \t${object[key].name}`);
    }
  }

  static async loadPlayer(index){
    let saves = await this.loadSaves()
    let player = saves[index]
    let codemoner = new Player(player['name'])
    codemoner.collection = player['collection']
    codemoner.heal = player['heal']
    codemoner.codeball = player['codeball']
    return player
  }

  static async savePlayer(player) {
    let saves = await this.loadSaves();
    if (player.ID == null) {
      player.ID = await this.checkFreeSpace(saves);
    }
    saves[player.ID] = await player.convertToJson();
    await fs.writeFile("saves.json", JSON.stringify(saves, null, 2));
    await Tools.saveOutputs(player.ID);
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
