import React, { Component, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyContextProps {
  state: {
    stage: number;
    players: string[];
    result: string;
  };
  addPlayer: (name: string) => void;
  removePlayer: (id: number) => void;
  nextStage: () => void;
  getLooser: () => void;
  reset: () => void;
}

const MyContext = React.createContext<MyContextProps | undefined>(undefined);

class MyProvider extends Component<
  { children: ReactNode },
  MyContextProps["state"]
> {
  state: MyContextProps["state"] = {
    stage: 1,
    players: [],
    result: "",
  };

  addPlayerHandler: MyContextProps["addPlayer"] = (name) => {
    this.setState((prevState) => ({
      players: [...prevState.players, name],
    }));
  };

  removePlayerHandler: MyContextProps["removePlayer"] = (id) => {
    let newArray = this.state.players;
    newArray.splice(id, 1);
    this.setState({
      players: newArray,
    });
  };

  nextStageHandler = () => {
    const { players } = this.state;

    if (players.length < 2) {
      toast.error("You need 2 players at least!", {
        position: "top-left",
        autoClose: 2000,
      });
    } else {
      this.setState({ stage: 2 }, () => {
        setTimeout(() => {
          this.generateLooser();
        }, 2000);
      });
    }
  };

  generateLooser = () => {
    const { players } = this.state;

    this.setState({
      result: players[Math.floor(Math.random() * players.length)],
    });
  };

  resetGame = () => {
    this.setState({
      stage: 1,
      players: [],
      result: "",
    });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerHandler,
            nextStage: this.nextStageHandler,
            getLooser: this.generateLooser,
            reset: this.resetGame,
          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer />
      </>
    );
  }
}

export { MyContext, MyProvider };
