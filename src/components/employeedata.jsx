import React, { useState, useEffect } from "react";

const Empdata = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api');
                console.log('Response status:', response.status);
                const contentType = response.headers.get('content-type');
                console.log('Content-Type:', contentType);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
                console.log('Data:', data);
                setEmployeeData(data);
            } catch (error) {
                console.error('Fetch error:', error);
                
            }
        };
    
        fetchData();
        const interval = setInterval(fetchData,10000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div>
            <h2>Table Displayed</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID </th>
                        <th>NAME </th>
                        <th>PROJECTCODE </th>
                        <th>START DATE </th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((emp) => (
                        <tr key={emp.employee_id}>
                            <td>{emp.employee_id}</td>
                            <td>{emp.employee_name}</td>
                            <td>{emp.project_name}</td>
                            <td>{emp.start_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Empdata;
