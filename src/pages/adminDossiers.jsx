import { useEffect, useState } from "react"
import API from "../services/api"

export default function AdminDossiers() {
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await API.get("/dossiers", {
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


  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(
        `/dossiers/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setDossiers((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      )
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la mise à jour")
    }
  }

  const filteredDossiers = dossiers.filter((dossier) => {
    const matchSearch =
      `dossier ${dossier.id}`.toLowerCase().includes(search.toLowerCase()) ||
      String(dossier.vehicle_id).includes(search)

    const matchStatus =
      statusFilter === "all" || dossier.status === statusFilter

    return matchSearch && matchStatus
  })

  const total = dossiers.length
  const enCours = dossiers.filter((d) => d.status === "en_cours").length
  const valides = dossiers.filter((d) => d.status === "validé").length
  const refuses = dossiers.filter((d) => d.status === "refusé").length

  if (loading) {
    return <main className="admin-dossiers-page">Chargement...</main>
  }

  return (
    <main className="admin-dossiers-page">
      <section className="admin-dossiers-header">
        <div>
          <p className="badge">Back-office</p>
          <h1>Dossiers clients</h1>
          <p>Gérez et suivez les demandes d’achat et de location.</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <span>📁</span>
            <strong>{total}</strong>
            <p>Total dossiers</p>
          </div>

          <div className="stat-card warning">
            <span>⏳</span>
            <strong>{enCours}</strong>
            <p>En cours</p>
          </div>

          <div className="stat-card success">
            <span>✓</span>
            <strong>{valides}</strong>
            <p>Validés</p>
          </div>

          <div className="stat-card danger">
            <span>×</span>
            <strong>{refuses}</strong>
            <p>Refusés</p>
          </div>
        </div>
      </section>

      <section className="admin-dossiers-panel">
        <div className="admin-dossiers-tools">
          <input
            type="text"
            placeholder="Rechercher un dossier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="soumis">Soumis</option>
            <option value="en_cours">En cours</option>
            <option value="validé">Validé</option>
            <option value="refusé">Refusé</option>
          </select>
        </div>

        <div className="admin-dossiers-table">
          <div className="table-header">
            <span>Dossier</span>
            <span>Client</span>
            <span>Véhicule</span>
            <span>Type</span>
            <span>Statut</span>
            <span>Message</span>
            <span>Actions</span>
          </div>

          {filteredDossiers.length === 0 ? (
            <p className="empty-state">Aucun dossier trouvé.</p>
          ) : (
            filteredDossiers.map((dossier) => (
              <div key={dossier.id} className="table-row">
                <span>
                  <strong>#{dossier.id}</strong>
                  <small>{new Date(dossier.created_at).toLocaleDateString("fr-FR")}</small>
                </span>

                <span>
                  {dossier.user_email}
                </span>

                <span>
                  {dossier.vehicle_name}
                </span>

                <span className={`badge-type ${dossier.request_type}`}>
                  {dossier.request_type?.toUpperCase()}
                </span>

                <span className={`status-pill ${dossier.status}`}>
                  {dossier.status}
                </span>

                <span className="dossier-message">
                  {dossier.message || "Aucun message"}
                </span>

                <span className="admin-actions">
                  <button onClick={() => handleUpdateStatus(dossier.id, "en_cours")}>
                    En cours
                  </button>
                  <button className="success" onClick={() => handleUpdateStatus(dossier.id, "validé")}>
                    Valider
                  </button>
                  <button className="danger" onClick={() => handleUpdateStatus(dossier.id, "refusé")}>
                    Refuser
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}