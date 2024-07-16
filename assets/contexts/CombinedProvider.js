import React from 'react';
import {AuthProvider} from './AuthContext';
import {CallProvider} from './CallContext';
const CombinedProvider = ({children}) => (
  <AuthProvider>
    <CallProvider>{children}</CallProvider>
  </AuthProvider>
);
export default CombinedProvider;
