import { useEffect, useState } from "react"
import API from "../services/api"

export default function MyDossiers() {
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDossiers = async () => {
      const token = localStorage.getItem("token")

      try {
        const res = await API.get("/dossiers/me", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setDossiers(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDossiers()
  }, [])

  if (loading) {
    return <main className="dossiers-page">Chargement...</main>
  }

  return (
    <main className="dossiers-page">
      <div className="dossiers-header">
        <p className="badge">Espace client</p>
        <h1>Mes dossiers</h1>
        <p>Suivez l’évolution de vos demandes.</p>
      </div>

      <div className="dossiers-grid">
        {dossiers.length === 0 ? (
          <p>Aucun dossier pour le moment.</p>
        ) : (
          dossiers.map((dossier) => (
            <article key={dossier.id} className="dossier-card dossier-card-with-image">
              {dossier.vehicle_image ? (
                <img
                  src={`http://127.0.0.1:8000${dossier.vehicle_image}`}
                  alt={dossier.vehicle_name}
                  className="dossier-image"
                />
              ) : (
                <div className="dossier-placeholder">🚗</div>
              )}

              <div className="dossier-content">
                <div className="dossier-top">
                  <span className={`badge-type ${dossier.request_type}`}>
                    {dossier.request_type.toUpperCase()}
                  </span>

                  <span className={`status-pill ${dossier.status}`}>
                    {dossier.status}
                  </span>
                </div>

                <h2>{dossier.vehicle_name}</h2>

                <p className="dossier-message">
                  {dossier.message || "Aucun message"}
                </p>

                <small className="dossier-date">
                  {new Date(dossier.created_at).toLocaleDateString("fr-FR")}
                </small>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  )
}