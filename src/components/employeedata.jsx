
import React,{useState,useEffect} from "react";


const empdata = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const daata = await response.json();
                setEmployeeData(daata);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <h2>
                table displayed 
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PROJECTCODE</th>
                        <th>START DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((emp)=> (
                        <tr key = {emp.emp_id}>
                            <td>{emp.emp_id}</td>
                            <td>{emp.emp_name}</td>
                            <td>{emp.project_name}</td>
                            <td>{emp.start_date}</td>
                        </tr>
                    ) )}
                </tbody>
            </table>
        </div>
    )
}
export default empdata;