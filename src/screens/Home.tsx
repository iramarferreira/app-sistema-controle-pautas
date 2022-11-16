import { StyleSheet, View, Dimensions } from 'react-native';
import { Text } from '@rneui/base';

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Home() {

    return (

        <View style={styles.container}>

            <Text>Hello World</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      margin: 0,
      padding: 0,
      height: vh,
      width: vw,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
});  
