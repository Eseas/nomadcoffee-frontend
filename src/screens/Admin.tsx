import React, { useState, useEffect } from 'react';
import { Logofont } from "../components/auth/Logofont";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DataGrid } from '@mui/x-data-grid';

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

function Admin() {
  const username = localStorage.getItem("USERNAME");

  const { loading, error, data: coffeeshopsData } = useQuery(FINDCOFFEESHOP_QUERY, {
    variables: { username: username },
  });
  
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Logofont>
        <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
      </Logofont>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </div>
  );
}

export default Admin;
