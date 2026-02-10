import { useMemo, useEffect, useRef } from 'react';
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

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, []);

  useDeepCompareEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, [result]);

  return <></>;
};

const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const useDeepCompareEffect = (effect, dependencies) => {
  const ref = useRef(dependencies);
  const prevDepsRef = useRef(dependencies);

  useEffect(() => {
    ref.current = dependencies;
  }, [dependencies]);

  useEffect(() => {
    if (!isEqual(ref.current, prevDepsRef.current)) {
      prevDepsRef.current = ref.current;
      return effect();
    }
  }, [dependencies]);
};
