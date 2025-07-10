import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return <>{token ? <Dashboard /> : <Login onSuccess={setToken} />}</>;
}

export default App;
