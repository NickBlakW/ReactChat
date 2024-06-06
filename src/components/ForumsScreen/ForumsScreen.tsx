import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ForumItem from './components/ForumItem';
import firestore from '@react-native-firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ForumModal from './components/ForumModal';

type ForumScreenProps = NativeStackScreenProps<StackNavigation, 'Forums'>;

const ForumsScreen: FC<ForumScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<ForumData> = ({ item }) => (
    <ForumItem data={item} navigation={navigation} />
  );

  const [refreshing, setRefeshing] = useState<boolean>(false);
  const [sortedForums, setSortedForums] = useState<ForumData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createNewForum = async (
    name: string,
    description: string,
    iconName: string,
  ) => {
    const newForum: ForumData = {
      forumName: name,
      description: description,
      iconName: iconName,
    };

    await firestore().collection('Forums').add(newForum);

    setSortedForums([...sortedForums, newForum]);
    setIsModalOpen(!isModalOpen);
  };

  const extractDataFromFirestore = async () => {
    const forumsByLastChange = await firestore()
      .collection('Chats')
      .orderBy('createdAt', 'desc')
      .get();

    const uniqueForums = [
      ...new Set(forumsByLastChange.docs.map(d => d.data().chat)),
    ];

    let sortedChatForums: ForumData[] = [];

    const firestoreForums = await firestore().collection('Forums').get();
    const dbForums = [
      ...new Set(firestoreForums.docs.map(d => d.data())),
    ] as unknown as ForumData[];

    uniqueForums.forEach(unique => {
      const foundIndex = dbForums.findIndex(
        forum => forum.forumName === unique,
      );

      sortedChatForums = [...sortedChatForums, dbForums[foundIndex]];
    });

    const remainingForums: ForumData[] = dbForums.filter(
      forum => !uniqueForums.includes(forum.forumName),
    );

    remainingForums.map(rf => (sortedChatForums = [...sortedChatForums, rf]));

    setSortedForums(sortedChatForums);
  };

  const onRefresh = useCallback(async () => {
    setRefeshing(true);

    await extractDataFromFirestore();

    setRefeshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await extractDataFromFirestore();

      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.forumScreen}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <FlatList
            data={sortedForums}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={item => item.forumName}
          />
          <TouchableOpacity
            style={styles.addForumModalButton}
            onPress={() => setIsModalOpen(!isModalOpen)}>
            <FontAwesomeIcon name="plus" style={styles.openModalIcon} />
          </TouchableOpacity>
          <ForumModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            createNewForum={createNewForum}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  forumScreen: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
  },
  addForumModalButton: {
    position: 'absolute',
    left: '10%',
    bottom: 10,
    width: '80%',
    color: '#fff',
  },
  openModalIcon: {
    fontSize: 40,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#666',
    width: '100%',
    marginLeft: '50%',
    marginRight: '50%',
    color: '#ddd',
    borderRadius: 8,
  },
});

export default ForumsScreen;
