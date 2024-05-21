import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { View, StyleSheet, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

type HomeScreenProps = NativeStackScreenProps<StackNavigation, 'HOME'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { user } = useAuth();

  const getAuthProviderColor = (): string => {
    switch (user?.providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return '#50C7C7';
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return '#0165E1';
      default:
        return '#fff';
    }
  };

  return (
    <View style={styles.homeView}>
      {user && (
        <Text style={styles.homeH1}>
          Welcome{' '}
          <Text style={{ color: getAuthProviderColor() }}>
            {user.displayName}
          </Text>
          !
        </Text>
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
});

export default HomeScreen;
