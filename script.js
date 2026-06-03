// =============================
// ADMIN LOGIN
// =============================

let adminLoginForm = document.getElementById("adminLoginForm");

if(adminLoginForm){

adminLoginForm.addEventListener("submit", function(e){

e.preventDefault();

let email = document.getElementById("adminEmail").value;
let password = document.getElementById("adminPassword").value;

if(email === "admin@gmail.com" && password === "admin123")
{
window.location.href = "admin-dashboard.html";
}
else
{
alert("Invalid Admin Login");
}

});

}


// =============================
// USER REGISTER 
// =============================

let userRegisterForm = document.getElementById("userRegisterForm");

if(userRegisterForm){

userRegisterForm.addEventListener("submit", async function(e){

e.preventDefault();

let name = document.getElementById("userName").value;
let email = document.getElementById("userEmail").value;
let phone = document.getElementById("userPhone").value;
let password = document.getElementById("userPassword").value;
let confirmPassword = document.getElementById("confirmPassword").value;


// =============================
// USER REGISTER VALIDATION
// =============================

// NAME VALIDATION
let namePattern = /^[A-Za-z ]+$/;

if(!namePattern.test(name)){
alert("Name should contain only letters");
return;
}

if(name.trim().length < 3){
alert("Name must be at least 3 characters");
return;
}


// STRICT EMAIL VALIDATION
let emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

if(!emailPattern.test(email)){
alert("Enter valid email like example@gmail.com");
return;
}


// PHONE VALIDATION
let phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(phone)){
alert("Phone number must be 10 digits");
return;
}


// PASSWORD VALIDATION
if(password.length < 4){
alert("Password must be at least 4 characters");
return;
}


// CONFIRM PASSWORD VALIDATION
if(password !== confirmPassword){
alert("Passwords do not match");
return;
}


// Backend API Call
let res = await fetch("http://localhost:3000/register", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({name,email,phone,password})
});

let data = await res.json();

if(data.success){
alert("User Registered Successfully");
window.location.href = "user-login.html";
}else{
alert(data.message);
}

});

}


// =============================
// USER LOGIN
// =============================

let userLoginForm = document.getElementById("userLoginForm");

if(userLoginForm){

userLoginForm.addEventListener("submit", async function(e){

e.preventDefault();

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;


// =============================
// USER LOGIN VALIDATION
// =============================

// EMAIL VALIDATION
let emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

if(!emailPattern.test(email)){
alert("Enter valid email");
return;
}

// PASSWORD VALIDATION
if(password.length < 4){
alert("Password must be at least 4 characters");
return;
}


// Backend API Call
let res = await fetch("http://localhost:3000/login", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({email,password})
});

let data = await res.json();

if(data.success)
{
window.location.href = "user-dashboard.html";
}
else
{
alert("Invalid Login Details");
}

});

}


// =============================
// DONOR REGISTER
// =============================

let donorForm = document.getElementById("donorForm");

if(donorForm){

donorForm.addEventListener("submit", async function(e){

e.preventDefault();

let name = document.getElementById("donorName").value;
let age = document.getElementById("age").value;
let weight = document.getElementById("weight").value;
let infection = document.getElementById("infection").value;
let blood = document.getElementById("bloodGroup").value;
let city = document.getElementById("city").value;
let contact = document.getElementById("contact").value;


// =============================
// DONOR VALIDATION
// =============================

// NAME VALIDATION
let namePattern = /^[A-Za-z ]+$/;

if(!namePattern.test(name)){
alert("Name should contain only letters");
return;
}

if(name.trim().length < 3){
alert("Name must be at least 3 characters");
return;
}


// AGE VALIDATION
if(age < 18 || age > 65){
alert("Donor age must be between 18 and 65");
return;
}


// WEIGHT VALIDATION
if(weight < 50){
alert("Weight must be at least 50kg");
return;
}


// INFECTION VALIDATION
if(infection === "Yes"){
alert("Donor is not eligible due to severe infection");
return;
}


// BLOOD GROUP VALIDATION
if(blood === ""){
alert("Please select blood group");
return;
}


// CITY VALIDATION
let cityPattern = /^[A-Za-z ]+$/;

if(!cityPattern.test(city)){
alert("City should contain only letters");
return;
}


// CONTACT VALIDATION
let phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(contact)){
alert("Phone number must be exactly 10 digits");
return;
}


// LAST DONATION DATE VALIDATION
let date = document.getElementById("date").value;

if(date){

let today = new Date().toISOString().split("T")[0];

if(date > today){
alert("Future donation date is not allowed");
return;
}

}


// =============================
// DONATION GAP VALIDATION
// =============================

let lastDonationDate = document.getElementById("date").value;

if(lastDonationDate !== ""){

let lastDate = new Date(lastDonationDate);
let today = new Date();

let differenceTime = today - lastDate;

let differenceDays = differenceTime / (1000 * 60 * 60 * 24);

if(differenceDays < 90){
alert("Donor can donate blood only after 90 days");
return;
}

}


// Backend API Call
let res = await fetch("http://localhost:3000/donor", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({name,age,weight,infection,blood,city,contact})
});

let data = await res.json();

if(data.success){
alert(data.message);
donorForm.reset();
}
else{
alert(data.message);
}

});

}


