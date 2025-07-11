import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkTnYCjo2M8sGkw5w6w7He2brMQUhN0cY",
  authDomain: "resumeanalyzer-c246d.firebaseapp.com",
  projectId: "resumeanalyzer-c246d",
  storageBucket: "resumeanalyzer-c246d.firebasestorage.app",
  messagingSenderId: "1098465208478",
  appId: "1:1098465208478:web:fc98e688ee4607dca2f38f",
  measurementId: "G-F0BJS123TL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
