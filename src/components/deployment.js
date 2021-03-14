import React, { useContext, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";
import { store } from "../redux/store";

export const DeploySmartContract = () => {
  const [hide, setHide] = useState(false);
  const { state, dispatch } = useContext(store);
  const deploySmartContract = async() => {
    setHide(true);
    const { ethereum } = window;
    ethereum.on('accountsChanged', (chainId) => {
      console.log("accountsChanged",chainId);
    });
    if(ethereum.selectedAddress === null){
      console.log("baglı degiliz")
    }
    else{
      console.log("baglıyız")
    }
    await ethereum.request({ method: 'eth_requestAccounts' });
    console.log("ethereum.selectedAddress",ethereum.selectedAddress,ethereum._state.isConnected);
    if(ethereum.selectedAddress === null){
      console.log("baglı degiliz")
    }
    else{
      console.log("baglıyız")
    }
 
    const transactionHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0x177003D21079DaC6104A147b4Edb698b3D27cB11',
          from: ethereum.selectedAddress,
          value: '1',
        },
      ],
    });
    // Handle the result
    console.log(transactionHash);

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
