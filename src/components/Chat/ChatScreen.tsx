import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Text } from 'react-native';

type ChatScreenProps = NativeStackScreenProps<StackNavigation, 'ChatRoom'>;

const ChatScreen: FC<ChatScreenProps> = ({ route }) => {
  const { name }: any = route.params;

  return <Text>{name}</Text>;
};

export default ChatScreen;
