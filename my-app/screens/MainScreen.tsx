import React, { useState } from 'react';
import { TextInput, View, Image, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { searchCharacters } from '../services/ApiService';
import tw from 'twrnc';
import { CheckBox } from 'react-native-elements';

const MainScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      setError(null);
      try {
        const characters = await searchCharacters(text);
        setResults(characters);
      } catch (e) {
        setError('Error fetching characters');
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (item: any) => {
    if (!selected.find((char) => char.id === item.id)) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((char) => char.id !== item.id));
    }
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={i} style={tw`font-bold`}>
              {part}
            </Text>
          ) : (
            <Text key={i}>
              {part}
            </Text>
          ),
        )}
      </Text>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  );

  return (
    <View style={tw`p-5`}>
      <View style={tw`flex-row flex-wrap mb-5 border p-0 border-gray-700 rounded-lg`}>
        {selected.map((char) => (
          <View key={char.id} style={tw`flex-row items-center bg-gray-200 p-2 m-1 rounded-md border border-gray-100`}>
            <Text style={tw`mr-2`}>{char.name}</Text>
            <TouchableOpacity
              onPress={() => handleSelect(char)}
              style={tw`ml-2 bg-gray-400 w-8 h-8 rounded-md items-center justify-center`}
            >
              <Text style={tw`text-white text-lg`}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={tw`flex-1 p-2`}
          placeholder="Search characters..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>
      {loading && <ActivityIndicator />}
      {error && <Text style={tw`text-red-500`}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <View style={[tw`flex-row p-3 items-center`, { marginLeft: -25 }]}>
                <CheckBox
                  checked={selected.some((char) => char.id === item.id)}
                  onPress={() => handleSelect(item)}
                  checkedIcon='check-square'
                  checkedColor='blue'
                />
                <Image source={{ uri: item.image }} style={[tw`w-12 h-12 mr-3`, { borderRadius: 8 }]} />
                <View>
                  {highlightText(item.name, query)}
                  <Text>Episodes: {item.episode.length}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {renderSeparator()}
          </>
        )}
      />
    </View>
  );
};

export default MainScreen;