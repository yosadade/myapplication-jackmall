import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import {ICRedo} from '../../../assets';

const Message = ({type, onPress}) => {
  if (type === 'no-internet') {
    return (
      <View style={styles.container(type)}>
        <Text style={styles.title}>No Internet</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <ICRedo />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container(type)}>
      <Text style={styles.title}>Fetching data...</Text>
      <ActivityIndicator size={25} color={colors.red} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: type => ({
    flex: 1,
    flexDirection: type === 'no-internet' ? null : 'row',
    marginTop: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: {
    fontSize: 14,
    letterSpacing: 2,
    marginRight: 12,
    color: colors.red,
    fontWeight: '700',
  },
  button: {
    padding: 4,
    marginTop: 14,
  },
});
