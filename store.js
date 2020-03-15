import React, { createContext, useReducer } from "react";

const initialState = {
  investorAddresses: [],
  startupInformation: [],
  smartContractAddress: "Not deployed",
  contractBalance: 0
};

export const store = createContext(initialState);

const investorAddressesReducer = (state, action) => {
  let newInvestorAddresses, startupInformation;
  switch (action.type) {
    case "add":
      newInvestorAddresses = [...state.investorAddresses, action.data];
      return { ...state, investorAddresses: newInvestorAddresses };
    case "remove":
      newInvestorAddresses = state.investorAddresses.filter(
        x => x !== action.data
      );
      return { ...state, investorAddresses: newInvestorAddresses };
    case "Info":
      startupInformation = state.startupInformation.slice();
      startupInformation.push(action.payload);
      return { ...state, startupInformation: startupInformation };
    case "Contract":
      return { ...state, smartContractAddress: action.payload };
    case "Contract-Balance":
      return { ...state, contractBalance: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(investorAddressesReducer, initialState);
  return (
    <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
  );
};
