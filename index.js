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
            throw new Error('Cannot have multiple true or number properties!');
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
      !t[p] ? (t[p] = false) : (t[p] = t[p]);
      b ? (this.objectsProxy[p] = t[p]) : (this.arraysProxy[p] = t[p]);
    }
  };

  #checkProps = (i) => {
    return (
      this.#stringify(Object.getOwnPropertyNames(this.a1[i])) ===
        this.#stringify(Object.getOwnPropertyNames(this.a2[i])) || false
    );
  };

  #stringify = (e) => {
    return JSON.stringify(e);
  };

  #checkVals = (i) => {
    return (
      this.#stringify(Object.values(this.a1[i])) ===
        this.#stringify(Object.values(this.a2[i])) || false
    );
  };

  #checkEquality = (i) => {
    return this.#stringify(ar1[i]) === this.#stringify(ar2[i]) || false;
  };

  #modifyArrays = (t, i) => {
    let r = undefined,
      tV = undefined;
    if (t === 'object') {
      for (const p in this.objectsProxy) {
        if (this.objectsProxy[p]) {
          tV = p;
        }
      }
      if (tV) {
        if (tV === 'properties') {
          r = this.#checkProps(i);
        } else if (tV === 'values') {
          r = this.#checkVals(i);
        } else {
          r = this.#checkEquality(i);
        }
      }
    }
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
    if (s === this.a1.length && s === this.a2.length) {
      return true;
    }
    return s;
  };

  unsimIdx = (
    array1,
    array2,
    objects = {
      properties: false,
      values: false,
      equal: false,
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
    return this.#findIdx();
  };
}

module.exports = Araux;
