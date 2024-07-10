import {View, Text, SafeAreaView} from 'react-native';
import styles from '../../styles/config';

const Configuracoes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}></View>
        <Text style={styles.bodyText}>Tela de Configuracoes</Text>
      </View>
    </SafeAreaView>
  );
};

export default Configuracoes;
