import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";
import urls from "../../constants/urls";
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  startButton: {
    color: '#fff',
    backgroundColor: '#000',
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 40,
    marginTop: 30
  },
  LogoImage: {
    height: 100,
    width: 100,
    margin: 20,
    marginTop: 80
  },
  topSliderContainer: {
    display: 'flex',
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
    width: widthPercentageToDP("70%")
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  subHeaderText: {
    color: '#777777',
    fontSize: 18,
    marginBottom: 10
  },
  flagImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  inputNumber: {
    backgroundColor: '#fff',
    height: 40,
    width: widthPercentageToDP("55%"),
    marginLeft: 20,
    paddingLeft: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputNumberLabel: {
    marginVertical: 15,
    marginLeft: 10,
    color: '#777777'
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    width: 40,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
  },
  loaderOverlay:{
    position: "absolute",
    height:heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor:'#00000070',
    zIndex:100,
    top: 0,
    left:0
  }
});

function NumVerifyScreen({}) {
  const { number } = useLocalSearchParams();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef(Array(otp.length).fill(null));

  const setRef = useCallback((ref, index) => {
    inputRefs.current[index] = ref;
  }, []);

  const handleChangeText = (index, value) => {
    const newOtp = [...otp];
    while (newOtp.length <= index) {
      newOtp.push('');
    }
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index, { nativeEvent }) => {
    if (nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const proceed = async () => {
    console.log(number)
    if (otp.join('').length === 6) {
      const url = `${urls.BASE_URL}${urls.verify_otp}`;
      const data = { number, otp: otp.join('') };
      setLoading(true);
      console.log(url,data)
      axios.post(url, data)
        .then(response => {
          setLoading(false);
          if (response?.status === 200) {
            const storeData = async () => {
              console.log(response.data)
              try {
                await AsyncStorage.setItem('number', number);
                await AsyncStorage.setItem('userId', response.data.userData?._id);
                await AsyncStorage.setItem('firstName', response.data.userData?.firstName);
                await AsyncStorage.setItem('lastName', response.data.userData?.lastName);
                await AsyncStorage.setItem('email', response.data.userData?.email);
                if (response.data.userData?.admin) {
                  await AsyncStorage.setItem('admin', String(response.data.userData?.admin));
                }
              } catch (error) {
                console.log("Error storing data:", error);
              }
            };
            storeData();
            // response.data.userData?.admin
            if (response.data.userData.admin) {
                router.push('/admin');
            } else if (response.data.message === "User Exist") {
                router.push('/services')
            } else {
                router.push('/add-profile');
            }
          } else {
            Alert.alert("Error !", "Some error has occurred, please try again !", [{ text: "OK" }]);
          }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert("Error !", "Some error has occurred, please try again !", [{ text: "OK" }]);
        });
    } else {
      Alert.alert("Incorrect OTP !", "Please enter the correct otp.", [{ text: "OK" }]);
    }
  };

  return (
    <ImageBackground style={styles.container} source={require("../../assets/images/start_bck.png")}>
      {loading && <ActivityIndicator style={styles.loaderOverlay} size="small" color="black" />}
      <Image style={styles.LogoImage} source={require("../../assets/images/logo.png")} />
      <View style={styles.topSliderContainer}>
        <View style={styles.topSlider}></View>
        <View style={[styles.topSlider, { backgroundColor: '#000' }]}></View>
        <View style={styles.topSlider}></View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.headerText}>OTP Verification</Text>
        <Text style={styles.subHeaderText}>Enter OTP you have received on +91-{number}</Text>
        <View style={styles.textInputContainer}>
          {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => setRef(ref, index)}
              style={styles.roundedTextInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleChangeText(index, value)}
              onKeyPress={(e) => handleBackspace(index, e)}
            />
          ))}
        </View>
        <Text style={styles.inputNumberLabel}>A 6 digit OTP will be sent via SMS to verify your mobile number.</Text>
      </View>
      <CustomButton
          title="Next"
          handlePress= {proceed}
          containerStyles = {styles.startButton}
          isLoading = {loading}
      />
    </ImageBackground>
  );
}

export default NumVerifyScreen;
