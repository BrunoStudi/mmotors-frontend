import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const isAdmin = token && JSON.parse(atob(token.split(".")[1])).role === "admin"

  useEffect(() => {
  const fetchVehicles = async () => {
    try {
      let url = "/vehicles"

      if (filter !== "all") {
        url += `?type=${filter}`
      }

      const response = await API.get(url)
      setVehicles(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchVehicles()
}, [filter])

  if (loading) {
    return (
      <main className="vehicles-page">
        <p>Chargement des véhicules...</p>
      </main>
    )
  }

  return (
    <main className="vehicles-page">
      <div className="vehicles-header">
        <p className="badge">Catalogue</p>
        <h1>Nos véhicules</h1>
        <p>Découvrez les véhicules disponibles à l’achat ou en location longue durée.</p>
      </div>

      <div className="vehicle-toolbar">
      <div className="vehicle-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Tous
        </button>

        <button
          className={filter === "vente" ? "active" : ""}
          onClick={() => setFilter("vente")}
        >
          Vente
        </button>

        <button
          className={filter === "location" ? "active" : ""}
          onClick={() => setFilter("location")}
        >
          Location
        </button>
      </div>

      {isAdmin && (
        <button
          className="btn primary"
          onClick={() => navigate("/add-vehicle")}
        >
          + Ajouter un véhicule
        </button>
      )}
    </div>

      <div className="vehicles-grid">
        {vehicles.map((vehicle) => {
          const imageUrl = vehicle.images?.[0]?.image_url

          return (
            <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} className="vehicle-card">
              {imageUrl ? (
                <img
                  src={`http://127.0.0.1:8000${imageUrl}`}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="vehicle-image"
                />
              ) : (
                <div className="vehicle-placeholder">🚗</div>
              )}

              <div className="vehicle-content">
                <span className={`badge-type ${vehicle.type?.toLowerCase()}`}>
                    {vehicle.type?.toUpperCase()}
                </span>
                <h2>{vehicle.brand} {vehicle.model}</h2>
                <p className="vehicle-price">{vehicle.price} €</p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}