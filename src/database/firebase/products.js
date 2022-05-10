import {
  collection,
  addDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import firestore from "../firestore";

export const addProduct = (storage, product) => {
  console.log("entrou aqui");
  updateDoc(storage.ref, "products", [...storage.products, product]);
};

export const getProducts = async (product) =>
  (
    await getDocs(
      query(collection(firestore, "storage", product.id, "products"))
    )
  ).docs.map((product) => ({
    ...product.data(),
  }));
