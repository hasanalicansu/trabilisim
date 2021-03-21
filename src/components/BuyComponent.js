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

import {onData} from '../redux/actions';
import {connect} from 'react-redux';

width = Dimensions.get('window').width;
height = Dimensions.get('window').height;
import {socket} from '../functions/WebSocketMain';

import {PacmanIndicator} from 'react-native-indicators';
class BuyComponent extends Component {
  state = {data: []};

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
                    data={this.props.getBsData}
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
              <Text style={styles.titles}>Alış Emirleri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({bsDataResponse}) => {
  const getBsData = bsDataResponse.getBsData;
  const loading = bsDataResponse.loading;

  return {getBsData, loading};
};
export default connect(mapStateToProps, {
  onData,
})(BuyComponent);

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    backgroundColor: '#461AAE',
  },
  childMain: {
    height: height * 0.82,
    backgroundColor: '#2F5487',
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
