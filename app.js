const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const employees = [];

app.get('/', (req, res) => {
  res.status(200).json(employees);
});

app.post('/', (req, res) => {
    employees.push(req.body);
    res.status(200).json({msg: "Employee added successfully"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});