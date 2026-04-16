import { useState, useEffect } from "react"; // import hooks from React
import axios from "axios"; // import axios for API calls

function App() {

  const [email, setEmail] = useState(""); // store email input
  const [message, setMessage] = useState(""); // store response message

  // LOGIN FUNCTION
  const login = async () => {
    const res = await axios.post("http://localhost:3000/login", { // send POST request
      email // send email to backend
    });

    localStorage.setItem("token", res.data.token); // store token in browser
    setMessage("Login Successful"); // show message
  };

  // ACCESS PROTECTED ROUTE
  const getProfile = async () => {

    const token = localStorage.getItem("token"); // get token from storage

    const res = await axios.get("http://localhost:3000/profile", { // call protected API
      headers: {
        Authorization: `Bearer ${token}` // send token as Bearer
      }
    });

    setMessage(res.data); // display response
  };

  return (
    <div>

      <h2>Login</h2>

      <input
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)} // update email state
      />

      <button onClick={login}>Login</button> {/* call login */}

      <button onClick={getProfile}>Get Profile</button> {/* call protected route */}

      <h3>{message}</h3> {/* display message */}

    </div>
  );
}

export default App; 

