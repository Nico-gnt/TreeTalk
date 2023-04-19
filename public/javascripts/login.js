document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le formulaire d'être soumis automatiquement
    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    
    // Envoi de la requête de connexion à la route "login" en utilisant fetch()
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Connexion réussie.") {
        // Redirige l'utilisateur vers la page d'accueil
        window.location.href = "/";
      } else {
        // Affiche un message d'erreur si la connexion échoue
        alert(data.message);
      }
    })
    .catch(error => console.error(error));
  });
  