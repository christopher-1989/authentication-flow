import React, { useState } from "react";
import { ScrollView } from "react-native";
import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { useDispatch } from "react-redux";
import { SIGN_IN } from "../features/UserSlice";
import { toggleLoadingStatus } from "../features/LoadingSlice";
const validator = require('validator');



const isValidInputs = state => {
  const fields = ["email", "password"];
  const validArray = fields.map(field => {
    if (!state[field] || state[field].length === 0) {
      return false;
    }
    return true;
  });
  const validFields = validArray.filter(valid => valid);
  return validFields.length === fields.length;
};

export const SignIn = () => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    
    const isEmptyPW = pwToCheck => {
      if (pwToCheck === '') {
        console.log(pwToCheck);
        setError("Enter your password")
        return true;
      } else {
        return false;
      }
    }

    const onSubmit = () => {
      setError(null);
      if (validateEmail(email) === false || isEmptyPW(password) === true) {
        return;
      } else {

        fetch("http://192.168.1.111:3000/auth/login", {
        // fetch("https://postman-echo.com/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })
        .then(dispatch(toggleLoadingStatus()))
        .then(res => res.json())
        .then(res => {
          console.log("res", res);
          if (res.message) {
            //check if there is an email.. this is a placeholder and should be a token
            dispatch(SIGN_IN({token: res.message}))
          } else if (res.error) {
            setError(res.error);
          }

        })
        .catch(err => {
          console.log('err', err);
        });
        dispatch(toggleLoadingStatus());
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
          onChangeText={text =>  setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <ErrorText text={error} />
        <Button text="Submit" onPress={onSubmit} />
      </ScrollView>
    );
}


