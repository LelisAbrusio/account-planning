import React, { useState, useEffect, useRef } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet, Dimensions, Animated } from 'react-native';
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
  setHandleSubmit: (handleSubmit: () => void) => void;
  setFormValid: (value: boolean) => void;
}

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const YPosition = 80;
const newHeight = fullHeight - YPosition;

const ItemForm: React.FC<ItemFormProps> = ({ isVisible, onSubmit, items, setHandleSubmit }) => {
  const [condid, setCondid] = useState('1');
  const [name, setName] = useState('');
  const [type, setType] = useState('Receita');
  const [entries, setEntries] = useState('true');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [formValid, setFormValid] = useState(true);


  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: YPosition,
        duration: 100,
        useNativeDriver: false,
      }).start();
      //setHandleSubmit(handleSubmit);
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 100,
        useNativeDriver: false,
      }).start();
      //setHandleSubmit(() => () => {});
    }
  }, [isVisible, slideAnim]);

  useEffect(() => {
    const isValid = !condid || !name || !type || !entries;
    setFormValid(isValid);
  }, [condid, name, type, entries]); 

  useEffect(() => {
    if (selectedItem) {
      setCondid(`${selectedItem.condid}.${selectedItem.children.length + 1}`);
    } else {
      let lastCondid = items[items.length - 1]?.condid;
      let incrementedCondid = (Number(lastCondid) + 1).toString();
      setCondid(!isNaN(Number(lastCondid)) ? incrementedCondid : "");
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
    
    onSubmit(newItem, selectedItem);
    setCondid(!isNaN(Number(condid)) ? (Number(condid) + 1).toString() : "1");
    setName('');
    setType('Receita');
    setSelectedItem(null);
    setEntries('true');
  };

  return (
    <Animated.View style={[styles.container, { top: slideAnim }]} >
      <Text style={styles.titles}>Conta pai</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedItem?.name || 'none'} onValueChange={(value) => setSelectedItem(value === 'none' ? null : flattenItems(items).find((item) => item.name === value) || null)}>
          <Picker.Item label="Nenhum" value="none" />
          {flattenItems(items).filter(item => !item.entries).map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.titles}>Código</Text>
      <TextInput style={[styles.inputContainer]} value={condid} onChangeText={setCondid}/>

      <Text style={styles.titles}>Nome</Text>
      <TextInput style={[styles.inputContainer]} value={name} onChangeText={setName} placeholder="Name" />
      
      <Text style={styles.titles}>Tipo</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="Receita" value="Receita" />
          <Picker.Item label="Despesa" value="Despesa" />
        </Picker>
      </View>

      <Text style={styles.titles}>Aceita lançamentos</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={entries} onValueChange={setEntries}>
          <Picker.Item label="Sim" value="true" />
          <Picker.Item label="Não" value="false" />
        </Picker>
      </View>
      
      <View style={styles.pickerContainer}>
        <Button title="Cadastrar" onPress={handleSubmit} disabled={!condid || !name || !type || !entries} />
      </View>
      
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: fullWidth,
    left:20,
    height: newHeight,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
    paddingTop: 40,
    margin: -20,
    marginTop: 0,
    marginBottom: 0
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 16,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    marginLeft: 10,
  },
  pickerContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button:{
    borderRadius: 16,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 16,
    margin: 20,
    marginTop: 0,
    marginBottom: 0,
  },
});

export default ItemForm;