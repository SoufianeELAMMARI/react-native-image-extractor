/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Button,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImgToBase64 from 'react-native-image-base64';
let img = '';
function card(imageUri) {

  ImgToBase64.getBase64String(imageUri)
  .then(base64String => {img = base64String;})
  .catch(err => console.log("eror"));
  
  fetch("http://192.168.1.5:8067/card", {
    method: "POST",
    body: JSON.stringify({'img': img}),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    }); 
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
export default App = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [type, setTypeCamera] = useState(RNCamera.Constants.Type.back);

  submitPicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Access Storage',
          message: 'Access Storage for the pictures',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // await CameraRoll.saveToCameraRoll(imageUri);
      } else {
        console.log('Permissao de camera negada.');
      }
    } catch (err) {
      console.warn(err);
    }
    console.log(imageUri);

    alert('Image save with success');

    card(imageUri);
  };

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
        };

        const {uri} = await this.camera.takePictureAsync(options);
        setImageUri(uri);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  changeTypeCamera = () => {
    if (type === RNCamera.Constants.Type.back) {
      setTypeCamera(RNCamera.Constants.Type.front);
    } else {
      setTypeCamera(RNCamera.Constants.Type.back);
    }
  };

  return imageUri ? (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={{uri: imageUri}}>
      <Button title="Press me" onPress={() => submitPicture()} />
      <TouchableOpacity onPress={() => setImageUri(null)}>
        <Text style={{textAlign: 'center'}}>X</Text>
      </TouchableOpacity>
    </ImageBackground>
  ) : (
    <RNCamera
      ref={(camera) => {
        this.camera = camera;
      }}
      style={styles.camera}
      type={type}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      <SafeAreaView>
        <View style={styles.header} />
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.footer}>
          <Icon
            name="times"
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.snapButton}>
              <View style={styles.innerSnapButton}>
                <Icon name="camera" size={25} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Icon
            name="undo"
            size={25}
            color="#fff"
            onPress={() => changeTypeCamera()}
          />
        </View>
      </SafeAreaView>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
