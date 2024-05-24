import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

type FirebaseUser = User | null;

export type AuthContextHook = {
  user: FirebaseUser | null;

  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential | undefined>;
  signInWithFacebook: () => Promise<FirebaseAuthTypes.UserCredential>;

  logoutFromProvider: () => Promise<void>;
};

export const AuthContextValue = (): AuthContextHook => {
  //#region User handler functions
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser>(null);

  const handleAuthStateChanged = (loggedUser: any) => {
    setUser(loggedUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber;
  });
  //#endregion

  //#region Sign In functions
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      return auth().signInWithCredential(googleCredential);
    } catch (err: any) {
      console.log(err);
    }
  };

  const signInWithFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile, email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining the access token';
    }

    const fbCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(fbCredential);
  };
  //#endregion

  //#region Logout function
  const logoutFromProvider = async () => {
    switch (user?.providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        await GoogleSignin.revokeAccess();
        break;
      case auth.FacebookAuthProvider.PROVIDER_ID:
        LoginManager.logOut();
        break;
      default:
        break;
    }

    return auth().signOut();
  };
  //#endregion

  return {
    user,
    signInWithGoogle,
    signInWithFacebook,
    logoutFromProvider,
  };
};
