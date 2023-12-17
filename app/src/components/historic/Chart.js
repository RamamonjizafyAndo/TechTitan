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
 * @param {*} type 
 * @returns 
 */
function dateParser(type){
    var labels = []

    switch (type) {
        case "year":
            labels = [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre"
              ]
            break;
    
        case "month":
            break;

        case "hour":
            labels = [
                "00min",
                "15min",
                "30min",
                "45min",
            ]
            break;

        case "day":
              labels=[
                "00h", "01h", "02h", "03h", "04h", "05h",
                "06h", "07h", "08h", "09h", "10h", "11h",
                "12h", "13h", "14h", "15h", "16h", "17h",
                "18h", "19h", "20h", "21h", "22h", "23h", "24h"
              ]
        default:
            break;
    }

    return labels;
}



// XXX : Apetaka ato le label eo ambany
const labels = dateParser("year")

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

export function ChartHistoric() {
    return <Line options={options} data={data} />;
}