import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");

  const onClickbutton = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/login", {
        cin,
        password,
      });
      localStorage.setItem("token", resp.data.token);
      navigate("/");
      console.log(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error("another error occurred", err);
      }
    }
  };

  return (
    <form>
      <h1>welcome</h1>
      <input
        type="text"
        value={cin}
        onChange={(e) => {
          setCin(e.target.value);
        }}
        className="login"
        placeholder="cin"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="login"
        placeholder="password"
      />
      <button onClick={onClickbutton} className="button">
        Login
      </button>
    </form>
  );
};
export default Login;
