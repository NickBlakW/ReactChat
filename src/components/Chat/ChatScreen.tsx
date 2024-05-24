import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

type ChatScreenProps = NativeStackScreenProps<StackNavigation, 'ChatRoom'>;

const ChatScreen: FC<ChatScreenProps> = ({ route }) => {
  const { forumName }: any = route.params;
  const { user } = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Welcome to the ${forumName} forum!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ReactChat',
          avatar: 'https://commons.wikimedia.org/wiki/File:React-icon.svg',
        },
      },
    ]);
  }, []);

  const onSendMessage = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <Text>{forumName}</Text>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSendMessage(messages)}
        user={{
          _id: user?.email || '',
          name: user?.displayName || '',
          avatar: user?.photoURL || '',
        }}
      />
    </>
  );
};

export default ChatScreen;
