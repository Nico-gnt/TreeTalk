const rechercher = document.getElementById("rechercher");
const btnRechercher = document.getElementById("btnRechercher");



btnRechercher.addEventListener("click", () => {
    var keycookie = rechercher.value;
    document.cookie = 'rechercher=' + keycookie;
    document.location.href="/";
});