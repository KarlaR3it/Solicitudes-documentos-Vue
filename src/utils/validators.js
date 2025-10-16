/**
 * Funciones de validación reutilizables para formularios
 * Cada función retorna: { isValid: boolean, error: string | null }
 */

/**
 * Sanitiza texto para prevenir inyección SQL y XSS
 * @param {string} value - Valor a sanitizar
 * @returns {string} Valor sanitizado
 */
export const sanitizeInput = (value) => {
  if (!value || typeof value !== 'string') return value;
  
  // Remover caracteres peligrosos para SQL injection
  const sqlDangerousChars = /[;'"\\]|(--)|(\bOR\b)|(\bAND\b)|(\bUNION\b)|(\bSELECT\b)|(\bINSERT\b)|(\bUPDATE\b)|(\bDELETE\b)|(\bDROP\b)|(\bCREATE\b)|(\bALTER\b)|(\bEXEC\b)|(\bEXECUTE\b)/gi;
  
  // Remover tags HTML para prevenir XSS
  const htmlTags = /<[^>]*>/g;
  
  let sanitized = value.replace(htmlTags, '');
  
  // Detectar patrones SQL peligrosos
  if (sqlDangerousChars.test(sanitized)) {
    // En lugar de rechazar, escapar caracteres peligrosos
    sanitized = sanitized
      .replace(/'/g, '')
      .replace(/"/g, '')
      .replace(/;/g, '')
      .replace(/\\/g, '');
  }
  
  return sanitized.trim();
};

/**
 * Valida que el texto no contenga patrones peligrosos
 * @param {string} value - Valor a validar
 * @returns {Object} { isValid, error }
 */
export const validateSQLSafe = (value) => {
  if (!value || typeof value !== 'string') return { isValid: true, error: null };
  
  // Caracteres peligrosos individuales (detectados en cualquier posición)
  const dangerousChars = ["'", '"', ';', '\\', '(', ')', '/', '*', '#', '=', '!', '<', '>'];
  
  // Verificar caracteres peligrosos
  for (const char of dangerousChars) {
    if (value.includes(char)) {
      return {
        isValid: false,
        error: 'El texto contiene caracteres no permitidos',
      };
    }
  }
  
  // Verificar comentarios SQL (-- en cualquier posición)
  if (value.includes('--')) {
    return {
      isValid: false,
      error: 'El texto contiene caracteres no permitidos',
    };
  }
  
  // Verificar operadores lógicos OR y AND (en cualquier posición, case-insensitive)
  const upperValue = value.toUpperCase();
  if (upperValue.includes(' OR ') || upperValue.includes(' AND ')) {
    return {
      isValid: false,
      error: 'El texto contiene caracteres no permitidos',
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida campos de texto con longitud configurable
 * @param {string} value - Texto a validar
 * @param {Object} options - Opciones de validación
 * @param {number} options.minLength - Longitud mínima (default: 1)
 * @param {number} options.maxLength - Longitud máxima (default: null = sin límite)
 * @param {string} options.fieldName - Nombre del campo para mensajes de error
 * @param {boolean} options.required - Si el campo es obligatorio (default: true)
 * @param {boolean} options.checkSQLInjection - Si valida inyección SQL (default: true)
 * @param {boolean} options.strictMode - Solo permite caracteres alfanuméricos y básicos (default: false)
 * @returns {Object} { isValid, error }
 */
export const validateText = (value, { 
  minLength = 1, 
  maxLength = null, 
  fieldName = 'Campo', 
  required = true,
  checkSQLInjection = true,
  strictMode = false
} = {}) => {
  // Validar campo requerido
  if (required && (!value || !value.trim())) {
    return { 
      isValid: false, 
      error: `${fieldName} es obligatorio` 
    };
  }
  
  // Si no es requerido y está vacío, es válido
  if (!required && (!value || !value.trim())) {
    return { isValid: true, error: null };
  }
  
  const trimmedValue = value.trim();
  
  // Modo estricto: solo caracteres alfanuméricos y símbolos básicos seguros
  if (strictMode) {
    // Permite: letras (con acentos), números, espacios, puntos, comas, guiones, paréntesis, +, #, @
    const safePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,\-()#+@]*$/;
    if (!safePattern.test(trimmedValue)) {
      return {
        isValid: false,
        error: `${fieldName} contiene caracteres no permitidos. Solo se permiten letras, números y puntuación básica`
      };
    }
  }
  
  // Validar inyección SQL si está habilitado
  if (checkSQLInjection) {
    const sqlSafeValidation = validateSQLSafe(trimmedValue);
    if (!sqlSafeValidation.isValid) {
      return sqlSafeValidation;
    }
  }
  
  // Validar longitud mínima
  if (trimmedValue.length < minLength) {
    return { 
      isValid: false, 
      error: `${fieldName} debe tener al menos ${minLength} caracteres` 
    };
  }
  
  // Validar longitud máxima (solo si se especifica)
  if (maxLength && trimmedValue.length > maxLength) {
    return { 
      isValid: false, 
      error: `${fieldName} no puede exceder ${maxLength} caracteres` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida campos numéricos con rangos configurables
 * @param {number} value - Valor a validar
 * @param {Object} options - Opciones de validación
 * @param {number} options.min - Valor mínimo permitido
 * @param {number} options.max - Valor máximo permitido
 * @param {string} options.fieldName - Nombre del campo para mensajes de error
 * @param {boolean} options.required - Si el campo es obligatorio (default: true)
 * @param {boolean} options.allowZero - Si permite cero (default: false)
 * @returns {Object} { isValid, error }
 */
export const validateNumber = (value, { 
  min = null, 
  max = null, 
  fieldName = 'Campo', 
  required = true,
  allowZero = false
} = {}) => {
  // Validar campo requerido
  if (required && (value === null || value === undefined)) {
    return { 
      isValid: false, 
      error: `${fieldName} es obligatorio` 
    };
  }
  
  // Si no es requerido y está vacío, es válido
  if (!required && (value === null || value === undefined)) {
    return { isValid: true, error: null };
  }
  
  // Validar que sea un número
  if (typeof value !== 'number' || isNaN(value)) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser un número válido` 
    };
  }
  
  // Validar cero si no está permitido
  if (!allowZero && value === 0) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser mayor a 0` 
    };
  }
  
  // Validar mínimo
  if (min !== null && value < min) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser mayor o igual a ${min}` 
    };
  }
  
  // Validar máximo
  if (max !== null && value > max) {
    return { 
      isValid: false, 
      error: `${fieldName} no puede ser mayor a ${max}` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida un rango de números (ej: renta desde/hasta)
 * @param {number} fromValue - Valor inicial del rango
 * @param {number} toValue - Valor final del rango
 * @param {Object} options - Opciones de validación
 * @param {string} options.fieldNameFrom - Nombre del campo inicial
 * @param {string} options.fieldNameTo - Nombre del campo final
 * @returns {Object} { isValid, error }
 */
export const validateNumberRange = (fromValue, toValue, { 
  fieldNameFrom = 'Valor inicial', 
  fieldNameTo = 'Valor final' 
} = {}) => {
  // Validar que ambos valores existan
  if (fromValue === null || fromValue === undefined) {
    return { 
      isValid: false, 
      error: `${fieldNameFrom} es obligatorio` 
    };
  }
  
  if (toValue === null || toValue === undefined) {
    return { 
      isValid: false, 
      error: `${fieldNameTo} es obligatorio` 
    };
  }
  
  // Validar que el valor final sea mayor que el inicial
  if (toValue <= fromValue) {
    return { 
      isValid: false, 
      error: `${fieldNameTo} debe ser mayor que ${fieldNameFrom}` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida fechas con opciones configurables
 * @param {Date} value - Fecha a validar
 * @param {Object} options - Opciones de validación
 * @param {string} options.fieldName - Nombre del campo para mensajes de error
 * @param {boolean} options.required - Si el campo es obligatorio (default: true)
 * @param {boolean} options.mustBeFuture - Si la fecha debe ser futura (default: false)
 * @param {boolean} options.mustBePast - Si la fecha debe ser pasada (default: false)
 * @param {Date} options.minDate - Fecha mínima permitida
 * @param {Date} options.maxDate - Fecha máxima permitida
 * @returns {Object} { isValid, error }
 */
export const validateDate = (value, { 
  fieldName = 'Fecha', 
  required = true,
  mustBeFuture = false,
  mustBePast = false,
  minDate = null,
  maxDate = null
} = {}) => {
  // Validar campo requerido
  if (required && !value) {
    return { 
      isValid: false, 
      error: `${fieldName} es obligatoria` 
    };
  }
  
  // Si no es requerido y está vacío, es válido
  if (!required && !value) {
    return { isValid: true, error: null };
  }
  
  // Validar que sea una fecha válida
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) {
    return { 
      isValid: false, 
      error: `${fieldName} no es una fecha válida` 
    };
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  
  // Validar fecha futura
  if (mustBeFuture && compareDate <= today) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser una fecha futura` 
    };
  }
  
  // Validar fecha pasada
  if (mustBePast && compareDate >= today) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser una fecha pasada` 
    };
  }
  
  // Validar fecha mínima
  if (minDate) {
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    if (compareDate < min) {
      return { 
        isValid: false, 
        error: `${fieldName} no puede ser anterior a ${minDate.toLocaleDateString()}` 
      };
    }
  }
  
  // Validar fecha máxima
  if (maxDate) {
    const max = new Date(maxDate);
    max.setHours(0, 0, 0, 0);
    if (compareDate > max) {
      return { 
        isValid: false, 
        error: `${fieldName} no puede ser posterior a ${maxDate.toLocaleDateString()}` 
      };
    }
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida IDs (propios o foráneos)
 * @param {number} value - ID a validar
 * @param {Object} options - Opciones de validación
 * @param {string} options.fieldName - Nombre del campo para mensajes de error
 * @param {boolean} options.required - Si el campo es obligatorio (default: true)
 * @returns {Object} { isValid, error }
 */
export const validateId = (value, { 
  fieldName = 'ID', 
  required = true 
} = {}) => {
  // Validar campo requerido
  if (required && (value === null || value === undefined)) {
    return { 
      isValid: false, 
      error: `${fieldName} es obligatorio` 
    };
  }
  
  // Si no es requerido y está vacío, es válido
  if (!required && (value === null || value === undefined)) {
    return { isValid: true, error: null };
  }
  
  // Validar que sea un número entero positivo
  if (!Number.isInteger(value) || value <= 0) {
    return { 
      isValid: false, 
      error: `${fieldName} debe ser un número entero positivo` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida campos de selección (dropdowns)
 * @param {any} value - Valor seleccionado
 * @param {Object} options - Opciones de validación
 * @param {string} options.fieldName - Nombre del campo para mensajes de error
 * @param {Array} options.allowedValues - Valores permitidos (opcional)
 * @param {boolean} options.required - Si el campo es obligatorio (default: true)
 * @returns {Object} { isValid, error }
 */
export const validateSelect = (value, { 
  fieldName = 'Campo', 
  allowedValues = null,
  required = true 
} = {}) => {
  // Validar campo requerido
  if (required && (!value || value === '')) {
    return { 
      isValid: false, 
      error: `${fieldName} es obligatorio` 
    };
  }
  
  // Si no es requerido y está vacío, es válido
  if (!required && (!value || value === '')) {
    return { isValid: true, error: null };
  }
  
  // Validar valores permitidos
  if (allowedValues && !allowedValues.includes(value)) {
    return { 
      isValid: false, 
      error: `${fieldName} tiene un valor no válido` 
    };
  }
  
  return { isValid: true, error: null };
};
