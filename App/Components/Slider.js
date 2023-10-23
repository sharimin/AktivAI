import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native-web';
import { FlatList } from 'react-native-web';
import { Image } from 'react-native-web';
import { Dimensions } from 'react-native-web';
import axios from 'axios';


export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    const url = "http://192.168.0.172:1337/api/sliders?populate=*";
    const headers = {
      "X-API-Key": "94272d5ed4eace20d523d55c7d8c138aebf61badde7029c1cc4ae22afc82f287093b1868e14bebb269dc21eb8e990c9fb4391807513b625d7592e6a594d36d5758653454bd53469477d1fe720441398acc69b22e0b5cb883fa570d77af374748846834916f1e4ba0d9200a30b9f34a742cfefcb6cb0da14e799b0813dde66999"
    };
    const response = await axios.get(url, headers);
    const resp = response.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.image.data.attributes.url
    }));
    setSlider(resp);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        key={slider.id}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.image }}
              style={{
                width: Dimensions.get('screen').width * 0.87,
                height: 150,
                borderRadius: 10,
                marginRight: 15
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
