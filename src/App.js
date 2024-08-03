import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Contect from "./Components/Contect";
import Post_jobs from "./Components/Post_jobs";
import Viewjobs from "./Components/View-jobs";
import JobDetails from "./Components/Jobdetails";
import Postedjobs from "./Components/Postedjobs";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import Applynow from "./Components/Applynow";
import Footer from "./Components/Footer";
import Ai from "./Components/Ai";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
  apiKey: "AIzaSyD0NAOfuGHY_kzfZPT9dFFyu7y5beCc7GU",
  authDomain: "job-portel-bee19.firebaseapp.com",
  databaseURL: "https://job-portel-bee19-default-rtdb.firebaseio.com",
  projectId: "job-portel-bee19",
  storageBucket: "job-portel-bee19.appspot.com",
  messagingSenderId: "972475632209",
  appId: "1:972475632209:web:89bf376564eda5c9b8c670",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const notify = () => {
    if (!toast.isActive("auth-toast")) {
      toast.error("please logged in to access this page!", {
        toastId: "auth-toast",
      });
    }
  };

  const ProtectedRoute = ({ element, redirectPath = "/login" }) => {
    if (!user) {
      notify();
      return <Navigate to={redirectPath} />;
    }
    return element;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/post-jobs"
          element={<ProtectedRoute element={<Post_jobs />} />}
        />
        <Route
          path="/contect"
          element={<ProtectedRoute element={<Contect />} />}
        />
        <Route path="/details/:id" element={<JobDetails />} />
        <Route
          path="/view-jobs"
          element={<ProtectedRoute element={<Viewjobs />} />}
        />
        <Route
          path="/postedjobs"
          element={<ProtectedRoute element={<Postedjobs />} />}
        />
        <Route path="/apply/:id" element={<Applynow />} />
        <Route path="/ai" element={<ProtectedRoute element={<Ai />} />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" theme="dark" transition={Slide} />
    </Router>
  );
};

export default App;
