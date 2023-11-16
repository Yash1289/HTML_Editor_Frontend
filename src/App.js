import React, { useState, useRef, useEffect } from "react";
import { saveAs } from 'file-saver';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import { AuthContext } from "./Context/authContext";
import { tokenContext } from "./Context/tokenContext";
import PrivateRoute from "./routes/privateRoute";
import Homepage from "./component/Homepage";
import Editor from "./pages/Editor";


export default function App() {

  const [user, setUser] = useState({})

  const [aToken, setAToken] = useState()
  
  return (
      <AuthContext.Provider value={{ user, setUser }}>
        <tokenContext.Provider value={{ aToken, setAToken }}>
          <Routes>
            <Route path="*" element={<PrivateRoute>
              <Homepage />
            </PrivateRoute>} />
            <Route path="/editor" element={<Editor/>} />
          </Routes>
        </tokenContext.Provider>
      </AuthContext.Provider>
  );
}
