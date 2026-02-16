import { useEffect, useState } from "react";
import { isDeepEqual } from "@/helpers/compareHelper";

const useDeepCompareMemoize = (value) => {
    const [ref, setRef] = useState(value);

    if (!isDeepEqual(value, ref)) {
        setRef(value);
    }

    return ref;
};



export const useDeepCompareEffect = (callback, dependencies) => {
    useEffect(callback, useDeepCompareMemoize(dependencies));
};