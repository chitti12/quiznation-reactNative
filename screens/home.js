import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Title from '../components/title';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText = 'QUIZNATION'/>
      <View style={styles.bannerContainer}>
        <Image 
            source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/question-bubble-chat-4730498-3934022.png?f=webp'
            }}
            style={styles.banner}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home;

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
});