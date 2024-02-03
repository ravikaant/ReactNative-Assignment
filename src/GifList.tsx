import React, {memo, useCallback} from 'react';
import {Dimensions, FlatList, Image} from 'react-native';

export interface IGif {
  id: string;
  url: string;
}

interface IGifListProps {
  data: IGif[];
  loadMore: () => void;
}

const ITEM_SIE = Dimensions.get('window').width / 2;
const GifList = memo(({data, loadMore}: IGifListProps) => {
  const RenderGif = useCallback(
    ({item: gif}: {item: IGif}) => (
      <Image
        source={{
          uri: gif.url,
        }}
        // style={{width: 100, height: 100}}
        width={ITEM_SIE}
        height={ITEM_SIE}
        loadingIndicatorSource={{
          uri: 'https://media0.giphy.com/media/jAYUbVXgESSti/giphy.webp?cid=cc03de87mf4hda5zq1ie9dwt8bvou7v8f26k3mh2vyfuk7i6&ep=v1_gifs_search&rid=giphy.webp&ct=g',
        }}
      />
    ),
    [],
  );
  return (
    <FlatList
      data={data}
      numColumns={2}
      getItemLayout={(data, index) => ({
        length: ITEM_SIE,
        offset: ITEM_SIE * index,
        index,
      })}
      keyExtractor={(item, index) => `${index}_${item.id}`}
      onEndReached={loadMore}
      renderItem={RenderGif}
    />
  );
});

export default GifList;
