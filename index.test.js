import request from 'supertest';
import express from 'express';
import {validateEmployee} from './index.js'; // Import the validation middleware

const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/test-employee', validateEmployee, (req, res)=>{
  res.status(201).json({message:'Employee added'}); 
});

describe('Employee Validation Middleware', ()=>{
  test('Should return 400 if name is missing', async()=>{
    const response = await request(app)
      .post('/test-employee')
      .send({email:'test@example.com', position:'Engineer', salary:50000});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is required and should not be empty');
  });
  test('Should return 400 if email is invalid', async()=>{
    const response = await request(app)
      .post('/test-employee')
      .send({name:'John', email:'invalidemail', position:'Engineer', salary:50000});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required and should be a valid email address');
  });
  test('Should return 400 if salary is not a positive number', async ()=>{
    const response = await request(app)
      .post('/test-employee')
      .send({name: 'John',email:'john@example.com', position:'Engineer', salary: -1});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Salary should be a positive number');
  });
  test('Should return 201 if all data is valid', async()=>{
    const response = await request(app)
      .post('/test-employee') 
      .send({name: 'John', email:'john@example.com', position:'Engineer', salary:50000});
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Employee added');
  });
});
