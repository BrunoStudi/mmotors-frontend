import { useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      await API.post("/auth/register", { email, password })
      setMessage("Compte créé avec succès. Vous pouvez maintenant vous connecter.")
      setEmail("")
      setPassword("")
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur lors de la création du compte.")
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="badge">Espace client</p>
          <h1>Créer un compte</h1>
          <p>
            Créez votre espace personnel pour déposer un dossier d’achat ou de
            location longue durée.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Adresse email
            <input
              type="email"
              placeholder="client@mmotors.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="btn primary full" type="submit">
            Créer mon compte
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p className="auth-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  )
}