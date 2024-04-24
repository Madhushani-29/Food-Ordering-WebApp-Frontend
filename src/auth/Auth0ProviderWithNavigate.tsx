import React from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";
//import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateMyUser();
  //const navigate = useNavigate();

  //import.meta.env: This is a special meta object available in ECMAScript modules,
  //which provides access to environment-specific metadata.
  //Metadata is a set of data that provides information about other data.
  //examples of basic metadata are author, date created, date modified, and file size
  //It contains information about the current module, such as the URL it was loaded from,
  //but can also be extended to include environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientID || !redirectUri) {
    throw new Error("Unable to initialize auth");
  }

  //app state hold the use status data like the previous url
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createUser({ auth0ID: user.sub, email: user.email });
    }
    console.log("User:", user);
    //after sign in return to the previous page
    //navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    //This provider will manage authentication state and
    //provide authentication-related functionality to the child components of your application
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{ redirect_uri: redirectUri }}
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
