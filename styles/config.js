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
  input: {
    backgroundColor: 'rgba(8,20,55,0.6)',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  title: {
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
});

export default styles;
