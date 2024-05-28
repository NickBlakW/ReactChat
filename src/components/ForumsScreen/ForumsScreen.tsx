import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import ForumItem from './components/ForumItem';
import Forums from './forums.json';
import firestore from '@react-native-firebase/firestore';
import { useEffectAsync } from '../../hooks';

type ForumScreenProps = NativeStackScreenProps<StackNavigation, 'Forums'>;

const ForumsScreen: FC<ForumScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<ForumData> = ({ item }) => (
    <ForumItem data={item} navigation={navigation} />
  );

  const [refreshing, setRefeshing] = useState<boolean>(false);
  const [sortedForums, setSortedForums] = useState<ForumData[]>([]);

  const onRefresh = useCallback(async () => {
    setRefeshing(true);

    const forumsByLastChange = await firestore()
      .collection('Chats')
      .orderBy('createdAt', 'desc')
      .get();

    const uniqueForums = [
      ...new Set(forumsByLastChange.docs.map(d => d.data().chat)),
    ];

    let sortedChatForums: ForumData[] = [];

    uniqueForums.forEach(unique => {
      const foundIndex = Forums.findIndex(forum => forum.forumName === unique);

      sortedChatForums = [...sortedChatForums, Forums[foundIndex]];
    });

    const remainingForums: ForumData[] = Forums.filter(
      forum => !uniqueForums.includes(forum.forumName),
    );

    remainingForums.map(rf => (sortedChatForums = [...sortedChatForums, rf]));

    console.log(sortedChatForums);

    setSortedForums(sortedChatForums);

    setRefeshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      const forumsByLastChange = await firestore()
        .collection('Chats')
        .orderBy('createdAt', 'desc')
        .get();

      const uniqueForums = [
        ...new Set(forumsByLastChange.docs.map(d => d.data().chat)),
      ];

      let sortedChatForums: ForumData[] = [];

      uniqueForums.forEach(unique => {
        const foundIndex = Forums.findIndex(
          forum => forum.forumName === unique,
        );

        sortedChatForums = [...sortedChatForums, Forums[foundIndex]];
      });

      const remainingForums: ForumData[] = Forums.filter(
        forum => !uniqueForums.includes(forum.forumName),
      );

      remainingForums.map(rf => (sortedChatForums = [...sortedChatForums, rf]));

      setSortedForums(sortedChatForums);
    })();
  }, []);

  return (
    <View style={styles.forumScreen}>
      <FlatList
        data={sortedForums}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item.forumName}
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
