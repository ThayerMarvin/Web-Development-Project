import React from 'react';
import { IoIosRemoveCircle, IoMdBuild } from "react-icons/io";

function formatDate (dateString){
  const date = new Date(dateString)
  const options = {
    year: '2-digit', 
    month: '2-digit', 
    day: '2-digit',   
};
return date.toLocaleDateString('en-US', options).replace(/\//g, '-');
};


function ExerciseRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.reps}</td> 
      <td>{item.weight}</td> 
      <td>{item.unit}</td> 
      <td>{formatDate(item.date)}</td>
      <td>
        <IoMdBuild onClick={() => onEdit(item)} style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 10px" }} title="Edit" />
        <IoIosRemoveCircle onClick={() => onDelete(item._id)} style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 10px" }} title="Delete" />
      </td>
    </tr>
  );
}

export default ExerciseRow;