import * as React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/auth/AuthContext';

const GoogleLogin: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '751933296007-d40dteqgio40pemffgnlp2r3qu6aubvi.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      // iosClientId: '',
    });
  }, []);

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signInWithGoogle}
    />
  );
};

export default GoogleLogin;
