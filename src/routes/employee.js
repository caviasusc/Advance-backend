const employee = require('../CRUD/employeeCRUD');
const router = require('express').Router();

router.get('/all',
    employee.getEmployees
);

router.post('/',
    employee.createEmployee
)

router.put('/:id',
    employee.updateEmployee
)

router.delete('/:id',
    employee.deleteEmployee
)

module.exports = router