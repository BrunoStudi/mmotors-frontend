import { useEffect, useState } from "react"
import API from "../services/api"

export default function MyDossiers() {
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState({})


  const fetchDocuments = async (dossierId) => {
    const token = localStorage.getItem("token")

    try {
      const res = await API.get(`/documents/${dossierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setDocuments((prev) => ({
        ...prev,
        [dossierId]: res.data,
      }))
    } catch (err) {
      console.error(err)
    }
  }
  
  useEffect(() => {
    const fetchDossiers = async () => {
      const token = localStorage.getItem("token")

      try {
        const res = await API.get("/dossiers/me", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setDossiers(res.data)
        res.data.forEach((d) => fetchDocuments(d.id))
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

  const handleUploadDocument = async (dossierId, file) => {
    if (!file) return

    const token = localStorage.getItem("token")
    const formData = new FormData()

    formData.append("file", file)

    try {
      await API.post(`/documents/${dossierId}/documents`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      alert("Document ajouté avec succès.")
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l’ajout du document.")
    }
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
                  src={`${import.meta.env.VITE_API_URL}${dossier.vehicle_image}`}
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
                {dossier.status !== "refusé" ? (
                  <label className="document-upload">
                    Ajouter un document
                    <input
                      type="file"
                      onChange={(e) =>
                        handleUploadDocument(dossier.id, e.target.files[0])
                      }
                    />
                  </label>
                ) : (
                  <p className="upload-disabled">
                    Dossier refusé — ajout de documents désactivé
                  </p>
                )}
                <div className="dossier-documents">
                  {documents[dossier.id]?.length > 0 ? (
                    documents[dossier.id].map((doc) => (
                      <a
                        key={doc.id}
                        href={`${import.meta.env.VITE_API_URL}${doc.file_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="document-link"
                      >
                        📄 {doc.filename}
                      </a>
                    ))
                  ) : (
                    <p className="no-doc">Aucun document</p>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  )
}