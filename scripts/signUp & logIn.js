class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

var users = JSON.parse(localStorage.getItem("users")) || [];
var signUpForm = document.querySelector("#signUp");
var logInForm = document.querySelector("#logIn");
var logoutBtn = document.getElementById("logout-btn");
var userNameElement = document.getElementById("user-name");


// page load

const savedName = localStorage.getItem('loggedUserName');
if (savedName) {
    userNameElement.innerHTML = savedName;
    if (logoutBtn) logoutBtn.style.display = "block"; 
} else {
    userNameElement.innerHTML = "guest";
    if (logoutBtn) logoutBtn.style.display = "none"; 
}


// sign up

if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = signUpForm.children[0].value.trim();
        const email = signUpForm.children[1].value.trim();
        const password = signUpForm.children[2].value.trim();

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert(`Sorry, this email already exists`);
            return;
        }

        // Add new user
        users.push(new User(name, email, password));
        localStorage.setItem("users", JSON.stringify(users));

        alert(`Account created! You can log in now`);
    });
}


// log in

if (logInForm) {
    logInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = logInForm.children[0].value.trim();
        const password = logInForm.children[1].value.trim();

        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert(`Log in successful!`);

            // save data
            localStorage.setItem('loggedUserName', foundUser.name);
            localStorage.setItem('loggedEmail', foundUser.email);
            localStorage.setItem('loggedPassword', foundUser.password);

            // update UI
            userNameElement.innerHTML = foundUser.name;
            if (logoutBtn) logoutBtn.style.display = "block";
        } else {
            alert(`Log in failed ):`);
        }
    });
}


// log out

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem('loggedUserName');
        localStorage.removeItem('loggedEmail');
        localStorage.removeItem('loggedPassword');

        userNameElement.innerHTML = "guest";
        if (logoutBtn) logoutBtn.style.display = "none";

        alert("You have logged out");

        location.reload();
    });
}
