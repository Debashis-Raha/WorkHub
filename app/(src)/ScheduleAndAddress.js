import { StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from '../../components/Header';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const ScheduleAndAddress = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State for the loader

    const route = useRoute();
    const { item } = route.params;
    const navigation = useNavigation();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    const handleRequest = () => {
        if (!selectedDate || !selectedTime || !item.name) {
            Alert.alert("Error", "Please select a date, time, and worker.");
            return;
        }

        setIsLoading(true); // Show loader

        const requestData = {
            date: selectedDate.toLocaleDateString(),
            time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            worker: item.name,
        };

        setTimeout(() => {
            setIsLoading(false); // Hide loader
            Alert.alert("Request Sent", "Your request has been sent successfully!");
            navigation.navigate('(src)/Profile', { newRequest: requestData });
        }, 2000); // Simulate a delay of 2 seconds
    };

    return (
        <View>
            <Header />
            <View style={styles.container}>
                <View style={styles.itemDetailsContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Price per Hour: ${item.price}</Text>
                    <Text style={styles.itemTotal}>Total: ${item.total}</Text>
                    <Text style={styles.itemExperience}>Experience: {item.experience} years</Text>
                </View>
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        style={styles.Placeholder}
                        placeholder='Select date'
                        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                        editable={false}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                    display={Platform.OS === 'android' ? 'default' : 'spinner'}
                    isDarkModeEnabled={false}
                />

                <TouchableOpacity onPress={showTimePicker}>
                    <TextInput
                        style={styles.Placeholder}
                        placeholder='Select time'
                        value={selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        editable={false}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    display={Platform.OS === 'android' ? 'default' : 'spinner'}
                    isDarkModeEnabled={false}
                />

                <TextInput
                    style={styles.Placeholder}
                    placeholder='Address'
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />

                <TouchableOpacity style={styles.payment} onPress={handleRequest} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.doneButtonText}>Send Request</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScheduleAndAddress;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    selectedDateText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black',
    },
    Placeholder: {
        borderColor: "black",
        borderWidth: 2,
        width: "95%",
        padding: 10,
        marginBottom: 20,
    },
    payment: {
        backgroundColor: '#007FFF',
        paddingVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
