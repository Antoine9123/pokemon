const Tools = require("./tools");

class World {
  static async enterTheWorld(player) {
    let codemoner = player;
    await Tools.print(`------------------------------------------------------------`);
    await Tools.print(`Hey ${codemoner.name} !`);
    await Tools.print("You've just enter into a new world !")
    await Tools.print("I'm a the BeCode Master, your worst rival.")
    await Tools.print("Can you reach me ?")
    await Tools.print("I'll let you chose one Codemon.")
    await Tools.print("Choose wisely !")

  }
}

module.exports = World;
