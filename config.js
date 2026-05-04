
// Check if running in a Node environment or browser
const isNodeEnvironment = typeof module !== 'undefined' && module.exports;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvSFDc8V_u9pqICK-FH_S8tZTPi-p16gU",
  authDomain: "campus-core-7ca30.firebaseapp.com",
  databaseURL: "https://campus-core-7ca30-default-rtdb.firebaseio.com",
  projectId: "campus-core-7ca30",
  storageBucket: "campus-core-7ca30.appspot.com",
  messagingSenderId: "197537030755",
  appId: "1:197537030755:web:3a1437008b0da42842ce56",
  measurementId: "G-TPB3PZ3LMY"
};

// Gemini API Key (keep secret if you choose to use it)
const geminiApiKey = "AIzaSyBC1OqnM47myCSKXE0zy61GnqKjVb6413Y";

if (isNodeEnvironment) {
  module.exports = { firebaseConfig, geminiApiKey };
} else {
  window.firebaseConfig = firebaseConfig;
  window.geminiApiKey = geminiApiKey;
}
