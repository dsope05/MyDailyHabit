import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Picker, Container, Header, Content, Button, Title, Body, Right, Left, Icon, Item, Input } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import { connect } from 'react-redux';
import db from '../../config';
import firebase from 'firebase';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 'daily', 
      habit: ''
    }
  }

  onValueChange(value) {
    this.setState({
      time: value 
    });
  }

  onValueChange1(value) {
    this.setState({
      habit: value 
    });

  }
  render() {
    const { history, addNewHabit, uid, habits } = this.props;
    console.log('uid', uid)
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={history.goBack} transparent>
              <Icon style={{ marginLeft: 7 }} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Habit</Title>
          </Body>
          <Right>
              <Icon style={{ marginRight: 7 }} name='logo-python' />
          </Right>
        </Header>
        <Content contentContainerStyle={{  flexGrow: 1, padding: 5, paddingTop: 55, alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            <Item regular style={{ marginBottom: 21, width: '90%', alignSelf: 'center', marginRight: 10 }}>
              <Input onChangeText={this.onValueChange1.bind(this)} placeholder='Title' />
            </Item>
            <View style={{ width: '90%', alignSelf: 'center', marginRight: 10}}>
              <Form>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '78%' }}
                    textStyle={{ maxWidth: '100%' }}
                    placeholder="Select your habit interval"
                    placeholderStyle={{ maxWidth: '100%', color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.time}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Weekly" value="weekly" />
                  </Picker>
                </Item>
              </Form>
            </View>
          </View>
          <View style={styles.addHabitContainer}>
            <Button onPress={() => {
              addNewHabit(this.state.habit, this.state.time, uid, habits)
              history.goBack()
            }} block>
            <Icon name='md-add' />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { habits, other, uid } = state;
  return {
    uid,
    habits,
    other

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewHabit: (habit, time, uid, habits) => {
      const newHabit = Object.assign({}, { habit, time, streak: 0 });
      const newHabits = Object.assign({}, habits, { [habit]: newHabit });
      const userRef = db.collection('habits').doc(uid);
      userRef.update({
        habits: newHabits
      }).then(() => {
        dispatch({
          type: 'ADD_NEW_HABIT',
          habit,
          time
        }) 
      })
    }
  }
}
const AddContainer = connect(mapStateToProps, mapDispatchToProps)(Add)
export default AddContainer;
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
});
