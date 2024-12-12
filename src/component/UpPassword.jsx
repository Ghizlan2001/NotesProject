import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdatePass = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conewPass, setCoNewPass] = useState("");
  const navigate = useNavigate();
  const onUpdate = async (e) => {
    if (!oldPass || !newPass || !conewPass) {
      alert("All fields are required.");
      return;
    }
    if (newPass !== conewPass) {
      alert("New password and confirmation do not match.");
      return;
    }
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.put(
        "/update-password",
        {
          current_password: oldPass,
          new_password: newPass,
          new_password_confirmation: conewPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNote(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        navigate("/");
      } else {
        console.error("another error occurred", err);
      }
    }
  };
  return (
    <div>
      <form>
        <input
          type="password"
          placeholder="Old password"
          value={oldPass}
          className="pass"
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPass}
          className="pass"
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="confirmation password"
          value={conewPass}
          className="pass"
          onChange={(e) => {
            setCoNewPass(e.target.value);
          }}
        />
        <button className="save" onClick={onUpdate}>
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default UpdatePass;
