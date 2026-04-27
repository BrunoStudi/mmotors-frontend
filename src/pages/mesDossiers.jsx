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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <h1>Mes dossiers</h1>

      {dossiers.length === 0 ? (
        <p>Aucun dossier pour le moment.</p>
      ) : (
        dossiers.map((dossier) => (
          <div key={dossier.id} className="dossier-card">
            <h2>Dossier #{dossier.id}</h2>
            <p>Type : {dossier.request_type}</p>
            <p>Statut : {dossier.status}</p>
            <p>Message : {dossier.message}</p>
          </div>
        ))
      )}
    </main>
  )
}