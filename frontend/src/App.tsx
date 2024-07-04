import { Route, Routes } from "react-router-dom";
import { Entries, Login, Overview, Register, Users } from "./pages";
import ProtectedRoute from "./component/ProtectedRoute";
import { useStore } from "./hooks/use-store";

function App() {
  const { profile } = useStore()
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Overview />} /> }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/entries/:category" element={<ProtectedRoute element={<Entries />} /> }/>
        <Route path="/users" element={<ProtectedRoute role="admin" element={<Users />} />}/>
      </Routes>
      <div className="menu-overlay"></div>
    </>
  );
}

export default App;
