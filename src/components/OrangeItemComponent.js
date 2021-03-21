import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Dimensions} from 'react-native';
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;
export default class OrangeItemComponent extends Component {
  render() {
    return (
      <View style={styles.items}>
        <View
          style={{
            width: (width * 0.9) / 3,
          }}>
          <View style={styles.itemsOne}>
            <Text style={{fontFamily: 'Avenir Next', fontSize: 15}}>Price</Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'AvenirNext-DemiBold',
                fontSize: 15,
              }}>
              {this.props.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: (width * 0.9) / 3,
          }}>
          <View style={styles.itemsOne}>
            <Text style={{fontFamily: 'Avenir Next', fontSize: 15}}>
            Volume
            </Text>
            <Text
              numberOfLines={1}
              style={{fontFamily: 'AvenirNext-DemiBold', fontSize: 15}}>
              {this.props.volume}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: (width * 0.9) / 3,
          }}>
          <View style={styles.itemsOne}>
            <Text style={{fontFamily: 'Avenir Next', fontSize: 10}}>Timestamp</Text>
            <Text
              numberOfLines={1}
              style={{fontFamily: 'AvenirNext-DemiBold', fontSize: 10}}>
              {this.props.timestamp}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#F8AD2A',
    width: width * 0.9,
    height: 70,
    alignSelf: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemsOne: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});
