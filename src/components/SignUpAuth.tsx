// src/components/DescopeAuth.jsx
import React from 'react';
import { AuthProvider, Descope } from '@descope/react-sdk';

const DescopeAuth = () => {
  return (
    <AuthProvider projectId="P2tGQmqOuJZF38FdLODYbsv0wRYX">
      <Descope
        flowId="sign-up"
        onSuccess={(e) => {
          console.log('Logged in user:', e.detail.user);
          // Redirect to /uebungen after successful login
          window.location.href = '/uebungen';
        }}
        onError={(e) => console.error('Authentication failed:', e)}
      />
    </AuthProvider>
  );
};

export default DescopeAuth;
