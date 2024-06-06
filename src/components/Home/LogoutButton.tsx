import * as React from 'react';
import { FC } from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../contexts/auth/AuthContext';

const LogoutButton: FC = () => {
  const { logoutFromProvider } = useAuth();

  return (
    <>
      <Button title="Log Out" onPress={logoutFromProvider} />
    </>
  );
};

export default LogoutButton;
