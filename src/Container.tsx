import React from "react";
import dayjs from "dayjs";

import Presentation from "./Presentation";

const Container: React.FC = () => {
  console.debug("Container: render");

  // contains the formatted time left
  const formattedTimeRef = React.useRef("");

  const [presentationHidden, hidePresentation] = React.useReducer(
    (state) => true,
    false
  );

  // mimic a state containing the ending time
  const endTime = React.useMemo(() => dayjs().add(10, "seconds"), []);

  // display the time is up and after 1s, hide the presentation comp.
  const callbackOnTimeUp = React.useCallback(() => {
    console.debug("Time is up!");
    setTimeout(() => hidePresentation(), 1000);
  }, []);

  // start interval that updates the time left string
  // and clears it when the time left reaches 0
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const secondsLeft = endTime.diff(now, "seconds");
      formattedTimeRef.current = secondsLeft + " seconds left!";
      if (secondsLeft <= 0) {
        callbackOnTimeUp();
        clearInterval(interval);
        formattedTimeRef.current = "Time is up!";
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, callbackOnTimeUp]);

  if (!presentationHidden)
    return <Presentation formattedTime={formattedTimeRef} />;

  return <>No Presentation component</>;
};

export default Container;
