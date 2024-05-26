import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore, { onSnapshot } from '@react-native-firebase/firestore';

type ChatScreenProps = NativeStackScreenProps<StackNavigation, 'ChatRoom'>;

const ChatScreen: FC<ChatScreenProps> = ({ route, navigation }) => {
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

  useEffect(() => {
    const q = firestore()
      .collection(`Chat_${forumName}`)
      .orderBy('createdBy', 'desc');

    const unsubscribe = onSnapshot(q, snapshot =>
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      ),
    );

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const onSendMessage = useCallback(async (messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const { _id, createdAt, text, user } = messages[0];

    await firestore().collection(`Chat_${forumName}`).add({
      _id,
      createdAt,
      text,
      user,
    });
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
