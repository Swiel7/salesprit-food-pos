import { Outlet, useNavigation } from "react-router-dom";
import { authImage } from "../assets";
import { LoadingOverlay } from "../components";

const AuthPage = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <section className="container mx-auto grid min-h-screen max-w-screen-xl place-items-center p-5 sm:p-6 lg:grid-cols-2 xl:h-screen">
      <div className="hidden lg:block">
        <img src={authImage} />
      </div>
      <div className="w-full max-w-[460px]">
        <Outlet />
      </div>
      {isLoading && <LoadingOverlay />}
    </section>
  );
};

export default AuthPage;
