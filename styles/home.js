import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
    flexDirection: 'column',
  },
  header: {
    padding: 16,
    marginVertical: 10,
    width: '100%',
  },
  headerText: {
    color: '#FFF8F3',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  bodyUser: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginVertical: 6,
    textAlign: 'center',
  },
  userInterface: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userInterfaceText: {
    fontSize: 18,
  },
  boxCaller: {
    marginVertical: 10,
    backgroundColor: 'rgb(24, 61, 61)',
    width: '70%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  boxCallerText: {
    fontSize: 42,
    letterSpacing: 8,
    fontWeight: 'bold',
  },
  bodyCall: {
    width: '100%',
    flex: 1,
  },
  boxInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    fontSize: 22,
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(92, 131, 116, 0.2)',
  },
});

export default styles;
