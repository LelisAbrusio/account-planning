import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Item {
  name: string;
  description: string;
}

interface ListItemProps {
  item: Item;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="delete" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    marginLeft: 10,
  },
});

export default ListItem;
