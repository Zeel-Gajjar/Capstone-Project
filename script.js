// Define allowed documents and passwords for each student
const studentDocs = {
    'student1': ['doc4.pdf', 'doc7.pdf', 'doc8.pdf'], // Documents for student1
    'student2': ['doc1.pdf', 'doc2.pdf', 'doc9.pdf'], // Documents for student2
    // Add more students and their allowed documents here
};

const studentPasswords = {
    'student1': 'password1', // Password for student1
    'student2': 'password2', // Password for student2
    // Add more students and their passwords here
};

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username in studentDocs && studentPasswords[username] === password) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        document.getElementById('login-message').textContent = 'Login successful!';
        window.location.href = 'documents.html';
    } else {
        document.getElementById('login-message').textContent = 'Invalid credentials. Please try again.';
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html'; // Redirect to a custom page or home page
}

document.addEventListener('DOMContentLoaded', () => {
    const docMessage = document.getElementById('doc-message');
    const documentList = document.getElementById('document-list');
    const logoutButton = document.querySelector('button[onclick="logout()"]');
    const loginLink = document.querySelector('nav a[href="login.html"]');
    const username = localStorage.getItem('username');

    if (localStorage.getItem('loggedIn') === 'true' && username) {
        const docs = studentDocs[username];
        if (docs) {
            docMessage.textContent = 'Here are the documents you can access:';
            documentList.innerHTML = docs.map(doc => `<li><a href="path-to-docs/${doc}" download>${doc}</a></li>`).join('');
            if (logoutButton) {
                logoutButton.style.display = 'inline'; // Show the logout button
            }
            if (loginLink) {
                loginLink.style.display = 'none'; // Hide the login link
            }
        } else {
            docMessage.textContent = 'No documents available for your account.';
            documentList.style.display = 'none';
        }
    } else {
        docMessage.textContent = 'Please log in to view documents.';
        documentList.style.display = 'none';
        if (logoutButton) {
            logoutButton.style.display = 'none'; // Hide the logout button
        }
        if (loginLink) {
            loginLink.style.display = 'inline'; // Show the login link
        }
    }
});
