import { ActivityIndicator, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
title: string;
handlePress: () => void;
containerStyles?: ViewStyle;
textStyles?: TextStyle;
isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading = false,
    }) => {
    return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
        {
            backgroundColor: "blue", // Example background color
            borderRadius: 8, // Example border radius
            minHeight: 62, // Example minimum height
            minWidth: 100,
            justifyContent: "center",
            alignItems: "center",
        },
        containerStyles,
        isLoading ? { opacity: 0.5 } : null,
        ]}
        disabled={isLoading}
    >
        <Text
        style={[
            {
            color: "white", // Example text color
            fontWeight: "600", // Example font weight
            fontSize: 16, // Example font size
            },
            textStyles,
        ]}
        >
        {title}
        </Text>
        {isLoading && <ActivityIndicator color="white" size="small" style={{ marginLeft: 5 }} />}
    </TouchableOpacity>
    );
};

export default CustomButton;
