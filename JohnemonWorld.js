const JohnemonArena = require("./JohnemonArena");
const DataManager = require("./DataManager");
const Terminal = require("./Terminal");

class JohnemonWorld {
  constructor(master) {
    this.MASTER = master;
  }

  async enterTheWorld() {
    let world = true;
    while (world == true) {
      let hasAction = true;
      await Terminal.print("----------------------------------", this.MASTER);
      await Terminal.print(`D A Y ${this.MASTER.day}`, this.MASTER);
      await Terminal.print("----------------------------------", this.MASTER);
      await Terminal.print("What do you want to do today ?", this.MASTER);
      await Terminal.print("\n--- FIGHT ---", this.MASTER);
      await Terminal.print("1. Go for a walk", this.MASTER);
      await Terminal.print("\n--- ACTIONS ---", this.MASTER);
      await Terminal.print("2. Heal Johnemon", this.MASTER);
      await Terminal.print("3. Revive Johnemon", this.MASTER);
      await Terminal.print("\n--- JOHNEMONS ---", this.MASTER);
      await Terminal.print("4. Show collection [FREE]", this.MASTER);
      await Terminal.print("5. Show inventory [FREE]", this.MASTER);
      await Terminal.print("6. Rename Johnemon [FREE]", this.MASTER);
      await Terminal.print("7. Release Johnemon [FREE]", this.MASTER);
      await Terminal.print("\n--- LOGS ---", this.MASTER);
      await Terminal.print("8. Show logs [FREE][!FULL INFO!]", this.MASTER);
      await Terminal.print("(press 0 to quit)", this.MASTER);
      let choice;
      while (true) {
        choice = await Terminal.input("\nChoose an option [1-8]: ", this.MASTER);
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8"].includes(choice)) {
          break;
        }
        await Terminal.print("\nI didn't understand, can you repeat?", this.MASTER);
      }
      switch (choice) {
        case "0":
          world = false;
          break;

        case "1":
          await Terminal.print("You go for a walk.\n", this.MASTER);
          hasAction = false;
          break;

        case "2":
          if (this.MASTER.healingItems <= 0) {
            await Terminal.print("\nYou don't have any healing items, sorry.", this);
          } else {
            hasAction = await this.MASTER.healJohnemon();
          }
          break;

        case "3":
          if (this.MASTER.reviveItems <= 0) {
            await Terminal.print("\nYou don't have any revive items, sorry.", this);
          } else {
            hasAction = await this.MASTER.reviveJohnemon();
          }
          break;

        case "4":
          await this.MASTER.showCollection();
          break;

        case "5":
          await Terminal.print(`\n --- INVENTORY ---`, this.MASTER);
          await Terminal.print(`Johneballs : ${this.MASTER.JOHNEBALLS}`, this.MASTER);
          await Terminal.print(`Healing items : ${this.MASTER.healingItems}`, this.MASTER);
          await Terminal.print(`Revive items : ${this.MASTER.reviveItems}\n`, this.MASTER);
          break;

        case "6":
          hasAction = await this.MASTER.renameJohnemon();
          break;

        case "7":
          if (this.MASTER.johnemonCollection.length > 1) {
            hasAction = await this.MASTER.releaseJohnemon();
          } else {
            await Terminal.print("\nSorry, it's your last Johnemon, you can't release it.")
            await Terminal.print("Please, don't stay alone... You need company.")
          }

          break;

        case "8":
          for (let i = 0; i < this.MASTER.logs.length; i++) {
            console.log(this.MASTER.logs[i]);
          }
          await Terminal.print("--------------------------------------");
          await Terminal.print("LOGGED ABOVE--------------------------");
          await Terminal.print("--------------------------------------\n\n\n\n");
          break;
      }
      if (hasAction == false) {
        await this.randomizeEvent();
        await this.oneDayPasses();
      }
    }
  }

  async oneDayPasses() {
    this.MASTER.day += 1;
    DataManager.saveMaster(this.MASTER);
  }

  async randomizeEvent() {
    let probability = Math.floor(Math.random() * 15);
    if (probability <= 4) {
      await Terminal.print("Oh ! You find a Healing Item !\n", this.MASTER);
      this.MASTER.healingItems += 1;
    } else if (probability === 5) {
      await Terminal.print("Oh ! You find a Revive Item !\n", this.MASTER);
      this.MASTER.reviveItems += 1;
    } else if (probability === 6) {
      await Terminal.print("Oh ! You find a Johneball !\n", this.MASTER);
      this.MASTER.JOHNEBALLS += 1;
    } else {
      let myArena = new JohnemonArena(this.MASTER);
      await myArena.startBattle();
    }
  }
}

module.exports = JohnemonWorld;
