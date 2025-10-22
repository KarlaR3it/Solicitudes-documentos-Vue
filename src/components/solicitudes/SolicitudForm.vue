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
        <BaseField label="Estado" required cols="12 md:col-6" :error="errors.estado">
          <Select
            v-model="solicitud.estado"
            :options="estadoOptions"
            placeholder="Selecciona el estado"
            class="w-full"
            :class="{ 'p-invalid': errors.estado }"
          />
        </BaseField>

        <BaseField label="Área" required cols="12 md:col-6" :error="errors.area">
          <Select
            v-model="solicitud.area"
            :options="areaOptions"
            placeholder="Selecciona el área"
            class="w-full"
            :class="{ 'p-invalid': errors.area }"
          />
        </BaseField>
      </div>

      <!-- Campo condicional para Área Otra -->
      <BaseField
        v-if="solicitud.area === 'Otra'"
        label="Especifica el área"
        required
        :error="errors.areaOtra"
      >
        <InputText
          v-model="solicitud.areaOtra"
          placeholder="Escribe el nombre del área"
          class="w-full"
          :class="{ 'p-invalid': errors.areaOtra }"
        />
      </BaseField>

      <BaseField label="País" required :error="errors.pais">
        <Select
          v-model="solicitud.pais"
          :options="paisOptions"
          placeholder="Selecciona el país"
          class="w-full"
          :class="{ 'p-invalid': errors.pais }"
        />
      </BaseField>

      <!-- Campo condicional para País Otro -->
      <BaseField
        v-if="solicitud.pais === 'Otro'"
        label="Especifica el país"
        required
        :error="errors.paisOtro"
      >
        <InputText
          v-model="solicitud.paisOtro"
          placeholder="Escribe el nombre del país"
          class="w-full"
          :class="{ 'p-invalid': errors.paisOtro }"
        />
      </BaseField>

      <BaseField
        label="Localización"
        hint="Ciudad o región específica"
        :error="errors.localizacion"
      >
        <InputText
          v-model="solicitud.localizacion"
          placeholder="Ej: Santiago, Valparaíso"
          class="w-full"
          :class="{ 'p-invalid': errors.localizacion }"
        />
      </BaseField>
    </BaseFormSection>

    <!-- Detalles del Puesto -->
    <BaseFormSection title="Detalles del Puesto">
      <BaseField label="Descripción" required :error="errors.descripcion">
        <Textarea
          v-model="solicitud.descripcion"
          placeholder="Escribe una descripción detallada del puesto"
          rows="4"
          class="w-full"
          :class="{ 'p-invalid': errors.descripcion }"
        />
      </BaseField>

      <div class="grid">
        <BaseField label="Número de Vacantes" required cols="12 md:col-6" :error="errors.numeroVacantes">
          <InputNumber
            v-model="solicitud.numeroVacantes"
            :min="1"
            :max="100"
            placeholder="Cantidad de vacantes"
            class="w-full"
            :class="{ 'p-invalid': errors.numeroVacantes }"
          />
        </BaseField>

        <BaseField label="Nivel de Experiencia" required cols="12 md:col-6" :error="errors.nivelExperiencia">
          <Select
            v-model="solicitud.nivelExperiencia"
            :options="nivelExperienciaOptions"
            placeholder="Selecciona el nivel"
            class="w-full"
            :class="{ 'p-invalid': errors.nivelExperiencia }"
          />
        </BaseField>
      </div>

      <BaseField
        label="Base Educacional"
        required
        hint="Título, certificaciones, etc."
        :error="errors.baseEducacional"
      >
        <Textarea
          v-model="solicitud.baseEducacional"
          placeholder="Requisitos educacionales mínimos"
          rows="3"
          class="w-full"
          :class="{ 'p-invalid': errors.baseEducacional }"
        />
      </BaseField>

      <BaseField
        label="Conocimientos Excluyentes"
        required
        hint="Conocimientos técnicos indispensables"
        :error="errors.conocimientosExcluyentes"
      >
        <Textarea
          v-model="solicitud.conocimientosExcluyentes"
          placeholder="Tecnologías, herramientas o habilidades obligatorias"
          rows="3"
          class="w-full"
          :class="{ 'p-invalid': errors.conocimientosExcluyentes }"
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
        <BaseField label="Modalidad de Trabajo" required cols="12 md:col-4" :error="errors.modalidadTrabajo">
          <Select
            v-model="solicitud.modalidadTrabajo"
            :options="modalidadTrabajoOptions"
            placeholder="Modalidad"
            class="w-full"
            :class="{ 'p-invalid': errors.modalidadTrabajo }"
          />
        </BaseField>

        <BaseField label="Tipo de Servicio" required cols="12 md:col-4" :error="errors.tipoServicio">
          <Select
            v-model="solicitud.tipoServicio"
            :options="tipoServicioOptions"
            placeholder="Tipo"
            class="w-full"
            :class="{ 'p-invalid': errors.tipoServicio }"
          />
        </BaseField>

        <BaseField
          label="Fecha Inicio Proyecto"
          required
          cols="12 md:col-4"
          hint="Debe ser una fecha futura"
          :error="errors.fechaInicioProyecto"
        >
          <DatePicker
            v-model="solicitud.fechaInicioProyecto"
            placeholder="dd/mm/aaaa"
            dateFormat="dd/mm/yy"
            :minDate="new Date()"
            class="w-full"
            :class="{ 'p-invalid': errors.fechaInicioProyecto }"
          />
        </BaseField>
      </div>

      <BaseField
        label="Usuario ID"
        required
        :hint="editMode ? '⚠️ El ID de usuario no se puede modificar' : 'ID del usuario responsable de la solicitud'"
        :error="errors.usuarioId"
      >
        <InputNumber
          v-model="solicitud.usuarioId"
          placeholder="ID del usuario"
          :min="1"
          :disabled="editMode"
          class="w-full"
          :class="{ 'p-invalid': errors.usuarioId }"
          v-tooltip="editMode ? 'El ID de usuario no puede ser modificado después de crear la solicitud' : ''"
        />
      </BaseField>
    </BaseFormSection>
  </BaseForm>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useSolicitudesStore } from "../../stores/solicitudes.store";
