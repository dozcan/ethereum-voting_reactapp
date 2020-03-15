import React, { useContext, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";
import { store } from "../redux/store";

export const DeploySmartContract = () => {
  const [hide, setHide] = useState(false);
  const { state, dispatch } = useContext(store);
  const deploySmartContract = () => {
    setHide(true);
    dispatch({ type: "Contract", payload: "Ox123456678798909090" });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> Voting Contract </Card.Title>
          <Card.Text>contract address: {state.smartContractAddress}</Card.Text>
        </Card.Body>
      </Card>
      <Button
        disabled={hide}
        onClick={() => deploySmartContract()}
        variant="primary"
      >
        deploySmartContract
      </Button>
    </div>
  );
};
