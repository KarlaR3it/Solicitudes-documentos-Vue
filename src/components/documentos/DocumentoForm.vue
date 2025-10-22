<template>
  <BaseForm
    :visible="showForm"
    :title="editMode ? 'Editar Documento' : 'Nuevo Documento'"
    :title-icon="editMode ? 'pi pi-pencil' : 'pi pi-file-plus'"
    :submit-label="editMode ? 'Actualizar Documento' : 'Crear Documento'"
    submit-icon="pi pi-check"
    :is-valid="isFormValid"
    :loading="loading"
    @submit="sendDocumento"
    @cancel="openCloseForm"
  >
    <BaseFormSection title="Información del Documento">
      <BaseField 
        label="Solicitud" 
        required 
        :error="errors.solicitudId"
        hint="Selecciona la solicitud a la que pertenece este documento"
      >
        <Select
          v-model="documento.solicitudId"
          :options="solicitudOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona una solicitud"
          class="w-full"
          :class="{ 'p-invalid': errors.solicitudId }"
          :loading="loadingSolicitudes"
          filter
          filterPlaceholder="Buscar solicitud..."
        >
          <template #empty>
            <div class="p-3 text-center text-gray-500">
              {{ loadingSolicitudes ? 'Cargando solicitudes...' : 'No hay solicitudes disponibles' }}
            </div>
          </template>
        </Select>
      </BaseField>

      <div class="grid">
        <BaseField label="Extensión" required cols="12 md:col-6" :error="errors.extension">
          <Select
            v-model="documento.extension"
            :options="extensionOptions"
            placeholder="Selecciona la extensión"
            class="w-full"
            :class="{ 'p-invalid': errors.extension }"
          />
        </BaseField>

        <BaseField label="Nombre del Archivo" required cols="12 md:col-6" :error="errors.nombreArchivo">
          <InputText
            v-model="documento.nombreArchivo"
            placeholder="Ej: curriculum_vitae"
            class="w-full"
            :class="{ 'p-invalid': errors.nombreArchivo }"
          />
        </BaseField>
      </div>
    </BaseFormSection>
  </BaseForm>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useDocumentosStore } from "@/stores/documentos.store";
import { useSolicitudesStore } from "@/stores/solicitudes.store";
import { validateText, validateSelect, validateId } from "@/utils/validators";
import { EXTENSIONES_PERMITIDAS } from "@/constants/documento.constants";
import BaseForm from "../common/BaseForm.vue";
import BaseFormSection from "../common/BaseFormSection.vue";
import BaseField from "../common/BaseField.vue";
import Select from "primevue/select";
import InputText from "primevue/inputtext";

