
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground} from 'react-native';

import { Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';

export default function Home(props) {

    const [name, setName] = useState('')

    function GoToGallery() {
        props.navigation.navigate('TabButton', {screen: 'Gallery'});
    }
    console.log('Home');
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/home.jpg")} style={styles.background}>

          
            <Input
                        containerStyle = {{marginBottom: 25, width: '70%'}}
                        color= 'white'
                        leftIcon={
                            <FontAwesome
                            name='user'
                            size={24}
                            color='#169687'
                            />}
                        placeholder='your name'
                        onChangeText={(value) => setName(value)}
                        value={name}
            />

            <Button title='Go to Gallery' color="#169687" onPress={() => GoToGallery()}></Button>
        </ImageBackground>
      </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }
  });
  