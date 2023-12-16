import React from "react"
import { ChartHistoric } from "../historic/Chart"
import { VerticalBarChart } from "../historic/VerticalBarChart"

function Historic() {
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Historique et autres</h1>
            <div className="container d-flex " style={{width:"900px"}}>
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