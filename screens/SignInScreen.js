import React, { useState } from "react";
import { ScrollView } from "react-native";
import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { SIGN_IN, toggleLoggedIn } from "../features/UserSlice";


export const SignIn = ({ navigation }) => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // const handleSubmit = () => {
    // // this.setState({ error: "" });
    // alert("todo!");
    // };

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
        {/* <ErrorText text={error} /> */}
        <Button text="Submit" onPress={() => {
          dispatch(SIGN_IN({token: email}))
        }} />
      </ScrollView>
    );
}


