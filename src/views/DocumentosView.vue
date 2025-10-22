<template>
  <div class="documentos-view">
    <DocumentoList />
  </div>
</template>

<script>
import { DocumentoList } from '../components/documentos';

export default {
  name: 'DocumentosView',
  components: {
    DocumentoList,
  },
};
</script>

<style scoped>
.documentos-view {
  padding: 0;
}
</style>
