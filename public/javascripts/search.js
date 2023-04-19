const rechercher = document.getElementById("rechercher");
const btnRechercher = document.getElementById("btnRechercher");


// add event on entre key

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        doSearch();
    }
});

btnRechercher.addEventListener("click", () => {
    doSearch();
});


function doSearch() {
    var keycookie = rechercher.value;
    document.cookie = 'rechercher=' + keycookie;
    document.location.href = "/";
}