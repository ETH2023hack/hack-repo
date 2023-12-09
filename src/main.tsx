import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Routing imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Wallet imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Layout from "./components/Layout";
import FileUploadComponent from "./components/FileUpload.tsx";
import VerifyCredential from "./components/VerifyCredential.tsx";
import ViewAllDocs from './components/ViewAllDocs';

// Walet Config
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  // TODO : ADD YOUR PROJECT ID AND APP NAME FROM CONNECT-WALLET
  appName: "bankwallet",
  projectId: "0e6f568e1144d3f8a278585f3e311bd1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// Routing Config - ADD OTHER ROUTES HERE
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path:'/upload',
        element:<FileUploadComponent />
      },
      {
        path:'/verify',
        element : <VerifyCredential />
      },
      {
        path:'/viewAllDocs',
        element: <ViewAllDocs />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      modalSize="compact"
      theme={midnightTheme({
        //TODO: CHANGE COLOR BELOW(OPTIONAL)
        accentColor: "#E01A4F",
        accentColorForeground: "#0C090D",
        borderRadius: "small",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
);
