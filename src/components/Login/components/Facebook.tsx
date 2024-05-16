import * as React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../../contexts';

const FacebookLogin: React.FC = () => {
  const { signInWithFacebook } = useAuth();

  return (
    <>
      <Button title="Sign in with Facebook" onPress={signInWithFacebook} />
    </>
  );
};

export default FacebookLogin;
