import React from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

interface BadgeInputProps {
  query: string;
  onChangeQuery: (text: string) => void;
  selectedItems: any[];
  onRemoveItem: (id: number) => void;
}

export const BadgeInput: React.FC<BadgeInputProps> = ({
  query,
  onChangeQuery,
  selectedItems,
  onRemoveItem,
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row flex-wrap mb-3`}
      >
        {selectedItems.map((char) => (
          <View key={char.id} style={tw`flex-row items-center bg-gray-200 p-2 mr-2 mb-2 rounded`}>
            <Text>{char.name}</Text>
            <TouchableOpacity onPress={() => onRemoveItem(char.id)}>
              <Text style={tw`ml-2 text-red-500`}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={tw`border p-3`}
        placeholder="Search characters..."
        value={query}
        onChangeText={onChangeQuery}
      />
    </View>
  );
};
