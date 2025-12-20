import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage.tsx";
import {HomePage} from "./pages/Home/HomePage.tsx";
import {MyTicketsPage} from "./pages/MyTickets/MyTicketsPage.tsx";

function App() {
 return (
     <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tickets" element={<MyTicketsPage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
     </Routes>
 );
}

export default App;
