import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ModelPopup from "./components/ModelPopup";
import Main from "./components/pages/Main";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import { UserContext } from "./context/authContext";
import axios from "./Utils/axiosConfig";

const ProtectedRoute = ({ children, token, user, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Call api");

      try {
        const user = await axios.get("/users", {
          headers: {
            "Content-Types": "application/json",
          },
        });
        return user.data;
      } catch (error) {
        // for error 401 jwt expire
        console.log({ status: error?.response?.status });
        if (Number(error?.response?.status) === 401) {
          localStorage.removeItem("token");
          navigate("/sign-in", {
            replace: true,
          });
        }
        console.log({ error });
      }
    };

    if (token) {
      if (!Object.entries(user).length) {
        fetchUser()
          .then((user_response) => {
            console.log({ user_response });
            if (setUser) {
              if (user_response) {
                setUser((pre_user) => {
                  return { ...pre_user, ...user_response.user };
                });
              }
            }
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    }
  }, [token, user, setUser, navigate]);

  return token && user ? (
    children
  ) : !token || !user ? (
    <Navigate to="/sign-in" />
  ) : (
    ""
  );
};

function App() {
  console.log("APP re-render");
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  console.log({ user, token });

  return (
    <div className="relative">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute token={token} setUser={setUser} user={user}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      <ModelPopup />
    </div>
  );
}

export default App;
