function Facturation(){
    return <>
        <div className="container">
            <h1 className="h3 mb-2 text-gray-800">Consommation et facuration</h1>
            <div>
        
            </div>
            <div class="table-responsive">
                <table class="table table-outlined" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nom de l'appareil</th>
                            <th>Consommation en KWh</th>
                            <th>Facturation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Frigo
                                <span class="ml-1 badge badge-secondary">cuisine</span>
                            </td>
                            <td className="text-justify">
                                0.7 KWh
                            </td>
                            <td className="text-justify">
                                0 Ar
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2} className="font-weight-bold">Total</td>
                            <td className="text-justify">0</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}

export default Facturation;