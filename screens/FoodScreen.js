import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import tw from 'tailwind-react-native-classnames';

const FoodScreen = () => {
    const handlePress = async () => {
        const url = 'https://expo.dev/preview/update?message=Deliveroo%20created&updateRuntimeVersion=1.0.0&createdAt=2024-07-17T19:35:52.555Z&slug=exp&projectId=cd1f8b2b-fb45-4aee-b267-671e9ff77053&group=f4d93057-7227-4dd9-9abd-9b67340c85b3';
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Failed to open URL:', error);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1 justify-center items-center`, {backgroundColor: '#00CCBB'}]}>
            <Animatable.Image 
                source={require('../assets/preparing_order.gif')}
                animation='slideInUp'
                iterationCount={1}
                style={tw`h-96 w-96`}
            />

            <Animatable.Text
                animation='slideInUp'
                iterationCount={1}
                style={tw`text-lg my-10 text-white font-bold`}
            >
                Click Below To Checkout My
            </Animatable.Text>

            <TouchableOpacity onPress={handlePress}>
                <Text style={tw`text-lg my-10 text-white font-bold underline`}>
                    Deliveroo App
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default FoodScreen;

const styles = StyleSheet.create({});
