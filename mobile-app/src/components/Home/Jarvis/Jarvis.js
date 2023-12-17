import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";

const Home = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [intensity, setIntensity] = useState(0.5);
  const [current, setCurrent] = useState(0.5);
  const [power, setPower] = useState(100);
  const https = axios.create({
    baseURL: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const fetchData = async () => {
    try {
      const response = await https.get('/boulou_check_deviceStatus', {
        params: {
          developerId: "-Nlm4dylAEVqUP6jRrOF",
          email: "ramamonjizafymanitra06@gmail.com",
          deviceId: "bf7f35cf2583be4b5ej9tt",
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
        // Mettez à jour les états en fonction de la réponse
      setIsSwitchOn(response.data.result.status.switch);
      setIntensity(response.data.result.status.actual_current);
      setCurrent(response.data.result.status.actual_voltage);
      setPower(response.data.result.status.actual_power);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  
  useEffect(() => {
    // Appelez la fonction fetchData pour récupérer les données lors du montage du composant
    setInterval(()=>{
      fetchData();
    },1500)
    
  }); // Le tableau vide [] signifie que cela ne s'exécute qu'une fois après le montage initial

  const toggleSwitch = async () => {
    try {
      const response = await https.post('/boulou_switch_device', {
        developerId: "-Nlm4dylAEVqUP6jRrOF",
        email: "ramamonjizafymanitra06@gmail.com",
        deviceId: "bf7f35cf2583be4b5ej9tt",
        switch_status: isSwitchOn ? "OFF" : "ON",
      });

      console.log(response.data);

      // Mettez à jour l'état du switch en fonction de la réponse
      setIsSwitchOn(!isSwitchOn);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état du switch:", error);
    }
  };

  const getProgressBarStyles = (progress, color) => {
    const barWidth = `${progress * 220}%`;
    return {
      backgroundColor: color,
      height: 10,
      width: barWidth,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={toggleSwitch}>
          <View style={[styles.switch, isSwitchOn ? styles.switchOn : styles.switchOff]}>
            <View style={[styles.circle, isSwitchOn ? styles.circleOn : styles.circleOff]} />
          </View>
        </TouchableOpacity>
        <Text>État du prise: {isSwitchOn ? 'ON' : 'OFF'}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBarBackground, { width: '100%' }]}>
              <View style={getProgressBarStyles(intensity, "#3498db")} />
            </View>
            <Text>Intensité: {intensity}A</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBarBackground, { width: '100%' }]}>
              <View style={getProgressBarStyles(current, "#e74c3c")} />
            </View>
            <Text>Tension: {current}V</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBarBackground, { width: '100%' }]}>
              <View style={getProgressBarStyles(power / 100, "#2ecc71")} />
            </View>
            <Text>Puissance: {power}W</Text>
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  switch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
  },
  switchOn: {
    backgroundColor: "#2ecc71", // couleur lorsque le switch est activé
  },
  switchOff: {
    backgroundColor: "#e74c3c", // couleur lorsque le switch est désactivé
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  circleOn: {
    backgroundColor: "#fff", // couleur du cercle lorsque le switch est activé
    marginLeft: 30,
  },
  circleOff: {
    backgroundColor: "#fff", // couleur du cercle lorsque le switch est désactivé
    marginLeft: 5,
  },

  card: {
    width: "80%",
    marginBottom: 20,
    elevation: 4, // Pour donner un effet d'ombre
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  progressBarBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 15,
    overflow: "hidden",
  },
});

export default Home;
