import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_COLLECTION = 'exercise';
const EXERCISE_CLASS = 'Exercise'

let connection = undefined;
let Exercise = undefined;

async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel(); 
    }catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    };
};

function createModel(){
    const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true }
});
    return mongoose.model(EXERCISE_CLASS, exerciseSchema, EXERCISE_COLLECTION);
};

async function createExercise(name, reps, weight, unit, date){
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return await newExercise.save();
};

const readExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

const readExerciseId = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    const query = await Exercise.findOne({ _id: _id });
    return query;
};

async function replaceExercise (_id, {name, reps, weight, unit, date}){
    if (!mongoose.Types.ObjectId.isValid(_id)) return null;
    const updatedExercise = await Exercise.findByIdAndUpdate(
        _id,
        {name, reps, weight, unit, date },
        {new: true});
    return updatedExercise;
};


const deleteById = async (_id) =>{
    const result = await Exercise.findByIdAndDelete(_id);
    return result;
};

export { connect };
export { createExercise };
export { readExercise };
export { readExerciseId };
export { replaceExercise };
export { deleteById };