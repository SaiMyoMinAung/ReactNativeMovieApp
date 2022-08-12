import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovie,
  getPopularTV,
  getFamilyMovie,
  getUpcomingMovie,
} from '../services/services';
import {ImageSlider} from 'react-native-image-slider-banner';
import List from '../components/List';
import Error from '../components/Error';
import {Colors} from '../Theme/Colors';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const imagePrefix = 'https://image.tmdb.org/t/p/w500';

  const [upComingMoviesImage, setUpComingMoviesImage] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTV, setPopularTV] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovie(),
      getPopularMovie(),
      getPopularTV(),
      getFamilyMovie(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upComingMovieData,
          popularMovieData,
          popularTVData,
          familyMovieData,
        ]) => {
          const moviesImagesArray = [];
          upComingMovieData.forEach(movie => {
            moviesImagesArray.push({img: imagePrefix + movie.poster_path});
          });

          setUpComingMoviesImage(moviesImagesArray);
          setPopularMovies(popularMovieData);
          setPopularTV(popularTVData);
          setFamilyMovies(familyMovieData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <React.Fragment>
      {loaded && !error && (
        <ScrollView style={styles.scrollView}>
          {/* image slider */}
          {upComingMoviesImage && (
            <View style={styles.sliderContainer}>
              <ImageSlider
                data={upComingMoviesImage}
                // showHeader
                // headerCenterComponent={
                //   <Text style={styles.imageSliderHeaderText}>Movie App</Text>
                // }
                // headerStyle={styles.imageSliderHeader}
                onItemChanged={item => console.log('item', item)}
                onClick={item => console.log('item', item)}
                caroselImageStyle={{height: dimensions.height / 2}}
              />
              {error && <Text style={{color: Colors.danger}}>error</Text>}
            </View>
          )}

          {/* popular movies */}
          {popularMovies && (
            <View style={styles.carousal}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}

          {/* popular tv */}
          {popularTV && (
            <View style={styles.carousal}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTV}
              />
            </View>
          )}

          {/* family moves */}
          {familyMovies && (
            <View style={styles.carousal}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSliderHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageSliderHeader: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
});

export default Home;
