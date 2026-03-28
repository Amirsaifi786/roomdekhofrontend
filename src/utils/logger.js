// utils/logger.js

export const logInfo = (message, data = null) => {
    console.log(`✅ INFO: ${message}`, data || "");
};

export const logError = (message, error = null) => {
    console.error(`❌ ERROR: ${message}`, error || "");
};

export const logWarn = (message, data = null) => {
    console.warn(`⚠️ WARNING: ${message}`, data || "");
};