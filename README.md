# Demonstration of authentication flow with express backend and mongo database

## Getting started

Running `expo start` in the root directory will start the Metro bundler.

## Project overview

### Introduction

This Expo project was undertaken to practice authenticating users. Various packages were used to create login screens that would have data persist throughout the app and send asynchronous requests to an _Express.js server_ endpoint. _React-Navigation_ was used with a Stack-Navigator that new screens could be pushed-to or popped-from. _Redux_ was used as the global store with _Mongodb_ the database of users. Client side validation was used before requests were made to the server.

---

### React-Navigation

The project began with a basic login screen using React Native and Expo. The first skills developed included using React-Navigation to toggle between screens.

Note that the following line must be run during installation when using Expo: (taken directly from react-navigation docs)

`expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

The Stack Navigator is seperated into two broad partitions depending on if the user is logged in or not. If the user is not logged in, they will see the Create Account screen by default, but also have the option to navigate to the Sign In screen. If they are logged in, they will be shown the Home screen by default and be able to navigated to the Profile and Settings screens.

---

### Redux

The global state is managed with redux. The store keeps track of the Loading status, logged in status, signingOut, userToken and userName. If the App is loading such as waiting for an Asynchronous request to resolve, the Splash screen will be shown. The Logged In status is used by the Stack Navigator to show appropriate screens to authenticated users. The userName is used to store the user's email that they submitted when logging in. After a successful signup or login, the user's ID that is returned from the database is stored in _SecureStore_ as well as the _redux state_ to persist while using the app - and even after closing and reopening the app. The signingOut state is used to show a different graphic by the Navigator when the user is logging out.

---

### Client-side validation

The client side validation mainly uses _validation.js_. Functions include:

- validating an email;
- ensuring both passwords match;
- validating name fields are not empty;
- validating minimum password requirements; and
- validating that the password field is not empty.

---

### Server/Backend/MongoDB

The server is the server.js running from [this project](https://github.com/christopher-1989/single-page-auth-hash-sanitation-validation)
From the root directory of the project run `nodemon server.js`.

The database is set up in the same project. Connection to the database is done via mongosh:
`mongosh "mongodb://localhost:27017/demo"` where demo is the name of the database set up in the project.

### Demonstration

A recording of the functionality can be found [here] (https://github.com/christopher-1989/authentication-flow-express-server-mongodb/blob/main/Simulator%20Screen%20Recording%20-%20iPhone%2012%20Pro%20Max%20-%202021-09-28%20at%2017.01.08.mp4?raw=true)
