import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMessage, SendProps } from 'react-native-gifted-chat';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

const renderSend = (props: SendProps<IMessage>) => {
  const { text, onSend } = props;

  const onPressSend = () => {
    if (text && onSend) {
      onSend(
        {
          text: text.trim(),
          _id: (Math.random() * 10000).toString(),
        },
        true,
      );
    }
  };

  return (
    <TouchableOpacity style={styles.sendButton} onPress={onPressSend}>
      <MaterialIconsIcon style={styles.sendIcon} name="send" disabled={!text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  sendIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#666',
  },
});

export default renderSend;
