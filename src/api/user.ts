import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  deleteUser,
  User,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { UserService, WishlistService } from "../lib/firestore-service";
import { TRegisterSchema } from "../schema/register-schema";
import { TLoginSchema } from "../schema/login-schema";

export const register = async (data: TRegisterSchema) => {
  try {
    const { email, password, name } = data;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await Promise.all([
      updateProfile(user, { displayName: name }),
      UserService.create({ avatar: "", email, phone: "", name }, user.uid),
      WishlistService.create({ items: [] }, user.uid),
    ]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const login = async (data: TLoginSchema) => {
  try {
    const { email, password } = data;
    if (!data.remember) await setPersistence(auth, browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const loginWithOAuth = async (
  provider: FacebookAuthProvider | GoogleAuthProvider,
) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
    const { photoURL, email, phoneNumber, displayName, uid } = result.user;

    if (isNewUser)
      await Promise.all([
        UserService.create(
          {
            avatar: photoURL || "",
            email: email || "",
            name: displayName || "",
            phone: phoneNumber || "",
          },
          uid,
        ),
        WishlistService.create({ items: [] }, uid),
      ]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteAccount = async (user: User) => {
  try {
    await Promise.all([
      deleteUser(user),
      UserService.remove(user.uid),
      WishlistService.remove(user.uid),
    ]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
