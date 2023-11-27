import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

const shuffleArray=(array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const Quiz = ({navigation}) => {

    const [questions, setQuestions] = useState();
    const[ques, setQues] = useState(0);
    const[answers, setAnswers] = useState([]);
    const[score, setScore] = useState(0);
    const[isLoading, setIsLoading] = useState(false)

    const getQuiz = async () => {
        setIsLoading(true)
        const url = 'https://opentdb.com/api.php?amount=20&category=22&difficulty=medium&type=multiple&encode=url3986';
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results);
        setAnswers(generateAnswersAndSuffle(data.results[0]))
        setIsLoading(false)
        
    };
        useEffect(() => {
            getQuiz();
        }, []);

        const handleNextPress = () => {
            setQues(ques+1)
            setAnswers(generateAnswersAndSuffle(questions[ques+1]))
        };

        const generateAnswersAndSuffle=(_question)=>{
            const answers= [..._question.incorrect_answers]
            answers.push(_question.correct_answer)
            
            shuffleArray(answers)
            return answers
        }

        const handleSelectedOption = (_answer) => {
            if(_answer===questions[ques].correct_answer) {
                setScore(score+10)
            }
            if(ques!==19){
                setQues(ques+1)
                setAnswers(generateAnswersAndSuffle(questions[ques+1]))}
                if(ques===19){
                    handleShowResult()
                }
        }

        const handleShowResult = () => {
            navigation.navigate("Result",{
                score: score
            })
        }
    
  return (
    <View style={styles.container}>
        { isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%"}}>
        <Text style={{ fontSize: 32, fontWeight: '800'}}>LOADING...</Text>
        </View>:questions && (
        <View style={styles.parent}>
        <View style={styles.top}>
            <Text style={styles.questionText}>Q. {decodeURIComponent(questions[ques].question)}</Text>
            </View>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>handleSelectedOption(answers[0])}>
                        <Text style={styles.answer}>{decodeURIComponent(answers[0])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>handleSelectedOption(answers[1])}>
                        <Text style={styles.answer}>{decodeURIComponent(answers[1])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>handleSelectedOption(answers[2])}>
                        <Text style={styles.answer}>{decodeURIComponent(answers[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>handleSelectedOption(answers[3])}>
                        <Text style={styles.answer}>{decodeURIComponent(answers[3])}</Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.bottom}>
                        {ques!==19 &&<TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity> }
                        {ques===19 &&<TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity> }
                    </View>
                    </View>
                    )}
        </View>
  )
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        marginHorizontal: 16,
        height: "100%",
    },
    top: {
        marginVertical: 16,
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#168AAD',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    questionText: {
        fontSize: 28,
    },
    answer: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
    },
    answerButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#184E77',
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    parent: {
      height: "100%",  
    }
});