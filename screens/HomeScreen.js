import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import AutocompleteInput from '../components/AutocompleteInput';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image style={{
            width: 100, height: 100, resizeMode: 'contain'
        }}
        source={{
            uri: 'https://links.papareact.com/gzs',
        }}/>
        
        <AutocompleteInput 
          onSelect={(location) => {
            dispatch(setOrigin({
              display_name: location.display_name,
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude)
            }));
          }}
          onClear={() => {
            dispatch(setOrigin(null));
          }}
        />
        <NavOptions/>
        <NavFavourites/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color: 'blue',
    }
})