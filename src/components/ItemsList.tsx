import React from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

interface Item {
  name: string;
  description: string;
}

interface ItemsListProps {
  items: Item[];
  onDelete: (item: Item) => void;
}

// Note the addition of ref as a parameter here
const ItemsList = React.forwardRef<FlatList, ItemsListProps>(({ items, onDelete }, ref) => {
  return (
    <FlatList 
      ref={ref} // attach the ref here
      data={items}
      renderItem={({ item }) => (
        <ListItem 
          item={item} 
          onDelete={() => onDelete(item)} 
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
});

export default ItemsList;
