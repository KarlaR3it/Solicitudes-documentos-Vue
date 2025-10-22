import { ref, watch, onMounted } from 'vue'

/**
 * Composable para manejar el tema claro/oscuro de la interfaz
 * Persiste la preferencia del usuario en localStorage
 */
export default function useTheme() {
  const isDarkMode = ref(false)
  const THEME_KEY = 'solicitudes-vue-theme'

  /**
   * Aplica el tema al documento
   */
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }

  /**
   * Cambia entre tema claro y oscuro
   */
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  /**
   * Establece el tema directamente
   */
  const setTheme = (dark) => {
    isDarkMode.value = dark
  }

  /**
   * Carga la preferencia de tema desde localStorage
   */
  const loadThemePreference = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme !== null) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDarkMode.value = prefersDark
    }
  }

  // Observar cambios en isDarkMode y aplicar el tema
  watch(isDarkMode, (newValue) => {
    applyTheme(newValue)
    localStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light')
  })

  // Cargar preferencia al montar
  onMounted(() => {
    loadThemePreference()
    applyTheme(isDarkMode.value)
  })

  return {
    isDarkMode,
    toggleTheme,
    setTheme
  }
}
