import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Edit from "./edit";

const notelist = () => {
  useEffect(() => {
    getNotes();
  }, []);
  const [note, setNote] = useState([]);
  const [noteShared, setNoteShared] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNote(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error("another error occurred", err);
      }
    }
  };
  const deleteButton = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNote((prevNotes) => prevNotes.filter((data) => data.id !== id));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error("another error occurred", err);
      }
    }
  };
  const navigate = useNavigate();

  const AddNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        "/notes",
        {
          title: noteTitle,
          content: noteContent,
          shared_with: noteShared != "" ? noteShared.split(",") : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      setNoteTitle("");
      setNoteShared([]);
      setNoteContent("");
      getNotes();
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
    <div className="notes-container">
      <div className="AddNoteF">
        <h2>Add a New Note</h2>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
            className="login"
          />
          <input
            type="text"
            placeholder="Content"
            value={noteContent}
            onChange={(e) => {
              setNoteContent(e.target.value);
            }}
            className="login"
          />
          <input
            type="text"
            placeholder="shared_with"
            value={noteShared}
            onChange={(e) => {
              setNoteShared(e.target.value);
            }}
            className="login"
          />
          <button onClick={AddNote} className="add-note">
            Add Note
          </button>
        </form>
      </div>

      {note.map((data, index) => (
        <div className="note-card" key={index}>
          <div className="note-header">
            <h3>{data.title}</h3>
            <p className="note-id">ID: {data.id}</p>
          </div>
          <div className="note-content">
            <p>{data.content}</p>
            {data.shared_with.map((shared_with, index) => (
              <p key={index}>
                {shared_with.first_name} {shared_with.last_name}
              </p>
            ))}
            <p>{data.date}</p>
          </div>
          <div>
            <button onClick={() => deleteButton(data.id)} className="suppr">
              suppr
            </button>
            <button
              className="edit"
              onClick={() =>
                setEditNoteId(editNoteId === data.id ? null : data.id)
              }
            >
              {editNoteId === data.id ? "Close" : "Edit"}
            </button>
            {editNoteId === data.id && (
              <Edit
                editNoteId={editNoteId}
                noteShared={noteShared}
                noteContent={noteContent}
                noteTitle={noteTitle}
                setNoteShared={setNoteShared}
                setNoteContent={setNoteContent}
                setNoteTitle={setNoteTitle}
                setEditNoteId={setEditNoteId}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default notelist;
