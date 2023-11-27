import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Title from '../components/title';

const Result = ({navigation, route}) => {
    const {score} = route.params

    const resultBanner = score>50?"https://cdn3d.iconscout.com/3d/premium/thumb/hand-holding-trophy-6908918-5666845.png" :"https://cdn3d.iconscout.com/3d/premium/thumb/hand-thumb-down-4705807-3923620.png"

  return (
    <View style={styles.container}>
      <Title titleText = 'RESULTS'/>
      <Text style={styles.scoreValue}>{score}</Text>
      <View style={styles.bannerContainer}>
        <Image 
            source={{
                uri: resultBanner,
            }}
            style={styles.banner}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
        <Text style={styles.buttonText}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Result;

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        marginHorizontal: 16,
        height: "100%",
    },
    button: {
        width: '100%',
        backgroundColor: '#168AAD',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    scoreValue: {
        fontSize: 30,
        fontWeight: '800',
        alignSelf: 'center',
    },
});