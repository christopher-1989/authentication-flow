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
const validator = require("validator");

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

export const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const validateEmail = emailToValidate => {
    if (validator.isEmail(emailToValidate) === true) {
        return true;
    } else {
      setError("Please enter a valid email")
      return false;
    }
  };

  const passwordsMatch = (pw1, pw2) => {
    if (pw1 !== pw2) {
      setError("Passwords do not match");
      return false;
    } else {
      return true;
    }
  }

  const isEmptyFN = fnToCheck => {
    if (fnToCheck === '') {
      setError("Enter your First Name")
      return true;
    } else {
      return false;
    }
  }

  const isEmptyLN = lnToCheck => {
    if (lnToCheck === '') {
      setError("Enter your Last Name")
      return true;
    } else {
      return false;
    }
  }

  const passwordRequirements = pwToValidate => {
    const requirements = { 
        minLength: 6, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 2, 
        returnScore: false, 
        pointsPerUnique: 1, 
        pointsPerRepeat: 0.5, 
        pointsForContainingLower: 10, 
        pointsForContainingUpper: 10, 
        pointsForContainingNumber: 10, 
        pointsForContainingSymbol: 10 
    }
    if(validator.isStrongPassword(pwToValidate, requirements) === true) {
        return true;
    } else {
      setError(`Please enter a valid password.\nPasswords should be at least ${requirements.minLength} characters long, have at least ${requirements.minLowercase} lowercase, ${requirements.minUppercase} uppercase, ${requirements.minNumbers} number, and ${requirements.minSymbols} symbol`)
      return false;
    }
  };

  const onSubmit = () => {
    setError(null);
    if(validateEmail(email) === false || isEmptyFN(fName) === true || isEmptyLN(lName) === true || passwordRequirements(password) === false || passwordsMatch(password, passwordC) === false) {
      return;
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
          if (res._id) {
            dispatch(SIGN_IN({userToken: res.userToken}));
          } else if (res.error) {
            setError(res.error);
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