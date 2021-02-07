import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Container, Loader } from "rsuite";
import { useProfileContext } from "../context/ProfileContext";

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfileContext();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
