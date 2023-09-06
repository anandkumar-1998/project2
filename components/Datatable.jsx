import React from "react";

const Datatable = ({ count, val,updateData }) => {
  return (
    <>
      <tr scope="row" key={val.id}>
        <th>{count}</th>
        <td>{val.name || "NA"}</td>
        <td>{val.email || "NA"}</td>
        <td>{val.password || "NA"}</td>
        <td>{val.address || "NA"}</td>
        <td>{val.city || "NA"}</td>
        <td>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#Modal1"
            onClick={()=>{updateData(val)}}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default Datatable;
