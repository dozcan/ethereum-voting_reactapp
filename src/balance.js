import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import { store } from "./store";

export const ContractBalance = () => {
  const { state } = useContext(store);

  const renderit =()=> {
    let count =0
    if(state.startupInformation.length===0 ){
      return (0) 
    }
    else
    {
      state.startupInformation.forEach(x=>
        count = count + Number(x.amount)
      )
      return(count) 
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> Voting Balance </Card.Title>
          <Card.Text>contract total balance: {state.contractBalance}</Card.Text>
          <Card.Text>startUp total amount neded: {renderit()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
