import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/home';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MAKIPHONE</Text>
      </View>
      <View style={styles.bodyUser}>
        <View style={styles.userInterface}>
          <Icon name={'person-circle-outline'} size={38} />
          <Text style={styles.userInterfaceText}>User caller ID</Text>
        </View>
        <View style={styles.boxCaller}>
          <Text style={styles.boxCallerText}>1234</Text>
        </View>
      </View>
      <View style={styles.bodyCall}>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Input ID to Call"
          />
          <TouchableOpacity onPress={console.log('call')}>
            <Icon name="call-outline" size={38} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View>
        <Text style={styles.footerText}>Developed by Matheo Bonucia</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
