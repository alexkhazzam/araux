# araux

```javascript
const Araux = require('araux');
const araux = new Araux();

const array1 = [1, 5, 7, 8, { name: 'Alex' }, 6];
const array2 = [1, 5, 7, 8, { name: 'Bob' }, 6];

/** NOT optional
 * @param array1
 * @param array2
 * @param object
 */

const dissimilarIndex = araux.unsimIdx(array1, array2, {
  // These arguments are REQUIRED. If all are set to false, the default is to check whether both array elements are of type object

  properties: false, // Checks whether properties of objects are =
  values: true, // Checks whether objects[properties] are =
  equal: false, // Checks whethr objects are =
});

console.log(dissimilarIndex); // Will return 4, as the arrays cease to be the same at index 4
```
