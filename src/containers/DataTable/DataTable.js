import React from "react";
import "./DataTable.css";
import Table from "../../components/Table/Table.js";

class DataTable extends React.Component {
    render() {
        return (
            <div>
                <h1 className="title">Esticord Tournament</h1>
                <Table />
            </div>
        );
    }
}

export default DataTable;