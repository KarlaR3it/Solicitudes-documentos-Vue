<template>
  <footer class="footer-mockup">
    <div class="footer-container">
      <!-- Información del creador -->
      <div class="footer-info">
        <p class="footer-text">
          <span class="footer-label">Creado por</span>
          <strong class="footer-name">Karla Ramírez</strong>
        </p>
        <p class="footer-subtitle">Desarrolladora Trainee del Programa Eureka</p>
      </div>

      <!-- Enlaces de contacto -->
      <div class="footer-social">
        <a
          href="https://www.linkedin.com/in/karla-r-4b3802194"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <i class="pi pi-linkedin"></i>
        </a>
        <a
          href="https://wa.me/56912345678"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <i class="pi pi-whatsapp"></i>
        </a>
        <a
          href="mailto:karla.ramirez@3it.cl"
          class="social-link"
          aria-label="Email"
          title="Email"
        >
          <i class="pi pi-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer-mockup {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
  border-top: none;
  padding: 1.5rem 1rem;
  position: relative;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.footer-info {
  flex: 1;
}

.footer-text {
  color: white;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-label {
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 400;
}

.footer-name {
  background: linear-gradient(45deg, #79fff4, #a6f8ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.1rem;
}

.footer-subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 0.875rem;
  font-style: italic;
}

.footer-social {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.5rem;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.social-link i {
  font-size: 1.5rem;
}

/* Animación de entrada */
.footer-mockup {
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-info {
    order: 2;
  }

  .footer-social {
    order: 1;
  }

  .footer-text {
    flex-direction: column;
    gap: 0.25rem;
  }

  .social-link {
    width: 44px;
    height: 44px;
  }

  .social-link i {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .footer-mockup {
    padding: 1rem;
  }

  .footer-name {
    font-size: 1rem;
  }

  .footer-subtitle {
    font-size: 0.75rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-link i {
    font-size: 1.2rem;
  }
}
</style>
