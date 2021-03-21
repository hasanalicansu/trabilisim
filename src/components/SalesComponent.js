import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import OrangeItemComponent from './OrangeItemComponent';
import WhiteItemComponent from './WhiteItemComponent';
import _ from 'lodash';
import {PacmanIndicator} from 'react-native-indicators';
import {socket} from '../functions/WebSocketMain';

import {onData} from '../redux/actions';
import {connect} from 'react-redux';
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

class SalesComponent extends Component {
  state = {dataTmp: []};
  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      socket.onmessage = ({data}) => {
        this.setState({dataTmp: data});
        this.props.onData(data);
      };
    });
  }

  render() {
    return (
      <View style={styles.allPage}>
        <View style={styles.childCompo}>
          <View style={styles.childMain}>
            <SafeAreaView>
              <View
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 2}}>
                {this.props.loading ? (
                  <FlatList
                    data={this.props.getAsData}
                    renderItem={({item, index}) => (
                      <View>
                        {index % 2 == 0 ? (
                          <WhiteItemComponent
                            price={item[0]}
                            volume={item[1]}
                            timestamp={item[2]}></WhiteItemComponent>
                        ) : (
                          <OrangeItemComponent
                            price={item[0]}
                            volume={item[1]}
                            timestamp={item[2]}></OrangeItemComponent>
                        )}
                      </View>
                    )}
                    keyExtractor={item => item[2]}
                  />
                ) : (
                  <PacmanIndicator color={'#F8AD2A'}></PacmanIndicator>
                )}
              </View>
            </SafeAreaView>
          </View>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => socket.close()}>
              <Text style={styles.titles}>Satış Emirleri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({asDataResponse}) => {
  const getAsData = asDataResponse.getAsData;
  const loading = asDataResponse.loading;

  return {getAsData, loading};
};
export default connect(mapStateToProps, {
  onData,
})(SalesComponent);

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    backgroundColor: '#461AAE',
  },
  childMain: {
    height: height * 0.82,
    backgroundColor: '#4A357B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  titles: {
    fontFamily: 'Avenir-Black',
    fontSize: 36,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.37,
  },
  childCompo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
