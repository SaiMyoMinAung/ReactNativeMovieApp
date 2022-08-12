import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../Theme/Colors';

class PlayButton extends React.PureComponent {
  render() {
    const {handleModal} = this.props;
    return (
      <Pressable style={styles.button} onPress={() => handleModal()}>
        <Icon name={'caret-forward-outline'} size={30} color={'white'} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});

export default PlayButton;
