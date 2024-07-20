import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import AutocompleteInput from '../components/AutocompleteInput'; // Ensure the path is correct
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hi! Where do you want to go?</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <AutocompleteInput 
            onSelect={(location) => {
              const destination = {
                display_name: location.display_name,
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude)
              };
              dispatch(setDestination(destination));
            }}
            onClear={() => {
              dispatch(setDestination(null));
            }}
          />
        </View>
        <NavFavourites/>
      </View>

      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.navigate('RideOptionsCard')} style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full`}>
            <Icon name='car' type='font-awesome' color='white' size={16}/>
            <Text style={tw`text-white text-center pl-2`}>Rides</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
