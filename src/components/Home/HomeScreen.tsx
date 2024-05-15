import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../../contexts/auth/AuthContext';
import { LoginScreen } from '../Login';

type HomeScreenProps = NativeStackScreenProps<StackNavigation, 'HOME'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { user } = useAuth();

  return (
    <>
      <Text>{user?.displayName}</Text>
      {!user && <LoginScreen />}
    </>
  );
};

export default HomeScreen;
