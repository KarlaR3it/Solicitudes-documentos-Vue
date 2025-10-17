<template>
  <!-- Diálogo de confirmación de eliminación -->
  <BaseConfirm
    v-model:visible="showConfirmDelete"
    header="Confirmar Eliminación"
    :message="`¿Estás seguro de eliminar la solicitud <strong>${normalizedSolicitud?.titulo}</strong>?`"
    cancelLabel="Cancelar"
    confirmLabel="Eliminar"
    @confirm="confirmDelete"
  />

  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :modal="true"
    :closable="true"
    :dismissableMask="true"
    class="solicitud-detail-dialog"
    style="width: 90vw; max-width: 800px"
  >
    <template #header>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-eye text-primary"></i>
        <span class="font-semibold">Detalle de Solicitud</span>
      </div>
    </template>

    <div v-if="normalizedSolicitud" class="solicitud-detail-content">
      <!-- Información Básica -->
      <div class="detail-section">
        <h4 class="section-title">Información Básica</h4>
        <div class="grid">
          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Título</label>
              <p class="field-value title-highlight">{{ normalizedSolicitud.titulo }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Estado</label>
              <div class="field-value">
                <Tag
                  :value="normalizedSolicitud.estado"
                  :severity="getEstadoSeverity(normalizedSolicitud.estado)"
                  class="estado-tag"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Área</label>
              <p class="field-value">{{ normalizedSolicitud.area }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">País</label>
              <p class="field-value">{{ normalizedSolicitud.pais }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Localización</label>
              <p class="field-value">{{ normalizedSolicitud.localizacion }}</p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Descripción</label>
              <p class="field-value description-text">
                {{ normalizedSolicitud.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalles del Puesto -->
      <div class="detail-section">
        <h4 class="section-title">Detalles del Puesto</h4>
        <div class="grid">
          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Número de Vacantes</label>
              <div class="field-value">
                <Badge
                  :value="normalizedSolicitud.numeroVacantes"
                  severity="info"
                  class="vacantes-badge"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Nivel de Experiencia</label>
              <p class="field-value">{{ normalizedSolicitud.nivelExperiencia }}</p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Base Educacional</label>
              <p class="field-value description-text">
                {{ normalizedSolicitud.baseEducacional }}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Conocimientos Excluyentes</label>
              <p class="field-value description-text">
                {{ normalizedSolicitud.conocimientosExcluyentes }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Condiciones Laborales -->
      <div class="detail-section">
        <h4 class="section-title">Condiciones Laborales</h4>
        <div class="grid">
          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Rango Salarial</label>
              <div class="field-value salary-range">
                <span class="salary-amount">{{
                  formatCurrency(normalizedSolicitud.rentaDesde)
                }}</span>
                <span class="salary-separator">-</span>
                <span class="salary-amount">{{
                  formatCurrency(normalizedSolicitud.rentaHasta)
                }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Modalidad de Trabajo</label>
              <div class="field-value">
                <Tag
                  :value="normalizedSolicitud.modalidadTrabajo"
                  :severity="getModalidadSeverity(normalizedSolicitud.modalidadTrabajo)"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Tipo de Servicio</label>
              <p class="field-value">{{ normalizedSolicitud.tipoServicio }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Fecha Inicio Proyecto</label>
              <div class="field-value">
                <i class="pi pi-calendar mr-2 text-primary"></i>
                {{ formatDate(normalizedSolicitud.fechaInicioProyecto) }}
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">ID del Usuario</label>
              <div class="field-value">
                <i class="pi pi-user mr-2 text-primary"></i>
                ID: {{ normalizedSolicitud.usuarioId }}
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Fecha de Creación</label>
              <div class="field-value">
                <i class="pi pi-clock mr-2 text-400"></i>
                {{ formatDateComplete(normalizedSolicitud.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <BaseButton
          label="Editar"
          icon="pi pi-pencil"
          variant="warning"
          @click="editSolicitud"
        />
        <BaseButton
          label="Eliminar"
          icon="pi pi-trash"
          variant="danger"
          @click="deleteSolicitud"
        />
        <BaseButton
          label="Cerrar"
          icon="pi pi-times"
          variant="secondary"
          @click="closeDialog"
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import "moment/locale/es";
import Tag from "primevue/tag";
import Badge from "primevue/badge";
import BaseButton from "../common/BaseButton.vue";
import BaseConfirm from "../common/BaseConfirm.vue";

export default {
  components: {
    Tag,
    Badge,
    BaseButton,
    BaseConfirm,
  },
  props: {
    solicitud: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "edit", "delete"],
  setup(props, { emit }) {
    const toast = useToast();
    const showConfirmDelete = ref(false);

    // Normalizar datos de la solicitud (convertir snake_case a camelCase)
    const normalizedSolicitud = computed(() => {
      if (!props.solicitud) return null;
      
      return {
        ...props.solicitud,
        numeroVacantes: props.solicitud.numeroVacantes || props.solicitud.numero_vacantes,
        nivelExperiencia: props.solicitud.nivelExperiencia || props.solicitud.nivel_experiencia,
        baseEducacional: props.solicitud.baseEducacional || props.solicitud.base_educacional,
        conocimientosExcluyentes: props.solicitud.conocimientosExcluyentes || props.solicitud.conocimientos_excluyentes,
        rentaDesde: props.solicitud.rentaDesde || props.solicitud.renta_desde,
        rentaHasta: props.solicitud.rentaHasta || props.solicitud.renta_hasta,
        modalidadTrabajo: props.solicitud.modalidadTrabajo || props.solicitud.modalidad_trabajo,
        tipoServicio: props.solicitud.tipoServicio || props.solicitud.tipo_servicio,
        fechaInicioProyecto: props.solicitud.fechaInicioProyecto || props.solicitud.fecha_inicio_proyecto,
        usuarioId: props.solicitud.usuarioId || props.solicitud.usuario_id,
      };
    });

    const closeDialog = () => {
      emit("update:visible", false);
    };

    const editSolicitud = () => {
      // Emitir evento edit con los datos de la solicitud
      emit("edit", normalizedSolicitud.value);
      closeDialog();
    };

    const deleteSolicitud = () => {
      // Mostrar diálogo de confirmación
      showConfirmDelete.value = true;
    };

    const confirmDelete = () => {
      // Eliminar después de confirmar
      emit("delete", props.solicitud.id);
      closeDialog();
      toast.add({
        severity: "success",
        summary: "✅ Solicitud eliminada",
        detail: "La solicitud fue eliminada correctamente",
        life: 3000,
      });
    };

    const getEstadoSeverity = (estado) => {
      const severities = {
        Borrador: "secondary",
        Publicado: "info",
        "En Revisión": "warning",
        Aprobado: "success",
        Rechazado: "danger",
        Cerrado: "contrast",
      };
      return severities[estado] || "secondary";
    };

    const getModalidadSeverity = (modalidad) => {
      const severities = {
        Presencial: "info",
        Remoto: "success",
        Híbrido: "warning",
      };
      return severities[modalidad] || "secondary";
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const formatDate = (date) => {
      return moment(date).format("DD/MM/YYYY");
    };

    const formatDateComplete = (date) => {
      return moment(date).format("DD/MM/YYYY HH:mm");
    };

    return {
      normalizedSolicitud,
      showConfirmDelete,
      closeDialog,
      editSolicitud,
      deleteSolicitud,
      confirmDelete,
      getEstadoSeverity,
      getModalidadSeverity,
      formatCurrency,
      formatDate,
      formatDateComplete,
    };
  },
};
</script>

<style scoped>
.solicitud-detail-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.detail-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--p-surface-border);
  border-radius: 8px;
  background: var(--p-surface-50);
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  color: var(--p-primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--p-primary-color);
}

.detail-field {
  margin-bottom: 1rem;
}

.field-label {
  display: block;
  font-weight: 600;
  color: var(--p-text-color-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.field-value {
  color: var(--p-text-color);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.title-highlight {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--p-primary-color);
}

.description-text {
  background: var(--p-surface-0);
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid var(--p-primary-color);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.salary-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.salary-amount {
  color: var(--p-primary-color);
  font-size: 1.1rem;
}

.salary-separator {
  color: var(--p-text-color-secondary);
}

.estado-tag {
  font-weight: 600;
}

.vacantes-badge {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .solicitud-detail-dialog {
    width: 95vw !important;
    margin: 0.5rem;
  }

  .detail-section {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .salary-range {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

/* Animaciones */
.detail-section {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>