import { useState, useEffect } from "react";
import { Query } from "@/hooks";
import services from "@/services";

export const withReactive = (Component, options) => {
  const Wrapper = ({ ...props }) => {
    const [data, setData] = useState({});

    useEffect(() => {
      options.init({ services: services, ...props });
    }, []);

    const handleOnSetData = (data) => {
      setData(data);
    };

    return (
      <>
        {options.queries({ services: services, ...props }).map((query) => (
          <Query
            key={query.name}
            collection={query.collection}
            name={query.name}
            defaultValue={query.defaultValue}
            where={query.where}
            setData={handleOnSetData}
          />
        ))}
        <Component data={data} services={services} {...props} />
      </>
    );
  };

  return Wrapper;
};
