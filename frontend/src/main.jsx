import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Montserrat, sans-serif",
    // You can define more font styles here as needed
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
