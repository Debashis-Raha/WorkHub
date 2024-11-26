import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Header from "../../components/Header";

const ProfileScreen = () => {
  const profilePictureUrl =
    "https://th-i.thgim.com/public/news/national/tamil-nadu/48223l/article37131621.ece/alternates/FREE_1200/Vivekh"; // Replace with your profile image link
  const highlights = [
    { id: 1, image: profilePictureUrl, label: "😊✨" },
    { id: 2, image: profilePictureUrl, label: "Fit" },
    { id: 3, image: profilePictureUrl, label: "Cinematic" },
    { id: 4, image: profilePictureUrl, label: "New" },
  ];

  const posts = [
    { id: 1, image: profilePictureUrl },
    { id: 2, image: profilePictureUrl },
    { id: 3, image: profilePictureUrl },
    { id: 4, image: profilePictureUrl },
    { id: 5, image: profilePictureUrl },
    { id: 6, image: profilePictureUrl },
    { id: 7, image: profilePictureUrl },
    { id: 8, image: profilePictureUrl },
    { id: 9, image: profilePictureUrl },
    { id: 10, image: profilePictureUrl },
  ];

  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Header title=''/>
      <View style={styles.topBar}>
        <Text style={styles.username}>{item.UserName}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image style={styles.profilePic} source={{ uri: profilePictureUrl }} />
        <View style={styles.profileStats}>
          <Text style={styles.statNumber}>22</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statNumber}>835</Text>
          <Text style={styles.statLabel}>Work</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statNumber}>{item.experience}</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
      </View>

      {/* Profile Name and Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.name}>{item.description}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights */}
      <ScrollView horizontal style={styles.highlights}>
        {highlights.map((highlight) => (
          <View key={highlight.id} style={styles.highlight}>
            <Image
              style={styles.highlightImage}
              source={{ uri: highlight.image }}
            />
            <Text style={styles.highlightText}>{highlight.label}</Text>
          </View>
        ))}
        <View style={styles.highlight}>
          <Entypo name="circle-with-plus" size={40} color="#1e90ff" />
          <Text style={styles.highlightText}>New</Text>
        </View>
      </ScrollView>

      {/* Posts Section */}
      <ScrollView contentContainerStyle={{ marginBottom: -50 }}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <ScrollView contentContainerStyle={styles.postGrid}>
          {posts.map((post) => (
            <Image
              key={post.id}
              style={styles.postImage}
              source={{ uri: post.image }}
            />
          ))}
        </ScrollView>
      </ScrollView>
      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() =>
          navigation.navigate("(src)/ScheduleAndAddress", { item })
        }
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  username: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#1e90ff",
  },
  profileStats: {
    alignItems: "center",
  },
  statNumber: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
    fontSize: 14,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  highlights: {
    marginHorizontal: 10,
  },
  highlight: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 55,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1e90ff",
  },
  highlightText: {
    color: "black",
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  postGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  postImage: {
    width: "30%",
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  proceedButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
