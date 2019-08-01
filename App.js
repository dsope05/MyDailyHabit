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

const store = createStore(reducer);

const HabitCard = ({ item, addStreak}) => (
  <TouchableOpacity onPress={() => addStreak(item)} style={styles.flatListContainer}>
    <Card style={styles.flatlist}>
      <Text style={styles.habit}> {item.habit} </Text>
      <Text style={styles.streak}> {item.streak} </Text>
    </Card>
  </TouchableOpacity>
);
//contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
const Home = ({ history, habits, weeklyHabitExist, dailyHabitExist, addStreak}) => {
  console.log('srtreakl', addStreak)
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
            <Text style={styles.timeTitle}> Daily Habits </Text>
            <FlatList
              data={habits}
              renderItem={({item}) => {
                if (item.time === 'daily') {
                  return (
                    <HabitCard item={item} addStreak={addStreak}/>
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
                data={habits}
                renderItem={({item}) => {
                  console.log('item', item.time)
                  if (item.time === 'weekly') {
                    return (
                      <HabitCard item={item} addStreak={addStreak}/>
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

const mapStateToProps = (state) => {
  const { habits, weeklyHabitExist, dailyHabitExist } = state;
  return {
    habits,
    weeklyHabitExist,
    dailyHabitExist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStreak: (item) => dispatch({
      type: 'ADD_STREAK',
      item
    }) 
  }
}
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default function App() { 
  return (
    <Provider store={store}>
      <NativeRouter>
        <Container>
          <Content>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/add" component={Add} />
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
    paddingRight: 20,
    flexDirection: 'row',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  streak: {
    marginLeft: 'auto'
  },
  timeTitle: {
    marginBottom: 10
  },
});
