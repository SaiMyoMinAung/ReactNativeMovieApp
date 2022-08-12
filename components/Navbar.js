import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../Theme/Colors';

const propsType = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};

const placeHolderImage = require('../assets/placeholderImage.png');

class Navbar extends React.PureComponent {
  state = {};
  render() {
    const {main, navigation} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainStyle}>
            <Image
              style={styles.logo}
              resizeMode="cover"
              source={placeHolderImage}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon name={'search-outline'} size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.view}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name={'chevron-back'} size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    width: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
  mainStyle: {
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
});

Navbar.propsType = propsType;
Navbar.defaultProps = defaultProps;

export default Navbar;
