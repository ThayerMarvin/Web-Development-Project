import React from 'react';
import ExerciseRow from './ExerciseRow';


function ExerciseTable({exercises, onDelete, onEdit}) {
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Units</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {exercises.map((exercise) => (
            <ExerciseRow key={exercise._id} item={exercise} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ExerciseTable;