import React, { useState, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import SearchField from './components/SearchField';
import AddButton from './components/AddButton';
import ItemsList from './components/ItemsList';
import ItemForm from './components/ItemForm';

interface Item {
  id: number,
  condid: string;
  name: string;
  type: string;
  entries: boolean;
  children: Item[];
}


const initialItems: Item[] = [
  { id: 1, condid: '1', name: 'Receitas', type: 'Receita', entries: false, children: []},
  { id: 2, condid: '2', name: 'Despesas', type: 'Despesa', entries: false, children: []}
];

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);


  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      setItems(initialItems.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setItems(initialItems);
    }
  };

  const itemLimit = 5;

  const flattenItems = (items: Item[]): Item[] => {
    return items.reduce((acc: Item[], item) => {
      return [...acc, item, ...flattenItems(item.children)];
    }, []);
  };

  const addItemToChildren = (items: Item[], newItem: Item, parentId: number): Item[] => {
    return items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, newItem]
        };
      } else if (item.children.length) {
        return {
          ...item,
          children: addItemToChildren(item.children, newItem, parentId)
        };
      } else {
        return item;
      }
    });
  };

  const addItem = (newItem: Item, parentItem: Item | null) => {
    if (parentItem) {
      setItems(prevItems => {
        return addItemToChildren(prevItems, newItem, parentItem.id);
      });
    } else {
      setItems(prevItems => [...prevItems, newItem]);
    }
    if (items.length + 1 > itemLimit) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
    }
    setIsFormVisible(false);
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
      <ItemsList ref={flatListRef} items={flattenItems(items)} onDelete={handleDelete} />
      <ItemForm
        isVisible={isFormVisible}
        onSubmit={addItem}
        onClose={() => setIsFormVisible(false)}
        items={items}
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
