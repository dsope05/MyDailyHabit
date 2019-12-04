import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Picker, Container, Header, Content, Button, Title, Body, Right, Left, Icon, Item, Input } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import { connect } from 'react-redux';
import db from '../../config';
import firebase from 'firebase';
import initApp from '../initApp';

class SignIn extends React.Component {
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
    const { history, fbSignIn, signInError } = this.props;
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title> Sign In </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={{  flexGrow: 1, padding: 5, paddingTop: 55, alignItems: 'center' }}>
          <Text style={{
            marginBottom: 50,
            fontSize: 20
          }} > My Daily Habit </Text>
          <View style={{ width: '100%' }}>
            <Item regular style={{ marginBottom: 21, width: '90%', alignSelf: 'center', marginRight: 10 }}>
              <Input onChangeText={this.onEmailChange.bind(this)} placeholder='Email' />
            </Item>
            <Item regular style={{ marginBottom: 21, width: '90%', alignSelf: 'center', marginRight: 10 }}>
              <Input secureTextEntry={true} onChangeText={this.onPasswordChange.bind(this)} placeholder='Password' />
            </Item>
          </View>
          <Text>
            { signInError }
          </Text>
          <View style={styles.addHabitContainer}>
            <Button onPress={() => {
              const { email, password } = this.state;
              fbSignIn(email, password)
            }} block>
            <Text> Sign In </Text>
            </Button>
          </View>
            <Text style={styles.orText}> - OR - </Text>
            <Text>
              Don't have an account?
              <Text style={styles.signUp} onPress={() => history.push('signUp')}> Sign Up </Text>
            </Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { habits, other, signInError } = state;
  return {
    signInError,
    habits,
    other

  };
}

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    fbSignIn: (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
        console.log('res', res)
        if (res) {
          initApp(res.user.uid).then((userData) => {
            console.log('uid signin', res.user.uid)
            dispatch({
              type: 'INIT_APP',
              uid: res.user.uid,
              email,
              data: userData,
            }) 
          })
        }
      }).then(() => history.push('home'))
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
          dispatch({
            type: 'SIGN_IN_ERROR', 
            message: errorMessage
          })
        console.log('errormessage', errorMessage)
      })

    }
  }
}
const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn)
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
  signUp: {
    color: '#0000EE'
  },
});
