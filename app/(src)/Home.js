import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import data from "../../components/Data.json";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const professionals = data.professionals; // Ensure this is an array

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {professionals.map((item, index) => (
          <TouchableOpacity
            style={styles.box}
            key={index}
            onPress={() => navigation.navigate("(src)/Details", { item })}
          >
            <Image
              source={{
                uri: item.avatarUrl || "https://via.placeholder.com/150", // Placeholder image for missing URLs
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.experience}>
                Experience: {item.experience}
              </Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    paddingVertical: 10,
    alignItems: "center",
  },
  box: {
    height: 120,
    flexDirection: "row",
    marginVertical: 5,
    width: "95%",
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: 120,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  experience: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
  rating: {
    fontSize: 13,
    color: "green",
    marginTop: 5,
  },
});
