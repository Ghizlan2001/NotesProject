import NoteList from "./noteList";
import axios from "axios";
const Edit = (props) => {
  const edit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/notes/${props.editNoteId}`,
        {
          title: props.noteTitle,
          content: props.noteContent,
          shared_with:
            props.noteShared != "" ? props.noteShared.split(",") : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.getNotes();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        navigate("/");
      } else {
        console.error("another error occurred", err);
      }
    }
  };

  const handleTitleChange = (e) => props.setNoteTitle(e.target.value);
  const handleContentChange = (e) => props.setNoteContent(e.target.value);
  const handleSharedChange = (e) => props.setNoteShared(e.target.value);

  return (
    <div>
      <h1>Edit Note</h1>
      <form>
        <input
          type="text"
          value={props.noteTitle}
          placeholder="Title"
          className="login"
          onChange={handleTitleChange}
        />
        <input
          type="text"
          value={props.noteContent}
          placeholder="Content"
          className="login"
          onChange={handleContentChange}
        />
        <input
          type="text"
          value={props.noteShared}
          placeholder="shared_with"
          className="login"
          onChange={handleSharedChange}
        />
        <button className="add-note" onClick={edit}>
          save changes
        </button>
      </form>
    </div>
  );
};
export default Edit;
