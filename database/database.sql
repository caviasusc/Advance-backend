CREATE DATABASE advance;

CREATE TYPE doctype AS ENUM ('Cedula','Cedula de extranjeria','Otro');
CREATE TYPE gendertype AS ENUM ('Hombre','Mujer','Otro');

CREATE TABLE employee(
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    gender gendertype not null,
    email text not null,
    phone_number int not null,
    address text,
    document_type doctype not null,
    document_number int not null,
    created timestamp default now(),
    updated timestamp default now()
);

CREATE TABLE employee_accounts (
    employee_account_id SERIAL PRIMARY KEY,
    employee_id int references Employee(employee_id),
    bank_name text not null,
    document_type text not null,
    document_number int not null,
    stats text
);

CREATE TABLE company_employee (
    company_employee_id SERIAL PRIMARY KEY,
    employee_id int references employee(employee_id),
    company text not null,
    company_email text not null,
    salary int not null,
    work_start_date date not null,
    work_end_date date
);

INSERT INTO employee (first_name, last_name, gender, email, phone_number, document_type, document_number) VALUES
    ('juan', 'perez', 'Hombre', 'jp@mail.com', 78907890, 'Cedula', 12341234),
    ('juan', 'rodriguez', 'Hombre', 'jr@mail.com', 78907891, 'Cedula', 23452345),
    ('juliana', 'jaramillo', 'Mujer', 'jj@mail.com', 78907892, 'Cedula', 23452346),
    ('pablo', 'rodriguez', 'Hombre', 'pr@mail.com', 78907893, 'Cedula', 34523456),
    ('pedro', 'coral', 'Hombre', 'pc@mail.com', 78907894, 'Cedula', 45234567),
    ('paula', 'perez', 'Mujer', 'pp@mail.com', 78907895, 'Cedula', 52345678),
    ('wiliam','wallace','Hombre', 'ww@email.com', 78907896, 'Cedula de extranjeria', 52345679),
    ('Kal', 'el', 'Hombre', 'kk@mail.com', 78907897, 'Otro', 452345680);

INSERT INTO employee_accounts (employee_id, bank_name, document_type, document_number) VALUES
    (1, 'theBank1', 'Cedula', 12341234),
    (2, 'theBank1', 'Cedula', 23452345),
    (3, 'theBank1', 'Cedula', 23452346),
    (4, 'theBank2', 'Cedula', 34523456),
    (5, 'theBank2', 'Cedula', 45234567),
    (6, 'theBank2', 'Cedula', 52345678),
    (7, 'theBank1', 'Cedula de extranjeria', 52345679);

INSERT INTO company_employee (employee_id, company, company_email, salary, work_start_date) VALUES
    (1, 'C1', 'jp@c1.com', 2000000, '2020-01-01'),
    (2, 'C2', 'jp@c2.com', 2000000, '2020-02-01'),
    (3, 'C1', 'jp@c1.com', 2000000, '2020-02-01'),
    (4, 'C2', 'jp@c2.com', 2000000, '2020-03-01'),
    (5, 'C2', 'jp@c2.com', 2000000, '2020-03-01'),
    (6, 'C2', 'jp@c2.com', 2000000, '2020-04-01'),
    (7,'C1', 'jp@c1.com', 2000000, '2020-04-01');

DELETE * FROM employee WHERE employee.employee_id=5;

SELECT employee.email, employee_accounts.bank_name, company_employee.company
FROM ((employee
INNER JOIN employee_accounts ON employee.employee_id=employee_accounts.employee_id)
INNER JOIN company_employee ON employee.employee_id=company_employee.employee_id);

SELECT * FROM employee WHERE first_name ~* 'ju';

SELECT * FROM employee ORDER BY employee.last_name ASC;

SELECT company_employee.company, COUNT(employee.employee_id) AS number_of_employees
FROM (employee
INNER JOIN company_employee ON employee.employee_id=company_employee.employee_id)
GROUP BY company_employee.company;

-- UPDATE employee
-- SET address = 'callefalsa 123',   
-- updated = now()
-- WHERE
-- employee.employee_id=1;