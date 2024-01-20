import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSession, reset } from "../features/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && !error) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, error, dispatch, navigate]);

  const verifyCredentials = (e) => {
    e.preventDefault();
    dispatch(createSession({ email, password }));
  };

  return <div>Ini login</div>;
};

export default Login;
