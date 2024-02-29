import React, { useState, useEffect } from 'react';
import { Logofont } from "../components/auth/Logofont";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';

const FINDCOFFEESHOP_QUERY = gql`
  query findMyCoffeeshops($username: String!) {
    findMyCoffeeshops(username: $username) {
      Shops {
        id
        name
        latitude
        logitude
        createdAt
        updatedAt
      }
    }
  }
`;

function moveEditNavigate() {
    const navigate = useNavigate();
    
    function moveEdit(selectedIds) {
      if (selectedIds.length === 1) {
        localStorage.setItem("COFFEESHOP_ID",selectedIds[0]);
        navigate(`${routes.edit}/${selectedIds[0]}`);
      } else {
        console.error("Select exactly one item to edit.");
      }
    }
  
    return { moveEdit };
}

function Admin() {
  const username = localStorage.getItem("USERNAME");

  const { loading, error, data: coffeeshopsData } = useQuery(FINDCOFFEESHOP_QUERY, {
    variables: { username: username },
  });
  const { moveEdit } = moveEditNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "latitude", headerName: "Latitude", width: 130 },
    { field: "logitude", headerName: "Longitude", width: 130 },
    //{ field: "categories", headerName: "Categories", width: 200 },
    { field: "createdAt", headerName: "CreatedAt", width: 200 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 200 },
  ];

  const rows = coffeeshopsData?.findMyCoffeeshops?.Shops || [];
  const [selectedIds, setSelectedIds] = useState([]);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Logofont>
        <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
      </Logofont>
      <button onClick={() => moveEdit(selectedIds)}>Edit</button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection
            onRowSelectionModelChange={(newSelectedIds) => {
                setSelectedIds(newSelectedIds);
            }}
        />
      </div>
    </div>
  );
}

export default Admin;