import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const { register } = useAuth();
  const router = useRouter();

  const validate = () => {
    let isValid = true;
    let newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required!";
      isValid = false;
    }

    if (!username.trim()) {
      newErrors.username = "Username is required!";
      isValid = false;
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validate()) {
      register(email, password, username);
      alert("Registration successful! Please log in.");
      router.replace("/login");
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <ImageBackground
      source={require("./assets/astro4.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholderTextColor="#4a4e69"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="#4a4e69"
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholderTextColor="#4a4e69"
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          placeholderTextColor="#4a4e69"
        />
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    padding: 30,
    background: "transparent",
    borderRadius: 15,
    width: "90%",
    color: "white",
  },
  appLogo: {
    width: 160,
    height: 70,
    color: "white",
    position: "absolute",
    top: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00a6fb",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#00a6fb",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#00a6fb",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Register;
