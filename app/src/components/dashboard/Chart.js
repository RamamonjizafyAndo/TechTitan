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



    return <Line options={options} data={data} />;
}