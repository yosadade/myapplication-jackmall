import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

const List = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginLeft: 12,
    borderColor: colors.black,
    borderWidth: 0.3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.black,
    fontWeight: '400',
  },
});
