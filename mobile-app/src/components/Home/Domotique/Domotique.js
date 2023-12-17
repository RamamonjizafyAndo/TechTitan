import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  ScrollView,
  TextInput
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import globalStyle from "../../GlobalStyle/GlobalStyle";
import useHttps from "../../../hooks/useHttps";
import { useSelector } from "react-redux";
import CustomSnackBar from "../../Common/CustomSnackBar/CustomSnackBar";
import CustomDialog from "../../Common/CustomDialog/CustomDialog";
import Voice from "@react-native-voice/voice";
import HouseData from "./HouseData/HouseData";
import * as Speech from 'expo-speech';

LogBox.ignoreLogs(["new NativeEventEmitter"]);

const Domotique = ({ navigation }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.colors;
  const { https } = useHttps();
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commandError, setCommandError] = useState(false);
  const [commanResults, setCommanResults] = useState(false);
  const [house, setHouse] = useState(null);
  const [response, setResponse] = useState('')
  const [security, setSecurity] = useState(false);
  
  const textToSpeech = (text) => {
    Speech.speak(text, {
      rate: 1.7,
      onDone: () => {
        Speech.stop()
      }
    });
  };

  const user = useSelector((state) => state.user);
  const userId = user && user.id ? user.id : null;
  
  const hideSecurity = async () => {
    
    setSecurity(false)
  }
  
  const checkSecurity =  async () => {
    let id = 1;
    try {
      let response = null
      if (response) {
        let declencher = response.data.declencher
        if(declencher) {
          textToSpeech("Attention, une porte ou fenêtre est ouverte alors que la sécurité est activée.")
        }
        setSecurity(declencher)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setInterval(() => {
      checkSecurity()
      getHouse()
    }, 3000)
  }, [])

  const getHouse = async () => {
    let id = 1;
    try {
      let response = null
      if (response) {
        let jsonArray = [];
        for (const [key, value] of Object.entries(response.data)) {
          if (key != "id_house" && key != "userId") {
            jsonArray.push({
              name: key,
              value: value,
            });
          }
        }
        setHouse(jsonArray);
      }
    } catch (error) {
      setCommandError(true);
      console.error(error);
    }
  };

  const sendCommand = async (prompt) => {
    try {
      // if (userId) {
      setLoading(true);
      const formData = new FormData();

// Ajouter la paire clé-valeur à FormData
formData.append('question', prompt);

// Utiliser FormData dans la requête
let response = await https.post('/chatbot', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
      if (response) {
        setResponse(response.data.response)
        setCommanResults(true);
        setLoading(false);
      }
    } catch (error) {
      setCommandError(true);
      setLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    getHouse();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (result) => {
    stopSpeechToText();
    if (result.value[0]) sendCommand(result.value[0]);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  const startSpeechToText = async () => {
    try {
      console.log("Start recording");
      await Voice.start("fr-FR");
      setStarted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopSpeechToText = async () => {
    try {
      console.log("Stop recording");
      await Voice.stop();
      setStarted(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleEnvoyer = () => {
    // Envoyer le texte de la TextArea à la fonction sendCommand
    sendCommand(textAreaValue);
  };

  return (
    <SafeAreaView style={[globalStyle.container]}>
      <ScrollView>
        <View style={styles.root}>
          <Text style={{ ...styles.title, color: primary }}>
            Interagir avec le prise
          </Text>
          {loading && (
            <Text style={{ ...styles.successTitle, color: primary }}>
              Envoie en cours...
            </Text>
          )}
          <TextInput
            multiline
            numberOfLines={4}
            value={textAreaValue}
            onChangeText={(text) => setTextAreaValue(text)}
            style={styles.textArea}
          />
          <Button
            mode="contained"
            onPress={handleEnvoyer}
            style={{ marginBottom: 20, backgroundColor: theme.colors.secondary }}
          >
            Envoyer
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: started ? "red" : secondary }}
            onPress={started ? stopSpeechToText : startSpeechToText}
          >
            {started ? "Arrêter" : "Commencer la reconnaissance vocale"}
          </Button>
          {response && (
            <Text style={{ ...styles.title }}>
            {response}
          </Text>
          )}
        </View>
      </ScrollView>
      <CustomSnackBar
        visible={commandError}
        setVisible={setCommandError}
        message={"Une erreur s'est produite, veuillez réessayer."}
        type="error"
      />
      <CustomSnackBar
        visible={commanResults}
        setVisible={setCommanResults}
        message={"Commande envoyer."}
        type="success"
      />
      <CustomDialog
        visible={security}
        hideDialog={hideSecurity}
        headerStyle={styles.headerStyle}
        isScroll={true}
        DialogTitle={
          <Text variant="bodyLarge">
            Attention !
          </Text>
        }
        DialogContent={
          <View>
              <Text variant="bodyLarge">
                Une porte ou fenêtre est ouverte alors que la sécurité est activée.
              </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Domotique;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 20,
  },
  successTitle: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 20,
    color: "green",
  },
  headerStyle: {
    paddingTop: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
