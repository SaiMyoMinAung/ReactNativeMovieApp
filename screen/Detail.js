import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import PlayButton from '../components/PlayButton';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import Video from '../components/Video';

// import StarRating from 'react-native-star-rating';
// import StarRating from 'react-native-star-rating-widget';

const placeHolderImage = require('../assets/placeholderImage.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigator}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movie => {
      setMovieDetail(movie);
      setLoaded(true);
    });
  }, [movieId]);

  const modelShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handleModal={modelShown} />
              </View>
              <Text style={styles.title}>{movieDetail.title}</Text>

              {movieDetail.genres && (
                <View style={styles.genreContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Text>{movieDetail.vote_average}</Text>
              {/* <StarRating
                disabled={false}
                emptyStar={'android-star-outline'}
                fullStar={'android-star'}
                halfStar={'android-star-half'}
                iconSet={'FontAwesome'}
                maxStars={5}
                rating={5}
                selectedStar={rating => this.onStarRatingPress(rating)}
                starColor={'yellow'}
              /> */}
              {/* <StarRating rating={5} /> */}
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release Date:' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              {/* <Pressable onPress={() => modelShown()}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
              <Video onClose={modelShown} />
            </View>
          </Modal>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  image: {
    height: height / 2,
  },
  genre: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  overview: {
    padding: 10,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Detail;
