/*
     IMPLEMENTATION OF LOAD WHEN JSON-SERVER IS SET UP
  */

// const loadForm = document.createElement('form');
// const loadSelection = document.createElement('select');
// const loadButton = document.createElement('button');
//
// loadButton.type = 'submit';
// loadButton.className = 'btn btn-primary mb-3';
// loadButton.innerText = 'Load';
//
// loadSelection.className = 'form-select';
//
// const database = fetch(`http://localhost:8080`, {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//     }
// })
//     .then(res => res.json())
//     .then(data => data)
//     .catch(err => "------------------");
//
// database.forEach(function (d) {
//     const loadOption = document.createElement('option');
//     loadOption.innerText = d;
//     loadSelection.appendChild(loadOption);
// });
//
// loadForm.append(loadSelection, loadButton);
// loadContainer.append(loadForm);

// ADD DATES
// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
//
// var date = new Date();
//
// console.log(date.addDays(5));