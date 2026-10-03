import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import BorrowRecords from "./pages/BorrowRecords";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/books" element={<Books />} />

          <Route path="/members" element={<Members />} />

          <Route path="/borrowrecords" element={<BorrowRecords />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;