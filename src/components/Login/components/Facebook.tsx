import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Button } from 'react-native';

const FacebookLogin: React.FC = () => {
  const onFacebookButtonPress = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile, email',
    ]);

    if (result.isCancelled) throw 'User cancelled login process';

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) throw 'Something went wrong obtaining the access token';

    const fbCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(fbCredential);
  };

  return (
    <>
      <Button title="Sign in with Facebook" onPress={onFacebookButtonPress} />
    </>
  );
};

export default FacebookLogin;
