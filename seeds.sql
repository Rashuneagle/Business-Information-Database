INSERT INTO departments (name)
VALUES ('Finance'),
       ('Engineering'),
       ('Quality');

INSERT INTO roles (title, salary, department_id)
VALUES ('Financial Analyst', 65000, 1),
       ('Engineer', 85000, 2),
       ('Quality Engineer', 75000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Michael', 'Scott', 1),
        ('Dwight', 'Schurte', 2),
        ('Jim', 'Halpert', 3);