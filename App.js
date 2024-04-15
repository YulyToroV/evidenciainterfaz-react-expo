import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



export default function App() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleAddPet = () => {
    if (name && species && description) {
      const newPet = {
        id: Math.random().toString(),
        name,
        species,
        description,
        image
      };
      setPets([...pets, newPet]);
      setName('');
      setSpecies('');
      setDescription('');
      setImage(null);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MASCOTAS PERDIDAS</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre Mascota"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Especie"
          value={species}
          onChangeText={(text) => setSpecies(text)}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descripción"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Button title="Agregar Foto" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}



        <Button title="Agregar Mascota Perdida" onPress={handleAddPet} />





      </View>
      <View style={styles.petListContainer}>
        <Text style={styles.listTitle}>Lista de Mascotas Perdidas</Text>
        <FlatList
          data={pets}
          renderItem={({ item }) => (
            <View style={styles.petItem}>
              <Text>{item.name}</Text>
              <Text>{item.species}</Text>
              <Text>{item.description}</Text>
              {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <Text>Hecho por Aprendiz : Yuly Toro Valencia</Text>
      </View>
      <StatusBar style="auto" />






    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  petListContainer: {
    width: '80%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    marginBottom: 10,

  },
  petItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
});
