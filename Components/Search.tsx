import styled from 'styled-components/native';
import { Pressable, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

interface SearchProps {
  searchHandler: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContainer = styled.View`
  height: 40px;
  padding: 0 8px;
`;

const Search = ({ searchHandler }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handlePress = () => {
    setSearchText('');
  };

  useEffect(() => {
    searchHandler(searchText);
  }, [searchText]);

  return (
    <SearchContainer
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'powderblue',
        borderTopColor: 'steelblue',
        borderTopWidth: 1,
        borderBottomColor: 'steelblue',
        borderBottomWidth: 1,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
          style={{ flex: 1 }}
        />
      </View>
      <Pressable onPress={handlePress}>
        <MaterialIcons name="clear" size={24} color="black" />
      </Pressable>
    </SearchContainer>
  );
};

export { Search };
