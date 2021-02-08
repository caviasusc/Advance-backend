const {pool} =require('../db/index');

exports.getEmployees = async (req,res) =>{
    try{
        const employees = await pool.query('SELECT * FROM employee');
        res.send(employees.rows)
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
}

exports.createEmployee = async (req, res) =>{
    try{
        const text = 'INSERT INTO employee (first_name, last_name, gender, email, phone_number, address, document_type, document_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
        const info = req.body
        const values = [
            info.first_name,
            info.last_name,
            info.gender,
            info.email,
            info.phone_number,
            info.address,
            info.document_type,
            info.document_number,
        ]
        await pool.query(text, values)
        res.json({
            message: `Usuario ${info.first_name} creado satisfactoriamente.`
        }
        )
    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }
}

function checkParams(info){

    let text = 'UPDATE employee SET ';
    let values = [info['employee_id']];
    let num = 2;
    for(x in info ){
        if(info[x]!=null && x!='employee_id'){
            if (num==2){
                text += `${x} = $${num}`
            }else {
                text += `, ${x} = $${num}`
            }
            values.push(info[x])
            num++
        }
    }
    text += ' WHERE employee_id = $1'
    return [text,values]
}

exports.updateEmployee = async (req, res) =>{
    try{
        const info = req.body;
        info.employee_id = req.params.id;
        info.updated = new Date();
        const values = {
            employee_id: info.employee_id,
            first_name: info.first_name,
            last_name: info.last_name,
            gender: info.gender,
            email:info.email,
            phone_number: info.phone_number,
            adress: info.address,
            document_type: info.document_type,
            document_number:info.document_number,
            updated: info.updated
        }
        const query = checkParams(values)
        await pool.query(query[0], query[1])
        res.json({
            message: `Usuario editado satisfactoriamente.`
        })
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
}

exports.deleteEmployee = async (req, res) =>{
    try{
        const text = 'DELETE FROM employee WHERE employee_id = $1'
        const id = req.params.id;
        await pool.query(text, [id])
        res.json({
            message: `Usuario eliminado satisfactoriamente.`
        })
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
}