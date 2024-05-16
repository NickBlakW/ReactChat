import {
  Button,
  Image,
  Modal,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../../contexts';
import React, { useState } from 'react';

const StackHeader: React.FC = () => {
  const { user, logoutFromProvider } = useAuth();

  const [modalVisible, setModalVisable] = useState<boolean>(false);

  const onModalLogoutPress = async () => {
    setModalVisable(!modalVisible);
    await logoutFromProvider();
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        {user && (
          <Pressable onPress={() => setModalVisable(!modalVisible)}>
            <Image
              style={styles.userImage}
              source={{ uri: user?.photoURL || '' }}
            />
          </Pressable>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisable(!modalVisible)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Button title={'Sign Out'} onPress={onModalLogoutPress} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
  },
  logo: {
    height: 80,
    width: 100,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 200,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    height: 600,
    width: 350,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
  },
});

export default StackHeader;
