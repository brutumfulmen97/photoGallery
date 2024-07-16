import React, {useCallback, useEffect, useReducer} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {getList} from '../api/picsum';
import {actionCreator, initialState, reducer} from '../reducers/photos';
import PhotoGrid from '../components/PhotoGrid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@photos', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@photos');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

export default function Photos({}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {photos, nextPage, loading, error} = state;

  const fetchPhotos = useCallback(async () => {
    console.log(nextPage);
    dispatch(actionCreator.loading());
    try {
      const cachedPhotos = await getData();
      if (cachedPhotos.length > 0) {
        dispatch(actionCreator.success(cachedPhotos, nextPage));
      }
      const nextPhotos = await getList(nextPage);
      storeData([...photos, ...nextPhotos]);
      dispatch(actionCreator.success(nextPhotos, nextPage));
    } catch (e) {
      dispatch(actionCreator.failure());
    }
  }, [nextPage, photos]);
  useEffect(() => {
    fetchPhotos();
    console.log('rendered');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (photos?.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }
  return (
    <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});
