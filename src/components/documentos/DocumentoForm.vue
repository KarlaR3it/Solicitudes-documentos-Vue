<template>
  <div
    class="documento-form-container max-w-screen-xl mx-auto px-3"
    :class="{ open: showForm }"
  >
    <Card v-if="showForm" class="documento-form-card">
      <template #title>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-file-plus text-primary"></i>
          Nuevo Documento
        </div>
      </template>
      <template #content>
        <form @submit.prevent="sendDocumento" class="flex flex-column gap-4">
          <!-- Información del Documento -->
          <div class="form-section">
            <h4 class="section-title">Información del Documento</h4>

            <div class="field">
              <label class="block font-semibold mb-2"
                >Nombre del Archivo *</label
              >
              <InputText
                v-model="documento.nombre"
                placeholder="Ingresa el nombre del documento"
                class="w-full"
              />
            </div>

            <div class="grid">
              <div class="col-12 md:col-6">
                <label class="block font-semibold mb-2"
                  >Tipo de Documento *</label
                >
                <Select
                  v-model="documento.tipo"
                  :options="tipoDocumentoOptions"
                  placeholder="Selecciona el tipo"
                  class="w-full"
                />
              </div>

              <div class="col-12 md:col-6">
                <label class="block font-semibold mb-2">Solicitud ID *</label>
                <InputNumber
                  v-model="documento.solicitudId"
                  placeholder="ID de la solicitud asociada"
                  class="w-full"
                />
              </div>
            </div>

            <div class="field">
              <label class="block font-semibold mb-2">Descripción</label>
              <Textarea
                v-model="documento.descripcion"
                placeholder="Describe el contenido del documento"
                rows="3"
                class="w-full"
              />
            </div>

            <div class="field">
              <label class="block font-semibold mb-2">Archivo *</label>
              <FileUpload
                mode="basic"
                :auto="false"
                chooseLabel="Seleccionar Archivo"
                class="w-full"
                @select="onFileSelect"
              />
              <small class="text-muted"
                >Formatos permitidos: PDF, DOC, DOCX, JPG, PNG</small
              >
            </div>
          </div>

          <div class="flex gap-2 justify-content-end">
            <BaseButton
              label="Cancelar"
              icon="pi pi-times"
              variant="secondary"
              outlined
              @click="openCloseForm"
            />
            <BaseButton
              type="submit"
              label="Guardar Documento"
              icon="pi pi-check"
              variant="primary"
              :disabled="!isFormValid"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useToast } from "primevue/usetoast";
import BaseButton from "../common/BaseButton.vue";

// Importar componentes PrimeVue necesarios
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import FileUpload from "primevue/fileupload";

export default {
  components: {
    BaseButton,
    InputNumber,
    Select,
    FileUpload,
  },
  props: {
    showForm: Boolean,
    openCloseForm: Function,
    reloadDocumentos: Function,
  },
  setup(props) {
    const toast = useToast();

    // Objeto reactivo para el documento
    const documento = reactive({
      nombre: "",
      tipo: "",
      descripcion: "",
      solicitudId: null,
      archivo: null,
    });

    // Opciones para el dropdown de tipo
    const tipoDocumentoOptions = [
      "CV/Currículum",
      "Carta de Presentación",
      "Certificados",
      "Portafolio",
      "Referencias",
      "Otros",
    ];

    // Validación del formulario
    const isFormValid = computed(() => {
      return (
        documento.nombre &&
        documento.tipo &&
        documento.solicitudId &&
        documento.archivo
      );
    });

    // Manejar selección de archivo
    const onFileSelect = (event) => {
      documento.archivo = event.files[0];
    };

    // Resetear formulario
    const resetForm = () => {
      Object.keys(documento).forEach((key) => {
        if (key === "solicitudId") {
          documento[key] = null;
        } else {
          documento[key] = "";
        }
      });
      documento.archivo = null;
    };

    const sendDocumento = () => {
      if (!isFormValid.value) {
        toast.add({
          severity: "warn",
          summary: "Campos requeridos",
          detail: "Por favor completa todos los campos obligatorios",
          life: 3000,
        });
        return;
      }

      try {
        // Aquí implementarás la llamada a la API de documentos
        console.log("Guardando documento:", documento);

        resetForm();
        props.reloadDocumentos();
        props.openCloseForm();

        toast.add({
          severity: "success",
          summary: "Éxito",
          detail: "Documento guardado correctamente",
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el documento",
          life: 3000,
        });
      }
    };

    return {
      documento,
      tipoDocumentoOptions,
      isFormValid,
      sendDocumento,
      onFileSelect,
    };
  },
};
</script>

<style scoped>
.documento-form-container {
  margin-top: 1rem;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

.documento-form-container.open {
  height: auto;
}

.documento-form-card {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.field {
  display: flex;
  flex-direction: column;
}

.form-section {
  padding: 1.5rem;
  border: 1px solid var(--p-surface-border);
  border-radius: 8px;
  background: var(--p-surface-50);
  margin-bottom: 1rem;
}

.section-title {
  color: var(--p-primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--p-primary-color);
}

/* Responsive */
@media (max-width: 768px) {
  .form-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>