export default {
  components: {
    BaseForm,
    BaseFormSection,
    BaseField,
    Select,
    InputText,
  },
  props: {
    showForm: Boolean,
    openCloseForm: Function,
    editMode: Boolean,
    documentoToEdit: Object,
  },
  setup(props) {
    const toast = useToast();
    const documentosStore = useDocumentosStore();
    const solicitudesStore = useSolicitudesStore();
    const loading = ref(false);
    const loadingSolicitudes = ref(false);
    const errors = ref({});

    const documento = reactive({
      solicitudId: null,
      extension: "",
      nombreArchivo: "",
    });

    const extensionOptions = EXTENSIONES_PERMITIDAS;

    // Computed para crear opciones del select de solicitudes
    const solicitudOptions = computed(() => {
      return solicitudesStore.solicitudes.map(solicitud => ({
        value: solicitud.id,
        label: `#${solicitud.id} - ${solicitud.titulo}`
      }));
    });

    // Cargar solicitudes al montar el componente
    const cargarSolicitudes = async () => {
      loadingSolicitudes.value = true;
      try {
        await solicitudesStore.fetchSolicitudes();
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
        toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudieron cargar las solicitudes disponibles',
          life: 3000
        });
      } finally {
        loadingSolicitudes.value = false;
      }
    };

    // Cargar solicitudes cuando se monta el componente
    onMounted(() => {
      cargarSolicitudes();
    });

    const validateForm = () => {
      errors.value = {};

      const solicitudIdValidation = validateId(documento.solicitudId, {
        fieldName: "Solicitud ID",
      });
      if (!solicitudIdValidation.isValid) {
        errors.value.solicitudId = solicitudIdValidation.error;
      }

      const extensionValidation = validateSelect(documento.extension, {
        fieldName: "Extensión",
        allowedValues: extensionOptions,
      });
      if (!extensionValidation.isValid) {
        errors.value.extension = extensionValidation.error;
      }

      const nombreArchivoValidation = validateText(documento.nombreArchivo, {
        maxLength: 255,
        fieldName: "Nombre del Archivo",
        strictMode: true,
      });
      if (!nombreArchivoValidation.isValid) {
        errors.value.nombreArchivo = nombreArchivoValidation.error;
      }

      return Object.keys(errors.value).length === 0;
    };

    const isFormValid = computed(() => {
      const hasRequiredFields =
        documento.solicitudId &&
        documento.extension &&
        documento.nombreArchivo?.trim();

      return hasRequiredFields && Object.keys(errors.value).length === 0;
    });

    const loadDocumentoData = (documentoData) => {
      if (!documentoData) return;

      console.log('Cargando documento para editar:', documentoData);

      // Mapear campos de snake_case a camelCase
      documento.solicitudId = documentoData.solicitud?.solicitud_id || documentoData.solicitud_id || documentoData.solicitudId;
      documento.extension = documentoData.extension;
      documento.nombreArchivo = documentoData.nombre_archivo || documentoData.nombreArchivo;

      console.log('Documento cargado en el formulario:', documento);
    };

    const resetForm = () => {
      Object.keys(documento).forEach((key) => {
        if (key === "solicitudId") {
          documento[key] = null;
        } else {
          documento[key] = "";
        }
      });
      errors.value = {};
    };

    const sendDocumento = async () => {
      if (!validateForm()) {
        const errorMessages = Object.values(errors.value);
        const errorCount = errorMessages.length;
        const errorFields = Object.keys(errors.value);

        // Mapeo de nombres técnicos a nombres amigables
        const fieldLabels = {
          solicitudId: "Solicitud",
          extension: "Extensión",
          nombreArchivo: "Nombre del Archivo",
        };

        // Crear lista de campos con error
        const fieldList = errorFields
          .map(field => `• ${fieldLabels[field] || field}`)
          .join('\n');

        const hasInvalidCharacters = errorMessages.some((msg) =>
          msg.includes("caracteres no permitidos")
        );
        const hasEmptyFields = errorMessages.some((msg) =>
          msg.includes("obligatorio")
        );

        let summary = "⚠️ Formulario incompleto";
        let detail = "";

        if (hasInvalidCharacters) {
          summary = "❌ Caracteres no permitidos";
          detail = `Se detectaron caracteres inválidos en ${errorCount} campo${errorCount > 1 ? "s" : ""}:\n\n${fieldList}\n\nPor favor, revisa y corrige los campos marcados en rojo.`;
        } else if (hasEmptyFields) {
          summary = "📝 Campos obligatorios faltantes";
          detail = `Debes completar ${errorCount} campo${errorCount > 1 ? "s" : ""} obligatorio${errorCount > 1 ? "s" : ""}:\n\n${fieldList}\n\nCompleta todos los campos marcados con * para continuar.`;
        } else {
          detail = `Hay ${errorCount} error${errorCount > 1 ? "es" : ""} en el formulario:\n\n${fieldList}\n\nCorrige los campos marcados en rojo para continuar.`;
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
        if (props.editMode && props.documentoToEdit) {
          // MODO EDICIÓN - Solo enviar campos editables en snake_case
          const documentoData = {
            extension: documento.extension,
            nombre_archivo: documento.nombreArchivo.trim(),
          };

          console.log('Actualizando documento ID:', props.documentoToEdit.id);
          console.log('Datos a enviar:', documentoData);

          await documentosStore.updateDocumento(
            props.documentoToEdit.id,
            documentoData
          );

          toast.add({
            severity: "success",
            summary: "¡Documento actualizado!",
            detail: `El documento "${documento.nombreArchivo}.${documento.extension}" fue actualizado exitosamente`,
            life: 4000,
          });
        } else {
          // MODO CREACIÓN - Enviar todos los campos en snake_case
          const documentoData = {
            extension: documento.extension,
            nombre_archivo: documento.nombreArchivo.trim(),
            solicitud_id: documento.solicitudId,
          };

          await documentosStore.createDocumento(documentoData);

          toast.add({
            severity: "success",
            summary: "¡Documento creado!",
            detail: `El documento "${documento.nombreArchivo}.${documento.extension}" fue creado exitosamente`,
            life: 4000,
          });
        }

        resetForm();
        props.openCloseForm();
      } catch (error) {
        console.error("Error al guardar documento:", error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: error.message || "No se pudo guardar el documento",
          life: 4000,
        });
      } finally {
        loading.value = false;
      }
    };

    watch(
      () => props.documentoToEdit,
      (newValue) => {
        if (newValue && props.editMode) {
          loadDocumentoData(newValue);
        } else if (!props.editMode) {
          resetForm();
        }
      },
      { immediate: true }
    );

    watch(
      () => ({ ...documento }),
      (newVal, oldVal) => {
        Object.keys(newVal).forEach((key) => {
          if (newVal[key] !== oldVal[key] && errors.value[key]) {
            delete errors.value[key];
          }
        });
      },
      { deep: true }
    );

    return {
      documento,
      extensionOptions,
      solicitudOptions,
      loadingSolicitudes,
      isFormValid,
      loading,
      errors,
      sendDocumento,
    };
  },
};
</script>
