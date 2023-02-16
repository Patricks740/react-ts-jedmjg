import * as React from 'react';
import './style.css';

export default function App() {
  var myObj = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        f: 4,
        g: 'g',
        // h: 4,
      },
    },
  };

  const findKeyValue = (obj, key, value) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === key && obj[prop] === value) {
          return obj;
        } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          let result = findKeyValue(obj[prop], key, value);
          if (result) return result;
        } else if (
          typeof obj[prop] === 'number' &&
          typeof value === 'number' &&
          obj[prop] === value
        ) {
          return obj;
        } else if (
          typeof obj[prop] === 'string' &&
          typeof value === 'string' &&
          obj[prop] === value
        ) {
          return obj;
        }
      }
    }
    return null;
  };

  const findPairWithValue = (obj, value) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key];
        if (typeof val === 'object' && val !== null) {
          let nestedResult = findPairWithValue(val, value);
          if (nestedResult) return nestedResult;
        } else if (val === value) {
          return { key, value: val };
        }
      }
    }
    return null;
  };

  const editPairWithValue = (obj, value, newValue) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key];
        if (typeof val === 'object' && val !== null) {
          editPairWithValue(val, value, newValue);
        } else if (val === value) {
          obj[key] = newValue;
        }
      }
    }
    return obj;
  };

  const findAndEditAnyKeyValuePair = (obj, key, value, newValue) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === key && obj[prop] === value) {
          obj[prop] = newValue;
          return obj;
        } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          let result = findAndEditAnyKeyValuePair(
            obj[prop],
            key,
            value,
            newValue
          );
          if (result) return result;
        }
      }
    }
    return null;
  };

  var resultFindKeyValue = findKeyValue(myObj, 'f', 4);
  console.log(resultFindKeyValue); // Output: { e: 3, f: 4 }

  const resultFindPairWithValue = findPairWithValue(myObj, 4);
  console.log(resultFindPairWithValue); // Output: { key: 'f', value: 4 }

  const resultEditPairWithValue = editPairWithValue(myObj, 4, 5);
  console.log(resultEditPairWithValue); // Output: { a: 1, b: { c: 2, d: { e: 3, f: 5 } } }

  const result = findAndEditAnyKeyValuePair(myObj, 'g', 'g', 'FOUR');
  console.log(result); // Output: { a: 1, b: { c: 'two', d: { e: 3, f: 'FOUR' } } }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
