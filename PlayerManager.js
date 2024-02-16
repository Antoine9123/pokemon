const JohnemonMaster = require("./JohnemonMaster");
const Johnemon = require("./Johnemon");
const Terminal = require("./Terminal");
const DBM = require("./DataBaseManager");

class PlayerManager {

  static async displayingMasters() {
    let masters = await DBM.executeQuery(`SELECT id, name FROM johnemonMaster;`);
    masters.forEach((master) => {
      Terminal.print(`${master["id"]}. ${master["name"]}`);
    });
  }

  // NEW MASTER / JOHNEMON ----------------------------------------------------------------->
  static async saveNewMaster(master) {
    await DBM.executeQuery(`
    INSERT INTO johnemonMaster 
    (name, healingItems, reviveItems, johneballs, day) 
    VALUES 
    ('${master.name}','${master.healingItems}','${master.reviveItems}','${master.JOHNEBALLS}','${master.day}');`);

    let masterID = await DBM.executeQuery(`
    SELECT id FROM johnemonMaster 
    WHERE name = '${master.name}' AND day = '${master.day}';`);
    master.ID = masterID[0]["id"];
  }

  static async saveNewJohnemon(john, master) {
    let masterID = parseInt(master.ID);
    await DBM.executeQuery(`
    INSERT INTO johnemon 
    (userID, isAlive, name, level, attackRange, defenseRange, healthPool, health, catchPhrase, experienceMeter) 
    VALUES 
    ('${masterID}','${john.isAlive}','${john.name}','${john.level}','${john.attackRange}'
    ,'${john.defenseRange}','${john.healthPool}','${john.health}','${john.catchPhrase}','${john.experienceMeter}');`);

    let johnID = await DBM.executeQuery(`
      SELECT id FROM johnemon 
      WHERE name = '${john.name}' AND userID = '${masterID}';`);
    john.ID = johnID[0]["id"];
  }

  /// SAVE ----------------------------------------------------------------->
  static async saveMaster(master) {
    await DBM.executeQuery(`
    UPDATE johnemonMaster SET
    healingItems = '${master.healingItems}', 
    reviveItems = '${master.reviveItems}', 
    johneballs = '${master.JOHNEBALLS}', 
    day = '${master.day}'
    WHERE id = '${master.ID}';`);

    master.johnemonCollection.forEach((johnemon) => {
      DBM.executeQuery(`
      UPDATE johnemon SET
      isAlive = '${johnemon.isAlive}',
      name = '${johnemon.name}',
      level = '${johnemon.level}',
      attackRange = '${johnemon.attackRange}',
      defenseRange = '${johnemon.defenseRange}',
      healthPool = '${johnemon.healthPool}',
      health = '${johnemon.health}',
      experienceMeter = '${johnemon.experienceMeter}'      
      WHERE id = '${johnemon.ID}';`);

    });
  }

  /// LOADING ------------------------------------------------------------->
  static async loadMaster(index) {
    let masterLoaded = await DBM.executeQuery(`SELECT * FROM johnemonMaster WHERE id = '${index}';`);
    masterLoaded = masterLoaded[0]
    let master = new JohnemonMaster(masterLoaded["name"]);

    master.ID = masterLoaded["id"];
    master.healingItems = masterLoaded["healingItems"];
    master.reviveItems = masterLoaded["reviveItems"];
    master.JOHNEBALLS = masterLoaded["johneballs"];
    master.day = masterLoaded["day"];

    let johnemonsLoaded = await DBM.executeQuery(`SELECT * FROM johnemon WHERE userID = '${index}';`);

    johnemonsLoaded.forEach((johnemon) => {
      let newJohnemon = new Johnemon();
      newJohnemon.ID = johnemon["id"];
      newJohnemon.isAlive = johnemon["isAlive"];
      newJohnemon.name = johnemon["name"];
      newJohnemon.level = johnemon["level"];
      newJohnemon.experienceMeter = johnemon["experienceMeter"];
      newJohnemon.attackRange = johnemon["attackRange"];
      newJohnemon.defenseRange = johnemon["defenseRange"];
      newJohnemon.healthPool = johnemon["healthPool"];
      newJohnemon.health = johnemon["health"];
      newJohnemon.catchPhrase = johnemon["catchPhrase"];
      master.johnemonCollection.push(newJohnemon);
    });
    return master;
  }
}

module.exports = PlayerManager;
