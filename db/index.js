const pool = require('./connection');

class DB{
    constructor(){}

    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;

        }finally {
            client.release();
        }
    }

findAllEmployees() {
    return this.query(
        //this is how it should look, you'll need to finish this database command
        'SELECT employee.id, employee.first_name, employ.last_name, role.title, etc, etc.'
    );
}

findAllManagers(employeeId){

}

createEmployee(employee){
    const {first_name, last_name, role_id, manager_id} = employee;


}

removeEmployee(employeeId){

}

updateEmployeeRole(employeeId, roleId){
    //
}

updateEmployeeManager(employeeId, managerId){

}

findAllRoles() {

}

createRole(role){
    const {title, salaray, department_id} = role;

}

removeRole(roleId){

}

findaAllDepartments(){

}

createDepartment(department){

}

removeDepartment(departmentId){

}


}

module.exports = new DB();