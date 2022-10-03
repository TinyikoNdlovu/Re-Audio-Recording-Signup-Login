import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { authentication } from "../components/firebaseConfig";

const Signup = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

const RegisterUser = async (firstName, lastName, email, password) => {
        await createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            alert('Successfully sign up!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })     
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 23}}>
                Signup Here!!</Text>
                <View style={{marginTop: 40}}>
                    <TextInput style={styles.TextInput}
                    placeholder= "First Name"
                    value={firstName}
                    onChangeText={(Text) => setFirstName(Text)}
                    autoCorrect={false} />
                    <TextInput style={styles.TextInput}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(Text) => setLastName(Text)}
                    autoCorrect={false} />
                    <TextInput style={styles.TextInput}
                    placeholder= "Email"
                    value={email}
                    onChangeText={(Text) => setEmail(Text)}
                    autoCapitalize= "none"
                    autoCorrect={false}
                    keyboardType="email-address" />
                    <TextInput style={styles.TextInput}
                    placeholder= "Password"
                    value={password}
                    onChangeText={(Text) => setPassword(Text)}
                    autoCapitalize= "none"
                    autoCorrect={false}
                    secureTextEntry= {true} />
                </View>
                <TouchableOpacity
                onPress={() => {RegisterUser(firstName, lastName, email, password), navigation.navigate('Login')}}
                style={styles.button} >
                    <Text style={{fontWeight: 'bold', fontSize: 22, backgroundColor: '#004ed0'}}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    Already have an account? Login Now
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    TextInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
})