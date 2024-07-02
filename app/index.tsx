import {
    ScrollView,
    StyleSheet,
    Alert,
    ImageBackground,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SOMETHING_WENT_WRONG } from "../constants/global";
import CustomButton from "../components/CustomButton"
import axios from "axios";
import urls from "../constants/urls"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    startButton: {
        color: "#fff",
        backgroundColor: "#000",
        fontSize: 20,
        padding: 15,
        borderRadius: 40,
        marginTop: 65,
    },
    logoImage: {
        height: "30%",
        aspectRatio: 1,
        alignSelf: "center",
    },
    imageBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

const Home = () => {

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
    const url = urls.BASE_URL + urls.get_user_data_start
    console.log(url)
    let AuthData = async () => {
        try {
        const number = await AsyncStorage.getItem("number");
        const is_admin = await AsyncStorage.getItem("is_admin");
        const userId = await AsyncStorage.getItem("userId");
        if (is_admin === "true" && number != null && userId != null) {
            const data = {"number": number, "userId": userId, "is_admin": is_admin}
            axios.get(url, {params: data}).then((res)=>{
                const responseData = res.data
                console.log(responseData)
                if (responseData.is_admin){
                    router.push('/admin')
                }
                if (responseData.user_exist){
                    router.push('/services')
                }
            }).catch((err)=>{
                Alert.alert("Error !", SOMETHING_WENT_WRONG)
                console.log(err)
            })
        } else if (number !== null && userId !== null) {
            const data = {"number": number, "userId": userId}
            axios.get(url, {params: data}).then((res)=>{
                const responseData = res.data
                console.log(responseData)
                if (responseData.is_admin){
                    router.push('/admin')
                }
                if (responseData.user_exist){
                    router.push('/services')
                }
            }).catch((err)=>{
                Alert.alert(SOMETHING_WENT_WRONG)
                console.log(err)
            })
        }
        } catch (error) {
        Alert.alert(SOMETHING_WENT_WRONG);
        console.log(error);
        }
    };
    AuthData();
    }, []);

    return (
    <SafeAreaView className="h-full" style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ImageBackground
            style={styles.imageBackground}
            source={require("../assets/images/start_bck.png")}
        >
            <Image
            style={styles.logoImage}
            source={require("../assets/images/logo.png")}
            />
            <CustomButton
            title="Get Started"
            handlePress= {()=>router.push('/number-verify')}
            containerStyles = {styles.startButton}
            isLoading = {isLoading}
            />
        </ImageBackground>
        </ScrollView>
    </SafeAreaView>
    );
};

export default Home;
