import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import GifList, {IGif} from './GifList';
import {fetchGifs} from './fetchData';
export interface ITrendingGifProps {
  theme: 'dark' | 'light';
}

const TrendingGifs = memo(({theme}: ITrendingGifProps) => {
  const [gifData, setGifData] = useState<IGif[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  useEffect(() => {
    fetchGifs({
      url: 'https://api.giphy.com/v1/gifs/trending?api_key=njUh86xSKe0A4MCirbhQG47WQ43vH4ND&limit=25&offset=0&rating=g&bundle=messaging_non_clips',
      onSuccess: (data: any[]) => {
        setGifData(
          data.map((gif: any) => ({
            url: gif.images.original.webp,
            id: gif.id,
          })),
        );
        setCurrentOffset(data.length);
      },
    });
  }, []);

  const loadMoreData = useCallback(() => {
    fetchGifs({
      url: `https://api.giphy.com/v1/gifs/trending?api_key=njUh86xSKe0A4MCirbhQG47WQ43vH4ND&limit=25&offset=${currentOffset}&rating=g&bundle=messaging_non_clips`,
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
  }, [currentOffset]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      paddingVertical: 16,
    },
  });
  return (
    <View style={styles.container}>
      {gifData.length > 0 && <GifList data={gifData} loadMore={loadMoreData} />}
    </View>
  );
});

export default TrendingGifs;
