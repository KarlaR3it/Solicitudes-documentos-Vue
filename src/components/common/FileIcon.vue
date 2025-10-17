<template>
  <div class="file-icon" :class="`file-icon-${extension}`">
    <div class="file-icon-body">
      <div class="file-icon-fold"></div>
      <div class="file-icon-extension">{{ extension.toUpperCase() }}</div>
      <div class="file-icon-lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileIcon',
  props: {
    extension: {
      type: String,
      required: true,
      default: 'file'
    }
  }
}
</script>

<style scoped>
.file-icon {
  width: 60px;
  height: 80px;
  position: relative;
  display: inline-block;
}

.file-icon-body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.file-icon-fold {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 0;
  border-color: transparent #e0e0e0 transparent transparent;
}

.file-icon-extension {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 14px;
  color: white;
  background: var(--extension-color);
  padding: 4px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.file-icon-lines {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.line {
  height: 2px;
  background: #d0d0d0;
  border-radius: 1px;
}

/* PDF - Rojo */
.file-icon-pdf {
  --extension-color: #e74c3c;
}

.file-icon-pdf .file-icon-body {
  background: linear-gradient(135deg, #ffe5e5 0%, #fff 100%);
}

/* DOCX - Azul */
.file-icon-docx {
  --extension-color: #185bc0;
}

.file-icon-docx .file-icon-body {
  background: linear-gradient(135deg, #e3f2fd 0%, #fff 100%);
}

/* JPG - Verde */
.file-icon-jpg {
  --extension-color: #27ae60;
}

.file-icon-jpg .file-icon-body {
  background: linear-gradient(135deg, #e8f5e9 0%, #fff 100%);
}

/* PNG - Verde */
.file-icon-png {
  --extension-color: #f5b326;
}

.file-icon-png .file-icon-body {
  background: linear-gradient(135deg, #e8f5e9 0%, #fff 100%);
}
</style>
