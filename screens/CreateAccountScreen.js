import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { useDispatch } from "react-redux";
import { toggleLoadingStatus } from "../features/LoadingSlice";
import { SIGN_IN } from "../features/UserSlice";
import { isEmail } from 'validator/lib/isEmail';

const styles = StyleSheet.create({
  textBlock: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
  link: {
    textDecorationLine: "underline"
  }
});

const isValidInputs = state => {
  const fields = ["email", "fName", "lName", "password", "cPassword"];
  const validArray = fields.map(field => {
    if (!state[field] || state[field].length === 0) {
      return false;
    }
    return true;
  });

  const validFields = validArray.filter(valid => valid);
  return validFields.length === fields.length;
};

export const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  const onSubmit = () => {
    if (!isValidInputs([email, fName, lName, password])) { //change to !isValidInputs
      setError("An error occured." );
    } else {

      fetch("http://192.168.1.111:3000/auth/signup", {
      // fetch("https://postman-echo.com/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          fName,
          lName,
          password
        })
      })
        .then(dispatch(toggleLoadingStatus()))
        .then(res => res.json())
        .then(res => {
          console.log("res", res);
          if (res.data.email) {
            //check if there is an email.. This is a fake token
            dispatch(SIGN_IN({token: res.data.email}));
          }
          dispatch(toggleLoadingStatus());
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20 }}
        style={{ backgroundColor: "#fff" }}
      >
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          onChangeText={text =>  setEmail(text)}        />
        <TextField
          label="First Name"
          placeholder="John"
          onChangeText={text =>  setfName(text)}        />
        <TextField
          label="Last Name"
          placeholder="Doe"
          onChangeText={text =>  setlName(text)}        />
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TextField
          label="Confirm Password"
          secureTextEntry
          onChangeText={text => setPasswordC(text)}
        />
        <ErrorText text={error} />
        <Button text="Submit" onPress={onSubmit} />
        <View style={styles.textBlock}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.text, styles.link]}>Sign in.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }