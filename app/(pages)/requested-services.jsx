import React, {useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert, Modal, ActivityIndicator, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Fontisto';
import EIcon from 'react-native-vector-icons/Entypo';
import axios from "axios";
import urls from "../../constants/urls"
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddbda',
    alignItems: 'center',
    // justifyContent: 'center',
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
    // marginTop: heightPercentageToDP('10%'),
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

const Item = ({ item, backgroundColor}) => (
  <TouchableOpacity style={[styles.item, backgroundColor]}>
    <View style={{flexDirection:'row',alignItems:'center',width:widthPercentageToDP("90%")}}>
      <View style={{width:widthPercentageToDP("60%")}}>
        <Text style={[styles.serviceText]}>Requested Service: {item?.serviceId?.name}</Text>
        <Text style={[styles.subText]}>Hi {item?.userId?.firstName} {item?.userId?.lastName}</Text>
        <Text style={[styles.subText]}>I will reach out to you on:</Text>
        <Text style={[styles.subText]}>Phone Number: {item?.requestNumber}</Text>
        <Text style={[styles.subText]}>Email: {item?.requestEmail}</Text>
        <Text style={[styles.subText]}>Service status: {item.status}</Text>
        <Text style={[styles.subText]}>Payment Status: {item?.orderId?.status}</Text>
        <Text style={[styles.subText]}>Payment Id: {item?.orderId?.payment_id}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function UserServiceDetails() {
  const [selectedId, setSelectedId] = React.useState(null);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [number, setNumber] = React.useState(null);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  let getRequests = (userIdPass) => {
    const url = urls.BASE_URL+urls.get_user_services;
    const data = {"userId": userIdPass}
    axios.post(url, data)
    .then(response => {
      console.log("Hereee")
      setLoading(false);
      if(response.status == 200){
        console.log(response.data.requests)
        setServices(response.data.requests)
      }
      else {
        Alert.alert( "Some trouble connecting !","Try again later!",[{ text: "OK", onPress: () => console.log("OK") } ]);
      }
      console.log(response.status)
    })
    .catch(error => {
      setLoading(false);
        Alert.alert("Error !", "Some Error Occurred !",[ { text: "OK", onPress: () => console.log("OK Pressed") }]);
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
        const number = await AsyncStorage.getItem('number');
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId, "User ID")
        if (number !== null && userId !== null) {
          // We have data!!
          setNumber(number);
          setUserId(userId);
          getRequests(userId);
        }
        else {
            router.push('number-verify')
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
    setLoading(true);
    console.log(userId, "User ID")
  }, []);

  const renderItem = ({ item }) => {
    console.log(item)
    backgroundColor = 'white';
    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
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
        router.push('/index')
    }
    else {
        router.push(`${link}`)
    }
  }

  return (
    <View style={styles.container}>
      {loading?<ActivityIndicator style={styles.loaderOverlay} size="large" color="#0000ff" />:null}
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
            <Text style={styles.drawerHeading}>Hi!</Text>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('profile')}}><Text>My Profile</Text></TouchableOpacity>
            <TouchableOpacity style={styles.drawerText} onPress={() => { proceed('services')}}><Text>Services</Text></TouchableOpacity>
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

export default UserServiceDetails;