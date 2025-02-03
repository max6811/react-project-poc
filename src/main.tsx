import { StrictMode } from "react";

import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";

import apolloClient from "./application/ApolloClient.ts";
import App from "./application/App.tsx";
import ToastGlobal from "./components/Toast/ToastGlobal.tsx";

import 'primeicons/primeicons.css';
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
        <ToastGlobal />
      </ApolloProvider>
  </StrictMode>
);
