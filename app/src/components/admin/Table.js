function Table() {
    return <>
        <h1 className="h3 mb-2 text-gray-800">Listes des appareils connectées</h1>
        <div class="card-body mx-1">
            <div class="table-responsive">
                <table class="table table-outlined" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nom de l'appareil</th>
                            <th>État</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Frigo
                                <span class="ml-1 badge badge-secondary">cuisine</span>
                            </td>
                            <td>
                                <span class="ml-1 badge badge-success">Allumé</span>
                                <span class="ml-1 badge badge-danger">Eteint</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" style={{ width: "40px", height: "40px" }}>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default Table;