const Terminal = require("./Terminal");
const DBM = require("./DataBaseManager");

class JohnemonMaster {
  constructor(name) {
    this.ID = null;
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5;
    this.reviveItems = 3;
    this.JOHNEBALLS = 10;
    this.day = 1;
  }

  async healJohnemon() {
    await this.showCollection();
    let index = null;
    do {
      index = await Terminal.input("Which Johnemon would you like to heal ? (press 0 to quit)", this);
      index = parseInt(index) - 1;
    } while (!(index >= -1 && index < this.johnemonCollection.length));
    if (index == -1) {
      return true;
    }
    
    const selectedJohnemon = this.johnemonCollection[index];
    if (selectedJohnemon.isAlive == 1) {
      this.healingItems -= 1;
      selectedJohnemon.health = selectedJohnemon.healthPool;
      await Terminal.print(`\n${selectedJohnemon.name} has been healed`, this);
      return false;
    } else {
      await Terminal.print("\nThis Johnemon is dead, you can't heal it!", this);
      return true;
    }
  }

  async reviveJohnemon() {
    await this.showCollection();
    let index = null;
    do {
      index = await Terminal.input("Which Johnemon would you like to resurrect? (press 0 to quit)", this);
      index = parseInt(index, 10) - 1;
    } while (!(index >= -1 && index < this.johnemonCollection.length));
    if (index === -1) {
      return false;
    }
    const selectedJohnemon = this.johnemonCollection[index];
    if (!selectedJohnemon.isAlive) {
      this.reviveItems -= 1;
      selectedJohnemon.isAlive = 1;
      selectedJohnemon.health = 1;
      await Terminal.print(`${selectedJohnemon.name} has been resurrected`, this);
      return false;
    } else {
      await Terminal.print(`\n${selectedJohnemon.name} is already alive, no need to resurrect.`, this);
      return true;
    }
  }

  async renameJohnemon() {
    await this.showCollection();
    let index;

    do {
      index = await Terminal.input("Which Johnemon would you like to rename? (press 0 to quit)", this);
      index = parseInt(index, 10) - 1;
    } while (!(index >= -1 && index < this.johnemonCollection.length));

    if (index === -1) {
      return true;
    }

    const selectedJohnemon = this.johnemonCollection[index];
    const oldName = selectedJohnemon.name;

    let newName = await Terminal.input(`What is the new name of ${oldName}?`, this);
    selectedJohnemon.name = newName;
    await Terminal.print(`You changed the name of ${oldName} to ${newName}`, this);
    return true;
  }

  async releaseJohnemon() {
    await this.showCollection();
    let index;

    do {
      index = await Terminal.input("Which Johnemon would you like to release? (Enter index or 0 to quit)", this);
      index = parseInt(index, 10) - 1;
    } while (!(index >= -1 && index < this.johnemonCollection.length));

    if (index === -1) {
      return true;
    }
    let johnID = this.johnemonCollection[index].ID
    await DBM.executeQuery(`DELETE FROM johnemon WHERE id = '${johnID}';`)
    this.johnemonCollection.pop(index);
    
    return true;
  }

  async showCollection() {
    await Terminal.print(`\nMaster ${this.name}'s collection :`, this);
    await Terminal.print(`------------------------------`, this);
    for (let i = 0; i < this.johnemonCollection.length; i++) {
      let john = this.johnemonCollection[i];
      await Terminal.print(`${john.isAlive == 1 ? "[LIVE]" : "[DEAD]"}`, this);
      await Terminal.print(`${i + 1}. ${john.name} LVL ${john.level}`, this);
      await Terminal.print(
        ` ATK: ${john.attackRange}, DEF: ${john.defenseRange}, HP: ${john.health}/${john.healthPool}\n`,
        this
      );
    }
  }

  async addLog(newLog) {
    newLog = String(newLog)
    await DBM.executeQuery(`INSERT INTO logs (content, userID) VALUES ("${newLog}", ${this.ID});`);
  }
}
module.exports = JohnemonMaster;
