import { ref } from 'vue';

/**
 * Composable para gestionar el formulario de solicitudes
 * Maneja el estado de visibilidad y modo edición
 */
export default function useFormSolicitud() {
    const showForm = ref(false);
    const editMode = ref(false);
    const solicitudToEdit = ref(null);

    /**
     * Abrir/cerrar formulario
     * Si se cierra, resetea el modo edición
     */
    const openCloseForm = () => {
        showForm.value = !showForm.value;
        
        // Si se cierra el formulario, limpiar modo edición
        if (!showForm.value) {
            editMode.value = false;
            solicitudToEdit.value = null;
        }
    }

    /**
     * Abrir formulario en modo creación
     */
    const openCreateMode = () => {
        editMode.value = false;
        solicitudToEdit.value = null;
        showForm.value = true;
    }

    /**
     * Abrir formulario en modo edición
     * @param {Object} solicitud - Solicitud a editar
     */
    const openEditMode = (solicitud) => {
        editMode.value = true;
        solicitudToEdit.value = { ...solicitud }; // Clonar para evitar mutación
        showForm.value = true;
    }
    
    return {
        // Estado
        showForm,
        editMode,
        solicitudToEdit,
        // Métodos
        openCloseForm,
        openCreateMode,
        openEditMode
    }
}