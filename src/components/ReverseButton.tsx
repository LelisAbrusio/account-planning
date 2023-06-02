import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AddButtonProps {
  onReverse: () => void;
}

const ReverseButton: React.FC<AddButtonProps> = ({ onReverse }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onReverse}>
      <Icon name="keyboard-arrow-left" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    borderRadius: 25,
    backgroundColor: 'transparent',
    marginLeft:-10,
    marginRight:10
  },
});

export default ReverseButton;
