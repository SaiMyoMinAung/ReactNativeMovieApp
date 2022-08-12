import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propsType = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.listComponent}>
        <View>
          <Text style={styles.listTitle}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => {
              console.log('item', item);
              return <Card navigation={navigation} item={item} />;
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listComponent: {
    marginTop: 20,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
});

List.propsType = propsType;

export default List;
