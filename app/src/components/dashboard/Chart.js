import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

/**
 * Fonction mamorona anle label ho anle ChartJS
 * Special volana io raha mapiasa anle API
 * @param {*} type 
 * @returns 
 */
function dateParser(data){
    var i = 1,
        labels = []
    for(const value in data){
        labels.push(i.toString())
        i++;
    }
    return labels
}



// XXX : Apetaka ato le label eo ambany
const labels = dateParser({"jier":"erjeijt","jire":"'jijeirj"})

export const data = {
    labels,
    datasets: [
        {
            label: 'Consommation en KWh',
            data: labels.map(() => 125), /// XXX : Apetaka ato le donné sous forme anah tableau(string ny valeurany)
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export function ChartDashBoard() {
    const {idPrise} = useContext(UserContext)
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
              deviceId: {idPrise},
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log(response.data);
          // Mettez à jour les états en fonction de la réponse
        //   setIsSwitchOn(response.data.result.status.switch);
        //   setIntensity(response.data.result.status.actual_current);
        //   setCurrent(response.data.result.status.actual_voltage);
        //   setPower(response.data.result.status.actual_power);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      };
    
    return <Line options={options} data={data} />;
}