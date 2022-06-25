import Home from "./pages/Home";
import Pages from "./pages/Pages"
import AuthService from "./services/auth.service";
import { useNavigate } from "react-router-dom";

function App() {

  

  return (
    <div className="App">
     <h1>ProCure - online trebovanje</h1>
     
     <Pages />
    </div>
  );
}

export default App;
