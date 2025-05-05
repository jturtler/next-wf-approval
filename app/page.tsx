"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, setPeriods } from "./redux/store";

import App from "./components/App";

export default function Home() {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
