import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert, Modal, ActivityIndicator, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Fontisto';
import EIcon from 'react-native-vector-icons/Entypo';
import axios from "axios";
import urls from "../../constants/urls";
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddbda',
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
    height: 40,
    width: 40
  },
  addImage: {
    top: -50,
    right: -120,
    borderRadius: 20,
    width: 40,
    height: 40,
    paddingLeft: 8,
    paddingBottom: 3,
    fontSize: 36,
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE'
  },
  topSliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: widthPercentageToDP("90%"),
    justifyContent: 'space-between',
    marginTop: 80
  },
  contentView: {
    width: widthPercentageToDP("80%"),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
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
  list: {
    // backgroundColor: '#000',
    width: widthPercentageToDP('90%'),
    height: heightPercentageToDP('80%'),
    marginTop: 40
  },
  listItem: {
    width: widthPercentageToDP("80%"),
    height: 100,
    margin: 'auto'
  },
  item:{
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    width: widthPercentageToDP('90%'),
  },
  serviceText: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10
  },
  subText: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10
  },
  serviceStatus: {
    width:widthPercentageToDP("20%"),
    height: heightPercentageToDP("10%"),
    textAlign:'left'
  },
  modalView: {
    marginTop: heightPercentageToDP('30%'),
    width:widthPercentageToDP('80%'),
    marginLeft:widthPercentageToDP("10%"),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  drawerView: {
    height: heightPercentageToDP('100%'),
    width:widthPercentageToDP('60%'),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeading:{
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize:16
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  drawerHeading:{
    width:widthPercentageToDP('60%'),
    marginBottom: 25,
    marginLeft:20,
    textAlign: "left",
    fontWeight: 'bold',
    fontSize:18
  },
  drawerText: {
    width:widthPercentageToDP('50%'),
    backgroundColor:'#eeeeee',
    alignSelf:'flex-start',
    padding: 10,
    marginBottom: 16,
    textAlign: "left",
  },
  modalNote: {
    fontSize:12,
    fontStyle:'italic',
    marginTop:10,
    textAlign:'center'
  },
  loaderOverlay:{
    position: "absolute",
    height:heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor:'#00000070',
    zIndex:100,
    top: 0,
    left:0
  },
  pickerStyle:{
    height: 30,  
    width: widthPercentageToDP("50%"), 
    color: '#344953',  
    backgroundColor:'#fddbda',
    marginBottom: 20,
    justifyContent: 'center',  
  }
});

const Item = ({ item, onPress, backgroundColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:widthPercentageToDP("90%")}}>
      <View style={{width:widthPercentageToDP("60%")}}>
        <Text style={[styles.serviceText]}>Requested Service: {item.serviceId.name}</Text>
        <Text style={[styles.subText]}>User Name: {item.userId.firstName} {item.userId.lastName}</Text>
        <Text style={[styles.subText]}>User Account Number: {item.userId.number}</Text>
        <Text style={[styles.subText]}>User Account Email: {item.userId.email}</Text>
        <Text style={[styles.subText]}>Requested For: {item.requestUser}</Text>
        <Text style={[styles.subText]}>Requested User Number: {item.requestNumber}</Text>
        <Text style={[styles.subText]}>Requested User Email: {item.requestEmail}</Text>
        <Text style={[styles.subText]}>Problem Description: {item.description}</Text>
        <Text style={[styles.subText]}>Payment status: {item?.orderId?.status}</Text>
        <Text style={[styles.subText]}>Problem Description: {item?.orderId?.payment_id}</Text>
      </View>
      <Text style={[styles.serviceStatus]}>{item.status}</Text>
    </View>
  </TouchableOpacity>
);

