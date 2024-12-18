import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { useClickContext } from "./context/ClickContext";
import { db } from "../firebase"; // Firestore import
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

const Home = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { clickCount, incrementClickCount } = useClickContext();
  const router = useRouter();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [username, setUsername] = useState("");

  const fetchAstroData = async () => {
    try {
      const response = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=40btFCccfQsFCcEMmFlmoSqatSPxYBZrl2YIRAD6&start_date=2024-11-01"
      );
      console.log(response.data);
      setDetails(response.data);
      setFilteredData(response.data); // Safely access the works array
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Nasa details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login"); // Redirect to login page if not logged in
    } else {
      const fetchData = async () => {
        try {
          // Ensure the user object has a valid UID
          if (!user?.uid) {
            throw new Error("User ID is missing.");
          }

          // Fetch user data from Firestore
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User data fetched:", userData); // Debugging purpose
            setUsername(userData.username); // Set the username from Firestore
          } else {
            throw new Error("User data not found in Firestore.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err.message);
          setError(err.message || "Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      fetchAstroData();
    }
  }, [isLoggedIn, user, router]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(details);
    } else {
      const filteredData = details.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };

  const handleItemClick = () => {
    incrementClickCount();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/logo3.png")} style={styles.appLogo} />

        <Text style={styles.username}>Welcome,{username}!</Text>
      </View>

      <TextInput
        placeholder="Search by title"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
        placeholderTextColor="#4a4e69"
      />

      <FlatList
        style={styles.list}
        data={filteredData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Pressable onPress={handleItemClick}>
            <View style={styles.cardItem} key={item.date}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Image
                source={{ uri: item.hdurl }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.para}>
                {item.explanation.length > 300
                  ? `${item.explanation.substring(0, 300)}...` // Display the first 300 characters
                  : item.explanation}
              </Text>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>-{item.date}-</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
      <TouchableOpacity
        style={styles.redFloatingButton}
        onPress={() => logout()}
      >
        <Image source={require("./assets/log-out.png")} style={styles.logout} />
        <Text style={styles.floatingButtonText}>Log out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1321",
  },
  list: {
    background: "transparent",
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  date: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#adb5bd",
  },
  dateContainer: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  para: {
    textAlign: "justify",
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
    color: "white",
  },
  error: {
    color: "red",
    fontSize: 18,
  },
  cardItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2f0147",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#14213d",
    marginVertical: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  username: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  menu: {
    width: 30,
    height: 30,
    color: "white",
    marginRight: 10,
  },
  logout: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  LogoutText: {
    color: "white",
  },
  appLogo: {
    width: 110,
    height: 50,
    color: "white",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 200,
    fontSize: 20,
    position: "relative",
    left: 90,
    marginTop: 10,
    color: "white",
    fontSize: 20,
  },
  searchLogo: {
    width: 30,
    height: 30,
    color: "white",
    alignSelf: "flex-end",
    position: "relative",
    bottom: 45,
    left: -10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2f3e46",
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#48cae4",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  redFloatingButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "red",
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-arround",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
