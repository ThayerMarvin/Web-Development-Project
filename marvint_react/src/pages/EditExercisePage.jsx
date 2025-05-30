import { useState, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const EditExercisePage = () => {
    const location = useLocation();
    const { exerciseToEdit } = location.state || {};
    
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise ={name, reps, weight, unit, date}
        
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`,{
                method: "PUT",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedExercise),
            });

        if (response.status === 200){
            alert("Successfully edited the exercise");
        }else{
            alert("Failed to edit exercise, status code = " + response.status)
        }
        navigate('/')
    };

    const goHome = () => {
        return navigate('/')
    }

    return (
        <div>
            <h1>Edit Exercise</h1>
            <p><FaHouse onClick={() => goHome()} style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 10px" }} title="Home" /></p>
            <p><Link to="/create-exercise">Add an Exercise</Link></p>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
                >
                <option value="">Select Unit</option>
                <option value="kg">kgs</option>
                <option value="lbs">lbs</option>    
                </select>
            <input
                type="string"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Update</button>
        </div>
    );
}
export default EditExercisePage;