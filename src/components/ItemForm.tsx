// ItemForm.tsx
import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Item {
  id: number,
  condid: string;
  name: string;
  type: string;
  entries: boolean;
  children: Item[];
}

interface ItemFormProps {
  isVisible: boolean;
  onSubmit: (newItem: Item, parentItem: Item | null) => void;
  onClose: () => void;
  items: Item[];
}

const ItemForm: React.FC<ItemFormProps> = ({ isVisible, onSubmit, onClose, items }) => {
  const [condid, setCondid] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [entries, setEntries] = useState('true');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setCondid(`${selectedItem.condid}.${selectedItem.children.length + 1}`);
    } else {
      let lastCondid = items[items.length - 1]?.condid;
      let incrementedCondid = (Number(lastCondid) + 1).toString();
      setCondid(incrementedCondid);
    }
  }, [selectedItem]);

  const flattenItems = (items: Item[]): Item[] => {
    return items.reduce((acc: Item[], item) => {
      return [...acc, item, ...flattenItems(item.children)];
    }, []);
  };

  const handleSubmit = () => {
    if (!condid || !name || !type || !entries) {
      Alert.alert('Error', 'All fields must be filled out');
      return;
    }

    const condidExists = flattenItems(items).some(item => item.condid === condid);
    if (condidExists) {
      Alert.alert('Error', 'The Condid already exists.');
      return;
    }
  
    const condidSplit = condid.split('.');
    if (condidSplit.some(id => Number(id) > 999)) {
      Alert.alert('Error', 'The Condid is invalid. The largest possible condid is "999" regardless of the level you are at.');
      return;
    }
  
    if (selectedItem && selectedItem.type !== type) {
      Alert.alert('Error', 'The item\'s type must match its parent\'s type.');
      return;
    }
  
    const newItem = {
      id: flattenItems(items)[flattenItems(items).length - 1]?.id + 1 || 0,
      condid,
      name,
      type,
      entries: entries === 'true',
      children: [],
    };
    //console.log(items)
    //console.log(selectedItem)
    //console.log(newItem)
    
    onSubmit(newItem, selectedItem);
    setCondid((Number(condid) + 1).toString());
    setName('');
    setType('');
    setSelectedItem(null);
    setEntries('true');
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Picker selectedValue={selectedItem?.name || 'none'} onValueChange={(value) => setSelectedItem(value === 'none' ? null : flattenItems(items).find((item) => item.name === value) || null)}>
          <Picker.Item label="None" value="none" />
          {flattenItems(items).filter(item => !item.entries).map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
        <TextInput value={condid} onChangeText={setCondid}/>
        <TextInput value={name} onChangeText={setName} placeholder="Name" />
        
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="Receita" value="Receita" />
          <Picker.Item label="Despesa" value="Despesa" />
        </Picker>
        <Picker selectedValue={entries} onValueChange={setEntries}>
          <Picker.Item label="Yes" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
        <Button title="Submit" onPress={handleSubmit} disabled={!condid || !name || !type || !entries} />
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