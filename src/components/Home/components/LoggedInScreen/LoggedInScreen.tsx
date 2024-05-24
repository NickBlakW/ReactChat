import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../../contexts';
import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  color: string;
  navigation: NativeStackNavigationProp<StackNavigation, 'Home', undefined>;
}

const LoggedInScreen: FC<Props> = ({ color, navigation }) => {
  const { user } = useAuth();

  return (
    <View>
      <Text style={styles.homeH1}>
        Welcome <Text style={{ color: color }}>{user?.displayName}</Text>!
      </Text>
      <Button
        title="Go to forums"
        onPress={() => navigation.navigate('Forums')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeH1: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    color: '#aaa',
    marginBottom: 15,
  },
});

export default LoggedInScreen;
