"use client"; // Indica que este componente solo se ejecuta en el cliente

import { Provider } from "react-redux";
import { store } from "./store"; // Importa la store de Redux

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
