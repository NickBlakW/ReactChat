import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, FC } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { View, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { OptionsModal } from '../common';
import LoggedInScreen from './components/LoggedInScreen/LoggedInScreen';

type HomeScreenProps = NativeStackScreenProps<StackNavigation, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getAuthProviderColor = (): string => {
    switch (user?.providerData[0].providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return '#50C7C7';
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return '#0165E1';
      default:
        return '#fff';
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View style={styles.homeView}>
      {user ? (
        <LoggedInScreen
          navigation={navigation}
          color={getAuthProviderColor()}
        />
      ) : (
        <View style={styles.logInView}>
          <Button title="Log in" onPress={handleOpenModal} />
          <OptionsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
  },
  homeH1: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  logInView: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default HomeScreen;
