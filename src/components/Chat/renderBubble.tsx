import React from 'react';
import { Image, View } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

const renderBubble = (props: BubbleProps<IMessage>) => {
  const { currentMessage } = props;

  if (currentMessage?.image) {
    return (
      <Bubble {...props}>
        <View>
          <Image source={{ uri: currentMessage.image }} />
        </View>
      </Bubble>
    );
  }

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2e64e5',
        },
      }}
      textStyle={{
        right: {
          color: '#efefef',
        },
      }}
    />
  );
};

export default renderBubble;
