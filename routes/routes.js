import express from "express";
import { employee, Project, Projectassignment } from "../public/schemaemploye.js";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const data = await Projectassignment.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "emp_id",
                    foreignField: "emp_id",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_code",
                    foreignField: "project_code", 
                    as: "project"
                }
            },
            {
                $unwind: "$project"
            },
            {
                $project: {
                    "_id": 0,
                    "employee_id": "$employee.emp_id", 
                    "employee_name": "$employee.emp_fullname", 
                    "project_name": "$project.project_name",
                    "start_date": "$start_date"
                }
            }
        ]);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/project', async (req, res) => {
    try{
        const {project_code,project_name,project_description}= req.body;
        if (!project_code) {
            return res.status(400).json({ message: "Please enter project code" });
        }
        const createproj = await Project.create({
            project_code,
            project_name,
            project_description
            });
        res.status(201).json({
            message: "Project Added",
            Project: createproj.toObject({ getters: true, versionKey: false })
        })
    }
    catch(error){
        res.status(500).json({ message: error.message });
}
}
);
router.post('/employees', async (req, res) => {
    try{
        const {emp_id,emp_fullname,emp_email,emp_hashed_password}= req.body;
        if (!emp_id) {
            return res.status(400).json({ message: "Please enter Employee ID" });
        }
        const createemp = await employee.create({
            emp_id,
            emp_fullname,
            emp_email,
            emp_hashed_password
            });
        res.status(201).json({
            message: "Employee created successfully",
            employee: createemp.toObject({ getters: true, versionKey: false })
        })
    }
    catch(error){
        res.status(500).json({ message: error.message });
}
}
);



export default router;