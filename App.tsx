import { faker } from '@faker-js/faker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Image, Animated} from 'react-native';
import { data_card } from './data';


const BG_IMG = "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
const ITEM_MARGIN_BOTTOM = 20
const ITEM_PADDING = 10
const HEIGHT_IMG = 100
const ITEM_SIZE = HEIGHT_IMG  + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM
export default function App() {

  const [isLoading, setIsloading] = useState(false)
const scrollY = React.useRef(new Animated.Value(0)).current


  const renderItem = ({item, index}) => {
    const scale = scrollY.interpolate({
       inputRange: [
        -1, 0,
        ITEM_SIZE * index,
        ITEM_SIZE * (index + 2)
       ],
       outputRange: [1, 1, 1, 0]
    })
    const opacity = scrollY.interpolate({
      inputRange: [
       -1, 0,
       ITEM_SIZE * index,
       ITEM_SIZE * (index + .6)
      ],
      outputRange: [1, 1, 1, 0]
   })
    return(
      <Animated.View 
      style={[
        styles.item,
        {
          transform: [{scale}],
          opacity
        }
      ]}
      >
      <Image 
       style= {styles.image}
       source={{uri: item.image}}
       resizeMode='contain'
      />
      <View style={styles.wrapText}>
       <Text style={styles.fontSize}>{index + '. ' + item.descripition}</Text>
      </View>
      </Animated.View>
    )
  }
  return (
     <SafeAreaView style={styles.container}>
      <Image
       source={{uri: BG_IMG}}
       style={StyleSheet.absoluteFillObject}
       blurRadius={70}
      />
      {isLoading ? <ActivityIndicator/> : (
        <Animated.FlatList 
         data={data_card}
         renderItem={renderItem}
         contentContainerStyle={{
          padding: 20         
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        />
      )}
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontSize: {
    fontSize: 18
  },
  image: {
    width: 100,
    height: HEIGHT_IMG
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'row',
     marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 20,
    padding: ITEM_PADDING
  }
});
