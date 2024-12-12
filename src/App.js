import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./component/login";
import NoteList from "./component/noteList";
import Edit from "./component/edit";
import Logout from "./component/Logout";
import UpdatePass from "./component/UpPassword";

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname != "/login" && location.pathname != "/UpdatePass" && (
        <nav>
          <Logout />
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/" element={<NoteList />}></Route>
        <Route path="/Logout" element={<Logout />}></Route>
        <Route path="/UpdatePass" element={<UpdatePass />}></Route>
      </Routes>
    </div>
  );
}
