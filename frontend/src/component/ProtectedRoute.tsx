import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../hooks/use-store";
import { isEmpty } from "../utilities/helpers";

function ProtectedRoute({ element }: {element: React.ReactElement}) {
  const { token } = useStore()
  
  if (isEmpty(token)) {
    return <Navigate to="/login" replace />;
  }
  return element;
}

export default ProtectedRoute