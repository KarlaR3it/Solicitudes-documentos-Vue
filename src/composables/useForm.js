import { ref } from 'vue';

/**
 * Composable genérico para gestionar formularios
 * Maneja el estado de visibilidad y modo edición
 * Reutilizable para cualquier tipo de formulario (solicitudes, documentos, etc.)
 */
export default function useForm() {
  const showForm = ref(false);
  const editMode = ref(false);
  const itemToEdit = ref(null);

  /**
   * Abrir/cerrar formulario
   * Si se cierra, resetea el modo edición
   */
  const openCloseForm = () => {
    showForm.value = !showForm.value;
    
    // Si se cierra el formulario, limpiar modo edición
    if (!showForm.value) {
      editMode.value = false;
      itemToEdit.value = null;
    }
  };

  /**
   * Abrir formulario en modo creación
   */
  const openCreateMode = () => {
    editMode.value = false;
    itemToEdit.value = null;
    showForm.value = true;
  };

  /**
   * Abrir formulario en modo edición
   * @param {Object} item - Item a editar (solicitud, documento, etc.)
   */
  const openEditMode = (item) => {
    editMode.value = true;
    itemToEdit.value = { ...item }; // Clonar para evitar mutación
    showForm.value = true;
  };
  
  return {
    // Estado
    showForm,
    editMode,
    itemToEdit,
    // Métodos
    openCloseForm,
    openCreateMode,
    openEditMode
  };
}
