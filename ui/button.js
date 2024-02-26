import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../global/colors";

const Button = ({ name, color, size, onPress, label }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.innerContainer}>
          <Ionicons name={name} size={size} color={color} />
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  outerContainer: {
    maxWidth: 180,
  },
  pressed: {
    opacity: 0.75,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: colors.neonOrange,
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
