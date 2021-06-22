import React from "react";

/**
 * this hook returns a function that updates the state with `{}`
 * which causes the component using it to (force) rerender
 */
const useForceUpdate = (): (() => void) => {
  const setState = React.useState({})[1];

  const forceUpdate = React.useCallback(() => {
    setState({});
  }, [setState]);

  return forceUpdate;
};

export default useForceUpdate;
