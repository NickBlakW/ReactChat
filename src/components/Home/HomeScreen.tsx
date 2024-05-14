import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { LoginScreen } from '../Login';

type HomeScreenProps = NativeStackScreenProps<StackNavigation, 'HOME'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <>
      <LoginScreen />
    </>
  );
};

export default HomeScreen;
