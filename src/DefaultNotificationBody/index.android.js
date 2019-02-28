import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, Image, Vibration,Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 70,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  textContainer: {
    alignSelf: 'center',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0469B2',
    fontWeight: 'bold',
    width:Dimensions.get('window').width-100,
  },
  message: {
    color: '#000',
    marginTop: 5,
  },
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.vibrate || this.props.vibrate) && this.props.isOpen && !prevProps.isOpen) {
      Vibration.vibrate();
    }
  }

  onNotificationPress() {
    const {
      onPress,
      onClose,
    } = this.props;

    onClose();
    onPress();
  }

  onSwipe(direction) {
    const { onClose } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    if (direction === SWIPE_RIGHT || direction === SWIPE_LEFT) {
      onClose();
    }
  }

  render() {
    const {
      title,
      message,
      iconApp,
      icon,
      titleStyle,
      numberOfLines
    } = this.props;

    return (
      <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={this.onNotificationPress}
        >
          <View style={styles.iconContainer}>
            {(icon || iconApp) && <Image source={icon || iconApp} style={styles.icon} />}
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={numberOfLines} style={[styles.title, titleStyle]}>{title}</Text>
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: null,
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
};

export default DefaultNotificationBody;
