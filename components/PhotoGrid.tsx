import React from 'react';
import {
  Dimensions,
  PixelRatio,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {formatPhotoUri} from '../api/picsum';
import {useNavigation} from '@react-navigation/native';

export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
}: {
  photos: any[];
  numColumns: number;
  onEndReached: any;
}) {
  const {width} = Dimensions.get('window');
  const ratio = PixelRatio.get();

  console.log(ratio);

  const size = width / numColumns;
  const imageSize = ratio > 1 ? size * ratio : size;

  const navigation = useNavigation();

  return (
    <FlatList
      data={photos}
      keyExtractor={(item, idx) => `${item.id.toString()}${idx}`}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            width: size,
            height: size,
          }}
          activeOpacity={0.75}
          onPress={() => {
            console.log(item);
            navigation.navigate('Photo', {item: item as any});
          }}>
          <Image
            source={{
              width: size,
              height: size,
              uri: formatPhotoUri(item.id, imageSize, size),
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}
