import React, { useContext } from "react";
import { MyContext } from "../context/index";

const Stage_2: React.FC = () => {
  const ctx = useContext(MyContext);

  if (!ctx) {
    return null;
  }

  return (
    <>
      <div className="result_wrapper">
        <h3>The looser is: </h3>
        <div>{ctx.state.result}</div>
      </div>
      <div className="action_button" onClick={() => ctx.reset()}>
        START OVER
      </div>
      <div className="action_button btn_2" onClick={() => ctx.getLooser()}>
        GET NEW LOOSER
      </div>
    </>
  );
};

export default Stage_2;
