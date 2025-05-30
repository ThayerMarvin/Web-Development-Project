import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercise, onDelete, onEdit}) {
    return (
        <div className="collection-container">
            {exercise.map((exercise, i) => <ExerciseItem exercise={exercise} 
                    onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </div>

    );
}

export default ExerciseCollection;