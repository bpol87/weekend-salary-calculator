let submitBtn = document.getElementById('submit-btn');
let empForm = document.getElementById('employee-form');
let salTable = document.getElementById('salary-table');
let monthlySalary = document.getElementById('monthly-emp-salary');
let totalFooter = document.getElementById('total-monthly');
let monthlyTotal = 0;
let rowId = 0;
let employeeList = [];

function addEmpSalary(event) {
    event.preventDefault();
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let empId = document.getElementById('id-number').value;
    let empTitle = document.getElementById('title').value;
    let annualSalary = Number(document.getElementById('annual-salary').value);

    addEmployeeToList(firstName, lastName, empId, empTitle, annualSalary)
    rowId = rowId + 1;

    let empMonthly = Math.round(annualSalary / 12);
    monthlyTotal = monthlyTotal + empMonthly;
    let monthlyTotalConverted = USDollar.format(monthlyTotal)
if (monthlyTotal > 20000) {
    totalFooter.classList.add('over-budget')
}
    monthlySalary.innerHTML = monthlyTotalConverted;
    
    salTable.innerHTML += `
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${empId}</td>
        <td>${empTitle}</td>
        <td class="salary-col">${USDollar.format(annualSalary)}</td>
        <td><button id="delete-btn" onclick="removeRow(event, ${rowId})">Delete</button></td>
    </tr>
    `
empForm.reset();
}

function removeRow(event, idNum) {
    console.log(employeeList[idNum-1].empDetails.annualSalary);
    let removedSalary = employeeList[idNum-1].empDetails.annualSalary;
    let empMonthly = Math.round(removedSalary / 12);
    monthlyTotal = monthlyTotal - empMonthly;
    let monthlyTotalConverted = USDollar.format(monthlyTotal)

    monthlySalary.innerHTML = monthlyTotalConverted;

    console.log(`'the row removed was:', ${removedSalary}`);
    event.target.parentElement.parentElement.remove();
}

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

function addEmployeeToList(first, last, id, title, salary) {
    let addedEmployee = { 
        rowId: `${rowId}`, 
        empDetails: {
            firstName: first,
            lastName: last,
            idNumber: id,
            title: title,
            annualSalary: salary
        }
    }
employeeList.push(addedEmployee);
console.log(employeeList);
}
