import * as firebase from "../config";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const addUserToLocalStorage = (user) => {
  localStorage.setItem("loggedUser", user.toString());
};

const removeUserToLocalStorage = () => {
  localStorage.removeItem("loggedUser");
};

/* Database functions */
const database = getDatabase();
export const writeNewUser = (uid, username, email) => {
  set(ref(database, "users/" + uid), {
    username,
    email,
  });
};

/* Authenticator functions */
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const getAuthUser = () => auth.currentUser;
export const getCurrentUser = async (uid) => {
  const databaseRef = ref(getDatabase());
  const user = await get(
    child(databaseRef, `users/${uid ?? auth.currentUser.uid}`)
  );
  if (user.exists()) {
    return user.val();
  }

  console.log("No data available");
  return null;
};

export const signOut = (onSuccess) => {
  auth.signOut();
  removeUserToLocalStorage();
  onSuccess();
};

export const signInWithGoogle = async (successCallback, errorCallback) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const currentUser = await getCurrentUser(user.uid);

    writeNewUser(user.uid, user.displayName, user.email);
    addUserToLocalStorage(JSON.stringify(currentUser));
    successCallback();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorCallback(
      "Something went wrong. Error code: " +
        errorCode +
        ". Description: " +
        errorMessage
    );
  }
};

export const signUp = (
  username,
  email,
  password,
  successCallback,
  errorCallback
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      writeNewUser(user.uid, username, user.email);
      addUserToLocalStorage(JSON.stringify(user));
      successCallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorCallback(
        "Something went wrong. Error code: " +
          errorCode +
          ". Description: " +
          errorMessage
      );
    });
};

export const loginWithEmailAndPassword = async (
  email,
  password,
  successCallback,
  errorCallback
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const currentUser = await getCurrentUser(userCredential.user.uid);
    addUserToLocalStorage(JSON.stringify(currentUser));
    successCallback();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorCallback(
      "Something went wrong. Error code: " +
        errorCode +
        ". Description: " +
        errorMessage
    );
  }
};
