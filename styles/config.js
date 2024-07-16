import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  configInputs: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#040D12',
  },
  header: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  label: {
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 1,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(92, 131, 116)',
    width: 180,
    borderRadius: 5,
    marginTop: 10,
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default styles;
