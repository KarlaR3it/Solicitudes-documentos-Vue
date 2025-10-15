<template>
  <BaseForm
    :visible="showForm"
    :title="editMode ? 'Editar Solicitud' : 'Nueva Solicitud'"
    :title-icon="editMode ? 'pi pi-pencil' : 'pi pi-file-plus'"
    :submit-label="editMode ? 'Actualizar Solicitud' : 'Crear Solicitud'"
    submit-icon="pi pi-check"
    :is-valid="isFormValid"
    :loading="loading"
    @submit="sendSolicitud"
    @cancel="openCloseForm"
  >
    <!-- Información Básica -->
    <BaseFormSection title="Información Básica">
      <BaseField label="Título" required :error="errors.titulo">
        <InputText
          v-model="solicitud.titulo"
          placeholder="Ingresa el título de la solicitud"
          class="w-full"
          :class="{ 'p-invalid': errors.titulo }"
        />
      </BaseField>

      <div class="grid">
        <BaseField label="Estado" required cols="12 md:col-6">
          <Select
            v-model="solicitud.estado"
            :options="estadoOptions"
            placeholder="Selecciona el estado"
            class="w-full"
          />
        </BaseField>

        <BaseField label="Área" required cols="12 md:col-6">
          <Select
            v-model="solicitud.area"
            :options="areaOptions"
            placeholder="Selecciona el área"
            class="w-full"
          />
        </BaseField>
      </div>

      <div class="grid">
        <BaseField label="País" required cols="12 md:col-6">
          <Select
            v-model="solicitud.pais"
            :options="paisOptions"
            placeholder="Selecciona el país"
            class="w-full"
          />
        </BaseField>

        <BaseField
          label="Localización"
          cols="12 md:col-6"
          hint="Ciudad o región específica"
        >
          <InputText
            v-model="solicitud.localizacion"
            placeholder="Ej: Santiago, Valparaíso"
            class="w-full"
          />
        </BaseField>
      </div>

      <BaseField label="Descripción" required>
        <Textarea
          v-model="solicitud.descripcion"
          placeholder="Escribe una descripción detallada del puesto"
          rows="4"
          class="w-full"
        />
      </BaseField>
    </BaseFormSection>

    <!-- Detalles del Puesto -->
    <BaseFormSection title="Detalles del Puesto">
      <div class="grid">
        <BaseField label="Número de Vacantes" required cols="12 md:col-6">
          <InputNumber
            v-model="solicitud.numeroVacantes"
            :min="1"
            :max="100"
            placeholder="Cantidad de vacantes"
            class="w-full"
          />
        </BaseField>

        <BaseField label="Nivel de Experiencia" required cols="12 md:col-6">
          <Select
            v-model="solicitud.nivelExperiencia"
            :options="nivelExperienciaOptions"
            placeholder="Selecciona el nivel"
            class="w-full"
          />
        </BaseField>
      </div>

      <BaseField
        label="Base Educacional"
        required
        hint="Título, certificaciones, etc."
      >
        <Textarea
          v-model="solicitud.baseEducacional"
          placeholder="Requisitos educacionales mínimos"
          rows="3"
          class="w-full"
        />
      </BaseField>

      <BaseField
        label="Conocimientos Excluyentes"
        required
        hint="Conocimientos técnicos indispensables"
      >
        <Textarea
          v-model="solicitud.conocimientosExcluyentes"
          placeholder="Tecnologías, herramientas o habilidades obligatorias"
          rows="3"
          class="w-full"
        />
      </BaseField>
    </BaseFormSection>

    <!-- Condiciones Laborales -->
    <BaseFormSection title="Condiciones Laborales">
      <div class="grid">
        <BaseField
          label="Renta Desde"
          required
          cols="12 md:col-6"
          :error="errors.rentaDesde"
        >
          <InputNumber
            v-model="solicitud.rentaDesde"
            mode="currency"
            currency="CLP"
            locale="es-CL"
            :min="0"
            placeholder="Renta mínima"
            class="w-full"
            :class="{ 'p-invalid': errors.rentaDesde }"
          />
        </BaseField>

        <BaseField
          label="Renta Hasta"
          required
          cols="12 md:col-6"
          :error="errors.rentaHasta"
        >
          <InputNumber
            v-model="solicitud.rentaHasta"
            mode="currency"
            currency="CLP"
            locale="es-CL"
            :min="solicitud.rentaDesde || 0"
            placeholder="Renta máxima"
            class="w-full"
            :class="{ 'p-invalid': errors.rentaHasta }"
          />
        </BaseField>
      </div>

      <div class="grid">
        <BaseField label="Modalidad de Trabajo" required cols="12 md:col-4">
          <Select
            v-model="solicitud.modalidadTrabajo"
            :options="modalidadTrabajoOptions"
            placeholder="Modalidad"
            class="w-full"
          />
        </BaseField>

        <BaseField label="Tipo de Servicio" required cols="12 md:col-4">
          <Select
            v-model="solicitud.tipoServicio"
            :options="tipoServicioOptions"
            placeholder="Tipo"
            class="w-full"
          />
        </BaseField>

        <BaseField
          label="Fecha Inicio Proyecto"
          required
          cols="12 md:col-4"
          hint="Debe ser una fecha futura"
        >
          <DatePicker
            v-model="solicitud.fechaInicioProyecto"
            placeholder="dd/mm/aaaa"
            dateFormat="dd/mm/yy"
            :minDate="new Date()"
            class="w-full"
          />
        </BaseField>
      </div>

      <BaseField
        label="Usuario ID"
        required
        hint="ID del usuario responsable de la solicitud"
      >
        <InputNumber
          v-model="solicitud.usuarioId"
          placeholder="ID del usuario"
          :min="1"
          class="w-full"
        />
      </BaseField>
    </BaseFormSection>
  </BaseForm>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useSolicitudesStore } from "../../stores/solicitudes.store";

