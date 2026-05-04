
// Check if running in a Node environment or browser
const isNodeEnvironment = typeof module !== 'undefined' && module.exports;

// Load from environment variables (populated at build time or runtime)
const firebaseConfig = {
  apiKey: typeof process !== 'undefined' ? process.env.FIREBASE_API_KEY : window.FIREBASE_API_KEY,
  authDomain: typeof process !== 'undefined' ? process.env.FIREBASE_AUTH_DOMAIN : window.FIREBASE_AUTH_DOMAIN,
  projectId: typeof process !== 'undefined' ? process.env.FIREBASE_PROJECT_ID : window.FIREBASE_PROJECT_ID,
  storageBucket: typeof process !== 'undefined' ? process.env.FIREBASE_STORAGE_BUCKET : window.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: typeof process !== 'undefined' ? process.env.FIREBASE_MESSAGING_SENDER_ID : window.FIREBASE_MESSAGING_SENDER_ID,
  appId: typeof process !== 'undefined' ? process.env.FIREBASE_APP_ID : window.FIREBASE_APP_ID,
  databaseURL: typeof process !== 'undefined' ? process.env.FIREBASE_DATABASE_URL : window.FIREBASE_DATABASE_URL,
  measurementId: typeof process !== 'undefined' ? process.env.FIREBASE_MEASUREMENT_ID : window.FIREBASE_MEASUREMENT_ID
};

// Gemini API Key
const geminiApiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : window.GEMINI_API_KEY;

if (isNodeEnvironment) {
  module.exports = { firebaseConfig, geminiApiKey };
} else {
  window.firebaseConfig = firebaseConfig;
  window.geminiApiKey = geminiApiKey;
}
