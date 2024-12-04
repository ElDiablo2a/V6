// script.js

// Simuler une base de données locale pour les utilisateurs
let users = JSON.parse(localStorage.getItem('users')) || [];

// Simuler une session d'utilisateur
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Fonction pour afficher la page d'inscription
function showSignupPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'block';
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

// Fonction pour afficher la page de connexion
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

// Fonction d'inscription
function signupUser() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        const user = { username, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Compte créé avec succès !');
        showLoginPage();
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

// Fonction de connexion
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Connexion réussie !');
        showMainPage();
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
}

// Fonction pour afficher la page principale après la connexion
function showMainPage() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    loadPosts();
}

// Fonction pour se déconnecter
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginPage();
}

// Fonction pour créer un post
function createPost() {
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').files[0];

    if (!content) {
        alert('Veuillez entrer du contenu pour votre post');
        return;
    }

    const post = {
        id: Date.now(),
        username: currentUser.username,
        content,
        image: image ? URL.createObjectURL(image) : null,
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    loadPosts();
}

// Fonction pour charger les posts
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <strong>${post.username}</strong>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image"/>` : ''}
        `;
        postsContainer.appendChild(postElement);
    });
}

// Initialiser la page
if (currentUser) {
    showMainPage();
} else {
    showLoginPage();
}
