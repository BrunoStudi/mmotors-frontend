import { Link } from "react-router-dom"
import { BadgeEuro, CarFront, FileCheck, Wrench } from "lucide-react"

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="badge">Depuis 1987</p>

          <h1>M-Motors</h1>

          <h2>Achat & location longue durée de véhicules d’occasion</h2>

          <p className="hero-text">
            Trouvez le véhicule adapté à votre budget, déposez votre dossier en
            ligne et suivez son avancement depuis votre espace client.
          </p>

          <div className="hero-actions">
            <Link to="/vehicles" className="btn primary">
              Voir les véhicules
            </Link>

            <Link to="/register" className="btn secondary">
              Créer un compte
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="car-image">
            <span>🚗</span>
          </div>

          <div className="premium-title">
            <Wrench size={28} />
            <h3>Service premium</h3>
          </div>

          <ul>
            <li>Véhicules contrôlés</li>
            <li>Achat ou location</li>
            <li>Dossier 100% dématérialisé</li>
            <li>Suivi en ligne</li>
          </ul>
        </div>
      </section>

      <section className="features">
        <article>
          <div className="feature-title">
            <div className="feature-icon">
              <BadgeEuro size={26} />
            </div>
            <h3>Achat</h3>
          </div>
          <p>Consultez les véhicules disponibles à la vente.</p>
        </article>

        <article>
          <div className="feature-title">
            <div className="feature-icon">
              <CarFront size={26} />
            </div>
            <h3>Location</h3>
          </div>
          <p>Profitez d’une location longue durée avec option d’achat.</p>
        </article>

        <article>
          <div className="feature-title">
            <div className="feature-icon">
              <FileCheck size={26} />
            </div>
            <h3>Suivi dossier</h3>
          </div>
          <p>Suivez l’évolution de votre demande depuis votre espace client.</p>
        </article>
      </section>
    </main >
  )
}