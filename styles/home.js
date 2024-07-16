import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(4, 13, 18)',
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    padding: 16,
    marginVertical: 10,
    width: '100%',
  },
  headerText: {
    color: 'rgb(147, 177, 166)',
    fontSize: 44,
    textAlign: 'center',
    letterSpacing: 6,
  },
  headerText2: {
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 6,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  bodyUser: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyUserContent: {
    flexDirection: 'column',
    backgroundColor: 'rgba(24, 61, 61, 0.3)',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
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
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  boxInput: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '65%',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: 'rgba(24, 61, 61, 0.3)',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#183D3D',
    padding: 12,
    borderRadius: 50,
    marginTop: 6,
  },
});

export default styles;
