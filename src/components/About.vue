<template>
  <div class="about-container">
    <div class="profile-card">
      <!-- Header con foto y nombre -->
      <div class="profile-header">
        <div class="profile-image-container">
          <img 
            :src="profileImage" 
            alt="Foto de perfil"
            class="profile-image"
          />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">Karla Ramírez</h1>
          <p class="profile-title">
            <i class="pi pi-briefcase mr-2"></i>
            Desarrolladora Full Stack Trainee
          </p>
          <p class="profile-location">
            <i class="pi pi-map-marker mr-2"></i>
            Santiago, Chile
          </p>
          <div class="profile-contact">
            <a href="https://linkedin.com/in/karla-r-4b3802194" target="_blank" class="contact-link" v-tooltip="'LinkedIn'">
              <i class="pi pi-linkedin"></i>
            </a>
            <a href="https://github.com/KarlaR3it" target="_blank" class="contact-link" v-tooltip="'GitHub'">
              <i class="pi pi-github"></i>
            </a>
            <a href="mailto:karla.ramirez@3it.cl" class="contact-link" v-tooltip="'Email'">
              <i class="pi pi-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Contenido del perfil -->
      <div class="profile-content">
        <!-- Bio -->
        <div class="profile-section">
          <h2 class="section-title">
            <i class="pi pi-user mr-2"></i>
            Acerca de Mí
          </h2>
          <p class="section-text">
            Desarrolladora Full Stack Trainee apasionada por crear soluciones tecnológicas innovadoras y eficientes. 
            Con experiencia en el desarrollo de aplicaciones web modernas utilizando Vue.js, React, Node.js 
            y bases de datos relacionales. Me especializo en crear interfaces de usuario intuitivas y 
            experiencias digitales que resuelven problemas reales.
          </p>
        </div>

        <!-- Skills Técnicas -->
        <div class="profile-section">
          <h2 class="section-title">
            <i class="pi pi-code mr-2"></i>
            Habilidades Técnicas
          </h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3 class="skill-category-title">Frontend</h3>
              <div class="skill-tags">
                <Tag value="Vue.js" severity="success" />
                <Tag value="React" severity="info" />
                <Tag value="JavaScript" severity="warning" />
                <Tag value="CSS3" severity="primary" />
                <Tag value="HTML5" severity="secondary" />
              </div>
            </div>

            <div class="skill-category">
              <h3 class="skill-category-title">Backend</h3>
              <div class="skill-tags">
                <Tag value="Springboot" severity="success" />
                <Tag value="Flask" severity="secondary" />
                <Tag value="MySQL" severity="info" />
                <Tag value="REST APIs" severity="warning" />
              </div>
            </div>

            <div class="skill-category">
              <h3 class="skill-category-title">Herramientas</h3>
              <div class="skill-tags">
                <Tag value="Git" severity="danger" />
                <Tag value="Docker" severity="info" />
                <Tag value="VS Code" severity="primary" />
                <Tag value="Postman" severity="warning" />
              </div>
            </div>
          </div>
        </div>

        <!-- Intereses -->
        <div class="profile-section">
          <h2 class="section-title">
            <i class="pi pi-heart mr-2"></i>
            Intereses
          </h2>
          <div class="interests-grid">
            <div class="interest-item">
              <i class="pi pi-mobile"></i>
              <span>Desarrollo de Software</span>
            </div>
            <div class="interest-item">
              <i class="pi pi-chart-line"></i>
              <span>Data Science</span>
            </div>
            <div class="interest-item">
              <i class="pi pi-palette"></i>
              <span>UI/UX Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "primevue/tag";

export default {
  name: "About",
  components: {
    Tag,
  },
  data() {
    return {
      profileImage: new URL('@/assets/profile-photo.jpeg', import.meta.url).href
    };
  },
};
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-card {
  background: var(--p-surface-0);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Header */
.profile-header {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: white;
}

.profile-image-container {
  flex-shrink: 0;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 10%;
  border: 3px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
}

.profile-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  opacity: 0.95;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-location {
  font-size: 0.95rem;
  margin: 0.5rem 0;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-contact {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.contact-link:hover {
  background: white;
  color: #4f46e5;
  transform: translateY(-2px);
}

/* Content */
.profile-content {
  padding: 2rem;
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section:last-child {
  margin-bottom: 0;
}

.section-title {
  color: var(--p-primary-color);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--p-primary-color);
  display: flex;
  align-items: center;
  gap: 5px;
}

.section-text {
  color: var(--p-text-color);
  line-height: 1.8;
  margin: 0;
  text-align: justify;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category {
  background: var(--p-surface-50);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--p-primary-color);
}

.skill-category-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0 0 1rem 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Interests */
.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.interest-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--p-surface-50);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: default;
}

.interest-item:hover {
  background: var(--p-primary-50);
  color: var(--p-primary-color);
  transform: translateY(-2px);
}

.interest-item i {
  font-size: 1.5rem;
  color: var(--p-primary-color);
}

.interest-item span {
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 1.75rem;
  }

  .profile-title,
  .profile-location {
    justify-content: center;
  }

  .profile-contact {
    justify-content: center;
  }

  .profile-content {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .interests-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
}

/* Animaciones */
.profile-section {
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
</style>
