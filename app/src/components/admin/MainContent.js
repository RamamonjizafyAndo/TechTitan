import Navbar from "./Navbar";
import { ChartDashBoard } from "../dashboard/Chart";
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';

function MainContent() {
    const [month, setMonth] = useState('')
    const [idPrise, setIdPrise] = useState(0);
    function valueGroup(data){
        var values = []
        let valeur = 0
        for(const value in data){
            valeur = valeur + parseInt(data[value])
        }
        console.log(valeur);
        return valeur * 4000
    }
    const https = axios.create({
        baseURL: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const fetchDataMonth = async () => {
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
            const datas = await fetchDataMonth()
            setMonth(datas)
        }
        fetch()
          
      })
      const fetchData = async () => {
        const db = getFirestore();
        const chartCollection = collection(db, 'user');
        const userQuery = query(chartCollection, where('id', '==', localStorage.getItem('idUser')));
    
        try {
          const snapshot = await getDocs(userQuery);
    
          const userQueryArray = snapshot.docs.map(doc => doc.data());
    
          return userQueryArray[0].prise.length;
        } catch (err) {
          console.error(err);
          return null;
        }
      };
    
      useEffect(() => {
        const fetchAndSetIdPrise = async () => {
          const id = await fetchData();
          setIdPrise(id);
        };
    
        fetchAndSetIdPrise();
      }, [localStorage.getItem('idUser')]);
    
      useEffect(() => {
        console.log(idPrise); // Effectuez d'autres actions ici lorsque idPrise change
      }, [idPrise]);
    return (<>
        <div className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}

                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        <a
                            href="#"
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        >
                            <i className="fas fa-download fa-sm text-white-50" /> Generate
                            Report
                        </a>
                    </div>
                    {/* Content Row */}
                    <div className="row">
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Consommation journalière
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {valueGroup(month)}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Consommation mensuel
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {valueGroup(month)} Ar
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Prises activées
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                        {idPrise}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa-solid fa-bolt fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pending Requests Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Prises connectées
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {idPrise}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa-solid fa-rocket fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content Row */}
                    <div className="row">
                        {/* Area Chart */}
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Card Header - Dropdown */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Consommation de ce mois ({new Date().toLocaleDateString("fr-FR", { month: "long" })})
                                    </h6>
                                </div>
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="chart-area">
                                        <ChartDashBoard />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pie Chart */}
                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                {/* Card Header - Dropdown */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Consommation des appareils
                                    </h6>
                                </div>
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                    </div>
                                    <div className="mt-4 text-center small">
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-primary" /> Direct
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-success" /> Social
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-info" /> Referral
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content Row */}
                    <div className="row">
                        {/* Content Column */}
                        <div className="col-lg-6 mb-4">
                            {/* Project Card Example */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        État de chaque prises connectées
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <h4 className="small font-weight-bold">
                                        Appareil 1
                                    </h4>
                                    <span class="badge badge-success mr-1">Allumé</span>
                                    <span class="badge badge-danger mr-1">Éteint</span>
                                    <span class="badge badge-warning mr-1">Besoin de maintenance</span>
                                </div>
                                <div className="card-body">
                                    <h4 className="small font-weight-bold">
                                        Appareil 1
                                    </h4>
                                    <span class="badge badge-success mr-1">Allumé</span>
                                    <span class="badge badge-danger mr-1">Éteint</span>
                                    <span class="badge badge-warning mr-1">Besoin de maintenance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}

        </div>
    </>)
}

export default MainContent;