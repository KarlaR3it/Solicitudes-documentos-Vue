<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    class="developer-icon"
  >
    <!-- Fondo del escritorio -->
    <rect x="50" y="150" width="400" height="300" rx="10" fill="#e0f2fe" class="desk" />
    
    <!-- Monitor -->
    <g class="monitor">
      <rect x="150" y="180" width="200" height="140" rx="5" fill="#1e293b" />
      <rect x="160" y="190" width="180" height="110" rx="3" fill="#0f172a" />
      
      <!-- Código en la pantalla -->
      <g class="code-lines">
        <line x1="170" y1="200" x2="220" y2="200" stroke="#10b981" stroke-width="2" class="code-line-1" />
        <line x1="170" y1="215" x2="250" y2="215" stroke="#06b6d4" stroke-width="2" class="code-line-2" />
        <line x1="170" y1="230" x2="200" y2="230" stroke="#f59e0b" stroke-width="2" class="code-line-3" />
        <line x1="170" y1="245" x2="270" y2="245" stroke="#8b5cf6" stroke-width="2" class="code-line-4" />
        <line x1="170" y1="260" x2="230" y2="260" stroke="#ec4899" stroke-width="2" class="code-line-5" />
        <line x1="170" y1="275" x2="260" y2="275" stroke="#10b981" stroke-width="2" class="code-line-6" />
      </g>
      
      <!-- Base del monitor -->
      <rect x="230" y="320" width="40" height="30" fill="#475569" />
      <rect x="210" y="350" width="80" height="5" rx="2" fill="#64748b" />
    </g>

    <!-- Laptop -->
    <g class="laptop">
      <path d="M 100 350 L 120 280 L 280 280 L 300 350 Z" fill="#334155" />
      <rect x="130" y="290" width="140" height="50" fill="#0f172a" />
      <rect x="90" y="350" width="220" height="10" rx="2" fill="#475569" />
    </g>

    <!-- Taza de café -->
    <g class="coffee-cup">
      <rect x="350" y="320" width="40" height="50" rx="5" fill="#fbbf24" class="cup" />
      <ellipse cx="370" cy="320" rx="20" ry="5" fill="#f59e0b" />
      <path d="M 390 330 Q 410 330 410 345 Q 410 360 390 360" fill="none" stroke="#f59e0b" stroke-width="3" />
      
      <!-- Vapor -->
      <g class="steam">
        <path d="M 360 310 Q 355 300 360 290" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.6" class="steam-1" />
        <path d="M 370 310 Q 365 300 370 290" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.6" class="steam-2" />
        <path d="M 380 310 Q 375 300 380 290" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.6" class="steam-3" />
      </g>
    </g>

    <!-- Planta -->
    <g class="plant">
      <rect x="70" y="330" width="30" height="40" rx="3" fill="#ef4444" />
      <ellipse cx="85" cy="320" rx="15" ry="20" fill="#10b981" class="leaf-1" />
      <ellipse cx="75" cy="315" rx="12" ry="18" fill="#059669" class="leaf-2" />
      <ellipse cx="95" cy="315" rx="12" ry="18" fill="#059669" class="leaf-3" />
    </g>

    <!-- Persona (mujer programadora) -->
    <g class="person">
      <!-- Cuerpo -->
      <ellipse cx="250" cy="120" rx="30" ry="35" fill="#8b5cf6" class="body" />
      
      <!-- Cabeza -->
      <circle cx="250" cy="70" r="25" fill="#fbbf24" class="head" />
      
      <!-- Cabello -->
      <path d="M 225 70 Q 225 45 250 45 Q 275 45 275 70 L 275 80 Q 270 85 250 85 Q 230 85 225 80 Z" fill="#1e293b" class="hair" />
      
      <!-- Brazos -->
      <line x1="220" y1="120" x2="180" y2="140" stroke="#8b5cf6" stroke-width="8" stroke-linecap="round" class="arm-left" />
      <line x1="280" y1="120" x2="320" y2="140" stroke="#8b5cf6" stroke-width="8" stroke-linecap="round" class="arm-right" />
      
      <!-- Manos en el teclado -->
      <circle cx="180" cy="140" r="6" fill="#fbbf24" class="hand-left" />
      <circle cx="320" cy="140" r="6" fill="#fbbf24" class="hand-right" />
    </g>

    <!-- Estrellas decorativas -->
    <g class="stars">
      <circle cx="80" cy="100" r="3" fill="#fbbf24" class="star-1" />
      <circle cx="420" cy="120" r="4" fill="#06b6d4" class="star-2" />
      <circle cx="400" cy="200" r="3" fill="#10b981" class="star-3" />
      <circle cx="100" cy="200" r="4" fill="#ec4899" class="star-4" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconDeveloper'
}
</script>

<style scoped>
.developer-icon {
  width: 100%;
  max-width: 500px;
  height: auto;
}

/* Animación de las líneas de código */
.code-line-1 { animation: typing 2s ease-in-out infinite; }
.code-line-2 { animation: typing 2s ease-in-out 0.2s infinite; }
.code-line-3 { animation: typing 2s ease-in-out 0.4s infinite; }
.code-line-4 { animation: typing 2s ease-in-out 0.6s infinite; }
.code-line-5 { animation: typing 2s ease-in-out 0.8s infinite; }
.code-line-6 { animation: typing 2s ease-in-out 1s infinite; }

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Animación del vapor del café */
.steam-1 { animation: steam 3s ease-in-out infinite; }
.steam-2 { animation: steam 3s ease-in-out 0.5s infinite; }
.steam-3 { animation: steam 3s ease-in-out 1s infinite; }

@keyframes steam {
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-20px); }
}

/* Animación de la taza */
.cup {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Animación de las hojas de la planta */
.leaf-1 { animation: sway 3s ease-in-out infinite; }
.leaf-2 { animation: sway 3s ease-in-out 0.5s infinite; }
.leaf-3 { animation: sway 3s ease-in-out 1s infinite; }

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

/* Animación de las manos escribiendo */
.hand-left, .hand-right {
  animation: typing-hands 1s ease-in-out infinite;
}

@keyframes typing-hands {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Animación de las estrellas */
.star-1 { animation: twinkle 2s ease-in-out infinite; }
.star-2 { animation: twinkle 2s ease-in-out 0.5s infinite; }
.star-3 { animation: twinkle 2s ease-in-out 1s infinite; }
.star-4 { animation: twinkle 2s ease-in-out 1.5s infinite; }

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Animación del monitor */
.monitor {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Animación de la persona */
.person {
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
</style>
