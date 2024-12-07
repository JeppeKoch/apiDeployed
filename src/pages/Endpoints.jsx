
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

function ApiTable() {
  const apiData = [
    {
      method: "GET",
      url: "/api/spices",
      requestBody: "None",
      response: '[{"id": Number, "name": String, "flavorProfile": String, "cuisines": [String], "description": String}, ...]',
      errors: '{ "status": 404, "msg": "No spices found" }',
    },
    {
      method: "GET",
      url: "/api/spices/{id}",
      requestBody: "None",
      response: '{"id": Number, "name": String, "flavorProfile": String, "cuisines": [String], "description": String}',
      errors: '{ "status": 404, "msg": "Spice not found" }',
    },
    {
        method: "POST",
        url: "/api/spices",
        requestBody: "None",
        response: '{"id": Number, "name": String, "flavorProfile": String, "cuisines": [String], "description": String}',
        errors: '{"status": 400, "msg": "Field name is required" }, { "status": 400, "msg": "Invalid flavor profile" }'
    
    }
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>Method</th>
          <th>URL</th>
          <th>Request Body</th>
          <th>Response</th>
          <th>Errors</th>
        </tr>
      </thead>
      <tbody>
        {apiData.map((api, index) => (
          <tr key={index}>
            <td>{api.method}</td>
            <td>{api.url}</td>
            <td>{api.requestBody}</td>
            <td>{api.response}</td>
            <td>{api.errors}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ApiTable;
