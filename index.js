// Function to create an employee record
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(record => createEmployeeRecord(...record));
}

// Function to add a timeIn event for an employee
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to add a timeOut event for an employee
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    const eligibleDates = employee.timeInEvents.map(event => event.date);

    const totalWages = eligibleDates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);

    return totalWages;
}

// Example usage:

const employeeData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Doe", "Supervisor", 20]
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2023-10-14 09:00");
createTimeOutEvent(employees[0], "2023-10-14 17:00");

createTimeInEvent(employees[1], "2023-10-14 10:00");
createTimeOutEvent(employees[1], "2023-10-14 18:00");

const johnsWages = allWagesFor(employees[0]);
const janesWages = allWagesFor(employees[1]);

console.log(`John's total wages: $${johnsWages}`);
console.log(`Jane's total wages: $${janesWages}`);
