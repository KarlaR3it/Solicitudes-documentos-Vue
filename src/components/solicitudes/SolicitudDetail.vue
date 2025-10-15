<template>
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

    <div v-if="solicitud" class="solicitud-detail-content">
      <!-- Información Básica -->
      <div class="detail-section">
        <h4 class="section-title">Información Básica</h4>
        <div class="grid">
          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Título</label>
              <p class="field-value title-highlight">{{ solicitud.titulo }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Estado</label>
              <div class="field-value">
                <Tag
                  :value="solicitud.estado"
                  :severity="getEstadoSeverity(solicitud.estado)"
                  class="estado-tag"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Área</label>
              <p class="field-value">{{ solicitud.area }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">País</label>
              <p class="field-value">{{ solicitud.pais }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Localización</label>
              <p class="field-value">{{ solicitud.localizacion }}</p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Descripción</label>
              <p class="field-value description-text">
                {{ solicitud.descripcion }}
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
                  :value="solicitud.numeroVacantes"
                  severity="info"
                  class="vacantes-badge"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Nivel de Experiencia</label>
              <p class="field-value">{{ solicitud.nivelExperiencia }}</p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Base Educacional</label>
              <p class="field-value description-text">
                {{ solicitud.baseEducacional }}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="detail-field">
              <label class="field-label">Conocimientos Excluyentes</label>
              <p class="field-value description-text">
                {{ solicitud.conocimientosExcluyentes }}
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
                  formatCurrency(solicitud.rentaDesde)
                }}</span>
                <span class="salary-separator">-</span>
                <span class="salary-amount">{{
                  formatCurrency(solicitud.rentaHasta)
                }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Modalidad de Trabajo</label>
              <div class="field-value">
                <Tag
                  :value="solicitud.modalidadTrabajo"
                  :severity="getModalidadSeverity(solicitud.modalidadTrabajo)"
                />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Tipo de Servicio</label>
              <p class="field-value">{{ solicitud.tipoServicio }}</p>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Fecha Inicio Proyecto</label>
              <div class="field-value">
                <i class="pi pi-calendar mr-2 text-primary"></i>
                {{ formatDate(solicitud.fechaInicioProyecto) }}
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Usuario Responsable</label>
              <div class="field-value">
                <i class="pi pi-user mr-2 text-primary"></i>
                ID: {{ solicitud.usuarioId }}
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-field">
              <label class="field-label">Fecha de Creación</label>
              <div class="field-value">
                <i class="pi pi-clock mr-2 text-400"></i>
                {{ formatDateComplete(solicitud.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-between align-items-center gap-2">
        <div class="flex gap-2">
          <Button
            label="Editar"
            icon="pi pi-pencil"
            severity="warning"
            @click="editSolicitud"
            class="btn-warning"
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            severity="danger"
            @click="deleteSolicitud"
            class="btn-danger"
          />
        </div>

        <Button
          label="Cerrar"
          icon="pi pi-times"
          severity="secondary"
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

export default {
  components: {
    Tag,
    Badge,
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

    const closeDialog = () => {
      emit("update:visible", false);
    };

    const editSolicitud = () => {
      // Emitir evento edit con los datos de la solicitud
      emit("edit", props.solicitud);
      closeDialog();
    };

    const deleteSolicitud = () => {
      // Eliminación directa sin confirmación
      emit("delete", props.solicitud.id);
      closeDialog();
      toast.add({
        severity: "success",
        summary: "Solicitud eliminada",
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
      closeDialog,
      editSolicitud,
      deleteSolicitud,
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

.btn-warning {
  background: var(--p-orange-500);
  border-color: var(--p-orange-500);
}

.btn-warning:hover {
  background: var(--p-orange-600);
  border-color: var(--p-orange-600);
}

.btn-danger {
  background: var(--p-red-500);
  border-color: var(--p-red-500);
}

.btn-danger:hover {
  background: var(--p-red-600);
  border-color: var(--p-red-600);
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