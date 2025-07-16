// src/components/RedirectIfLoggedIn.jsx
import React, { useEffect } from 'react';
import { useSession } from '@descope/react-sdk';

const RedirectIfLoggedIn = () => {
  const { isAuthenticated, isSessionLoading } = useSession();

  useEffect(() => {
    // When loading is complete and the user is authenticated, redirect them.
    if (!isSessionLoading && isAuthenticated) {
      window.location.href = '/uebungen';
    }
  }, [isSessionLoading, isAuthenticated]);

  // You can return null because this component does not render any UI.
  return null;
};

export default RedirectIfLoggedIn;
