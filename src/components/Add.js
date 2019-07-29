import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Picker, Container, Header, Content, Button, Title, Body, Right, Left, Icon, Item, Input } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import { connect } from 'react-redux';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 'daily', 
      habit: ''
    }
  }

  onValueChange(value) {
    console.log('value', value)
    this.setState({
      time: value 
    });

  }

  onValueChange1(value) {
    console.log('valueZZZ', value)
    this.setState({
      habit: value 
    });

  }
  render() {
    const { history, addNewHabit } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={history.goBack}transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>New Habit</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'space-evenly', flex: 1, alignItems: 'center', padding: 10 }}>
          <View style={{ width: '100%' }}>
            <Item regular style={{ marginBottom: 15 }}>
              <Input onChangeText={this.onValueChange1.bind(this)} placeholder='Title' />
            </Item>
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
          <Button onPress={() => addNewHabit(this.state.habit, this.state.time)} block>
            <Text> Add Habit </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('statezz', state)
  const { habits, other } = state;
  return {
    habits,
    other

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewHabit: (habit, time) => dispatch({
      type: 'ADD_NEW_HABIT',
      habit,
      time
    }) 
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
});
