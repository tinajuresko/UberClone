import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';

const AutocompleteInput = ({ onSelect, onClear }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useCallback(
    debounce((searchQuery) => {
      if (!searchQuery || searchQuery.trim().length === 0) {
        setSuggestions([]); //Clear suggestions if input is empty
        setLoading(false);
        return;
      }

      setLoading(true);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&accept-language=en`)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
          setLoading(false);
        });
    }, 400),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSuggestions([]);
    onSelect({
      display_name: item.display_name,
      latitude: item.lat,
      longitude: item.lon
    });
  };

  const handleChangeText = (text) => {
    setQuery(text);
    if (!text || text.trim().length === 0) {
      setSuggestions([]);
      onClear();
    }
  };

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={handleChangeText}
        placeholder="Enter your location"
        style={{ borderBottomWidth: 1, borderColor: '#ddd', padding: 8, backgroundColor: '#ddd' }}
      />
      {loading && <Text>Loading...</Text>}
      {query && query.trim().length > 0 && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ddd' }}
        />
      )}
    </View>
  );
};

export default AutocompleteInput;
