use employees;

INSERT INTO department (name) 
VALUES 
('Sales'),
('Finance'),
('Human Resources'),
('Operations');

INSERT INTO role (title, salary, department_id) 
VALUES
('Sales Manager', 80000, 1),
('Sales Associate', 50000, 1),
('Account Manager', 120000, 2),
('Accountant', 100000, 2),
('HR Director', 110000, 3),
('HR Associate', 90000, 3),
('Operations Manager', 105000, 4),
('Operations Specialist', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Fred', 'Sanders', 1, NULL),
('Nicole', 'Rivera', 2, 1),
('Virginia', 'Davis', 3, NULL),
('Marie', 'Henderson', 4, 3),
('Matthew', 'Richardson', 5, NULL),
('Earl', 'Allen', 6, 5),
('Timothy', 'Wright', 7, NULL),
('Donna', 'Adams', 8, 7);

