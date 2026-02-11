import { useState, useEffect } from "react";
import { Query } from "@/hooks";
import services from "@/services";

const buildMonitors = (monitors) => {
  return monitors.reduce((acc, monitor) => {
    acc[monitor] = false;
    return acc;
  }, {});
};

export const withReactive = (Component, options) => {
  const Wrapper = ({ ...props }) => {
    const [data, setData] = useState({});
    const [monitors, setMonitors] = useState(buildMonitors(options.monitors()));

    useEffect(() => {
      options.init({ services: services, ...props });
    }, []);

    useEffect(() => {
      const _monitors = options.monitors();

      const handleOnStart = (event) => {
        setMonitors((prev) => ({ ...prev, [event.detail.action]: true }));
      };
      const handleOnSuccess = (event) => {
        setMonitors((prev) => ({ ...prev, [event.detail.action]: false }));
      };
      const handleOnError = (event) => {
        setMonitors((prev) => ({ ...prev, [event.detail.action]: false }));
      };

      _monitors.forEach((monitor) => {
        window.addEventListener(`lf:${monitor}:start`, handleOnStart);
        window.addEventListener(`lf:${monitor}:success`, handleOnSuccess);
        window.addEventListener(`lf:${monitor}:error`, handleOnError);
      });

      return () => {
        _monitors.forEach((monitor) => {
          window.removeEventListener(`lf:${monitor}:start`, handleOnStart);
          window.removeEventListener(`lf:${monitor}:success`, handleOnSuccess);
          window.removeEventListener(`lf:${monitor}:error`, handleOnError);
        });
      };
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
        <Component data={data} monitors={monitors} services={services} {...props} />
      </>
    );
  };

  return Wrapper;
};
