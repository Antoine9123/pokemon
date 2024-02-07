const fs = require("fs").promises;
const JohnemonMaster = require("./JohnemonMaster");
const Johnemon = require("./Johnemon");

class DataManager {
  static pathFile = "./save.json";

  /// SAVE ----------------------------------------------------------------->
  static async saveMaster(master) {
    const fileContent = JSON.stringify(master);
    await fs.writeFile(DataManager.pathFile, fileContent);
  }

  /// CHECKING ------------------------------------------------------------->
  static async checkSave() {
    const fileExists = await fs
      .access(DataManager.pathFile, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    return fileExists;
  }

  /// LOADING ------------------------------------------------------------->
  static async loadMaster() {
    const masterStringified = await fs.readFile(DataManager.pathFile, "utf-8");
    let masterParsed = JSON.parse(masterStringified);

    let master = new JohnemonMaster(masterParsed.name);

    master.healingItems = masterParsed["healingItems"];
    master.reviveItems = masterParsed["reviveItems"];
    master.JOHNEBALLS = masterParsed["JOHNEBALLS"];
    master.day = masterParsed["day"];

    masterParsed["logs"].forEach((log) => {
      master.logs.push(log);
    }) /
      masterParsed["johnemonCollection"].forEach((object) => {
        let johnemon = new Johnemon();
        johnemon.isAlive = object["isAlive"];
        johnemon.name = object["name"];
        johnemon.level = object["level"];
        johnemon.experienceMeter = object["experienceMeter"];
        johnemon.attackRange = object["attackRange"];
        johnemon.defenseRange = object["defenseRange"];
        johnemon.healthPool = object["healthPool"];
        johnemon.health = object["health"];
        johnemon.catchPhrase = object["catchPhrase"];
        master.johnemonCollection.push(johnemon);
      });
    return master;
  }
}

module.exports = DataManager;