import {
  validateText,
  validateNumber,
  validateNumberRange,
  validateDate,
  validateId,
  validateSelect,
} from "../../utils/validators";
import {
  ESTADOS_SOLICITUD,
  AREAS,
  PAISES_LATAM,
  NIVELES_EXPERIENCIA,
  MODALIDADES_TRABAJO,
  TIPOS_SERVICIO,
} from "../../constants/solicitud.constants";

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
      areaOtra: "", // Campo adicional cuando selecciona "Otra"
      pais: "",
      paisOtro: "", // Campo adicional cuando selecciona "Otro"
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

    // Opciones para los dropdowns (importadas desde constantes)
    const estadoOptions = ESTADOS_SOLICITUD;
    const areaOptions = AREAS;
    const paisOptions = PAISES_LATAM;
    const nivelExperienciaOptions = NIVELES_EXPERIENCIA;
    const modalidadTrabajoOptions = MODALIDADES_TRABAJO;
    const tipoServicioOptions = TIPOS_SERVICIO;

    // Validaciones con mensajes específicos
    const validateForm = () => {
      errors.value = {};

      // Validar título (varchar 200) - Modo estricto
      const tituloValidation = validateText(solicitud.titulo, {
        maxLength: 200,
        fieldName: "Título",
        strictMode: true,
      });
      if (!tituloValidation.isValid) {
        errors.value.titulo = tituloValidation.error;
      }

      // Validar estado (select)
      const estadoValidation = validateSelect(solicitud.estado, {
        fieldName: "Estado",
        allowedValues: estadoOptions,
      });
      if (!estadoValidation.isValid) {
        errors.value.estado = estadoValidation.error;
      }

      // Validar área (select)
      const areaValidation = validateSelect(solicitud.area, {
        fieldName: "Área",
        allowedValues: areaOptions,
      });
      if (!areaValidation.isValid) {
        errors.value.area = areaValidation.error;
      }

      // Validar área otra (varchar 50) si seleccionó "Otra" - Modo estricto
      if (solicitud.area === "Otra") {
        const areaOtraValidation = validateText(solicitud.areaOtra, {
          maxLength: 50,
          fieldName: "Área (Otra)",
          strictMode: true,
        });
        if (!areaOtraValidation.isValid) {
          errors.value.areaOtra = areaOtraValidation.error;
        }
      }

      // Validar país (select)
      const paisValidation = validateSelect(solicitud.pais, {
        fieldName: "País",
        allowedValues: paisOptions,
      });
      if (!paisValidation.isValid) {
        errors.value.pais = paisValidation.error;
      }

      // Validar país otro (varchar 50) si seleccionó "Otro" - Modo estricto
      if (solicitud.pais === "Otro") {
        const paisOtroValidation = validateText(solicitud.paisOtro, {
          maxLength: 50,
          fieldName: "País (Otro)",
          strictMode: true,
        });
        if (!paisOtroValidation.isValid) {
          errors.value.paisOtro = paisOtroValidation.error;
        }
      }

      // Validar localización (varchar 50, opcional) - Modo estricto
      if (solicitud.localizacion) {
        const localizacionValidation = validateText(solicitud.localizacion, {
          maxLength: 50,
          fieldName: "Localización",
          required: false,
          strictMode: true,
        });
        if (!localizacionValidation.isValid) {
          errors.value.localizacion = localizacionValidation.error;
        }
      }

      // Validar descripción (longtext)
      const descripcionValidation = validateText(solicitud.descripcion, {
        maxLength: 10000,
        fieldName: "Descripción",
      });
      if (!descripcionValidation.isValid) {
        errors.value.descripcion = descripcionValidation.error;
      }

      // Validar base educacional (longtext)
      const baseEducacionalValidation = validateText(
        solicitud.baseEducacional,
        {
          maxLength: 10000,
          fieldName: "Base Educacional",
        }
      );
      if (!baseEducacionalValidation.isValid) {
        errors.value.baseEducacional = baseEducacionalValidation.error;
      }

      // Validar conocimientos excluyentes (longtext)
      const conocimientosValidation = validateText(
        solicitud.conocimientosExcluyentes,
        {
          maxLength: 10000,
          fieldName: "Conocimientos Excluyentes",
        }
      );
      if (!conocimientosValidation.isValid) {
        errors.value.conocimientosExcluyentes = conocimientosValidation.error;
      }

      // Validar número de vacantes
      const vacantesValidation = validateNumber(solicitud.numeroVacantes, {
        min: 1,
        max: 100,
        fieldName: "Número de Vacantes",
      });
      if (!vacantesValidation.isValid) {
        errors.value.numeroVacantes = vacantesValidation.error;
      }

      // Validar nivel de experiencia (select)
      const nivelValidation = validateSelect(solicitud.nivelExperiencia, {
        fieldName: "Nivel de Experiencia",
        allowedValues: nivelExperienciaOptions,
      });
      if (!nivelValidation.isValid) {
        errors.value.nivelExperiencia = nivelValidation.error;
      }

      // Validar renta desde
      const rentaDesdeValidation = validateNumber(solicitud.rentaDesde, {
        min: 1,
        fieldName: "Renta Desde",
      });
      if (!rentaDesdeValidation.isValid) {
        errors.value.rentaDesde = rentaDesdeValidation.error;
      }

      // Validar renta hasta
      const rentaHastaValidation = validateNumber(solicitud.rentaHasta, {
        min: 1,
        fieldName: "Renta Hasta",
      });
      if (!rentaHastaValidation.isValid) {
        errors.value.rentaHasta = rentaHastaValidation.error;
      }

      // Validar rango de rentas
      if (rentaDesdeValidation.isValid && rentaHastaValidation.isValid) {
        const rangoValidation = validateNumberRange(
          solicitud.rentaDesde,
          solicitud.rentaHasta,
          {
            fieldNameFrom: "Renta Desde",
            fieldNameTo: "Renta Hasta",
          }
        );
        if (!rangoValidation.isValid) {
          errors.value.rentaHasta = rangoValidation.error;
        }
      }

      // Validar modalidad de trabajo (select)
      const modalidadValidation = validateSelect(solicitud.modalidadTrabajo, {
        fieldName: "Modalidad de Trabajo",
        allowedValues: modalidadTrabajoOptions,
      });
      if (!modalidadValidation.isValid) {
        errors.value.modalidadTrabajo = modalidadValidation.error;
      }

      // Validar tipo de servicio (select)
      const tipoServicioValidation = validateSelect(solicitud.tipoServicio, {
        fieldName: "Tipo de Servicio",
        allowedValues: tipoServicioOptions,
      });
      if (!tipoServicioValidation.isValid) {
        errors.value.tipoServicio = tipoServicioValidation.error;
      }

      // Validar fecha de inicio (debe ser futura)
      const fechaValidation = validateDate(solicitud.fechaInicioProyecto, {
        fieldName: "Fecha Inicio Proyecto",
        mustBeFuture: true,
      });
      if (!fechaValidation.isValid) {
        errors.value.fechaInicioProyecto = fechaValidation.error;
      }

      // Validar usuario ID
      const usuarioIdValidation = validateId(solicitud.usuarioId, {
        fieldName: "Usuario ID",
      });
      if (!usuarioIdValidation.isValid) {
        errors.value.usuarioId = usuarioIdValidation.error;
      }

      return Object.keys(errors.value).length === 0;
    };

    // Validación reactiva del formulario
    const isFormValid = computed(() => {
      // Validar campos requeridos básicos
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

      // Verificar campos condicionales
      if (solicitud.area === "Otra" && !solicitud.areaOtra?.trim()) {
        return false;
      }
      if (solicitud.pais === "Otro" && !solicitud.paisOtro?.trim()) {
        return false;
      }

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
      
      // Manejar campos personalizados: Área
      if (solicitudData.area && !areaOptions.includes(solicitudData.area)) {
        // Si el área no está en la lista, es un valor personalizado
        solicitud.areaOtra = solicitudData.area;
        solicitud.area = "Otra";
      }
      
      // Manejar campos personalizados: País
      if (solicitudData.pais && !paisOptions.includes(solicitudData.pais)) {
        // Si el país no está en la lista, es un valor personalizado
        solicitud.paisOtro = solicitudData.pais;
        solicitud.pais = "Otro";
      }
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
      
      // Limpiar todos los errores
      errors.value = {};
    };

    const sendSolicitud = async () => {
      // Validar formulario antes de enviar
      if (!validateForm()) {
        const errorMessages = Object.values(errors.value);
        const errorCount = errorMessages.length;
        const errorFields = Object.keys(errors.value);
        
        // Mapeo de nombres técnicos a nombres amigables
        const fieldLabels = {
          titulo: "Título",
          estado: "Estado",
          area: "Área",
          areaOtra: "Especifica el área",
          pais: "País",
          paisOtro: "Especifica el país",
          localizacion: "Localización",
          descripcion: "Descripción",
          numeroVacantes: "Número de Vacantes",
          nivelExperiencia: "Nivel de Experiencia",
          baseEducacional: "Base Educacional",
          conocimientosExcluyentes: "Conocimientos Excluyentes",
          rentaDesde: "Renta Desde",
          rentaHasta: "Renta Hasta",
          modalidadTrabajo: "Modalidad de Trabajo",
          tipoServicio: "Tipo de Servicio",
          fechaInicioProyecto: "Fecha Inicio Proyecto",
          usuarioId: "Usuario ID",
        };
        
        // Crear lista de campos con error
        const fieldList = errorFields
          .map(field => `• ${fieldLabels[field] || field}`)
          .join('\n');
        
        // Detectar tipo de errores
        const hasInvalidCharacters = errorMessages.some(msg => 
          msg.includes('caracteres no permitidos')
        );
        const hasEmptyFields = errorMessages.some(msg => 
          msg.includes('obligatorio')
        );
        const hasLengthErrors = errorMessages.some(msg => 
          msg.includes('exceder') || msg.includes('al menos')
        );
        const hasRangeErrors = errorMessages.some(msg => 
          msg.includes('mayor')
        );
        
        // Mensaje específico según el tipo de error
        let summary = "⚠️ Formulario incompleto";
        let detail = "";
        
        if (hasInvalidCharacters) {
          summary = "❌ Caracteres no permitidos";
          detail = `Se detectaron caracteres inválidos en ${errorCount} campo${errorCount > 1 ? 's' : ''}:\n\n${fieldList}\n\nPor favor, revisa y corrige los campos marcados en rojo.`;
        } else if (hasEmptyFields) {
          summary = "📝 Campos obligatorios faltantes";
          detail = `Debes completar ${errorCount} campo${errorCount > 1 ? 's' : ''} obligatorio${errorCount > 1 ? 's' : ''}:\n\n${fieldList}\n\nCompleta todos los campos marcados con * para continuar.`;
        } else if (hasLengthErrors) {
          summary = "📏 Error en longitud de texto";
          detail = `Los siguientes campos exceden el límite de caracteres:\n\n${fieldList}\n\nPor favor, reduce el texto en estos campos.`;
        } else if (hasRangeErrors) {
          summary = "🔢 Error en valores numéricos";
          detail = `Los siguientes campos tienen valores inválidos:\n\n${fieldList}\n\nVerifica que los números sean correctos.`;
        } else {
          detail = `Hay ${errorCount} error${errorCount > 1 ? 'es' : ''} en el formulario:\n\n${fieldList}\n\nCorrige los campos marcados en rojo para continuar.`;
        }
        
        toast.add({
          severity: "warn",
          summary: summary,
          detail: detail,
          life: 7000,
        });
        
        // Hacer scroll al primer campo con error
        setTimeout(() => {
          const firstErrorField = document.querySelector('.p-invalid');
          if (firstErrorField) {
            firstErrorField.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            firstErrorField.focus();
          }
        }, 100);
        
        return;
      }

      loading.value = true;

      try {
        // Preparar datos para envío - Convertir a snake_case para el backend
        const solicitudData = {
          titulo: solicitud.titulo.trim(),
          estado: solicitud.estado,
          area: solicitud.area === "Otra" ? solicitud.areaOtra.trim() : solicitud.area,
          pais: solicitud.pais === "Otro" ? solicitud.paisOtro.trim() : solicitud.pais,
          localizacion: solicitud.localizacion?.trim() || "",
          numero_vacantes: solicitud.numeroVacantes,
          descripcion: solicitud.descripcion.trim(),
          base_educacional: solicitud.baseEducacional.trim(),
          conocimientos_excluyentes: solicitud.conocimientosExcluyentes.trim(),
          renta_desde: solicitud.rentaDesde,
          renta_hasta: solicitud.rentaHasta,
          modalidad_trabajo: solicitud.modalidadTrabajo,
          tipo_servicio: solicitud.tipoServicio,
          nivel_experiencia: solicitud.nivelExperiencia,
          fecha_inicio_proyecto: solicitud.fechaInicioProyecto
            .toISOString()
            .split("T")[0],
          usuario_id: solicitud.usuarioId,
        };

        // Crear o actualizar según el modo
        if (props.editMode && props.solicitudToEdit) {
          // MODO EDICIÓN
          
          // Validación adicional: verificar que el usuario_id no haya cambiado
          const originalUsuarioId = props.solicitudToEdit.usuarioId || props.solicitudToEdit.usuario_id;
          if (solicitudData.usuario_id !== originalUsuarioId) {
            toast.add({
              severity: "error",
              summary: "⚠️ Modificación no permitida",
              detail: "El ID de usuario no puede ser modificado. Este campo es inmutable después de crear la solicitud.",
              life: 5000,
            });
            loading.value = false;
            return;
          }
          
          // Remover usuario_id del objeto antes de enviar al PATCH
          // El backend no permite modificar este campo
          const { usuario_id, ...solicitudDataSinUsuarioId } = solicitudData;
          
          await solicitudesStore.updateSolicitud(
            props.solicitudToEdit.id,
            solicitudDataSinUsuarioId
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

    // Watcher para limpiar errores específicos cuando el usuario corrige los campos
    watch(
      () => ({ ...solicitud }),
      (newVal, oldVal) => {
        // Limpiar error de cada campo que cambió
        Object.keys(newVal).forEach((key) => {
          if (newVal[key] !== oldVal[key] && errors.value[key]) {
            delete errors.value[key];
          }
        });
      },
      { deep: true }
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
