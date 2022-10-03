import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import GoogleButton from 'react-google-button'
import { signInWithPopup } from "firebase/auth";
import { authentication, provider } from '../components/firebaseConfig'

const Login = () => {
    const navigation = useNavigation()
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
        setIsSignedIn(true);
        const user = userCredential.user;

        alert('Successfully signed in!');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });    
    }

   const signOut =  () => {
    signOut(authentication).then(() => {
        // Sign-out successful.
        alert('Sign-out successful.');
      }).catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  function googleSignUp () {
    signInWithPopup(authentication, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    // name = user.displayName
    //email = user.email
    //photo = user.photoURL
    alert(user.email);
    navigation.navigate('Dashboard')

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage);
    // ...
  });
  }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>Login</Text>
            <View style={{marginTop: 40}}>
                <TextInput style={styles.TextInput}
                placeholder= "Email"
                value={email}
                onChangeText={(Text) => setEmail(Text)}
                autoCapitalize= "none"
                autoCorrect={false} />
                <TextInput style={styles.TextInput}
                placeholder= "Password"
                value={password}
                onChangeText={(Text) => setPassword(Text)}
                autoCapitalize= "none"
                autoCorrect={false}
                secureTextEntry={true} />
            </View>
            <TouchableOpacity
                onPress={() => {SignInUser(email, password), navigation.navigate('Dashboard')}}
                style={styles.button}>
                <Text style={{fontWeight: 'bold', fontSize: 22, backgroundColor: '#004ed0'}}>Sign in</Text>
            </TouchableOpacity>
            <GoogleButton type="dark" onClick={googleSignUp} style={styles.googleButton} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={{marginTop: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    Don't have an account? Signup Now
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

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
    googleButton: {
        marginTop: 30,
    },
})