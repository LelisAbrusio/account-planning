import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchField from './components/SearchField';
import AddButton from './components/AddButton';
import ReverseButton from './components/ReverseButton';
import SubmitButton from './components/SubmitButton';
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
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [titleText, setTitleText] = useState('Plano de Contas');
  const [isFormValid, setIsFormValid] = useState(false);
  

  const [handleSubmitForm, setHandleSubmitForm] = useState<() => void>(() => () => {}); 

  const handleFormSubmit = () => {
    handleSubmitForm(); 
    setIsFormVisible(false); 
    setTitleText('Plano de Contas');
  };

  const storeItems = async (newItems: Item[]) => {
    try {
      await AsyncStorage.setItem('@items', JSON.stringify(newItems));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  
  const getStoredItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('@items');
      if (storedItems !== null) {
        // We have data!!
        return JSON.parse(storedItems);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await getStoredItems();
      if (storedItems) {
        setItems(storedItems);
      } else {
        setItems(initialItems);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    storeItems(items);
  }, [items]);

  const handleSearch = (text: string) => {
    setSearchText(text);
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

  const deleteChild = (items: Item[], itemToDelete: Item): Item[] => {
    return items.reduce((acc: Item[], item) => {
      if (item.id === itemToDelete.id) {
        return acc;
      }
      if (item.children.length > 0) {
        return [...acc, { ...item, children: deleteChild(item.children, itemToDelete) }];
      }
      return [...acc, item];
    }, []);
  };
  
  const handleDelete = (itemToDelete: Item) => {
    setItems(prevItems => deleteChild(prevItems, itemToDelete));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={{...styles.leftContainer, zIndex: 1}}>
            {isFormVisible && <ReverseButton onReverse={() => {setIsFormVisible(false); setTitleText('Plano de Contas')} } />}
            <Text style={styles.title}>{titleText}</Text>
          </View>
          
          <View style={{zIndex: 1}}>
            {!isFormVisible && <AddButton onAdd={() => {setIsFormVisible(true); setTitleText('Inserir Conta')} } />}
            {/*isFormVisible && <SubmitButton onSubmit={handleFormSubmit} disabled={!isFormValid}/>*/}
          </View>
        </View>
        <View>
          <SearchField onSearch={handleSearch} />
        </View>
      </View>
      <ItemsList ref={flatListRef} items={flattenItems(items).filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))} onDelete={handleDelete} />

      <ItemForm
        isVisible={isFormVisible}
        onSubmit={addItem}
        onClose={() => setIsFormVisible(false)}
        items={items}
        setHandleSubmit={setHandleSubmitForm}
        setFormValid={setIsFormValid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#622490'
  },
  headerContainer: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default App;
