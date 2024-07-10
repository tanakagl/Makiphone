import {SafeAreaView, View, Text} from 'react-native';
import styles from '../../styles/home';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MAKIPHONE</Text>
        </View>
        <Text style={styles.bodyText}>Tela inicial</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
