import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./application/App.tsx";
import ToastGlobal from "./components/Toast/ToastGlobal.tsx";
import apolloClient from "./application/ApolloClient.ts";
import { ApolloProvider } from "@apollo/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <ToastGlobal />
    </ApolloProvider>
  </StrictMode>
);
