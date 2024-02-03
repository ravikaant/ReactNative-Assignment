import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import GifList, {IGif} from './GifList';
import {fetchGifs} from './fetchData';

// import debounce from 'lodash.debounce';

export interface ISearchGifProps {
  theme: 'dark' | 'light';
}

const SearchGif = memo(({theme}: ISearchGifProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [gifData, setGifData] = useState<IGif[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const loadMoreData = useCallback((query: string, offset: number) => {
    fetchGifs({
      url: `https://api.giphy.com/v1/gifs/search?api_key=njUh86xSKe0A4MCirbhQG47WQ43vH4ND&q=${query}&limit=25&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`,
      onSuccess: (data: any[]) => {
        setGifData(prev => [
          ...prev,
          ...data.map((gif: any) => ({
            url: gif.images.original.webp,
            id: gif.id,
          })),
        ]);
        setCurrentOffset(prev => prev + data.length);
      },
    });
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setGifData([]);
      setCurrentOffset(0);
      loadMoreData(searchQuery, 0);
    }
  }, [searchQuery, loadMoreData]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 300);
  }, [searchTerm]);

  const onEndReached = useCallback(() => {
    loadMoreData(searchQuery, currentOffset);
  }, [currentOffset, searchQuery, loadMoreData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      paddingVertical: 16,
    },
    inputStyle: {
      borderColor: theme === 'dark' ? '#fff' : '#000',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      color: theme === 'light' ? '#000' : '#fff',
      padding: 12,
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.inputStyle}
        placeholder="Search GIFs"
        placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
      />
      {gifData.length > 0 && <GifList data={gifData} loadMore={onEndReached} />}
    </View>
  );
});

export default SearchGif;
