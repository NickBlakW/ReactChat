import React, { FC, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createNewForum: (
    name: string,
    description: string,
    iconName: string,
  ) => Promise<void>;
}

const ForumModal: FC<Props> = ({ isOpen, setIsOpen, createNewForum }) => {
  const [newForumName, setNewForumName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newIconName, setIconName] = useState<string>('');

  const onCreateNewForum = async () => {
    await createNewForum(newForumName, newDescription, newIconName);

    setNewForumName('');
    setNewDescription('');
    setIconName('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(!isOpen)}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={styles.modalInnerView}>
            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={styles.modalCloseButton}>
              <Text style={styles.modalContentText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Add new forum!</Text>
            <View>
              <Text style={styles.modalText}>Insert forum name:</Text>
              <TextInput
                style={styles.modalInputStyle}
                editable
                onChangeText={text => setNewForumName(text)}
                value={newForumName}
              />
            </View>
            <View>
              <Text style={styles.modalText}>Insert forum description:</Text>
              <TextInput
                style={styles.modalInputStyle}
                editable
                multiline
                numberOfLines={4}
                onChangeText={text => setNewDescription(text)}
                value={newDescription}
              />
            </View>
            <View>
              <Text style={styles.modalText}>Insert forum icon:</Text>
              <TextInput
                style={styles.modalInputStyle}
                editable
                onChangeText={text => setIconName(text)}
                value={newIconName}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={onCreateNewForum}
              style={styles.modalCloseButton}>
              <Text style={styles.modalContentText}>Create forum</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 30,
    color: '#fff',
  },
  modalText: {
    fontSize: 20,
    color: '#fff',
  },
  modalInputStyle: {
    color: '#ddd',
    backgroundColor: '#444',
    borderRadius: 5,
  },
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
  modalContentText: {
    fontSize: 25,
    color: '#000',
  },
  modalInnerView: {
    flex: 1,
  },
  modalCloseButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#aaa',
    alignItems: 'center',
    opacity: 60,
    borderRadius: 20,
  },
});

export default ForumModal;
