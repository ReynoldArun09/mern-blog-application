import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "next-themes";
import {RecoilRoot} from 'recoil';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
  <ThemeProvider attribute="class">
  <RecoilRoot>
       <App />
  </RecoilRoot>
  </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
