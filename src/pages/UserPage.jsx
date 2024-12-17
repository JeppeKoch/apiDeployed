/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { api } from "../services/Fetch";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }
`;

const TopLeftNav = styled.div`
  display: flex;
  gap: 10px;
  align-content: center;
`;

const Button = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-transform: uppercase;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

function UserPage() {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('spices');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    api.favorites.getAll().then(data => {
      setFavorites(data);
    });
  }, []);

  const filteredData = favorites.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  return (
    <>
 
      {filteredData.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Show Content</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((favorite) => {
              const isExpanded = expandedRows.includes(favorite.id);
              return (
                <React.Fragment key={favorite.id}>
                  <tr>
                    <td>{favorite.name}</td>
                    <td>{favorite.length}</td>
                    <td>
                      <Button as="button" onClick={() => toggleRow(favorite.id)}>
                        {isExpanded ? 'Hide list' : 'Show list'}
                      </Button>
                    </td>
                  </tr>
                  {isExpanded && favorite.contents && (
                    <tr>
                    
                        <ul>
                          {favorites.map(content => (
                            <li key={content.id}>{content.name}</li>
                          ))}
                        </ul>
                   
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserPage;
