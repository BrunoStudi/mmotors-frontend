import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Vehicles from "./pages/vehicles"
import VehicleDetails from "./pages/vehicleDetails"
import AddVehicle from "./pages/addVehicle"
import EditVehicle from "./pages/editVehicle"
import MesDossiers from "./pages/mesDossiers"
import AdminDossiers from "./pages/adminDossiers"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
        <Route path="/mes-dossiers" element={<MesDossiers />} />
        <Route path="/admin/dossiers" element={<AdminDossiers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App