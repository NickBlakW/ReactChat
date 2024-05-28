import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import PushNotification from 'react-native-push-notification';

type ChatScreenProps = NativeStackScreenProps<StackNavigation, 'ChatRoom'>;

const ChatScreen: FC<ChatScreenProps> = ({ route }) => {
  const { forumName }: any = route.params;
  const { user } = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(`Chats`)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const chatMessages = snapshot.docs.filter(
          doc => doc.data().chat === `${forumName}`,
        );

        setMessages(
          chatMessages.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        );
      });

    return () => {
      unsubscribe;
    };
  }, []);

  const onSendMessage = useCallback(async (messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const { _id, createdAt, text, user } = messages[0];

    await firestore()
      .collection(`Chats`)
      .add({
        _id,
        createdAt,
        chat: `${forumName}`,
        text,
        user,
      });

    const notificationKey = createdAt.toString();
    PushNotification.createChannel(
      {
        channelId: notificationKey,
        channelName: `${forumName}`,
      },
      created => console.log(created),
    );

    PushNotification.localNotification({
      channelId: notificationKey,
      title: `New message on ${forumName}`,
      message: text,
    });
  }, []);

  return (
    <>
      <View style={styles.chatBackground}>
        <Text style={styles.chatBackgroundText}>{forumName}</Text>
      </View>
      <GiftedChat
        messages={messages}
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

const styles = StyleSheet.create({
  chatBackground: {
    zIndex: -1,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chatBackgroundText: {
    fontSize: 50,
    color: '#00000022',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ChatScreen;
