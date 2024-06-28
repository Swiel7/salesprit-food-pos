import { db } from "./firebase.config";
import {
  CollectionReference,
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { TOrder, TProduct, TUser, TWishlist } from "../types/types";

class FirestoreService<T> {
  collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  getAll = async () => {
    const snapshot = await getDocs(this.collection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  };

  getOne = async (id: string) => {
    const docRef = doc(db, this.collection.path, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as T)
      : null;
  };

  create = async (data: Omit<T, "id">, id: string) => {
    const docRef = doc(db, this.collection.path, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return await setDoc(doc(db, this.collection.path, id), data);
    }
  };

  update = async (id: string, values: Partial<DocumentData>) => {
    const docRef = doc(db, this.collection.path, id);
    return await updateDoc(docRef, values);
  };

  remove = async (id: string) => {
    return await deleteDoc(doc(db, this.collection.path, id));
  };
}

export const UserService = new FirestoreService<TUser>("users");
export const ProductService = new FirestoreService<TProduct>("products");
export const OrderService = new FirestoreService<TOrder>("orders");
export const WishlistService = new FirestoreService<TWishlist>("wishlists");
