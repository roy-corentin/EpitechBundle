import { useRouteError, ErrorResponse } from "react-router";

export const ErrorPage = () => {
  const error: ErrorResponse = useRouteError() as ErrorResponse;

  return (
    <div className="error">
      <h1>Oops</h1>
      <p>Sorry, and error has occured</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
};
