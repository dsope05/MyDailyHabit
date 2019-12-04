import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Picker, Container, Header, Content, Button, Title, Body, Right, Left, Icon, Item, Input } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import { connect } from 'react-redux';
import db from '../../config';
import firebase from 'firebase';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: ''
    }
  }

  onEmailChange(value) {
    this.setState({
      email: value 
    });
  }

  onPasswordChange(value) {
    this.setState({
      password: value 
    });
  }

  render() {
    const { history, fbSignUp, signUpError } = this.props;
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title> Sign Up </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={{  flexGrow: 1, padding: 5, paddingTop: 55, alignItems: 'center' }}>
          <Text style={{
            marginBottom: 50,
            fontSize: 20
          }}>
          My Daily Habit
        </Text>
        <View style={{ width: '100%' }}>
          <Item regular style={{ marginBottom: 21, width: '90%', alignSelf: 'center', marginRight: 10 }}>
            <Input onChangeText={this.onEmailChange.bind(this)} placeholder='Email' />
          </Item>
          <Item regular style={{ marginBottom: 21, width: '90%', alignSelf: 'center', marginRight: 10 }}>
            <Input secureTextEntry={true} onChangeText={this.onPasswordChange.bind(this)} placeholder='Password' />
          </Item>
        </View>
        <Text>
          { signUpError }
        </Text>

        <View style={styles.addHabitContainer}>
          <Button onPress={() => {
            const { email, password } = this.state;
            fbSignUp(email, password)
          }} block>
          <Text> Sign Up </Text>
        </Button>
      </View>
      <Text style={styles.orText}> - OR - </Text>
      <Text> 
        Already have an account?
        <Text style={styles.signIn} onPress={() => history.push('/')}> Sign In </Text>
      </Text>
    </Content>
  </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { habits, other, signUpError } = state;
  console.log('sing up error', signUpError)
  return {
    signUpError,
    habits,
    other

  };
}

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    fbSignUp: (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        console.log ('sign up res', res)
        if (res) {
          history.push('home');
          dispatch({
            type: 'FB_SIGN_UP_SUCCESS',
            uid: res.user.uid,
            email
          }) 
          return res.user.uid
        }
      }).then((uid) => {
        db.collection('habits').doc(uid).set({
          habits: {},
          email 
        })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error message: ', errorMessage)
          dispatch({
            type: 'SIGN_UP_ERROR',
            message: errorMessage
          })
      })
    }
  }
}
const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)
export default SignUpContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addHabitContainer: {
    width: '100%',
    padding: 20,
    marginTop: 89
  },
  orText: {
    marginBottom: 30
  },
  signIn: {
    color: '#0000EE'
  },
});
