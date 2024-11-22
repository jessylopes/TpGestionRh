// app.js
const employes = [
    { id: 1, nom: "Dupont", poste: "Développeur" },
    { id: 2, nom: "Durand", poste: "Designer" },
    { id: 3, nom: "Martin", poste: "Chef de projet" }
];

function afficherEmployes() {
    const listeDiv = document.getElementById('liste-employes');
    listeDiv.innerHTML = '';
    employes.forEach(emp => {
        const empDiv = document.createElement('div');
        empDiv.textContent = `${emp.id} - ${emp.nom} - ${emp.poste}`;
        listeDiv.appendChild(empDiv);
    });
}

function ajouterEmploye(id, nom, poste) {
    employes.push({ id, nom, poste });
}

function supprimerEmploye(id) {
    const index = employes.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employes.splice(index, 1);
    }
}

// Fonction pour gérer l'ajout d'un employé via l'interface
function ajouterEmployeManuel() {
    const nom = document.getElementById('ajout-nom').value;
    const poste = document.getElementById('ajout-poste').value;
    const id = employes.length > 0 ? employes[employes.length - 1].id + 1 : 1;
    if (nom && poste) {
        ajouterEmploye(id, nom, poste);
        afficherEmployes();
    }
}

// Fonction pour gérer la suppression d'un employé via l'interface
function supprimerEmployeManuel() {
    const id = parseInt(document.getElementById('supprimer-id').value, 10);
    if (!isNaN(id)) {
        supprimerEmploye(id);
        afficherEmployes();
    }
}