// =============================
// BLOOD REQUEST
// =============================

let requestForm = document.getElementById("requestForm");

if(requestForm){

requestForm.addEventListener("submit", async function(e){

e.preventDefault();

let patient = document.getElementById("patientName").value;
let blood = document.getElementById("requestBloodGroup").value;
let units = parseInt(document.getElementById("units").value);
let city = document.getElementById("requestCity").value;
let contact = document.getElementById("requestContact").value;
let emergency = document.getElementById("emergencyLevel").value;


// =============================
// BLOOD REQUEST VALIDATION
// =============================

// PATIENT NAME VALIDATION
let patientPattern = /^[A-Za-z ]+$/;

if(!patientPattern.test(patient)){
alert("Patient name should contain only letters");
return;
}

if(patient.trim().length < 3){
alert("Patient name must be at least 3 characters");
return;
}


// BLOOD GROUP VALIDATION
if(blood === ""){
alert("Please select blood group");
return;
}


// UNITS REQUIRED VALIDATION
if(!units){
alert("Please enter blood units");
return;
}

if(units < 1 || units > 5){
alert("Blood units must be between 1 and 5");
return;
}


// CITY VALIDATION
let cityPattern = /^[A-Za-z ]+$/;

if(!cityPattern.test(city)){
alert("City should contain only letters");
return;
}


// CONTACT VALIDATION
let phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(contact)){
alert("Contact number must be exactly 10 digits");
return;
}


// EMERGENCY LEVEL VALIDATION
if(emergency === ""){
alert("Please select emergency level");
return;
}

if(emergency !== "Normal" && emergency !== "Urgent"){
alert("Invalid emergency level");
return;
}


// Backend API Call
let res = await fetch("http://localhost:3000/request", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({
patient,
blood,
units,
city,
contact,
emergency
})
});

let data = await res.json();

if(data.success){
alert(data.message);
requestForm.reset();
}else{
alert(data.message);
}

});

}


// =============================
// SEARCH DONOR
// =============================

let searchBtn = document.getElementById("searchBtn");

if(searchBtn){

searchBtn.addEventListener("click", async function(){

let blood = document.getElementById("searchBlood").value;
let city = document.getElementById("searchCity").value;

if(blood === "" || city === ""){
alert("Please select blood group and enter city");
return;
}

// Backend API Call
let res = await fetch("http://localhost:3000/donors");
let donors = await res.json();

let table = document.getElementById("donorTable");

table.innerHTML = "";

let filtered = donors.filter(d => 
d.blood === blood && 
d.city.toLowerCase() === city.toLowerCase()
);

if(filtered.length === 0){
table.innerHTML = "<tr><td colspan='4'>No Donors Found</td></tr>";
return;
}

filtered.forEach(donor => {

let row = `
<tr>
<td>${donor.name}</td>
<td>${donor.blood}</td>
<td>${donor.city}</td>
<td>${donor.contact}</td>
</tr>
`;

table.innerHTML += row;

});

});

}


// =============================
// ADMIN DASHBOARD DATA
// =============================

let totalDonors = document.getElementById("totalDonors");

if(totalDonors){

fetch("http://localhost:3000/admin-data")
.then(res => res.json())
.then(data => {

document.getElementById("totalDonors").innerText = data.donors;
document.getElementById("totalRequests").innerText = data.requests;
document.getElementById("totalUsers").innerText = data.users;

});

}


// =============================
// ADMIN TABLE DATA LOAD
// =============================

let adminDonorTable = document.getElementById("adminDonorTable");
let adminRequestTable = document.getElementById("adminRequestTable");

if(adminDonorTable && adminRequestTable){

// Fetch Donors
fetch("http://localhost:3000/donors")
.then(res => res.json())
.then(donors => {

adminDonorTable.innerHTML = "";

donors.forEach(donor => {

let row = `
<tr>
<td>${donor.name}</td>
<td>${donor.blood}</td>
<td>${donor.city}</td>
<td>${donor.contact}</td>
</tr>
`;

adminDonorTable.innerHTML += row;

});

});

// Fetch Requests
fetch("http://localhost:3000/requests")
.then(res => res.json())
.then(requests => {

adminRequestTable.innerHTML = "";

requests.forEach(req => {

let row = `
<tr>
<td>${req.patient}</td>
<td>${req.blood}</td>
<td>${req.units}</td>
<td>${req.city}</td>
<td>${req.contact}</td>
<td>${req.emergency}</td>
</tr>
`;

adminRequestTable.innerHTML += row;

});

});

}