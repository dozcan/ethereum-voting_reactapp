import React, { useContext } from "react";
import { store } from "../redux/store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card, } from "react-bootstrap";

export const CreateInvestor = () => {
  const { state, dispatch } = useContext(store);

  const createInvestor = () => {
    dispatch({ type: "add", data: "Ox123456678798909090" });
  };

  const deleteInvestor = () => {
    dispatch({ type: "remove", data: "Ox123456678798909090" });
  };
  return (
    <div>
      {state.investorAddresses.map((element, index) => {
        return (
          <div id={index}>
            <Card>
              <Card.Body>
                <Card.Title> investor {index + 1} </Card.Title>
                <Card.Text>address: {element}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <Button onClick={() => createInvestor()} variant="primary">
        create Investor
      </Button>
      <Button onClick={() => deleteInvestor()} variant="primary">
        delete Investor
      </Button>
    </div>
  );
};
