import { useEffect, useState } from "react"
import API from "../services/api"

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

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

      <div className="vehicles-grid">
        {vehicles.map((vehicle) => {
          const imageUrl = vehicle.images?.[0]?.image_url

          return (
            <article key={vehicle.id} className="vehicle-card">
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
                <span className="badge-type">{vehicle.type}</span>
                <h2>{vehicle.brand} {vehicle.model}</h2>
                <p className="vehicle-price">{vehicle.price} €</p>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}