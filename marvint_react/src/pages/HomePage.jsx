import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import ExerciseTable from "../components/ExerciseTable";
import { FaHouse } from "react-icons/fa6";

function HomePage() {
    const [exercise, setExercise] = useState([]);
    const navigate = useNavigate()

    const loadExercise = async () => { 
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercise(data)
    }
    
    useEffect( () => {
        loadExercise();
    }, []);

    const onDelete = async (_id) =>{
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if (response.status === 204){
            setExercise(exercise.filter(e => e._id !== _id))
            alert(`Successfully deleted exercise`)
        } else {
            alert(`Failed to delete exercise with _id = ${exercise._id}, status code = ${response.status}`)
        }
    }


    const onEdit = (exercise) =>{
        navigate('/edit-exercise', { state: { exerciseToEdit: exercise } });
    }


    return (
        <div>
        <Link to="/create-exercise">Add an Exercise</Link>
        <ExerciseTable exercises={exercise} onDelete={onDelete} onEdit={onEdit} />
        <p><FaHouse onClick={() => goHome()} style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 10px" }} title="Home" /></p>
        </div>
    )
}

export default HomePage