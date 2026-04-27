import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  let isAdmin = false

  if (token) {
    isAdmin = JSON.parse(atob(token.split(".")[1])).role === "admin"
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        M-Motors
      </Link>

      <div className="navbar-links">
        <Link to="/">Accueil</Link>
        <Link to="/vehicles">Véhicules</Link>

        {token && (
          <Link to={isAdmin ? "/admin/dossiers" : "/mes-dossiers"}>
            {isAdmin ? "Dossiers clients" : "Mes dossiers"}
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    </nav>
  )
}