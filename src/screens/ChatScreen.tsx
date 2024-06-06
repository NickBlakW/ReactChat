import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Actions, GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/storage';
import { renderBubble, renderSend } from '../components/Chat';
import reformatImageUri from '../components/Chat/utils/imageUtils';

type ChatScreenProps = NativeStackScreenProps<StackNavigation, 'ChatRoom'>;

const ChatScreen: FC<ChatScreenProps> = ({ route }) => {
  const { forumName }: any = route.params;
  const { user } = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [shouldAttachImage, setShouldAttachImage] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const chatMessages = snapshot.docs.filter(
          doc => doc.data().chat === `${forumName}`,
        );

        setMessages(
          chatMessages.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            image: doc.data().image,
            text: doc.data().text,
            user: doc.data().user,
          })),
        );
      });

    return () => {
      unsubscribe;
    };
  }, [forumName]);

  useEffect(() => {
    setImagePath(prev => prev);
    setShouldAttachImage(prev => prev);
    setDownloadUrl(prev => prev);
  }, [imagePath, shouldAttachImage, downloadUrl]);

  const uploadImage = useCallback(async () => {
    const uriProps = reformatImageUri(imagePath);

    const imageRef = firebase.app().storage().ref(uriProps.filename);

    const uploadTask = imageRef.putFile(uriProps.uploadUri);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progress === 100) {
          console.log('image uploaded');
          snapshot.ref.getDownloadURL().then(dl => setDownloadUrl(dl));
        }
      },
      error => {
        console.error('error occured when uploading image\n', error);
      },
      () => {
        imageRef.getDownloadURL().then(dlUrl => {
          setDownloadUrl(dlUrl);
        });
      },
    );
  }, [imagePath]);

  const onSendMessage = useCallback(
    async (msgs: IMessage[]) => {
      const [messageToAdd] = msgs;

      if (shouldAttachImage && imagePath) {
        await uploadImage();

        if (downloadUrl === '') {
          console.log('aborting');
          return;
        }

        const newMessage = {
          _id: messageToAdd._id,
          text: messageToAdd.text,
          createdAt: new Date(),
          chat: forumName,
          user: messageToAdd.user,
          image: downloadUrl,
        };

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newMessage]),
        );

        await firestore()
          .collection('Chats')
          .add({
            ...newMessage,
          });

        setImagePath('');
        setShouldAttachImage(false);
      } else {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, msgs),
        );

        await firestore()
          .collection('Chats')
          .add({ ...messageToAdd, chat: forumName });
      }
    },
    [downloadUrl, forumName, imagePath, shouldAttachImage, uploadImage],
  );

  const renderActions = () => {
    const imagePickerOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    return (
      <Actions
        options={{
          ['Choose Image']: async () => {
            launchImageLibrary(imagePickerOptions, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
              } else {
                // @ts-ignore
                const source = { uri: response.assets[0].uri };
                setShouldAttachImage(true);
                setImagePath(source.uri || '');
              }
            });
          },
          ['Camera']: async () => {
            launchCamera(imagePickerOptions, response => {
              if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
              } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
              } else {
                // @ts-ignore
                const source = { uri: response.assets[0].uri };
                setShouldAttachImage(true);
                setImagePath(source.uri || '');
              }
            });
          },
          Cancel: () => console.log('cancel'),
        }}
      />
    );
  };

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{ uri: imagePath }} style={styles.img} />
          <TouchableOpacity
            onPress={() => {
              setImagePath('');
              setShouldAttachImage(false);
            }}
            style={styles.buttonFooterChatImg}>
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [imagePath]);

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={msgs => onSendMessage(msgs)}
        renderActions={() => renderActions()}
        renderSend={props => renderSend(props)}
        renderBubble={renderBubble}
        renderChatFooter={renderChatFooter}
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
  img: {
    height: 75,
    width: 75,
  },
  chatBackground: {
    zIndex: 1,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chatFooter: {
    shadowColor: '#1F2687',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#bbb',
  },
  buttonFooterChatImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 66,
    top: -4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  textFooterChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default ChatScreen;
