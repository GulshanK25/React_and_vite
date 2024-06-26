import mongoose from "mongoose";

const {Schema, model} = mongoose;

const employeschema = new Schema({
    emp_id: {type:Number, required: true , unique:true},
    emp_fullname: {type:String},
    emp_email:{type:String},
    emp_hashed_password: {type:String}
});

const Projectassignemtschema = new Schema({
    emp_id: {type: Schema.Types.Number, ref: 'employee' },
    project_name: { type: Schema.Types.String, ref: 'Project' },
    start_date: {type:String}
});

const projectschema = new Schema ({
    project_code: {type:String, unique: true},
    project_name:{type:String},
    project_description:{type:String}
});
const Project = model("Project", projectschema);
const employee = model("Employee",employeschema);
const Projectassignment = model('ProjectAssignment', Projectassignemtschema);
export  {employee,Project, Projectassignment};