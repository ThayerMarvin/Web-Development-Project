import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";

export const CreateExercisePage = () => {

    const [name, setExercise] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
 
    const navigate = useNavigate()
    
    const createExercise = async () => {
        const newExercise ={name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises',{
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        )
        if (response.status === 201){
            alert("Successfully added the exercise");
        }else{
            alert("Failed to add exercise, status code = " + response.status)
        }
        navigate('/')
    };
    
    const goHome = () => {
        return navigate('/')
    }

    return (
        <div>
            <h1>Create Exercise</h1>
            <p><FaHouse onClick={() => goHome()} style={{ cursor: "pointer", fontSize: "1.5rem", margin: "0 10px" }} title="Home" /></p>
            <p><Link to="/create-exercise">Add an Exercise</Link></p>
            <input
                type="text"
                placeholder="Exercise"
                value={name}
                onChange={e => setExercise(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Reps"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
                >
                <option value="">Select Unit</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>    
                </select>
            <input
                type="string"
                placeholder='Date'
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;