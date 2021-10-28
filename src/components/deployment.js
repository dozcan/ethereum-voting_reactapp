import React, { useContext, useState } from "react";
import "./App.css";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";
import { store } from "../redux/store";
import {abiLock,abiToken,abiDistribution } from './abi.js';

const Web3 = require('web3');

export const DeploySmartContract = () => {
  const [hide, setHide] = useState(false);
  const [sahiplik, setsahiplik] = useState("--");
  const [fiyat, SetFiyat] = useState("Eth/usd fiyatı henüz oluşmadı");
  const { state, dispatch } = useContext(store);
  const deploySmartContract = async() => {
    setHide(true);
	let response={}
    const { ethereum } = window;
	console.log("ethereum",ethereum);

    await ethereum.request({ method: 'eth_requestAccounts' });

    //const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
	//const web3 = new Web3('https://kovan.infura.io/v3/43fee654fee74b98a38aac926142475c');			
	const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws/v3/43fee654fee74b98a38aac926142475c"));		   

try{
	setsahiplik(ethereum.selectedAddress);

	let abi =[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "AggregatorAddress",
					"type": "address"
				}
			],
			"name": "setAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "getLatestPrice",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
	var TokenAddress = "0x1DB0e55bd506F4B3b09b87cE7B622BaF77B70459";
	var MyContractToken = new web3.eth.Contract(abi, TokenAddress, {
		from: "0x177003D21079DaC6104A147b4Edb698b3D27cB11", 
		to:"0x177003D21079DaC6104A147b4Edb698b3D27cB11"
	  });


	  var encodedToken1 =  await MyContractToken.methods.setAddress("0x9326BFA02ADD2366b30bacB125260Af641031331").encodeABI();
		let _paramsToken1 = {
		data: encodedToken1,
		gasLimit:'3000000',
		gas:'63262',
		from:"0x177003D21079DaC6104A147b4Edb698b3D27cB11",
		to:"0x177003D21079DaC6104A147b4Edb698b3D27cB11"
		}

		await ethereum.request({method: 'eth_sendTransaction',params:[_paramsToken1]})
		.then(_result => {
		
			console.log("success",_result);
			SetFiyat("Fiyat beklentisi açıldı")
			
		})  
		.catch((error) => {
			console.log("error",error);
		});


			  var priceComes =  await MyContractToken.methods.getLatestPrice().call({from:"0x177003D21079DaC6104A147b4Edb698b3D27cB11"});
			  
			  console.log("Fiyat geldi mi true veya false",web3.utils.toDecimal(priceComes._hex) );
			  SetFiyat(web3.utils.toDecimal(priceComes._hex)+ " $");
			  

		

}
	
		  /*var postData = {
			address: 
		   {
			 selectedAddress : "0xfaB66Dc0011dE58E6fd405B805488902023Ce0Fd"	
		   }
		  };
		  
		

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData)
			};
			fetch('http://54.191.143.56:8080/AddressSituation', requestOptions)
				.then(response => console.log(response.json()))
			}*/

  
	/*
    try{

var TokenAddress  = "0x6f131683861c56154Ff581257Df7cEcc19E15d74"
var LockAddress  = "0xa85eA69D48fC48dd4af4eccdD4C0281903CF2607"
var DistributionAddress = "0x92C67478Bf3653a4850E43C84679fBbEF16b44A3"
 
let nestIndex = 1;
let tierIndex = 1;


	var MyContractToken = new web3.eth.Contract(abiToken, TokenAddress, {
		from: ethereum.selectedAddress, 
		to:TokenAddress
	});

	var MyContractLock = new web3.eth.Contract(abiLock, LockAddress, {
		from: ethereum.selectedAddress, 
		to:LockAddress
	});

	var MyContractDistribution = new web3.eth.Contract(abiDistribution, DistributionAddress, {
		from: ethereum.selectedAddress, 
		to:DistributionAddress
	});

	//dağıtımdan kar almaya hakkımız var mı kontrolü

	let getDurationOflockTimeforPerson =  await MyContractLock.methods.getDurationOflockTimeforPerson().call({from:ethereum.selectedAddress});
	let idoTime = await MyContractDistribution.methods.canRigtForDistribution().call({from:ethereum.selectedAddress});
	
   console.log("getDurationOflockTimeforPerson",getDurationOflockTimeforPerson)
   console.log("idoTime",idoTime)
   
	if(getDurationOflockTimeforPerson[0] <= idoTime[0]){
		if(getDurationOflockTimeforPerson[0]  == getDurationOflockTimeforPerson[1] ){ // kilitleme bozulmamış
			response.mesaj = "Dağıtımdan pay alabileceksiniz"
			response.succes = true;
		}
		else if(getDurationOflockTimeforPerson[1] >= idoTime[1]) {
			response.mesaj = "Dağıtımdan pay alabileceksiniz"
			response.succes = true;
		}
		else{
			response.mesaj = "Dağıtımdan pay alamazsınız"
			response.succes = false;
		}
	}
	
	else{
		response.mesaj = "Dağıtımdan pay alamazsınız"
		response.succes = false;
	}
   console.log("response",response)
	if(response.succes){ //2. claim çağrılacak
   
   
		var encodedstartDistribution =  await MyContractDistribution.methods.startDistribution().encodeABI();
		let _paramsstartDistribution = {
		   data: encodedstartDistribution,
		   gasLimit:'3000000',
		   gas:'63262',
		   from:ethereum.selectedAddress,
		   to:DistributionAddress
		 }
	
		   await ethereum.request({method: 'eth_sendTransaction',params:[_paramsstartDistribution]})
		   .then(_result => {
		   
			   console.log("success",_result);
			   
		   })  
		   .catch((error) => {
			   console.log("error",error);
		   });
   
	}
	
    }
	*/
    catch(ex){
      console.log("hata",ex);
    }
 
    dispatch({ type: "Contract", payload: "Ox123456678798909090" });
  };

  
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> Fiyat Sözleşmemiz </Card.Title>
          <Card.Text>Fiyatı oluşturan yapan address: {sahiplik}</Card.Text>
		  <Card.Text>Fiyat oluştu mu? {fiyat}</Card.Text>
		  
        </Card.Body>
      </Card>
      <Button
        disabled={hide}
        onClick={() => deploySmartContract()}
        variant="primary"
      >
        Fiyatı Başlat
      </Button>
    </div>
  );
};
