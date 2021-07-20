# Demonstration of authentication flow

## Project overview

### Introduction

This project was undertaken to practice authenticating users. Various packages were used to create login screens that would have data persist throughout the app and send asynchronous requests using _Postman_ to a hypothetical server endpoint. _React-Navigation_ was used with a Stack-Navigator that new screens could be pushed-to or popped-from. _Redux_ was used as the global store.

---

### React-Navigation

The project began with a basic login screen using React Native and Expo. The first skills developed included using React-Navigation to toggle between screens.

Not that the following line must be run if using expo: (taken directly from react-navigation docs)

`expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

The Stack Navigator is seperated into two broad partitions depending on if the user is logged in or not. If the user is not logged in, they will see the Create Account screen by default, but also have the option to navigate to the Sign In screen. If they are logged in, they will be shown the Home screen by default and be able to navigated to the Profile and Settings screens.

---

### Redux

The global state was managed with redux. If the user is logged in, they will be
