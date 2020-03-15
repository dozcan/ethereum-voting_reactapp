import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Card,Row, Col } from "react-bootstrap";
import {DeploySmartContract} from "./deployment";
import {ContractBalance} from "./balance";
import {CreateStartup} from "./createStartup"
import {CreateInvestor} from "./createInvestor"

export default function App() {
  return(
    <div>
   <Row>
    <Col  xs="6">
    <Container className="m-2">
        {DeploySmartContract()}
    </Container>
    </Col>
    <Col  xs="6">
    <Container className="m-2">
        {ContractBalance()}
    </Container>
    </Col>
    </Row>
   
    <Row>
    <Col xs="6">
    <Container className="m-2">
    <Card>
      <Card.Body>
        <Card.Title><p>Investor Register Area</p> </Card.Title>
        <Card.Text>
        {CreateInvestor()}
        </Card.Text>
      </Card.Body>
    </Card>
    </Container>
    </Col>

    <Col xs="6">
    <Container className="m-2">
    <Card>
      <Card.Body>
        <Card.Title> <p>StartUp Register Area </p></Card.Title>
        <Card.Text>
        { CreateStartup()}
        </Card.Text>
      </Card.Body>
    </Card>
    </Container>
    </Col>
   </Row>
   </div>
  )
}

