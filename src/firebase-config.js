import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7uZJ7VmzKhSX0Cmt0vhfZ16yTcDtDCNU",
  authDomain: "test-project-f8ace.firebaseapp.com",
  projectId: "test-project-f8ace",
  storageBucket: "test-project-f8ace.appspot.com",
  messagingSenderId: "776226001822",
  appId: "1:776226001822:web:9ca37c59b5bca9fc31bc8f"
};

  const app = initializeApp(firebaseConfig);


  export const auth = getAuth(app);