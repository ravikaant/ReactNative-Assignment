/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchGif from './src/SearchGif';
import TrendingGifs from './src/Trending';

function App(): React.JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentTab, setCurrentTab] = useState<'trending' | 'search'>(
    'trending',
  );
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const backgroundStyle = {
    backgroundColor: theme === 'dark' ? Colors.darker : Colors.lighter,
  };
  const container = {
    flex: 1,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      borderColor: theme === 'dark' ? '#fff' : '#000',
      // borderBottomWidth: 1,
      elevation: 3,
      shadowColor: theme === 'dark' ? '#fff' : '#000',
      shadowOpacity: 1,
      shadowRadius: 12,
    },
    buttonTextStyle: {
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: 14,
      fontWeight: '500',
    },
    selectedButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? 'red' : 'green',
    },
    tabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <SafeAreaView style={[backgroundStyle, container]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <Pressable onPress={() => setCurrentTab('trending')}>
            <Text
              style={[
                styles.buttonTextStyle,
                currentTab === 'trending' && styles.selectedButtonText,
              ]}>
              Trending
            </Text>
          </Pressable>
          <Pressable onPress={() => setCurrentTab('search')}>
            <Text
              style={[
                styles.buttonTextStyle,
                currentTab === 'search' && styles.selectedButtonText,
              ]}>
              Search
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={toggleTheme}>
          <Text style={styles.buttonTextStyle}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </Text>
        </Pressable>
      </View>
      {currentTab === 'trending' ? (
        <TrendingGifs theme={theme} />
      ) : (
        <SearchGif theme={theme} />
      )}
    </SafeAreaView>
  );
}

export default App;
