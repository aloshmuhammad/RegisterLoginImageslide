import LoginSignup from './Components/LoginSignup';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {


  return (
    <>
     <Router>
        <Routes>
          <Route
            path="/"
            element={
              
                <LoginSignup/>
             
            }
          />
          </Routes>
          </Router>
    </>
  )
}

export default App
