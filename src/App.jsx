import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Vehicles from "./pages/vehicles"
import VehicleDetails from "./pages/vehicleDetails"
import AddVehicle from "./pages/addVehicle"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App