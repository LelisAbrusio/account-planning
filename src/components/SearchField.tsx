import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchFieldProps {
  onSearch: (searchText: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [text, setText] = useState('');

  const handleChange = (searchText: string) => {
    setText(searchText);
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChange}
        placeholder="Pesquisar conta"
        placeholderTextColor="#C4C4D1" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    margin: 0,
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    paddingLeft: 0
  },
  icon: {
    marginHorizontal: 10,
    color: '#C4C4D1',
  },
});

export default SearchField;