import React, { useState, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
/*import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp  } from '@react-navigation/stack';*/
import SearchField from './components/SearchField';
import AddButton from './components/AddButton';
import ItemsList from './components/ItemsList';
import ItemForm from './components/ItemForm'; // import the ItemForm component

interface Item {
  name: string;
  description: string;
}

/*type StackNavigatorParams = {
  Home: undefined; // This screen does not accept any parameters
  Form: undefined; // This screen does not accept any parameters
};*/

const initialItems: Item[] = [
  { name: 'Item 1', description: 'This is item 1' },
  { name: 'Item 2', description: 'This is item 2' },
];

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // new state for showing or hiding the form


  //const navigation = useNavigation<StackNavigationProp<StackNavigatorParams, 'Home'>>();

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      setItems(initialItems.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setItems(initialItems);
    }
  };

  const itemLimit = 5;

  /*const addItem = () => {
    const newItem = { name: `Item ${items.length + 1}`, description: `This is item ${items.length + 1}` };
    setItems(prevItems => {
      const updatedItems = [...prevItems, newItem];
      if (updatedItems.length > itemLimit) {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
      }
      return updatedItems;
    });
    //navigation.navigate('Form');
  };*/

  const addItem = (newItem: { name: string; description: string }) => {
    setItems(prevItems => [...prevItems, newItem]);
    if (items.length + 1 > itemLimit) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
    }
    setIsFormVisible(false); // close the form when done
  };

  const handleDelete = (itemToDelete: Item) => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your App Name</Text>
          <AddButton onAdd={() => setIsFormVisible(true)} />
        </View>
        <View>
          <SearchField onSearch={handleSearch} />
        </View>
      </View>
      <ItemsList ref={flatListRef} items={items} onDelete={handleDelete} />
      <ItemForm
        isVisible={isFormVisible}
        onSubmit={addItem}
        onClose={() => setIsFormVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerContainer: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default App;
