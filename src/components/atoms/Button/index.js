import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

const Button = ({type, onPress, icon}) => {
  if (type === 'add-data') {
    return (
      <TouchableOpacity style={styles.container(type)} onPress={onPress}>
        <Text style={styles.title(type)}>Add more data</Text>
      </TouchableOpacity>
    );
  }
  if (type === 'toggle') {
    return (
      <TouchableOpacity style={styles.container(type)} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  }
  if (type === 'top') {
    return (
      <TouchableOpacity style={styles.container(type)} onPress={onPress}>
        <Text style={styles.title(type)}>Top</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.title(type)}>Go Top</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    paddingVertical: type === 'top' ? 5 : type === 'toggle' ? 0 : 10,
    paddingHorizontal: type === 'top' ? 7 : type === 'toggle' ? 5 : 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: type === 'toggle' ? 'transparent' : colors.black,
    backgroundColor:
      type === 'toggle'
        ? colors.grey
        : type === 'top' || type === 'add-data'
        ? colors.green
        : colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: type === 'add-data' ? 12 : 0,
  }),
  title: type => ({
    fontSize: type === 'add-data' ? 10 : 14,
    letterSpacing: 2,
    color: colors.black,
  }),
});
