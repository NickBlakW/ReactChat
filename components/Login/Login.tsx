import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginProps = NativeStackScreenProps<StackNavigation, 'LOGIN'>;

const LoginScreen: FC<LoginProps> = () => {
  return (
    <View style={styles.theme}>
      <Text>Login </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: '#343',
    color: 'aliceblue',
  },
});

export default LoginScreen;
