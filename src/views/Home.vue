<template>
  <div class="home-view">
    <div class="welcome-container">
      <!-- Imagen de bienvenida -->
      <div class="welcome-image">
        <img
          src="/welcome.jpg"
          alt="Imagen de bienvenida"
          class="welcome-img"
        />
      </div>

      <!-- Texto de bienvenida -->
      <p class="welcome-text">
        ¡Hola! Utiliza el menú de navegación para acceder a las diferentes
        secciones del sistema
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: var(--spacing-xl) var(--spacing-md);
}

.welcome-container {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.welcome-image {
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: center;
}

.welcome-img {
  width: 600px;
  height: auto;
  max-width: 100%;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.welcome-text {
  font-size: 1.2rem;
  color: var(--p-text-color);
  line-height: 1.6;
  margin: 0;
  font-weight: var(--font-weight-normal);
}

@media (max-width: 768px) {
  .welcome-img {
    width: 250px;
  }
  .welcome-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .home-view {
    min-height: 60vh;
    padding: var(--spacing-md);
  }
  .welcome-img {
    width: 200px;
  }
  .welcome-text {
    font-size: 1rem;
  }
}
</style>