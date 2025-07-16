import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Auth from "./components/AuthComponent";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-indigo-600 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        <Auth />
      </header>

      <main className="p-4">
        {user ? <Dashboard /> : <p>Please log in to continue.</p>}
      </main>
    </div>
  );
}

export default App;
