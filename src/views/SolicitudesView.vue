<template>
  <div class="solicitudes-view">
    <SolicitudForm
      :showForm="showForm"
      :editMode="editMode"
      :solicitudToEdit="solicitudToEdit"
      :openCloseForm="openCloseForm"
      :reloadSolicitudes="reloadSolicitudes"
    />
    <SolicitudList
      :solicitudes="solicitudes"
      :reloadSolicitudes="reloadSolicitudes"
      :showForm="showForm"
      :openCloseForm="openCreateMode"
      @edit-solicitud="handleEditSolicitud"
    />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { SolicitudForm, SolicitudList } from '../components/solicitudes';
import useForm from '../composables/useForm';
import { useSolicitudesStore } from '../stores/solicitudes.store';

export default {
  name: 'SolicitudesView',
  components: {
    SolicitudForm,
    SolicitudList,
  },
  setup() {
    const solicitudesStore = useSolicitudesStore();
    const { solicitudes } = storeToRefs(solicitudesStore);
    
    const { showForm, editMode, itemToEdit: solicitudToEdit, openCloseForm, openCreateMode, openEditMode } = useForm();

    const reloadSolicitudes = async () => {
      await solicitudesStore.fetchSolicitudes();
    };

    const handleEditSolicitud = (solicitud) => {
      openEditMode(solicitud);
    };

    onMounted(() => {
      solicitudesStore.fetchSolicitudes();
    });

    return {
      solicitudes,
      showForm,
      editMode,
      solicitudToEdit,
      openCloseForm,
      openCreateMode,
      reloadSolicitudes,
      handleEditSolicitud,
    };
  },
};
</script>

<style scoped>
.solicitudes-view {
  padding: 0;
}
</style>