function AdminScreen() {

  const [selectedId, setSelectedId] = React.useState("");
  const [selectedService, setSelectedService] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [number, setNumber] = React.useState("");
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  let getRequests = () => {
    const url = urls.BASE_URL+urls.get_requests;
    axios.get(url)
    .then(response => {
      console.log("Hereee")
      setLoading(false);
      if(response.status == 200){
        setServices(response.data.requests)
      }
      else {
        Alert.alert( "Some trouble connecting !","Try again later!",[{ text: "OK", onPress: () => console.log("OK") } ]);
      }
      console.log(response.status)
    })
    .catch(error => {
      setLoading(false);
        Alert.alert("Error !", "Some error occurred, please try again !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
      console.log(error)
    })
  }

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    let _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('number');
        const userId = await AsyncStorage.getItem('userId');
        if (value !== null) {
          // We have data!!
          setNumber(value);
          setUserId(userId);
        }
        else {
          router.push('/number-verify')
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
    setLoading(true);
    getRequests();
  }, []);

  const renderItem = ({ item }) => {
    // console.log(item._id)
    const backgroundColor = item.name === selectedId ? "#CCCCCC90" : "#EEEEEE90"
    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item._id);setSelectedService(item.serviceId.name);setModalVisible(true)}}
        backgroundColor={{ backgroundColor }}
        style={styles.listItem}
      />
    );
  };
  let removeData = async () => {
    try {
      await AsyncStorage.removeItem('number');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('firstName');
      await AsyncStorage.removeItem('lastName');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('admin');
    } catch (error) {
      console.log(error);
    }
  };
  var proceed = (link) => {
    if (link == 'logout') {
      removeData();
      router.push('/logout')
    }
    else {
      router.push(`${link}`)
    }
  }

  const requestServiceUpdate = () => {
    setLoading(true);
    const url = urls.BASE_URL+urls.update_request;
      console.log("ritikkatiyar", selectedId, selectedState, userId)
      const data = {"serviceId": selectedId,"status": selectedState, 'userId': userId }
      console.log(data);
      setModalVisible(false);
      axios.post(url,data)
      .then(response => {
        setLoading(false);
        if(response.status == 200){
          Alert.alert("Status Updated !", "Status for the selected request was successfully updated.",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
          getRequests();
        }
        else {
          Alert.alert( "Error !","Some error has occurred, please try again !",[{ text: "OK", onPress: () => console.log("OK") } ]);
        }
        console.log(response.status)
      })
      .catch(error => {
        setLoading(false);
          Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
      })
  }

  return (
    <View style={styles.container}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" />:null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Update Status !</Text>
            <Text style={styles.modalText}>Please select the status of the request.</Text>
            <Picker style={styles.pickerStyle}  
                        selectedValue={selectedState}  
                        onValueChange={(itemValue) =>  
                          {setSelectedState(itemValue); console.log(itemValue)}}  
                    >  
                    <Picker.Item label="Submitted" value="Submitted" />  
                    <Picker.Item label="Contacted" value="Contacted" />  
                    <Picker.Item label="Processing" value="Processing" />  
                    <Picker.Item label="Decline" value="Declined" />  
                    <Picker.Item label="Complete" value="Completed" />  
                </Picker>  
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:widthPercentageToDP('50%')}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => requestServiceUpdate()}
            >
              <Text style={styles.textStyle}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => {
          setDrawerVisible(!drawerVisible);
        }}
      >
        <View>
          <View style={styles.drawerView}>
            <View style={{display:'flex',alignItems:'flex-end' ,width:widthPercentageToDP('60%')}}>
            <EIcon
          name='cross' size={40} onPress={() => setDrawerVisible(!drawerVisible)}/>
            </View>
            <Text style={styles.drawerHeading}>Hi Admin !</Text>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('logout')}}><Text>Logout</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.topSliderContainer}>
        <TouchableOpacity>
        <Icon
          name='bars' size={30} onPress={() => setDrawerVisible(!drawerVisible)}/>
        </TouchableOpacity>
        <Image
          style={styles.LogoImage}
          source={require("../../assets/images/logo.png")}
        />
        <FIcon
          name='email' size={30}/>
      </View>
      <View style={styles.contentView}>
      <FlatList
        numColumns={1}
        style={styles.list}
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />
      </View>
    </View>
  );
}

export default AdminScreen;