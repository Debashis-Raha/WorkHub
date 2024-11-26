import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { auth, storage } from './../../configs/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { FAB } from 'react-native-paper';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const route = useRoute();
 
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchProfilePic(currentUser.uid);
    }
  }, []);

  const fetchProfilePic = async (uid) => {
    try {
      const profilePicRef = ref(storage, `profile_pics/${uid}`);
      const url = await getDownloadURL(profilePicRef);
      setProfilePic(url);
    } catch (error) {
      console.log('Error fetching profile picture:', error);
    }
  };

  const uploadProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      setImageLoading(true); // Start loading
      const response = await fetch(uri);
      const blob = await response.blob();
      const uid = user.uid;
      const profilePicRef = ref(storage, `profile_pics/${uid}`);

      try {
        const snapshot = await uploadBytes(profilePicRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setProfilePic(downloadURL);
        setImageLoading(false); // Stop loading
        Alert.alert('Success', 'Profile picture uploaded successfully!');
      } catch (error) {
        console.log('Error uploading profile picture:', error);
        setImageLoading(false); // Stop loading
        Alert.alert('Error', 'Failed to upload profile picture');
      }
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out!');
        Alert.alert('Success', 'User signed out successfully!');
        navigation.navigate("(Auth)/Login");
      })
      .catch((error) => {
        console.log('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out');
      });
  };

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.displayName || user.email}</Text>
      {imageLoading ? (
        <Text>Loading image...</Text>
      ) : (
        <>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Text>No profile picture</Text>
          )}
        </>
      )}
      <Button title="Upload Profile Picture" onPress={uploadProfilePic} />
      <FAB
        style={styles.fab}
        icon="logout"
        onPress={handleLogout}
        label="Logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Profile;
