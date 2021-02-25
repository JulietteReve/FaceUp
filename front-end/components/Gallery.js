
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native';


// import { Input, ListItem, Button, Card, Badge } from 'react-native-elements'
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements'

import {connect} from 'react-redux';


function Gallery(props) {

    return (
        <View style={{paddingTop: 50}}>
            <ScrollView>
                    <Text style={styles.titleText}>Your Gallery</Text>
                    {props.image.length > 0 ?
                        props.image.map((element, i) => {
                            return(
                                <Card key={i}>
                                    <Card.Image source={{uri: element.url}}></Card.Image>
                                    <Badge value={`${element.age} years old`} badgeStyle={{backgroundColor: '#03071e'}}/>
                                    <Badge value={element.gender} badgeStyle={{backgroundColor: '#370617'}}/>
                                    <Badge value={element.emotion} badgeStyle={{backgroundColor: '#6a040f'}}/>
                                    <Badge value={`is bald : ${element.bald}`} badgeStyle={{backgroundColor: '#9d0208'}}/>
                                    <Badge value={`Hair color: ${element.hairColor}`} badgeStyle={{backgroundColor: '#d00000'}}/>
                                    <Badge value={element.glasses} badgeStyle={{backgroundColor: '#dc2f02'}}/>
                                    <Badge value={element.beard} badgeStyle={{backgroundColor: '#e85d04'}}/>
                                    <Badge value={element.moustache} badgeStyle={{backgroundColor: '#f48c06'}}/>
                                    <Badge value={element.sideburns} badgeStyle={{backgroundColor: '#219ebc'}}/>
                                </Card>   
                            )
                        })
                    : null } 
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
    return {image: state.image}
}

export default connect(
    mapStateToProps,
    null
    )(Gallery);