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

export default router;