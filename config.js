
// Configuration loaded from environment variables
// These are injected at build time by Vite

const firebaseConfig = {
  apiKey: "__VITE_FIREBASE_API_KEY__",
  authDomain: "__VITE_FIREBASE_AUTH_DOMAIN__",
  databaseURL: "__VITE_FIREBASE_DATABASE_URL__",
  projectId: "__VITE_FIREBASE_PROJECT_ID__",
  storageBucket: "__VITE_FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__VITE_FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__VITE_FIREBASE_APP_ID__",
  measurementId: "__VITE_FIREBASE_MEASUREMENT_ID__"
};

const geminiApiKey = "__VITE_GEMINI_API_KEY__";

// Check if running in a Node environment or browser
const isNodeEnvironment = typeof module !== 'undefined' && module.exports;

if (isNodeEnvironment) {
  module.exports = { firebaseConfig, geminiApiKey };
} else {
  window.firebaseConfig = firebaseConfig;
  window.geminiApiKey = geminiApiKey;
}
