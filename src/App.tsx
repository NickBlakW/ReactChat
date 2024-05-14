/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { useEffectAsync } from './hooks';
import auth from '@react-native-firebase/auth';
import { HomeScreen } from './components/Home';
import { User } from 'firebase/auth';
import { Text } from 'react-native';

const Stack = createStackNavigator<StackNavigation>();

const App: FC = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffectAsync(async () => {
    await BootSplash.hide({ fade: true });
  }, []);

  const handleAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber;
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyles}>
        <Stack.Screen name="HOME" component={HomeScreen} />
      </Stack.Navigator>
      <>{user ? <Text>{user.displayName}</Text> : <Text>Not logged in</Text>}</>
    </NavigationContainer>
  );
};

const screenOptionStyles: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#333',
  },
  headerTitleStyle: {
    color: '#fff',
  },
};

export default App;

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
