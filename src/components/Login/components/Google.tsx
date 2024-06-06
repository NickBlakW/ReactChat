import * as React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/auth/AuthContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

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
    <FontAwesomeIcon.Button
      name="google"
      backgroundColor="#3b5998"
      onPress={signInWithGoogle}
      style={styles.googleButton}>
      Sign in with Google
    </FontAwesomeIcon.Button>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default GoogleLogin;
