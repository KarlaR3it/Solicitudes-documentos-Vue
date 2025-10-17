<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <!-- Texto principal -->
        <div class="hero-text">
          <h1 class="hero-title">
            Gestión de
            <span class="highlight">Solicitudes y Documentos</span>
          </h1>
          <p class="hero-description">
            Administra solicitudes de empleo y documentos asociados de forma simple y eficiente.
          </p>
          
          <!-- Badges de características -->
          <div class="features-badges">
            <div class="badge">
              <i class="pi pi-check-circle"></i>
              <span>Fácil</span>
            </div>
            <div class="badge">
              <i class="pi pi-bolt"></i>
              <span>Rápido</span>
            </div>
            <div class="badge">
              <i class="pi pi-shield"></i>
              <span>Seguro</span>
            </div>
          </div>

          <!-- Sección de cómo empezar -->
          <div class="getting-started-inline">
      
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Abre el menú</h4>
            <p>Haz clic en <i class="pi pi-bars"></i> arriba a la izquierda</p>
          </div>
        </div>

        <div class="step-arrow">
          <i class="pi pi-arrow-right"></i>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Elige una sección</h4>
            <p>Selecciona "Solicitudes" o "Documentos"</p>
          </div>
        </div>

        <div class="step-arrow">
          <i class="pi pi-arrow-right"></i>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>¡Listo!</h4>
            <p>Crea y gestiona tu información fácilmente</p>
          </div>
        </div>
      </div>
    </div>
        </div>

        <!-- Imagen -->
        <div class="hero-image">
          <img src="/programming.svg" alt="Ilustración de programación" class="main-illustration" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.home-view {
  width: 100%;
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Hero Section */
.hero-section {
  padding: 2rem 2rem 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.features-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #475569;
}

.badge i {
  color: #10b981;
}

.hero-image {
  display: flex;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
  margin-left: 20px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.main-illustration {
  width: 100%;
  max-width: 600px;
  height: auto;
}

/* Features Section */
.features-section {
  padding: 3rem 2rem;
  background: #f8fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.feature-icon i {
  font-size: 1.8rem;
  color: white;
}

.feature-icon.solicitudes {
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
}

.feature-icon.documentos {
  background: linear-gradient(135deg, #06b6d4, #10b981);
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Getting Started Section */
.getting-started-inline {
  margin-top: 4rem;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
}

.step {
  flex: 0 0 auto;
  text-align: center;
  max-width: 180px;
}

.step-number {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem auto;
}

.step-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.step-content p {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
}

.step-arrow {
  color: #cbd5e1;
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-image {
    order: -1;
  }

  .features-badges {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .step-arrow {
    display: none;
  }

  .steps-container {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem;
  }
  
  .getting-started-section {
    padding: 0 1rem 1.5rem 1rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}
</style>