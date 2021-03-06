import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StatusBar, View, Text, Image, Vibration,Dimensions } from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
// import { Languages, Theme } from '@common';

const styles = {
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    position: 'absolute',
    top: isIphoneX() && getStatusBarHeight(),
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    // marginHorizontal: 10,
  },
  iconApp: {
    // marginTop: 10,
    marginLeft: 20,
    resizeMode: 'contain',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  icon: {
    // marginTop: 10,
    marginLeft: 20,
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  textContainer: {
    alignSelf: 'center',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0469B2',
    fontWeight: 'bold',
    width:Dimensions.get('window').width-100
  },
  message: {
    color: '#0469B2',
    marginTop: 5,
  },
  footer: {
    backgroundColor: '#696969',
    borderRadius: 5,
    alignSelf: 'center',
    height: 5,
    width: 35,
    margin: 5,
  },
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      StatusBar.setHidden(this.props.isOpen);
    }

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
    const { SWIPE_UP } = swipeDirections;

    if (direction === SWIPE_UP) {
      this.props.onClose();
    }
  }

  renderIcon() {
    const {
      iconApp,
      icon,
    } = this.props;

    if (icon) {
      return <Image source={icon} style={styles.icon} />;
    } else if (iconApp) {
      return <Image source={iconApp} style={styles.iconApp} />;
    }

    return null;
  }

  render() {
    const {
      title,
      message,
      titleStyle,
      numberOfLines
    } = this.props;
    console.log(titleStyle)
    return (
      <View style={styles.root}>
        <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
          <TouchableOpacity
            style={styles.content}
            activeOpacity={0.3}
            underlayColor="transparent"
            onPress={this.onNotificationPress}
          >
            {this.renderIcon()}
            <View style={styles.textContainer}>
              <Text numberOfLines={numberOfLines} style={[styles.title, titleStyle]}>{title}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footer} />
        </GestureRecognizer>
      </View>
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
  titleStyle:PropTypes.object
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: 'This is Test',
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
  titleStyle:{}
};

export default DefaultNotificationBody;
