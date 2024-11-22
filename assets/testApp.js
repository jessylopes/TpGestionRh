const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');

(async function testApp() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Accéder page locale
        await driver.get('http://localhost:8181');

//////////////////////////////testAjoutEmploye///////////////////////////////////
async function testAjoutEmploye(){
const nom = 'Jessica';
        const poste = 'Développeuse';
        await driver.findElement(By.id('ajout-nom')).sendKeys(nom);
        await driver.findElement(By.id('ajout-poste')).sendKeys(poste);
        await driver.findElement(By.xpath("//button[text()='Ajouter']")).click();

        ///verifie que les employés sont bien affichés 
        const listeDiv = await driver.findElement(By.id('liste-employes'));
        const empDivs = await listeDiv.findElements(By.tagName('div'));

        // vérifie que l'employé ajouté apparaît dans la liste
        const newEmployeeText = `${empDivs.length} - ${nom} - ${poste}`;
        const empTexts = await Promise.all(empDivs.map(async (empDiv) => {
            return await empDiv.getText();
        }));

        assert(empTexts.includes(newEmployeeText), 'L\'employé ajouté n\'est pas affiché correctement');
        console.log("Test Ajouter Employé : Réussi");
    }

//////////////////////////testSupprimerEmploye///////////////////////////////////
async function testSupprimerEmploye() {
  
        // ajoute un employé à supprimer
        const nom = 'Sana';
        const poste = 'Développeuse';
        await driver.findElement(By.id('ajout-nom')).sendKeys(nom);
        await driver.findElement(By.id('ajout-poste')).sendKeys(poste);
        await driver.findElement(By.xpath("//button[text()='Ajouter']")).click();

        // supprime l'employé (ID)
        const id = 1; // L'ID de l'employé ajouté
        await driver.findElement(By.id('supprimer-id')).sendKeys(id.toString());
        await driver.findElement(By.xpath("//button[text()='Supprimer']")).click();

        // Vérifie que la liste ne contient plus cet employé
        const listeDiv = await driver.findElement(By.id('liste-employes'));
        const empDivs = await listeDiv.findElements(By.tagName('div'));

        const empTexts = await Promise.all(empDivs.map(async (empDiv) => {
            return await empDiv.getText();
        }));

        assert(!empTexts.some(text => text.includes(`${id} - ${nom} - ${poste}`)), 'L\'employé n\'a pas été supprimé correctement');
        console.log("Test Supprimer Employé : Réussi");
    }


    } finally {
        await driver.quit();
    }
})();

