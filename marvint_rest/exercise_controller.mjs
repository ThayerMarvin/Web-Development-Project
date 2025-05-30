import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercise from './exercise_model.mjs';
import { replaceExercise, readExerciseId } from './exercise_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', asyncHandler(async (req, res) => {
    const {name, reps, weight, unit, date} = req.body;

    if(!name || !reps || !weight || !unit || !date){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof name !== 'string' || name === ""){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof reps !== 'number' ||reps <= 0){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof weight !== 'number' ||weight <=0){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if (unit !== 'kgs' && unit !== 'lbs') {
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request" });
    }
    if(typeof date !== 'string' || !(isDateValid(date))){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }

    const newExercise = await exercise.createExercise(name, reps, weight, unit, date);
    return res.status(201).set('Content-type', 'application/json').json({
    name: newExercise.name,
    reps: newExercise.reps,
    weight: newExercise.weight,
    unit: newExercise.unit,
    date: newExercise.date,
    _id: newExercise._id,
    });
}));


app.get('/exercises', asyncHandler(async (req,res) => {
    const exercises = await exercise.readExercise({});
    return res.status(200).set('Content-type', 'application/json').json(exercises || []);
}));


app.get('/exercises/:_id', asyncHandler(async (req,res) => {
    const {_id} = req.params;
    const exercise = await readExerciseId(_id);
    if(!exercise){
        return res.status(404).set('Content-type','application/json').json({"Error": "Not found"});
};
    return res.status(200).set('Content-type','application/json').json(exercise)
}));


app.put('/exercises/:_id', asyncHandler(async (req,res) => {
    const {_id} = req.params;
    const {name, reps, weight, unit, date} = req.body

    if(!name || !reps || !weight || !unit || !date){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof name !== 'string' || name === ""){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof reps !== 'number' ||reps <= 0){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if(typeof weight !== 'number' ||weight <=0){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    if (unit !== 'kgs' && unit !== 'lbs') {
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request" });
    }
    if(typeof date !== 'string' || !(isDateValid(date))){
        return res.status(400).set('Content-type', 'application/json').json({ Error: "Invalid request"})
    }
    
    const replace = await replaceExercise(_id, {name, reps, weight, unit, date});
    if(!replace){
        return res.status(404).set('Content-type','application/json').json({"Error": "Not found"});}
    return res.status(200).set('Content-type','application/json').json(replace);
}));


app.delete('/exercises/:_id', asyncHandler(async (req,res) => {
    const {_id} = req.params;
    const result = await exercise.deleteById(_id);
    if (!result) {
        return res.status(404).set('Content-Type', 'application/json').json({ "Error": "Not found" });
    };
    return res.status(204).send();    
}))


app.listen(PORT, async () => {
    await exercise.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});
