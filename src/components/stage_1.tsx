import React, { useState, useRef, useContext, SyntheticEvent } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { MyContext } from "../context/index";

const Stage_1: React.FC = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const ctx = useContext(MyContext);

  const [error, setError] = useState<[boolean, string]>([false, ""]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (textInput.current) {
      const value = textInput.current.value;
      const validate = validateInput(value);

      if (validate) {
        setError([false, ""]);
        ctx?.addPlayer(value);
        textInput.current.value = "";
      } else {
        console.log("error");
      }
    }
  };

  const validateInput = (value: string): boolean => {
    if (value === "") {
      setError([true, "Sorry, you need to add something"]);
      return false;
    }
    if (value.length < 2) {
      setError([true, "Sorry, you need 3 char at least"]);
      return false;
    }
    return true;
  };

  return (
    <>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textInput}
          />
        </Form.Group>

        {error[0] ? <Alert variant="danger">{error[1]}</Alert> : null}

        <Button className="miami mt-3" variant="primary" type="submit">
          Add player
        </Button>
        {ctx?.state.players.length ? (
          <>
            <hr />
            <div>
              <ul className="list-group mt-2">
                {ctx.state.players.map((player, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  >
                    {player}
                    <span
                      className="badge badge-danger"
                      onClick={() => ctx.removePlayer(i)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <div className="action_button" onClick={() => ctx.nextStage()}>
                NEXT
              </div>
            </div>
          </>
        ) : null}
      </Form>
    </>
  );
};

export default Stage_1;
