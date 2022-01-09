import io from "socket.io-client";
import { useState } from "react";
import Chat from "./routes/chat/Chat";
import Nav from "./components/nav/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
const socket = io.connect("http://localhost:3001");

const options = [
  { value: "Programming", label: "Programming", key: 1 },
  { value: "Art", label: "Art", key: 2 },
  { value: "Books", label: "Books", key: 3 },
  { value: "Sports", label: "Sports", key: 4 },
  { value: "Advice", label: "Advice", key: 5 },
];

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [adminMsg, setAdminMsg] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join", { name, room, users });
      socket.on("message", (message) => {
        setAdminMsg(message);

        setShowChat(true);
      });
    }
  };
  socket.on("GetUsers", ({ users }) => {
    setUsers(users);
  });
  return (
    <div className="App login-container">
      {!showChat ? (
        <div className="form-container">
          <img src="logo.png" alt="chatter" className="logo-login " />
          <h2 className="level-1-text">Welcome to chatter !</h2>
          <input
            className="form-input"
            type="text"
            placeholder="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <select
            name="room"
            className="form-input"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          >
            <option selected="true" disabled="disabled">
              Choose a room
            </option>
            {options.map((option) => {
              return (
                <option key={option.key} value={option.value}>
                  {option.value}
                </option>
              );
            })}
          </select>
          <button className="btn-join" onClick={joinRoom}>
            JOIN
          </button>
        </div>
      ) : (
        <div>
          <Nav />
          <div className="side-by-side">
            <Sidebar room={room} users={users} />
            <Chat socket={socket} name={name} room={room} msg={adminMsg} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
