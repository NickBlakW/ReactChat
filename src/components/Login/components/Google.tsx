import * as React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';
import { useEffect } from 'react';

const GoogleLogin: React.FC = () => {
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

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={
        () =>
          onGoogleButtonPress().then(() => {
            console.log('Logged in');
          })
        //.catch(err => console.log(err))
      }
    />
  );
};

export default GoogleLogin;
