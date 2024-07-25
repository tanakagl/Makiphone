import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'rgb(4, 13, 18)',
  },
  centerContainer: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  callerText: {
    fontSize: 26,
    marginTop: 15,
    color: '#ffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: 'green',
    borderRadius: 30,
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  callEndButton: {
    backgroundColor: '#FF5D5D',
    borderRadius: 30,
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -33}, {translateY: -15}],
  },
  endButtonIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -6}],
  },
});

export default styles;
