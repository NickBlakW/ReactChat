import React, { FC } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface ForumItemProps {
  data: ForumData;
  navigation: NativeStackNavigationProp<StackNavigation, 'Forums', undefined>;
}

const ForumItem: FC<ForumItemProps> = ({ data, navigation }) => {
  const navigateToChatRoom = (name: string) => {
    navigation.navigate('ChatRoom', { name });
  };

  const renderIconFromId = (id: string): JSX.Element => {
    switch (id) {
      case 'open':
        return <MaterialIcon style={styles.forumIcon} name="forum" />;
      case 'programming':
        return <FontAwesomeIcon style={styles.forumIcon} name="code" />;
      default:
        return <></>;
    }
  };

  return (
    <TouchableHighlight
      style={styles.forumItem}
      onPress={() => navigateToChatRoom(data.name)}>
      <View style={styles.forumInnerView}>
        {renderIconFromId(data.id)}
        <Text style={styles.forumItemText}>{data.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  forumItem: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#444',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    height: 80,
  },
  forumIcon: {
    marginRight: 15,
    fontSize: 20,
    width: 20,
    height: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  forumInnerView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forumItemText: {
    color: '#aaa',
    fontSize: 20,
  },
});

export default ForumItem;
