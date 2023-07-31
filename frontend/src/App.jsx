import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AnimePage from "./pages/AnimePage";

function App() {
 
 
  return (
    <div className="App">
      <Router>
         <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path="/info/:animeID" element={<AnimePage/>}></Route>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
