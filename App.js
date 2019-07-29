import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Container, Header, Button, Content, Title, Body, Right, Left, Icon } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import Add from './src/components/Add';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/reducers';
import { SwipeListView } from 'react-native-swipe-list-view';

const store = createStore(reducer);

//contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
const Home = ({ history, habits }) => {
  return (
    <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      <Content>
        <FlatList
          data={habits}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlist}>
                <Text> {item.habit} </Text>
                <Text style={styles.time}> {item.time} </Text>
              </View>
            );
          }}
        />
        <View style={styles.addHabitContainer}>
          <Link to="/add" underlayColor="#f0f4f7">
            <Icon name='add-circle' size='large' />
          </Link>
        </View>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { habits } = state;
  return {
    habits 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
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
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  habitsList: {
    flexDirection: 'row'
  },
  habitsListContainer: {
    backgroundColor: 'green',
    flex: 10,
    flexDirection: 'row'
  },
  addHabitContainer: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  flatlist: {
    flexDirection: 'row'
  },
  time: {
     marginLeft: 'auto'
  },
});
