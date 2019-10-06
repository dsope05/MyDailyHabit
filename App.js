import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { Card, Container, Header, Button, Content, Title, Body, Right, Left, Icon } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import Add from './src/components/Add';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/reducers';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import db from './config';
import firebase from 'firebase';
import SignUp from './src/components/signUp';
import SignIn from './src/components/signIn';

const store = createStore(reducer);

const HabitCard = ({ item, addStreak, uid, habits }) => (
  <TouchableOpacity onPress={() => addStreak(item, uid, habits)} style={styles.flatListContainer}>
    <Card style={styles.flatlist}>
      <Text style={styles.habit}> {item.habit} </Text>
      <View style={styles.streak}>
        <Text style={{ fontSize: 16}}> {item.streak} </Text>
      </View>
    </Card>
  </TouchableOpacity>
);
//contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
class Home extends React.Component {

  render() {
    const { history, habits, weeklyHabitExist, dailyHabitExist, addStreak, uid } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{ moment().format('MMMM Do')}</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ flexGrow: 1, padding: 5, paddingTop: 10 }}>
          { dailyHabitExist && (
            <View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ marginTop: 10, color: '#007aff'}}> Daily Habits </Text>
                <Text style={{ marginLeft: 'auto', marginRight: 12, marginTop: 10, color: '#D4AF37' }}> Streaks </Text>
              </View>
              <FlatList
                data={Object.values(habits)}
                renderItem={({item}) => {
                  if (item.time === 'daily') {
                    return (
                      <HabitCard item={item} habits={habits} uid={uid} addStreak={addStreak}/>
                    )
                  }
                }}
              />
            </View>
          )}
          { weeklyHabitExist &&
              <View style={styles.weeklyContainer}>
                <Text style={styles.timeTitle}> Weekly Habits </Text>
                <FlatList
                  data={Object.values(habits)}
                  renderItem={({item}) => {
                    console.log('item', item.time)
                    if (item.time === 'weekly') {
                      return (
                        <HabitCard item={item} uid={uid} habits={habits} addStreak={addStreak}/>
                      );
                    }}
                  }
                />
              </View>
          }
          <View style={styles.addHabitContainer}>
            <Button onPress={() => history.push('add')} block>
              <Text style={styles.addBtn}> Add Habit </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { habits, weeklyHabitExist, dailyHabitExist, uid } = state;
  console.log('THE STATE', state)
  return {
    habits,
    weeklyHabitExist,
    dailyHabitExist,
    uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStreak: (item, uid, habits) => {
      const newItem = Object.assign({}, item);
      console.log('item', item)
      console.log('neItem', newItem)
      console.log('habits', habits)
      newItem.streak += 1;
      console.log('habits', habits)
      const newHabits = Object.assign({}, habits, { [item.habit]: newItem })
      const habitRef = db.collection('habits').doc(uid);
      habitRef.update({
        habits: newHabits
      });
      dispatch({
        type: 'ADD_STREAK',
        item: newItem
      }) 
    },
  }
}
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default function App() { 
  return (
    <Provider store={store}>
      <NativeRouter>
        <Container>
          <Content>
            <Route exact path="/home" component={HomeContainer} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signUp" component={SignUp} />
          </Content>
        </Container>
      </NativeRouter>
    </Provider>
  );
};


const styles = StyleSheet.create({
  content: {
    backgroundColor: 'red',
    height: '100%'
  },
  habitsList: {
    flexDirection: 'row'
  },
  weeklyContainer: {
    marginTop: 10 
  },
  flatListContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  addIcon: {
    alignSelf: 'flex-start'
  },
  habitsListContainer: {
    backgroundColor: 'green',
    flex: 10,
    flexDirection: 'row'
  },
  addHabitContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  habit: {
    fontSize: 18 
  },
  addBtn: {
    fontSize: 16 
  },
  flatlist: {
    paddingLeft: 10,
    flexDirection: 'row',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  streak: {
    width: 58,
    borderTopLeftRadius: 45, 
    borderBottomLeftRadius: 45,
    height: 80,
    backgroundColor: '#E0EEEE',
    position: 'relative',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeTitle: {
    color: '#007aff',
    marginBottom: 10
  },
});
