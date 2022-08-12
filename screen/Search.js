import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Card from '../components/Card';
import Error from '../components/Error';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Colors from '../Theme/Colors';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const [error, setError] = useState();

  const onsubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResult(data);
      })
      .catch(err => {
        setError(err);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search Movie or TV Show"
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onsubmit(text);
            }}>
            <Icon name={'search-outline'} size={33} color={'black'} />
          </TouchableOpacity>
        </View>
        <View>
          {/* search results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              numColumns={3}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {searchResults.length === 0 && (
            <View style={[styles.empty, {paddingTop: 10}]}>
              <Text>No Result Found.</Text>
            </View>
          )}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  empty: {
    margin: 10,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    paddingLeft: 5,
    margin: 5,
  },
});

export default Search;
