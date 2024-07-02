import {
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
} from "react-native";
import React, {useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    startButton: {
        color: "#fff",
        backgroundColor: "#000",
        fontSize: 18,
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

    return (
    <SafeAreaView className="h-full" style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ImageBackground
            style={styles.imageBackground}
            source={require("../../assets/images/start_bck.png")}
        >
            <Image
            style={styles.logoImage}
            source={require("../../assets/images/logo.png")}
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
