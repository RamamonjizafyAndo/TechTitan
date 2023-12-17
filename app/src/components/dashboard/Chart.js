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
import { useContext, useEffect, useState } from 'react';
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

function valueGroup(data){
    var values = []
    
    for(const value in data){
        values.push(data[value])
    }
    return values
}

// XXX : Apetaka ato le label eo ambany


function generateData(donn){
    const labels = dateParser(donn)
    const dataGrouped = valueGroup(donn)
    console.log(dataGrouped);
    const data = {
        labels,
        datasets: [
            {
                label: 'Consommation en KWh',
                data: Object.values(dataGrouped), /// XXX : Apetaka ato le donné sous forme anah tableau(string ny valeurany)
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return data
}
 

export function ChartDashBoard() {
    const {idPrise} = useContext(UserContext)
    const [dataa, setDataa] = useState('')
    const https = axios.create({
        baseURL: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const fetchData = async () => {
        const response = await https.get('/boulou_get_deviceStatistics', {
            params: {
              developerId: "-Nlm4dylAEVqUP6jRrOF",
              email: "ramamonjizafymanitra06@gmail.com",
              deviceId: 'bf7f35cf2583be4b5ej9tt',
              period_type: 'month',
              period_value: 202312
            },
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch(e=>{
            console.error(e)
          });
          return response.data.result
          // Mettez à jour les états en fonction de la réponse
        //   setIsSwitchOn(response.data.result.status.switch);
        //   setIntensity(response.data.result.status.actual_current);
        //   setCurrent(response.data.result.status.actual_voltage);
        //   setPower(response.data.result.status.actual_power);
      };
      useEffect(()=>{
        const fetch = async()=>{
            const datas = await fetchData()
            setDataa(datas)
        }
        fetch()
          
      })
    return <Line options={options} data={generateData(dataa)} />;
}