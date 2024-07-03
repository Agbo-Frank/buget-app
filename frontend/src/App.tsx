import { Route, Routes } from "react-router-dom";
import { Expenses, Incomes, Login, Overview, Settings, Users } from "./pages";
import ProtectedRoute from "./component/ProtectedRoute";
import { useStore } from "./hooks/use-store";

function App() {
  const { user } = useStore()
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Overview />} /> }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Login />}/>
        <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} /> }/>
        <Route path="/incomes" element={<ProtectedRoute element={<Incomes />} /> }/>
        {user?.roles === "admin" && <Route path="/users" element={<ProtectedRoute element={<Users />} />}/>}
      </Routes>
      <div className="menu-overlay"></div>
    </>
  );
}

export default App;
