const Main = require("./main");

class Player {
  constructor(name) {
    this.ID = null;
    this.name = name;
    this.collection = [];
    this.heal = 0;
    this.codeball = 0;
  }

  async convertToJson() {
    let json = {
      name: this.name,
      collection: this.collection,
      heal: this.heal,
      codeball: this.codeball,
    };
    return json;
  }
}

module.exports = Player;
