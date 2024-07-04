import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../hooks/use-store";
import { isEmpty } from "../utilities/helpers";

function ProtectedRoute({ element, role }: {element: React.ReactElement, role?: string}) {
  const { token, profile  } = useStore()
  
  if (isEmpty(token)) {
    return <Navigate to="/login" replace />;
  }
  if(role && profile.role !== role){
    return <Navigate to="/" replace />;
  }
  return element;
}

export default ProtectedRoute