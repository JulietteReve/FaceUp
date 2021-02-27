import React, { useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

import {Button, Overlay} from 'react-native-elements';

import {connect} from 'react-redux';

function Picture(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false);
  const [urlList, setUrlList] = useState([]);

  var camera = useRef(null);
 
  const isFocused = useIsFocused();

  useEffect(() => {  
    (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
  }, []);
  
  var cameraDisplay;
  if(hasPermission && isFocused){
    cameraDisplay = <Camera 
      style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
       <View    
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
          >
           <IconIonic
            name="md-reverse-camera"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.torch
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.torch
                );
              }}
            >
            <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
           </TouchableOpacity>

        </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }
  console.log('Gallery')
  return (
    <View style={{flex: 1}}>
        <Overlay isVisible={visible}  width="auto" height="auto">
            <Text>Loading</Text>
        </Overlay>
        
        {cameraDisplay}
        <Button
            icon={
                <IconFontAwesome
                name="save"
                size={20}
                color="#ffffff"
                />
            } 
            title="Snap"
            buttonStyle={{backgroundColor: "#009788"}}
            type="solid"
            onPress={async () => {
                setVisible(true);
                if (camera) {
                    let photo = await camera.takePictureAsync({quality : 0.7});
                    
                    //console.log('photo', photo.uri)
                    var data = new FormData();
                    data.append('avatar', {
                      uri: photo.uri,
                      type: 'image/jpeg',
                      name: 'user_avatar.jpg',
                     });
                     
                     var rawResult = await fetch("http://172.17.1.83:3000/upload", {
                      method: 'post',
                      body: data
                     });
                     var result = await rawResult.json();
                     // console.log(result);
                     
                     
                     if (result.result === true) {
                      setVisible(false);

                      //console.log('result', result);
                      var isBald;
                      if (result.vision[0].faceAttributes.hair.bald > 0.8) {
                        isBald = 'yes'
                      } else {
                        isBald = 'no'
                      }

                      var emotion = result.vision[0].faceAttributes.emotion;

                      var numbers = Object.values(emotion);
                      var emotionDetecte = Object.keys(emotion);
                      var position = Math.max(...numbers);
                      var index = numbers.indexOf(position);
                      var myEmotion = emotionDetecte[index];

                      var beard;
                      if (result.vision[0].faceAttributes.facialHair.beard < 0.3) {
                        beard = 'no beard'
                      } else if (result.vision[0].faceAttributes.facialHair.beard < 0.7) {
                        beard = 'little beard'
                      } else {
                        beard = 'big beard'
                      }

                      var moustache;
                      if (result.vision[0].faceAttributes.facialHair.moustache < 0.3) {
                        moustache = 'no moustache'
                      } else if (result.vision[0].faceAttributes.facialHair.moustache < 0.7) {
                        moustache = 'little moustache'
                      } else {
                        moustache = 'big moustache'
                      }
                      

                      var sideburns;
                      if (result.vision[0].faceAttributes.facialHair.sideburns < 0.3) {
                        sideburns = 'no sideburns'
                      } else if (result.vision[0].faceAttributes.facialHair.sideburns < 0.7) {
                        sideburns = 'little sideburns'
                      } else {
                        sideburns = 'big sideburns'
                      }

                      var hairColor = result.vision[0].faceAttributes.hair.hairColor[0].color;

                      var image = {url: result.url, age: result.vision[0].faceAttributes.age, emotion: myEmotion, beard: beard, moustache: moustache, sideburns: sideburns, gender: result.vision[0].faceAttributes.gender, glasses: result.vision[0].faceAttributes.glasses, bald: isBald, hairColor: hairColor};
                      
                      props.addImage(image);
                      // setUrlList([...urlList, result.resultCloudinary.url])
                     }
                }
            }}
        />

    </View>
  );
}

function mapDispatchToProps(dispatch){
  return {
    addImage: function(image){
      dispatch({
        type: 'addImage',
        imageAdded: image,
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
  )(Picture);

