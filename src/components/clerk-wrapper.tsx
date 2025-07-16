import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./Home";

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

const HomeWithClerk = () => (
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <Home />
  </ClerkProvider>
);

export default HomeWithClerk;