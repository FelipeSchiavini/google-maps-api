import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import "../config";
import firestore from "../firestore";

export const createStorage = async (name, location, adress) => {
  const docRef = await addDoc(collection(firestore, "storage"), {
    name,
    location,
    adress,
    products: [],
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};

export const getStorage = (getData) => {
  const q = query(collection(firestore, "storage"));
  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    const result = await Promise.all(
      querySnapshot.docs.map(async (queryDocumentSnapshot) => ({
        id: queryDocumentSnapshot.id,
        ref: queryDocumentSnapshot.ref,
        ...queryDocumentSnapshot.data(),
      }))
    );

    getData(result);
  });

  return unsubscribe;
};
