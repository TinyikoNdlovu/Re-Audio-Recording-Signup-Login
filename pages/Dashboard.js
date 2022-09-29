import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Button, } from "react-native";
import  React, {useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../components/firebaseConfig";

import { Audio } from 'expo-av';

// import firestore from '@react-native-firebase/firestore';

const Dashboard = ({signOut}) => {

    const navigation = useNavigation()
    const [name, setName] = useState('')

    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //   firebase.firestore().collection('recordings')
    //   .doc(firebase.authentication().currentUser.uid).get()
    //   .then((snapshot) =>{
    //     if(snapshot.exists){
    //       setName(snapshot.data())
    //     }
    //     else {
    //       console.log('User does not exist')
    //     }
    //   })
    // })
    
    async function startRecording(){
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        console.log('Starting recording..');

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="play"></Button>
        </View>
      );
    });
  }

   return (
    <ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={styles.image}>
      <SafeAreaView>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Hello, {name.firstName}
        </Text>
        <TouchableOpacity onPress={() => {authentication.signOut(), navigation.navigate('Login')}}
        style={styles.button}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text>{message}</Text>
      <Button
      title={recording ? 'Stop Recording' : 'Start Recording'}
      onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
    </ImageBackground>
    
  );
}

export default Dashboard

const styles = StyleSheet.create({
    image: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        marginTop: 50,
        height: 40,
        width: 120,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      flex: 1,
      margin: 16
    },
  });
  