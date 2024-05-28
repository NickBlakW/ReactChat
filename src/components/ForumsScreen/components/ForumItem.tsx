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
  const navigateToChatRoom = (forumName: string) => {
    navigation.navigate('ChatRoom', { forumName });
  };

  const renderIconFromId = (id: string): JSX.Element => {
    switch (id) {
      case 'Open':
        return <MaterialIcon style={styles.forumIcon} name="forum" />;
      case 'Programming':
        return <FontAwesomeIcon style={styles.forumIcon} name="code" />;
      default:
        return <></>;
    }
  };

  return (
    <TouchableHighlight
      style={styles.forumItem}
      onPress={() => navigateToChatRoom(data.forumName)}>
      <View style={styles.forumView}>
        {renderIconFromId(data.forumName)}
        <View style={styles.forumInnerView}>
          <Text style={styles.forumItemText}>{data.forumName}</Text>
          <Text style={styles.forumItemTextSmall}>{data.description}</Text>
        </View>
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
    fontSize: 25,
    width: 30,
    height: 30,
    color: '#fff',
    alignSelf: 'center',
  },
  forumView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forumInnerView: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  forumItemText: {
    color: '#aaa',
    fontSize: 20,
  },
  forumItemTextSmall: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default ForumItem;
