import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const ChangePass = (e) => {
    e.preventDefault();
    navigate("/UpdatePass");
  };
  return (
    <nav className="nav">
      <button className="logout" onClick={onLogout}>
        Logout
      </button>
      <button className="change" onClick={ChangePass}>
        Change Password
      </button>
    </nav>
  );
};
export default Logout;
