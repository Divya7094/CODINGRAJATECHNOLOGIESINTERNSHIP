function updateUserInfo() {
    const userInfoElement = document.getElementById("user-info");
    const welcomeMessage = document.getElementById("welcome-message");
    const logoutBtn = document.getElementById("logout-btn");
    const username = getUsername();

    if (userInfoElement && welcomeMessage  && logoutBtn && username) {
        welcomeMessage.textContent = `Welcome, ${username}!`;

        logoutBtn.addEventListener("click", function () {
            logout();
        });
    }
}

function getUsername() {
    return localStorage.getItem("username");
}

function setUsername(username) {
    localStorage.setItem("username", username);
}

function logout() {
    localStorage.removeItem("username");
    window.location.href = 'login.html'; 
}

updateUserInfo();
