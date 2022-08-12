import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
const placeHolderImage = require('../assets/placeholderImage.png');
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieTitle}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    width: 100,
    position: 'absolute',
    textAlign: 'center',
    top: 10,
  },
});

Card.propTypes = propTypes;

export default Card;
