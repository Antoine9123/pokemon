const Terminal = require("./Terminal");

const pokemonNames = [
  'Bit', 'achu',
  'Code', 'mander',
  'Syntax', 'le',
  'Bug', 'saur',
  'Function', 'puff',
  'Git', 'th',
  'Array', 'duck',
  'Node', 'ude',
  'Promise', 'kadabra',
  'Callback', 'choke',
  'Async', 'cool',
  'Variable', 'lee',
  'Array', 'deen',
  'Algorithm', 'mar',
  'Module', 'buzz',
  'Package', 'karp',
  'Library', 'eon',
  'Database', 'on',
  'Hardware', 'on',
  'Router', 'gon',
  'Middleware', 'lax',
  'Decorator', 'ni',
  'Closure', 'on',
  'Callback', 'on',
  'Vue', 'woodo',
  'Mongo', 'chum',
  'Python', 'cko',
  'Java', 'kip',
  'Ruby', 'ic',
  'Swift', 'b',
  'Null', 'oth',
  'Exception', 'inch',
  'Syntax', 'bas',
  'Framework', 'al',
  'Database', 'don',
  'Rest', 'quaza',
  'Pixel', 'ina',
];


class Johnemon {
  constructor() {
    this.ID = null
    this.isAlive = 1
    this.name = this.generateRandomName();
    this.level = 1;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(3, 8);
    this.defenseRange = this.getRandomNumber(2, 3);
    this.healthPool = this.getRandomNumber(10, 30);
    this.health = this.healthPool
    this.catchPhrase = this.generateCatchPhrase();
  }

  generateRandomName() {
  const randomIndex1 = Math.floor(Math.random() * (pokemonNames.length / 2)) * 2;
  const randomIndex2 = randomIndex1 + 1;

  const part1 = pokemonNames[randomIndex1];
  const part2 = pokemonNames[randomIndex2];

  return part1 + part2;
}

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const phrases = ["I choose you!", "Let the battle begin!", "Johnemon, go!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  async attack(defender) {
    let damage = await this.calculateDamage(this.attackRange, defender.defenseRange);
    await Terminal.print(`${this.name} attacks ${defender.name} ! `, this.MASTER);
    await Terminal.print(`${defender.name} loose ${damage} health  ! \n`, this.MASTER);
    defender.health -= damage;
  
  }

  async calculateDamage(attackRange, defenseRange) {
    let attack = attackRange;
    let defense = defenseRange;
    let attackRoll = Math.floor(Math.random() * (attackRange + 1));
    let defenseRoll = Math.floor(Math.random() * (defenseRange + 1));
    if (attackRoll == attackRange) {
      attack = attackRange * 2;
      await Terminal.print("CRITICAL DAMAGE !", this.master);
    }
    if (defenseRoll == defenseRange) {
      await Terminal.print("PERFECT DEFENSE !", this.master);
      defense = attack;
    }
    let damage = attack - defense;
    if (damage < 0) {
      return 0;
    } else {
      return damage;
    }
  }

  async gainExperience(opponent) {
    const experienceGain = this.getRandomNumber(1, 10) * opponent.level;
    this.experienceMeter += experienceGain;
    await Terminal.print(`${this.name} gained ${experienceGain} experience points!`);
    if (this.experienceMeter >= this.level * 35) {
      await Terminal.print(`Oh ! ${this.name} acts weirdly !`)
      await this.evolve();
      await Terminal.print(`${this.name} is now level ${this.level}!`)
      await Terminal.print(`MAX HP :  ${this.healthPool}!`)
      await Terminal.print(`ATK : ${this.attackRange}!`)
      await Terminal.print(`DEF : ${this.defenseRange}!`)
    }
  }

  async evolve() {
    this.level += 1;
    const attackIncrease = this.getRandomNumber(1, 6);
    const defenseIncrease = this.getRandomNumber(1, 6);
    const healthIncrease = this.getRandomNumber(1, 6);

    this.attackRange += attackIncrease;
    this.defenseRange += defenseIncrease;
    this.healthPool += healthIncrease;

  }

  sayCatchPhrase() {
    return this.catchPhrase
  }
}

module.exports = Johnemon
