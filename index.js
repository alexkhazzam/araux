class Araux {
  constructor() {}

  static unsimIdx = (array1, array2) => {
    let sim = 0;
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === array2[i]) {
        sim += 1;
      } else {
        break;
      }
    }
    return sim;
  };
}

module.exports = Araux;
