import { BrowserRouter, Routes, Route } from "react-router-dom";

import Operator from "./pages/Operator";
import View from "./pages/View";
import Log from "./pages/Login";


function RoutesApp() {
    return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Log/>}/>

            <Route path="/operator" element={<Operator/>}/>

            <Route path="/view" element={<View/>}/>

        </Routes>
     
     
     </BrowserRouter>

    
    );
  }
  
  export default RoutesApp;
  