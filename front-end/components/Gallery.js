
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native';


// import { Input, ListItem, Button, Card, Badge } from 'react-native-elements'
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements'

import {connect} from 'react-redux';


function Gallery(props) {


    console.log('urlList', props.urlList)
    return (
        <View style={{paddingTop: 50}}>
            <ScrollView>
                    <Text style={styles.titleText}>Your Gallery</Text>
                    {props.urlList.length > 0 ?
                        props.urlList.map((element, i) => {
                            console.log(element)
                            return(
                                <Card key={i}>
                                    <Card.Image source={{uri: element}}></Card.Image>
                                    <Badge value="Homme" badgeStyle={{backgroundColor: '#69C746'}}/>
                                    <Badge value="70 ans" badgeStyle={{backgroundColor: '#69C746'}}/>
                                    <Badge value="barbe" badgeStyle={{backgroundColor: '#69C746'}}/>
                                    <Badge value="joyeux !" badgeStyle={{backgroundColor: '#69C746'}}/>
                                    <Badge value="cheveux gris" badgeStyle={{backgroundColor: '#69C746'}}/>
                                </Card>   
                            )
                        })
                    : null } 
                    <Card>
                        <Card.Image source={require("../assets/picture-1.jpg")}></Card.Image>
                        <Badge value="Homme" badgeStyle={{backgroundColor: '#69C746'}}/>
                        <Badge value="70 ans" badgeStyle={{backgroundColor: '#69C746'}}/>
                        <Badge value="barbe" badgeStyle={{backgroundColor: '#69C746'}}/>
                        <Badge value="joyeux !" badgeStyle={{backgroundColor: '#69C746'}}/>
                        <Badge value="cheveux gris" badgeStyle={{backgroundColor: '#69C746'}}/>
                    </Card>   
            </ScrollView>
        </View>
    );
  }

  const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
  });

function mapStateToProps(state){
    return {urlList: state.url}
}

export default connect(
    mapStateToProps,
    null
    )(Gallery);