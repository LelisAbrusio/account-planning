// ItemForm.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface ItemFormProps {
  isVisible: boolean;
  onSubmit: (item: { name: string; description: string }) => void;
  onClose: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ isVisible, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [dropdown3, setDropdown3] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, description });
    setName('');
    setDescription('');
    setDropdown1('');
    setDropdown2('');
    setDropdown3('');
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput value={name} onChangeText={setName} placeholder="Name" />
        <TextInput value={description} onChangeText={setDescription} placeholder="Description" />
        <Picker selectedValue={dropdown1} onValueChange={setDropdown1}>
          {/* replace these options with your actual dropdown options */}
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <Picker selectedValue={dropdown2} onValueChange={setDropdown2}>
          {/* replace these options with your actual dropdown options */}
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <Picker selectedValue={dropdown3} onValueChange={setDropdown3}>
          {/* replace these options with your actual dropdown options */}
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default ItemForm;
