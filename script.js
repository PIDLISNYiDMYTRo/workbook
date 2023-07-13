
// document.getElementById("addDateBtn").addEventListener("click", function () {
//   var table = document.querySelector(".main__table");
//   var headerRow = table.rows[0];
//   var dataRows = table.rows;

//   // Get the last date column index
//   var lastDateIndex = headerRow.cells.length;

//   // Create a new date cell in the header row
//   var newDateHeader = document.createElement("th");
//   newDateHeader.classList.add("date");
//   newDateHeader.contentEditable = true; // Allow editing the content
//   newDateHeader.textContent = "New Date";
//   headerRow.appendChild(newDateHeader);

//   // Create a new date cell in each data row
//   for (var i = 1; i < dataRows.length; i++) {
//     var newRowCell = dataRows[i].insertCell(lastDateIndex);
//     newRowCell.innerHTML = '<input class="grading" type="text">';
//   }
// });



// document.getElementById("addDateBtn").addEventListener("click", function () {
//   var table = document.querySelector(".main__table");
//   var headerRow = table.rows[0];
//   var dataRows = table.rows;

//   // Get the last date column index
//   var lastDateIndex = headerRow.cells.length;

//   // Create a new date cell in the header row
//   var newDateHeader = document.createElement("th");
//   newDateHeader.classList.add("date");
//   newDateHeader.contentEditable = true; // Allow editing the content
//   newDateHeader.innerHTML = 'New Date<span class="delete-icon">&#x25BC;</span>';
//   headerRow.appendChild(newDateHeader);

//   // Create a new date cell in each data row
//   for (var i = 1; i < dataRows.length; i++) {
//     var newRowCell = dataRows[i].insertCell(lastDateIndex);
//     newRowCell.innerHTML = '<input class="grading" type="text">';
//   }
// });

// // Event delegation to handle delete cell functionality
// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("delete-icon")) {
//     var thCell = event.target.parentNode; // Get the <th> cell
//     var columnIndex = thCell.cellIndex; // Get the column index
//     var table = thCell.closest("table"); // Find the closest table
//     var rows = table.rows; // Get all rows in the table

//     // Remove the <th> cell from the header row
//     thCell.parentNode.removeChild(thCell);

//     // Remove the corresponding <td> cells from data rows
//     for (var i = 1; i < rows.length; i++) {
//       rows[i].deleteCell(columnIndex);
//     }
//   }
// });

// document.getElementById("class-name").addEventListener("change", function () {
//   var selectedOption = this.options[this.selectedIndex];
//   var url = selectedOption.value;
//   if (url) {
//     window.location.href = url;
//   }
// });




function myFunction() {
  document.getElementById("hide").style.top = "0";
  document.getElementById("hide").style.transition = "1s";

  // document.getElementById("hide").style.transitionDuration = "5s";
}
function myFunctionhide() {
  document.getElementById("hide").style.top = "-250px";
  document.getElementById("hide").style.transition = "1s";
}



// Retrieve data from JSON file and populate the table
function populateTable() {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      // Iterate over the data and update the input fields
      for (let i = 0; i < data.length; i++) {
        const student = data[i];
        for (let j = 1; j <= student.grades.length; j++) {
          const grade = student.grades[j - 1];
          document.getElementById(`input${i + 1}-${j}`).value = grade;
        }
      }
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });
}

// Update the JSON file with the entered data
function updateJSONFile() {
  const students = [];
  const rows = document.querySelectorAll('.table tr:not(:first-child)');

  rows.forEach((row) => {
    const student = {
      name: row.querySelector('.name-surname').textContent,
      grades: [],
    };

    const inputs = row.querySelectorAll('input.grading');
    inputs.forEach((input) => {
      student.grades.push(input.value);
    });

    students.push(student);
  });

  const jsonData = JSON.stringify(students);

  fetch('data.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  })
    .then(() => {
      console.log('Data successfully updated!');
    })
    .catch((error) => {
      console.log('Error updating data:', error);
    });
}

// Automatic saving when inputs change
function handleInputChange(event) {
  updateJSONFile();
}

document.addEventListener('DOMContentLoaded', () => {
  populateTable();

  const inputs = document.querySelectorAll('input.grading');
  inputs.forEach((input) => {
    input.addEventListener('input', handleInputChange);
  });
});
