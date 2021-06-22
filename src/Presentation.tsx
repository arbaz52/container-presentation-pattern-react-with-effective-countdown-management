import React from "react";
import useForceUpdate from "./useForceUpdate";

export interface IPresentationProps {
  formattedTime: React.MutableRefObject<string>;
}

const Presentation: React.FC<IPresentationProps> = ({ formattedTime }) => {
  console.debug("Presentation: render");

  // custom hook that exposes a function when called,
  // forces the component to rerender
  const forceUpdate = useForceUpdate();

  // force rerender this component after 100ms each.
  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [forceUpdate]);

  return <>{formattedTime.current}</>;
};

export default Presentation;
