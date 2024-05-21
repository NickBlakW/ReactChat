import * as React from 'react';
import { useAuth } from '../../../contexts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const FacebookLogin: React.FC = () => {
  const { signInWithFacebook } = useAuth();

  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={signInWithFacebook}
      style={styles.fbButton}>
      Sign in with Facebook
    </Icon.Button>
  );
};

const styles = StyleSheet.create({
  fbButton: {
    width: '80%',
  },
});

export default FacebookLogin;
