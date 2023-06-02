import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfirmationPopup from './ConfirmationPopup';


interface Item {
  id: number,
  condid: string;
  name: string;
  type: string;
  entries: boolean;
  children: Item[];
}

interface ListItemProps {
  item: Item;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const itemTextColor = item.type === 'Receita' ? '#1BA803' : '#E28856';

  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={[styles.itemText, { color: itemTextColor }]}>
          {item.condid + ' — ' + item.name}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setShowPopup(true)}>
        <Icon name="delete" size={24} color="#000" />
      </TouchableOpacity>
      <ConfirmationPopup
        visible={showPopup}
        onConfirm={() => {
          onDelete();
          setShowPopup(false);
        }}
        onCancel={() => setShowPopup(false)}
        itemName={item.name}
        itemCondid={item.condid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 16,
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    marginLeft: 10,
  },
});

export default ListItem;
