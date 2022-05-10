import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../../utils';
import Gap from '../Gap';

const CustomModal = ({title, isVisible, onPress}) => {
  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Gap height={12} />
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.titleBtn}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginHorizontal: 24,
  },
  content: {
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 24,
  },
  title: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.black,
    fontWeight: '400',
  },
  btn: {
    padding: 7,
    marginLeft: 'auto',
  },
  titleBtn: {
    fontSize: 12,
    letterSpacing: 2,
    color: colors.red,
    fontWeight: '800',
  },
});
