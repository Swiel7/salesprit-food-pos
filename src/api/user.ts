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
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { UserService, WishlistService } from "../lib/firestore-service";
import { TRegisterSchema } from "../schema/register-schema";
import { TLoginSchema } from "../schema/login-schema";
import { TUserDataSchema } from "../schema/user-data-schema";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

export const updateUserData = async (data: TUserDataSchema) => {
  const { name, email, phone, avatar } = data;
  const user = auth.currentUser!;
  let downloadURL;

  try {
    if (avatar?.name) {
      const storage = getStorage();
      const storageRef = ref(storage, "avatars/" + user.uid);
      const uploadTask = await uploadBytes(storageRef, avatar);
      downloadURL = await getDownloadURL(uploadTask.ref);
    }

    await Promise.all([
      updateProfile(user, {
        photoURL: downloadURL || user.photoURL,
        displayName: name,
      }),
      updateEmail(user, email),
      UserService.update(user.uid, {
        name,
        email,
        phone,
        avatar: downloadURL || user.photoURL,
      }),
    ]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const changePassword = async (
  curPassword: string,
  newPassword: string,
) => {
  const user = auth.currentUser!;
  const credential = EmailAuthProvider.credential(user.email!, curPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(auth.currentUser!, newPassword);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
