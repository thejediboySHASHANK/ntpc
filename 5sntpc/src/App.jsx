import './App.css'
import Image from "react"
import NTPC from "../src/assets/1280px-NTPC_Logo.svg.png"
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./components/Layout.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./context/UserContext.jsx";
import ViewPage from "./pages/ViewPage.jsx";
import FillScore from "./pages/FillScore.jsx";
import FillFormPage from "./pages/FillFormPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true
function App() {

  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<IndexPage/>} />
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/register" element={<RegisterPage />}/>
                  <Route path="/view" element={<ViewPage />}/>
                  <Route path="/score/:department" element={<FillScore />}/>
                  <Route path="/score/new/:department" element={<FillFormPage />}/>
                  <Route path="/score/new/:department/:zoneName/:id" element={<FillFormPage />}/>
                  <Route path="/account" element={<AccountPage />}/>
              </Route>
          </Routes>
      </UserContextProvider>


  )
}

export default App
