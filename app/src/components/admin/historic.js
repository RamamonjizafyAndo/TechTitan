import React from "react"
import { ChartHistoric } from "../historic/Chart"
import { VerticalBarChart } from "../historic/VerticalBarChart"

function Historic() {
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Historique et autres</h1>
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="filterSelect">
                            Filtrer par
                        </label>
                    </div>
                    <select className="custom-select" id="filterSelect">
                        <option selected="" value={0}>Année</option>
                        <option value={1}>Mois</option>
                        <option value={2}>Jour</option>
                        <option value={3}>Heure</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input type="number" className="form-control" min={1998} max={2999} id="year" />
                </div>
                <div className="input-group mb-3">
                    <select id="months" className="form-control" name="months">
                        <option value={"01"}>Janvier</option>
                        <option value={"02"}>Février</option>
                        <option value={"03"}>Mars</option>
                        <option value={"04"}>Avril</option>
                        <option value={"05"}>Mai</option>
                        <option value={"06"}>Juin</option>
                        <option value={"07"}>Juillet</option>
                        <option value={"08"}>Août</option>
                        <option value={"09"}>Septembre</option>
                        <option value={"10"}>Octobre</option>
                        <option value={"11"}>Novembre</option>
                        <option value={"12"}>Décembre</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input type="date" className="form-control"/>
                </div>
            </div>
            <div className="container d-flex " style={{ width: "900px" }}>
                <div className="card shadow p-0 mx-1 col-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Historique de consommation</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <ChartHistoric />
                        </div>
                    </div>
                </div>
                <div className="card shadow p-0 mx-1 col-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Consommation de chaque appareil</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <VerticalBarChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Historic