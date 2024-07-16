import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SinglePhoto({route}: {route: any}) {
  const {id} = route.params.item;
  console.log(route);

  const {author, url} = route.params.item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{id}</Text>
      <Text style={styles.text}>{author}</Text>
      <Text style={styles.text}>{url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});
