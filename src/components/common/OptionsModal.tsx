import { LoginScreen } from '../Login';
import { useAuth } from '../../contexts';
import React, { FC } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface OptionsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsModal: FC<OptionsModalProps> = ({ isOpen, setIsOpen }) => {
  const { user, logoutFromProvider } = useAuth();

  const onModalLogoutPress = async () => {
    setIsOpen(!isOpen);
    await logoutFromProvider();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(!isOpen)}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: '#aaa',
                alignItems: 'center',
                opacity: 60,
                borderRadius: 20,
              }}>
              <Text style={{ fontSize: 25, color: '#000' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            {!user ? (
              <LoginScreen />
            ) : (
              <Button title={'Sign Out'} onPress={onModalLogoutPress} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  modalContent: {
    height: '100%',
    width: '100%',
    padding: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
  },
});

export default OptionsModal;
