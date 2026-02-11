import { useMemo, useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';


export const useQuery = ({ collection, where = [], orderBy = null }) => {
    const [table] = useLocalStorage(collection, []);

    const result = useMemo(() => {
        if (!table || !Array.isArray(table)) return [];

        let filteredData = [...table];

        const filters = where;

        if (filters.length > 0) {
            filteredData = filteredData.filter(item => {
                return filters.every(clause => 
                    checkCondition(item[clause.field], clause.op, clause.value)
                );
            });
        }

        if (orderBy) {
            const { field, dir = 'asc' } = orderBy;

            filteredData.sort((a, b) => {
                const valA = a[field];
                const valB = b[field];

                if (valA < valB) return -1;
                if (valA > valB) return 1;
                return 0;
            });

            if (dir === 'desc') {
                filteredData.reverse();
            }
        }

        return filteredData;

    }, [table, where, orderBy]);

    return result;
};

const checkCondition = (itemValue, op, filterValue) => {
    const a = itemValue ?? ""; 
    const b = filterValue ?? "";

    switch (op) {
        case '==': return a === b;
        case '!=': return a !== b;
        case '>':  return a > b;
        case '<':  return a < b;
        case '>=': return a >= b;
        case '<=': return a <= b;
        case 'contains': 
            return String(a).toLowerCase().includes(String(b).toLowerCase());
        case 'tag':
            return Array.isArray(a) && a.some(item => item.id === b);
        default: return true;
    }
};

export const Query = ({ collection, name, defaultValue, where, setData }) => {
  const result = useQuery({ collection, where });

  useDeepCompareEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, [result, name, defaultValue]);

  return null;
};

// This code was made with the help of GEMINI, It solves the problem of use json.stringify in useEffect dependencies,
// it is a deep compare that returns true if the objects are equal, and false if they are not. It also memoizes the value to avoid unnecessary re-renders
const useDeepCompareMemoize = (value) => {
  const [ref, setRef] = useState(value);

  if (!isDeepEqual(value, ref)) {
    setRef(value);
  }

  return ref;
};

const useDeepCompareEffect = (callback, dependencies) => {
  useEffect(callback, useDeepCompareMemoize(dependencies));
};

const isDeepEqual = (object1, object2) => {
  if (object1 === object2) return true;

  if (typeof object1 !== 'object' || object1 === null || 
      typeof object2 !== 'object' || object2 === null) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(object2, key) || 
        !isDeepEqual(object1[key], object2[key])) {
      return false;
    }
  }

  return true;
};