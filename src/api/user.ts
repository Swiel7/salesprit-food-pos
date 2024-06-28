import { redirect } from "react-router-dom";
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
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../lib/firebase.config";
import { UserService, WishlistService } from "../lib/firestore-service";
import { TRegisterSchema } from "../schema/register-schema";
import { TLoginSchema } from "../schema/login-schema";

export const authorize = async () => {
  await auth.authStateReady();
  return auth.currentUser || redirect("/login");
};

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

    toast.success("You have registered successfully");
    return redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }

    return {};
  }
};

export const login = async (data: TLoginSchema) => {
  try {
    const { email, password } = data;
    if (!data.remember) await setPersistence(auth, browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    toast.success("You have logged in successfully");
    return redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }

    return {};
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

    toast.success("You have logged in successfully");
    redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
