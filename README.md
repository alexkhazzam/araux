# araux

```javascript
const araux = require('araux');

const array1 = [1, 5, 7, 4, 6];
const array2 = [1, 5, 7, 8, 6];

const dissimilarIndex = araux.unsimIdx(array1, array2); // Returns index at which arrays are not similar anymore

console.log(dissimilarIndex); // 3
```
