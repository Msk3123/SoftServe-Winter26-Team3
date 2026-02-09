import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Error from "../components/Error/Error";


const RouteError = ({variant} : { variant: "admin" | "client"}) => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <Error
                errorCode={String(error.status)}
                title={error.statusText}
                message={error.data || "Route error"}
                variant={variant}
        />
    );
  }

  return (
    <Error
      title="Unexpected error"
      message="Something went wrong"
    />
  );
};

export default RouteError;
