import { useContext } from "react";
import { MyContext } from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Stage_1 from "./components/stage_1";
import Stage_2 from "./components/stage_2";

const App = () => {
  const ctx = useContext(MyContext);

  return (
    <div className='wrapper'>
      <div className='center-wrapper'>
        <h1>Who pays the bill?</h1>
        {ctx.state.stage == 1 ? <Stage_1 /> : <Stage_2 />}
      </div>
    </div>
  );
};

export default App;
