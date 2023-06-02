import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AddButtonProps {
  onSubmit: () => void;
  disabled: boolean;
}

const SubmitButton: React.FC<AddButtonProps> = ({ onSubmit, disabled }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={disabled}>
      <Icon name="check" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
});

export default SubmitButton;
