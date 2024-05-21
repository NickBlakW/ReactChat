import { Image, Pressable, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts';
import React, { useState } from 'react';
import OptionsModal from './components/OptionsModal';

const StackHeader: React.FC = () => {
  const { user, logoutFromProvider } = useAuth();

  const [modalVisible, setModalVisable] = useState<boolean>(false);

  const onModalLogoutPress = async () => {
    setModalVisable(!modalVisible);
    await logoutFromProvider();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <Pressable
          style={styles.alignView}
          onPress={() => setModalVisable(!modalVisible)}>
          {user ? (
            <Image
              style={styles.userImage}
              source={{ uri: user?.photoURL || '' }}
            />
          ) : (
            <View>
              <Text>Log In</Text>
            </View>
          )}
        </Pressable>
      </View>
      <OptionsModal isOpen={modalVisible} setIsOpen={setModalVisable} />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    height: 80,
    width: 100,
    marginTop: '-3%',
  },
  alignView: {
    marginTop: '5%',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: '-25%',
  },
});

export default StackHeader;
