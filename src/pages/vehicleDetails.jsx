import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import API from "../services/api"

export default function VehicleDetails() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await API.get(`/vehicles/${id}`)
        setVehicle(response.data)
        setSelectedImage(response.data.images?.[0]?.image_url || null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id])

  if (loading) {
    return <main className="vehicle-details-page">Chargement...</main>
  }

  if (!vehicle) {
    return <main className="vehicle-details-page">Véhicule introuvable</main>
  }

  return (
    <main className="vehicle-details-page">
      <Link to="/vehicles" className="back-link">
        ← Retour au catalogue
      </Link>

      <section className="vehicle-details-card">
        <div className="vehicle-gallery">
          {selectedImage ? (
            <img
              src={`http://127.0.0.1:8000${selectedImage}`}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="vehicle-details-image"
            />
          ) : (
            <div className="vehicle-details-placeholder">🚗</div>
          )}

          {vehicle.images?.length > 1 && (
            <div className="vehicle-thumbnails">
              {vehicle.images.map((img) => (
                <button
                  key={img.id}
                  className={selectedImage === img.image_url ? "active" : ""}
                  onClick={() => setSelectedImage(img.image_url)}
                >
                  <img
                    src={`http://127.0.0.1:8000${img.image_url}`}
                    alt="Miniature véhicule"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="vehicle-details-content">
          <span className={`badge-type ${vehicle.type?.toLowerCase()}`}>
            {vehicle.type?.toUpperCase()}
          </span>

          <h1>
            {vehicle.brand} {vehicle.model}
          </h1>

          <p className="vehicle-details-price">{vehicle.price} €</p>

          <div className="vehicle-details-grid">
            <div>
              <span>Marque</span>
              <strong>{vehicle.brand}</strong>
            </div>

            <div>
              <span>Modèle</span>
              <strong>{vehicle.model}</strong>
            </div>

            <div>
              <span>Année</span>
              <strong>{vehicle.year || "Non renseignée"}</strong>
            </div>

            <div>
              <span>Kilométrage</span>
              <strong>
                {vehicle.mileage ? `${vehicle.mileage} km` : "Non renseigné"}
              </strong>
            </div>

            <div>
              <span>Motorisation</span>
              <strong>{vehicle.engine || "Non renseignée"}</strong>
            </div>

            <div>
              <span>Puissance</span>
              <strong>
                {vehicle.power ? `${vehicle.power} ch` : "Non renseignée"}
              </strong>
            </div>
          </div>

          <div className="vehicle-description">
            <h2>Description</h2>
            <p>{vehicle.description || "Aucune description disponible."}</p>
          </div>
        </div>
      </section>
    </main>
  )
}