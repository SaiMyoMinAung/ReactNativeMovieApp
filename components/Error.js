import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorMessage1: PropTypes.string,
  errorMessage2: PropTypes.string,
};

const defaultProps = {
  errorMessage1: 'Oops! Something went wrong.',
  errorMessage2: 'Check online and try again later.',
};

class Error extends React.PureComponent {
  render() {
    const {errorMessage1, errorMessage2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorMessage1}</Text>
        <Text style={styles.text}>{errorMessage2}</Text>
      </View>
    );
  }
}

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Error;
