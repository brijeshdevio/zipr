import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { Routes } from "@/Routes";

export function App() {
  return (
    <AuthProvider>
      <Routes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
