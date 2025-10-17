import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  getSolicitudesApi, 
  saveSolicitudApi, 
  deleteSolicitudApi,
  updateSolicitudApi
} from '../api/solicitud'

/**
 * Store de Solicitudes - Patrón Composition API
 * Maneja el estado global de las solicitudes
 */
export const useSolicitudesStore = defineStore('solicitudes', () => {
  
  // ============================================
  // STATE (Estado reactivo)
  // ============================================
  const solicitudes = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // ============================================
  // GETTERS (Propiedades computadas)
  // ============================================
  
  /**
   * Cantidad total de solicitudes
   */
  const solicitudesCount = computed(() => solicitudes.value.length)

  /**
   * Solicitudes filtradas por estado
   */
  const solicitudesPorEstado = computed(() => (estado) => {
    return solicitudes.value.filter(s => s.estado === estado)
  })

  /**
   * Solicitudes pendientes
   */
  const solicitudesPendientes = computed(() => 
    solicitudes.value.filter(s => s.estado === 'pendiente')
  )

  /**
   * Solicitudes aprobadas
   */
  const solicitudesAprobadas = computed(() => 
    solicitudes.value.filter(s => s.estado === 'aprobado')
  )

  // ============================================
  // ACTIONS (Métodos/Funciones)
  // ============================================

  /**
   * Obtener todas las solicitudes
   */
  const fetchSolicitudes = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Obtener solicitudes y ordenar de más reciente a más antigua
      const data = await getSolicitudesApi()
      solicitudes.value = data.reverse()
    } catch (err) {
      error.value = err.message || 'Error al cargar solicitudes'
      console.error('Error en fetchSolicitudes:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Crear una nueva solicitud
   * @param {Object} solicitudData - Datos de la solicitud
   */
  const createSolicitud = async (solicitudData) => {
    isLoading.value = true
    error.value = null
    
    try {
      await saveSolicitudApi(solicitudData)
      // Recargar solicitudes después de crear
      await fetchSolicitudes()
      return { success: true }
    } catch (err) {
      error.value = err.message || 'Error al crear solicitud'
      console.error('Error en createSolicitud:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Actualizar una solicitud existente
   * @param {string} id - ID de la solicitud
   * @param {Object} solicitudData - Datos actualizados
   */
  const updateSolicitud = async (id, solicitudData) => {
    isLoading.value = true
    error.value = null
    
    try {
      await updateSolicitudApi(id, solicitudData)
      // Recargar solicitudes después de actualizar
      await fetchSolicitudes()
      return { success: true }
    } catch (err) {
      error.value = err.message || 'Error al actualizar solicitud'
      console.error('Error en updateSolicitud:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Eliminar una solicitud
   * @param {string} id - ID de la solicitud a eliminar
   */
  const deleteSolicitud = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      await deleteSolicitudApi(id)
      // Recargar solicitudes después de eliminar
      await fetchSolicitudes()
      return { success: true }
    } catch (err) {
      error.value = err.message || 'Error al eliminar solicitud'
      console.error('Error en deleteSolicitud:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Buscar solicitud por ID
   * @param {string} id - ID de la solicitud
   */
  const getSolicitudById = (id) => {
    return solicitudes.value.find(s => s.id === id)
  }

  /**
   * Limpiar errores
   */
  const clearError = () => {
    error.value = null
  }

  // ============================================
  // RETURN (Exponer estado y métodos)
  // ============================================
  return {
    // State
    solicitudes,
    isLoading,
    error,
    
    // Getters
    solicitudesCount,
    solicitudesPorEstado,
    solicitudesPendientes,
    solicitudesAprobadas,
    
    // Actions
    fetchSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    getSolicitudById,
    clearError
  }
})
