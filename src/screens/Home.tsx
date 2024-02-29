import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";
import { gql, useQuery } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const SeeCoffeeShops_Query = gql`
    query seeCoffeeShops ($page: Int!) {
        seeCoffeeShops (page: $page){
            Shops {
                id
                name
                latitude
                logitude
                user {
                  username
                  avatar
                }
                photos {
                  url
                  id
                }
                categories {
                  name
                  id
                }
            }
        }
    }
`

function useAdminNavigation() {
    const navigate = useNavigate();
    function moveAdmin() {
        navigate(`${routes.admin}/${localStorage.getItem("USERNAME")}`);
    }
    return { moveAdmin };
}

function Home() {
    const { moveAdmin } = useAdminNavigation();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const page = 1;
    const { loading, error, data } = useQuery(SeeCoffeeShops_Query, {
        variables: { page },
    });
    console.log(data);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "latitude", headerName: "Latitude", width: 130 },
        { field: "logitude", headerName: "Longitude", width: 130 },
    ];

    return (
        <form>
        <div>
            <div>
                <h1>Home</h1>
                <button onClick={moveAdmin}>Go Admin</button>
                <button onClick={() => logUserOut()}>Log out now!</button>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={data} columns={columns} />
                onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = data.rows.filter((row) =>
                selectedIDs.has(row.id),
                );
                setSelectedRows(selectedRows);
                }}
                {...data}
            </div>
        </div>
        </form>
    );
}

export default Home;