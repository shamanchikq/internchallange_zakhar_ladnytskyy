import express from 'express'
import fs from 'fs'
import csv from 'csv-parser'
const app =express()
const PORT =5000
let employees=[]

// Middleware so we can use JSON data 
app.use(express.json())

// Function to read the CSV file and load data into employees array
function readCSV(){
  employees=[]// Clear the array
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data',(row)=> {
      employees.push(row)
    })
    .on('end',()=> {
      console.log('CSV file loaded successfully')
    })
}

//Read the CSV
readCSV()
// Main route, just says hello
app.get('/',(req, res)=>{
  res.send('HI:)')
})

// Validate employee data
function validateEmployee(req, res, next){
  const { name, email, position, salary}=req.body
  if(!name || typeof name !== 'string' || name.trim() ===''){
    return res.status(400).json({message: 'Name is required and should not be empty'})
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!email || !emailRegex.test(email)){
    return res.status(400).json({message:'Email is required and should be a valid email address'})
  }
  if(!position || typeof position !=='string' || position.trim()===''){
    return res.status(400).json({message:'Position is required and should not be empty'})
  }
  if(typeof salary !=='number' || salary<=0){
    return res.status(400).json({message:'Salary should be a positive number'})
  }
  next() // If all validations pass, proceed
}

// Get all employees
app.get('/employees',(req,res)=>{
  res.json(employees)
})
// Get employee by their ID
app.get('/employees/:id',(req,res) =>{
  const employee=employees.find(emp=> emp.id === req.params.id)
  if (employee){
    res.json(employee)
  } 
  else{
    res.status(404).json({message:'Employee not found'})
  }
})
// Add a new employee  
app.post('/employees', validateEmployee,(req,res)=>{
  const {id, name, email, position, salary}=req.body
  employees.push({id, name, email, position, salary})
  res.status(201).json({message:'Employee added'}) 
})
// Update an employee's info
app.put('/employees/:id', validateEmployee, (req, res)=>{
  const {id, name, email, position, salary} = req.body
  const employeeIndex = employees.findIndex(emp=> emp.id === req.params.id)
  if (employeeIndex === -1){
    return res.status(404).json({message:'Employee not found'})
  }
  employees[employeeIndex] ={id, name, email, position, salary }
  res.json({ message:'Employee updated'})
})
// Delete an employee
app.delete('/employees/:id', (req, res)=>{
  const employeeIndex = employees.findIndex(emp=> emp.id === req.params.id)
  if (employeeIndex === -1){
    return res.status(404).json({message:'Employee not found'})
  }
  employees.splice(employeeIndex, 1)
  res.json({message:'Employee deleted'})
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export {validateEmployee};