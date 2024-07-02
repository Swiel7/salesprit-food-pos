import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { buttonVariants } from "../components/Button";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-5 sm:p-6">
      {isRouteErrorResponse(error) ? (
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-dark-500 sm:text-4xl">
            {error.statusText}
          </h1>
          <p className="text-lg text-dark-500">
            {error.status === 404
              ? "Whoops! That page doesn’t exist."
              : error.data}
          </p>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-dark-500">
          Something went wrong!
        </h1>
      )}
      <Link to="/" className={buttonVariants({ variant: "primary" })}>
        Back to homepage
      </Link>
    </section>
  );
};

export default ErrorPage;
