import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await API.post(
        "/auth/token",
        new URLSearchParams({
          username: email,
          password: password,
        })
      )

      const token = response.data.access_token

      localStorage.setItem("token", token)

      navigate("/") // redirection après login
    } catch (err) {
      setError("Identifiants invalides")
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="badge">Espace client</p>
          <h1>Connexion</h1>
          <p>
            Connectez-vous pour accéder à votre espace et gérer vos demandes.
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
            Se connecter
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="auth-link">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </section>
    </main>
  )
}