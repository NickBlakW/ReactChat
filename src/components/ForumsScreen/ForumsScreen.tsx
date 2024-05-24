import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import ForumItem from './components/ForumItem';
import Forums from './forums.json';

type ForumScreenProps = NativeStackScreenProps<StackNavigation, 'Forums'>;

const ForumsScreen: FC<ForumScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<ForumData> = ({ item }) => (
    <ForumItem data={item} navigation={navigation} />
  );

  return (
    <View style={styles.forumScreen}>
      <FlatList
        data={Forums}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  forumScreen: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
  },
});

export default ForumsScreen;
