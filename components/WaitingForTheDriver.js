import { StyleSheet, View, SafeAreaView, Dimensions, Image, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

const WaitingForTheDriver = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const navigation = useNavigation();

    const handleCancel = () => {
        setModalVisible(true); //Show the modal
    };

    const handleConfirm = () => {
        setModalVisible(false); //Hide the modal
        navigation.navigate('NavigateCard'); //Navigate after confirming
    };

    const handleCheckboxChange = (reason) => {
        setSelectedReasons(prev => 
            prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.gifContainer}>
                <Animatable.Image
                    source={require('../assets/driver_on_the_way.gif')}
                    animation='slideInUp'
                    iterationCount={1}
                    style={styles.gif}
                />
            </View>
            <View style={tw`border-t border-gray-200 mt-auto`}>
                <TouchableOpacity onPress={handleCancel} style={tw`bg-black py-3 m-3`}>
                    <Text style={tw`text-center text-white text-xl`}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for cancel confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={tw`text-lg mb-4`}>Why do you want to cancel the ride?</Text>
                        <ScrollView>
                            <View style={tw`flex flex-col items-start`}>
                                <View style={tw`flex-row items-center mb-2`}>
                                    <Checkbox
                                        status={selectedReasons.includes('Changed my mind :( Sorry..') ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange('Changed my mind :( Sorry..')}
                                    />
                                    <Text style={tw`ml-2`}>Changed my mind :( Sorry..</Text>
                                </View>
                                <View style={tw`flex-row items-center mb-2`}>
                                    <Checkbox
                                        status={selectedReasons.includes('Ups.. Wrong location!') ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange('Ups.. Wrong location!')}
                                    />
                                    <Text style={tw`ml-2`}>Ups.. Wrong location!</Text>
                                </View>
                                <View style={tw`flex-row items-center mb-2`}>
                                    <Checkbox
                                        status={selectedReasons.includes('Waiting too long!!') ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange('Waiting too long!!')}
                                    />
                                    <Text style={tw`ml-2`}>Waiting too long!!</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={tw`bg-black py-2 px-4 mt-4`} onPress={handleConfirm}>
                            <Text style={tw`text-center text-white text-xl`}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`bg-gray-500 py-2 px-4 mt-2`} onPress={() => setModalVisible(false)}>
                            <Text style={tw`text-center text-white text-xl`}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default WaitingForTheDriver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#FFCC11',
    },
    gifContainer: {
        height: height / 2, 
        width: width, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden', 
    },
    gif: {
        width: width, //Take the full width of the container
        height: undefined, // Maintain aspect ratio
        aspectRatio: 800 / 600, 
        resizeMode: 'cover', 
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', //Semi-transparent background
    },
    modalContent: {
        width: width - 40,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
});