// Importar componentes base
import BaseForm from "../common/BaseForm.vue";
import BaseFormSection from "../common/BaseFormSection.vue";
import BaseField from "../common/BaseField.vue";

// Importar componentes PrimeVue específicos
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";

export default {
  name: "SolicitudForm",
  components: {
    BaseForm,
    BaseFormSection,
    BaseField,
    InputNumber,
    Select,
    DatePicker,
  },
  props: {
    showForm: Boolean,
    openCloseForm: Function,
    reloadSolicitudes: Function,
    editMode: Boolean,
    solicitudToEdit: Object,
  },
  setup(props) {
    const toast = useToast();
    const loading = ref(false);
    const errors = ref({});
    
    // Store de Pinia
    const solicitudesStore = useSolicitudesStore();

    // Modelo de datos reactivo
    const solicitud = reactive({
      titulo: "",
      estado: "",
      area: "",
      pais: "",
      localizacion: "",
      numeroVacantes: 1,
      descripcion: "",
      baseEducacional: "",
      conocimientosExcluyentes: "",
      rentaDesde: 0,
      rentaHasta: 0,
      modalidadTrabajo: "",
      tipoServicio: "",
      nivelExperiencia: "",
      fechaInicioProyecto: null,
      usuarioId: null,
    });

    // Opciones para los dropdowns
    const estadoOptions = [
      "Borrador",
      "Publicado",
      "En Revisión",
      "Aprobado",
      "Rechazado",
      "Cerrado",
    ];

    const areaOptions = [
      "Tecnología",
      "Recursos Humanos",
      "Marketing",
      "Ventas",
      "Finanzas",
      "Operaciones",
      "Legal",
      "Administración",
    ];

    const paisOptions = [
      "Chile",
      "Argentina",
      "Perú",
      "Colombia",
      "México",
      "España",
      "Estados Unidos",
      "Brasil",
    ];

    const nivelExperienciaOptions = [
      "Junior (0-2 años)",
      "Semi Senior (2-4 años)",
      "Senior (4-7 años)",
      "Lead (7+ años)",
      "Manager (5+ años)",
    ];

    const modalidadTrabajoOptions = ["Presencial", "Remoto", "Híbrido"];

    const tipoServicioOptions = [
      "Tiempo Completo",
      "Medio Tiempo",
      "Por Proyecto",
      "Consultoría",
      "Freelance",
    ];

    // Validaciones con mensajes específicos
    const validateForm = () => {
      errors.value = {};

      if (!solicitud.titulo?.trim()) {
        errors.value.titulo = "El título es obligatorio";
      }

      if (solicitud.rentaDesde <= 0) {
        errors.value.rentaDesde = "La renta mínima debe ser mayor a 0";
      }

      if (solicitud.rentaHasta <= solicitud.rentaDesde) {
        errors.value.rentaHasta =
          "La renta máxima debe ser mayor que la mínima";
      }

      return Object.keys(errors.value).length === 0;
    };

    // Validación del formulario
    const isFormValid = computed(() => {
      const requiredFields = [
        "titulo",
        "estado",
        "area",
        "pais",
        "descripcion",
        "baseEducacional",
        "conocimientosExcluyentes",
        "modalidadTrabajo",
        "tipoServicio",
        "nivelExperiencia",
        "fechaInicioProyecto",
        "usuarioId",
      ];

      const hasRequiredFields = requiredFields.every((field) => {
        const value = solicitud[field];
        return (
          value !== null &&
          value !== undefined &&
          (typeof value === "string" ? value.trim() : value)
        );
      });

      const hasValidNumbers =
        solicitud.numeroVacantes > 0 &&
        solicitud.rentaDesde > 0 &&
        solicitud.rentaHasta > solicitud.rentaDesde;

      return (
        hasRequiredFields &&
        hasValidNumbers &&
        Object.keys(errors.value).length === 0
      );
    });

    // Cargar datos de solicitud a editar
    const loadSolicitudData = (solicitudData) => {
      if (!solicitudData) return;
      
      Object.keys(solicitud).forEach((key) => {
        if (key === 'fechaInicioProyecto' && solicitudData[key]) {
          // Convertir string a Date para el DatePicker
          solicitud[key] = new Date(solicitudData[key]);
        } else if (solicitudData[key] !== undefined) {
          solicitud[key] = solicitudData[key];
        }
      });
    };

    // Resetear formulario
    const resetForm = () => {
      Object.keys(solicitud).forEach((key) => {
        if (key === "numeroVacantes") {
          solicitud[key] = 1;
        } else if (key === "rentaDesde" || key === "rentaHasta") {
          solicitud[key] = 0;
        } else if (key === "usuarioId") {
          solicitud[key] = null;
        } else {
          solicitud[key] = "";
        }
      });
      solicitud.fechaInicioProyecto = null;
    };

    const sendSolicitud = async () => {
      // Validar formulario antes de enviar
      if (!validateForm()) {
        toast.add({
          severity: "warn",
          summary: "Formulario incompleto",
          detail: "Por favor corrige los errores marcados en rojo",
          life: 4000,
        });
        return;
      }

      loading.value = true;

      try {
        // Preparar datos para envío
        const solicitudData = {
          ...solicitud,
          titulo: solicitud.titulo.trim(),
          descripcion: solicitud.descripcion.trim(),
          baseEducacional: solicitud.baseEducacional.trim(),
          conocimientosExcluyentes: solicitud.conocimientosExcluyentes.trim(),
          localizacion: solicitud.localizacion?.trim() || "",
          fechaInicioProyecto: solicitud.fechaInicioProyecto
            .toISOString()
            .split("T")[0],
        };

        // Crear o actualizar según el modo
        if (props.editMode && props.solicitudToEdit) {
          // MODO EDICIÓN
          await solicitudesStore.updateSolicitud(
            props.solicitudToEdit.id,
            solicitudData
          );
          
          toast.add({
            severity: "success",
            summary: "¡Solicitud actualizada!",
            detail: `La solicitud "${solicitudData.titulo}" fue actualizada exitosamente`,
            life: 4000,
          });
        } else {
          // MODO CREACIÓN
          await solicitudesStore.createSolicitud(solicitudData);
          
          toast.add({
            severity: "success",
            summary: "¡Solicitud creada!",
            detail: `La solicitud "${solicitudData.titulo}" fue creada exitosamente`,
            life: 4000,
          });
        }

        // Éxito: resetear y cerrar
        resetForm();
        props.openCloseForm();
      } catch (error) {
        console.error("Error al guardar solicitud:", error);

        toast.add({
          severity: "error",
          summary: "Error al guardar",
          detail:
            error.message ||
            `No se pudo ${props.editMode ? 'actualizar' : 'crear'} la solicitud. Inténtalo nuevamente.`,
          life: 5000,
        });
      } finally {
        loading.value = false;
      }
    };

    // Watcher para cargar datos cuando se abre en modo edición
    watch(
      () => props.solicitudToEdit,
      (newValue) => {
        if (newValue && props.editMode) {
          loadSolicitudData(newValue);
        } else if (!props.editMode) {
          resetForm();
        }
      },
      { immediate: true }
    );

    return {
      solicitud,
      estadoOptions,
      areaOptions,
      paisOptions,
      nivelExperienciaOptions,
      modalidadTrabajoOptions,
      tipoServicioOptions,
      isFormValid,
      loading,
      errors,
      sendSolicitud,
    };
  },
};
</script>
