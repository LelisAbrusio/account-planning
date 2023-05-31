import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
        <TextInput
            style={styles.input}
            value={text}
            onChangeText={handleChange}
            placeholder="Search..."
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 25, 
        overflow: 'hidden', 
        marginTop: 10, 
    },
});

export default SearchField;
