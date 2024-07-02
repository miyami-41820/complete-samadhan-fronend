import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CustomButton from "../../components/CustomButton"
import urls from '../../constants/urls'
import axios from 'axios';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    color: '#fff',
    backgroundColor: '#000',
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 40,
    marginTop: 30,
    textAlign: 'center',
  },
  LogoImage: {
    height: 100,
    width: 100,
    margin: 20,
    marginTop: 0
  },
  topSliderContainer: {
    flexDirection: 'row',
    width: widthPercentageToDP("50%"),
    justifyContent: 'space-between'
  },
  topSlider: {
    width: widthPercentageToDP("15%"),
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 40
  },
  contentView: {
    width: widthPercentageToDP("70%"),
    alignItems: 'center',
  },
  headerText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    color: '#777777',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  flagImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  inputNumber: {
    backgroundColor: '#fff',
    height: 40,
    width: widthPercentageToDP("50%"),
    marginLeft: 20,
    paddingLeft: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputNumberLabel: {
    marginVertical: 15,
    color: '#777777',
    textAlign: 'center',
  },
  loaderOverlay: {
    position: "absolute",
    height: heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor: '#00000070',
    zIndex: 100,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const NumberVerify = () => {

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  var proceed = () => {
    if(number && number != "0" && number != "" && number.length == 10){
      const url = urls.BASE_URL+urls.send_otp;
      console.log(url)
      const data = {"number": number}
      setLoading(true);
      axios.post(url,data, {httpsAgent: {
        rejectUnauthorized: false,
      }})
      .then(response => {
        console.log(response)
        setLoading(false);
        if(response.status == 200){
          router.push({ pathname: "/otp-verify", params:  {number: number} })
        }
        else {
          Alert.alert( "Error !","Some error has occurred, please try again!",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
        console.log(response.status)
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Error !", "Some error occurred, please try again!",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
        console.log(error.request)
        console.log(error.response)
        console.log(error.message)
        console.log(error.config)
      })
    }
    else {
      Alert.alert(
        "Invalid Number !",
        "Please enter a valid mobile number.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
  return (
    <ImageBackground style={styles.container} source={require("../../assets/images/start_bck.png")}>
      {loading ? <ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" /> : null}
      <Image
        style={styles.LogoImage}
        source={require("../../assets/images/logo.png")}
      />
      <View style={styles.topSliderContainer}>
        <View style={[styles.topSlider, { backgroundColor: '#000' }]}></View>
        <View style={styles.topSlider}></View>
        <View style={styles.topSlider}></View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.headerText}>Hello !</Text>
        <Text style={styles.subHeaderText}>Enter Your Phone Number</Text>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <Image
            style={styles.flagImage}
            source={require("../../assets/images/flag.png")}
          />
          <TextInput
            style={styles.inputNumber}
            onChangeText={(text) => setNumber(text)}
            value={number}
            placeholder="Enter Your Phone Number"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <Text style={styles.inputNumberLabel}>a 6 digit OTP will be sent via SMS to verify your mobile number.</Text>
      </View>
      <CustomButton
            title="Next"
            handlePress= {proceed}
            containerStyles = {styles.startButton}
            isLoading = {loading}
      />
    </ImageBackground>
  )
}

export default NumberVerify;
