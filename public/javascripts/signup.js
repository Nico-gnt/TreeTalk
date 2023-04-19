document.getElementById("signup").addEventListener("click", function (event) {
    event.preventDefault(); // Empêche la page de se recharger lorsqu'on clique sur le bouton
  
    // Récupération des valeurs des champs du formulaire
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
  
    // Envoi des données du formulaire au serveur en utilisant fetch
    fetch("/users/signup", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Compte créé avec succès !");
          // Redirige l'utilisateur vers la page d'accueil
          window.location.href = "/";
        } else {
          console.error("Une erreur est survenue lors de la création du compte.");
        }
      })
      .catch((error) => console.error(error));
  });
  