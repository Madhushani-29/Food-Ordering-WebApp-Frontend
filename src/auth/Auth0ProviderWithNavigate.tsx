import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  //import.meta.env: This is a special meta object available in ECMAScript modules,
  //which provides access to environment-specific metadata.
  //Metadata is a set of data that provides information about other data.
  //examples of basic metadata are author, date created, date modified, and file size
  //It contains information about the current module, such as the URL it was loaded from,
  //but can also be extended to include environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientID || !redirectUri || !audience) {
    throw new Error("Unable to initialise auth");
  }

  //app state hold the use status data like the previous url
  //auth call back use like this with another route since it need to be wrapped inside the auth provider
  //when use like, all routes are wrapped with auth provider
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    //This provider will manage authentication state and
    //provide authentication-related functionality to the child components of your application
    //audience use in token verify
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

type Props = {
  children: React.ReactNode;
};

export default Auth0ProviderWithNavigate;
