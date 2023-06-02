import React from 'react';
import { FlatList, Dimensions, StyleSheet, View, Text } from 'react-native';
import ListItem from './ListItem';

interface Item {
  id: number;
  condid: string;
  name: string;
  type: string;
  entries: boolean;
  children: Item[];
}

interface ItemsListProps {
  items: Item[];
  onDelete: (item: Item) => void;
}

const ItemsList = React.forwardRef<FlatList, ItemsListProps>(({ items, onDelete }, ref) => {
  const renderListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.title}>Listagem</Text>
        <Text style={styles.counter}>{items.length + ' registros'}</Text>
      </View>
    );
  };

  return (
    <FlatList
      ref={ref}
      data={items}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={() => onDelete(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      ListHeaderComponent={renderListHeader}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    margin: -20,
    marginTop: 0,
    marginBottom: -20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: '#3D3D4C',
    lineHeight: 30,
  },
  counter: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 30,
    color: '#A0A0B2',
  },
});

export default ItemsList;
