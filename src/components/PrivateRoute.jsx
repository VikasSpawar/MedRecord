import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn)

  // console.log(isLoggedIn)
  return isLoggedIn ? children : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;