class Araux {
  constructor() {
    this.objects = { properties: false, values: false, equal: false };
    this.arrays = { properties: false, values: false, equal: false };
  }

  #proxyHandler = () => {
    const self = this;
    return {
      set(o, p, v) {
        for (const prop in self.objects) {
          if (v && self.objects[prop]) {
            throw new Error('Cannot have multiple true or number properties');
          }
        }
        o[p] = v;
        return true;
      },
    };
  };

  #createProxy = () => {
    this.arraysProxy = new Proxy(this.arrays, this.#proxyHandler());
    this.objectsProxy = new Proxy(this.objects, this.#proxyHandler());
  };

  #swapValues = (t, b) => {
    for (const p in b ? this.objectsProxy : this.arraysProxy) {
    }
    console.log(this.arraysProxy);
  };

  #checkProps = (i) => {};

  #checkVals = (i) => {};

  #checkEquality = (i) => {
    return JSON.stringify(ar1[i]) === JSON.stringify(ar2[i]) || false;
  };

  #modifyArrays = (t, i) => {
    let r = true;
    let tV;
    if (t === 'object') {
      for (const p in this.objectsProxy) {
        if (this.objectsProxy[p]) {
          tV = this.objectsProxy[p];
        }
      }
      if (tV) {
        tV === 'properties' ? (r = this.#checkProps(i)) : null;
        tV === 'values' ? (r = this.#checkVals(i)) : null;
        tV === 'equal' ? (r = this.#checkEquality(i)) : null;
      }
    }
    r = tV;
    return r;
  };

  #findIdx = () => {
    let s = 0;
    for (let i = 0; i < this.a1.length; i++) {
      const t = typeof this.a1[i];
      if (t === typeof this.a2[i] && (t === 'object' || t === 'array')) {
        if (this.#modifyArrays(t, i)) {
          s++;
        } else {
          break;
        }
      } else if (this.a1[i] === this.a2[i]) {
        s++;
      } else {
        break;
      }
    }
    return s;
  };

  unsimIdx = (
    array1,
    array2,
    objects = {
      properties: false,
      values: false,
      equal: true,
    },
    arrays = {
      properties: false,
      values: false,
      equal: false,
    }
  ) => {
    this.a1 = array1;
    this.a2 = array2;
    this.#createProxy();
    this.#swapValues(objects, true);
    this.#swapValues(arrays, false);
    console.log(this.#findIdx());
  };
}

const ar1 = [5, 5, { mike: 5 }];
const ar2 = [5, 5, { mike: 5 }];

const araux = new Araux();
araux.unsimIdx(ar1, ar2, { equal: true });

module.exports = Araux;
