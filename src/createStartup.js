import React, { useContext, useState } from "react";
import { store } from "./store";
import Modal from "react-responsive-modal";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";

export const CreateStartup = () => {
  const [modalState, setModalState] = useState(false);
  const [_link, setLink] = useState("");
  const [_amount, setAmount] = useState(0);
  const { state, dispatch } = useContext(store);

  const createStartupModal = () => {
    setModalState(true);
  };
  const onCloseModal = () => {
    setModalState(false);
  };

  const RegisterGithub = () => {
    dispatch({ type: "Info", payload: { amount: _amount, link: _link } });
    setModalState(false);
  };

  return (
    <div>
      {state.startupInformation.map((startUp, index) => {
        return (
          <div id={index}>
            <Card>
              <Card.Body>
                <Card.Title> startUp {index + 1} </Card.Title>
                <Card.Text>
                  <p> startUp github link:{startUp.link}</p>
                  <p> startUp amount: {startUp.amount} usd</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <Button onClick={() => createStartupModal()} variant="primary">
        create startUp
      </Button>
      <Modal open={modalState} onClose={onCloseModal}>
        <h2>Github link</h2>
        <input
          onChange={e => setLink(e.target.value)}
          placeholder="www.github/..."
        />
        <h2>StartUp needed amount</h2>
        <input
          onChange={e => setAmount(e.target.value)}
          placeholder="10000.00 $"
        />
        <h2 />
        <Button onClick={() => RegisterGithub()} variant="primary">
          register
        </Button>
      </Modal>
    </div>
  );
};
