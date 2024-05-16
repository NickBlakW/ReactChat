/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { FC } from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { useEffectAsync } from './hooks';
import { HomeScreen } from './components/Home';
import { AuthContextProvider } from './contexts';
import StackHeader from './components/StackHeader/StackHeader';

const Stack = createStackNavigator<StackNavigation>();

const App: FC = () => {
  useEffectAsync(async () => {
    await BootSplash.hide({ fade: true });
  }, []);

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptionStyles}>
          <Stack.Screen name="HOME" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

const screenOptionStyles: StackNavigationOptions = {
  headerTitle: () => <StackHeader />,
  headerStyle: {
    backgroundColor: '#333',
  },
  headerTitleStyle: {
    color: '#fff',
  },
};

export default App;
