import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, BackHandler, ActivityIndicator, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";
import urls from "../../constants/urls";
import { router } from 'expo-router';

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
    paddingHorizontal: 40,
    borderRadius: 40,
    marginTop: 50
  },
  LogoImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    margin: 20,
    marginTop: 20
  },
  addImage: {
    margin: 'auto',
    top: -30,
    // right: -120,
    borderRadius: 30,
    width: 40,
    height: 40,
    paddingLeft: 8,
    // paddingBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE'
  },
  topSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: widthPercentageToDP("50%"),
    justifyContent: 'space-between',
    marginTop: 80
  },
  topSlider: {
    width: widthPercentageToDP("15%"),
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 40
  },
  contentView: {
    width: widthPercentageToDP("80%"),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold'
  },
  imageContainer: {
    position: 'relative',
    height: 200
  },
  inputData: {
    backgroundColor: '#fff',
    height: 40,
    width: widthPercentageToDP("70%"),
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputNumberLabel: {
    width: widthPercentageToDP("80%"),
    marginVertical: 15,
    marginLeft: 30,
    color: '#777777'
  },
  checkboxText: {
    backgroundColor: '#000'
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

function NumVerifyScreen() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      router.push('/services');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  let getData = (number, userId) => {
    var data = JSON.stringify({
      "number": number,
      "userId": userId
    });
    const url = urls.BASE_URL+urls.get_user_data;
    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(response => {
      setLoading(false);
      if(response.status == 200){
        setFirstName(response.data.userData.firstName);
        setLastName(response.data.userData.lastName);
        setEmail(response.data.userData.email);
      }
      else {
        Alert.alert( "Some trouble connecting !","Try again later!",[{ text: "OK", onPress: () => console.log("OK") }]);
      }
    })
    .catch(error => {
      setLoading(false);
        Alert.alert("Error !", "Some error occurred, please try again !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
      console.log(error);
    });
  }
  
  useEffect(() => {
    let _retrieveData = async () => {
      try {
        const number = await AsyncStorage.getItem('number');
        const userId = await AsyncStorage.getItem('userId');
        if (number !== null && userId !== null) {
          setNumber(number);
          setUserId(userId);
          getData(number, userId);
        }
        else{
          router.push('/number-verify');
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  const updateContactDetails = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(reg.test(email) === false){
      Alert.alert( "Incorrect email !", "Please fill email correctly.",[{ text: "OK", onPress: () => console.log("OK Pressed") }]);
      setEmail("");
    }
    if (firstName != '' && lastName != '' && email != '' && number && userId) {
      const url = urls.BASE_URL+urls.update_user;
      const data = {"userId": userId, "firstName": firstName,"lastName": lastName,"email": email,"profile_img": "", 'number': number};
      setLoading(true);
      axios.post(url,data)
      .then(async response => {
        setLoading(false);
        if(response.status == 200){
          const userData = response.data.userData;
          await AsyncStorage.setItem('userId', userData._id);
          await AsyncStorage.setItem('number', number);
          await AsyncStorage.setItem('admin', String(userData.admin));
          await AsyncStorage.setItem('firstName', firstName);
          await AsyncStorage.setItem('lastName', lastName);
          await AsyncStorage.setItem('email', email);
          Alert.alert( "Success !","Your profile data updated successfully !",[{ text: "OK", onPress: () => console.log("OK") }]);
        }
        else {
          Alert.alert( "Error !","Some error has occurred, kindly try again!",[{ text: "OK", onPress: () => console.log("OK") }]);
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Error !","Some error has occurred, kindly try again!",[{ text: "OK", onPress: () => console.log("OK") }]);
        console.log(error);
      });
    }
    else {
      Alert.alert( "Incorrect Data !", "Please fill data correctly.",[{ text: "OK", onPress: () => console.log("OK Pressed") }]);
    }
  }

  return (
    <ImageBackground style={styles.container} source={require("../../assets/images/profile_bck.png")}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" />:null}
      <View style={styles.contentView}>
        <Text style={styles.headerText}>Hi!</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.LogoImage}
            source={require("../../assets/images/blank_profile.png")}
          />
        </View>
        <View style={{ display: 'flex' }}>
          <TextInput
            style={styles.inputData}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            maxLength={10}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            maxLength={10}
          />
          <TextInput
            style={styles.inputData}
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
          />
        </View>
      </View>
      <Text
        style={styles.startButton}
        onPress={updateContactDetails}
      >Update
      </Text>
    </ImageBackground>
  );
}

export default NumVerifyScreen;
