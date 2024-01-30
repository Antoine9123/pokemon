class Codemon {
  constructor(name, level, catchPhrase) {
    this.name = name;
    this.level = level;
    this.attackRange = this.getRandomNumber(1, 8) * this.level;
    this.defenseRange = this.getRandomNumber(1, 3) * this.level;
    this.healthPool = this.getRandomNumber(10, 30) * this.level;
    this.catchPhrase = catchPhrase
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  attackDamage(){

  }
  gainExperience(){

  }
  elvolve(){

  }
}

