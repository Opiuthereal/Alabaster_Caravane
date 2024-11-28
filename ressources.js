//Calculate ressources gained or lost and the assignations
function moveRessources(){
    rationRes = rationRes - crewRes
    ration.textContent=rationRes

    if (crewRes>waterRes){
        crewRes=crewRes-(crewRes-waterRes)
        waterRes=0

    }
    else{
        waterRes = waterRes - crewRes
        water.textContent = waterRes
    }

    moralRes = moralRes - 5

    if (rationRes<=0){
        rationRes=0
        moralRes = moralRes - 5
        famineRes = famineRes + 1
        famine.textContent=famineRes
        crewRes = crewRes - (Math.pow(2, famineRes) - 2)
        membres.textContent = crewRes
    }

    else if (moralRes<=0){
        while (authorityRes>0 && moralRes<1){
            authorityRes-=1
            moralRes+=1
        }
        authority.textContent=authorityRes
    }

    else {
        famineRes=0
        famine.textContent=famineRes
    }

    deb.textContent=debensRes
    moral.textContent=moralRes
    if (isNaN(rationRes)){
        rationRes=0
        ration.textContent=rationRes
    }
    if (isNaN(waterRes)){
        waterRes=0
        water.textContent = waterRes
    }
    assertDefeat()
}

function assertDefeat(){
    if (crewRes<=0){
        crewRes=0
        membres.textContent = 0
        console.log('dead')
        //defeatscreen()
    }
}

function assignate() {
    // Reset central and set new content
    central.innerHTML = "<div id='ban'><div id='people'></div><span id='compt'>0</span></div>";

    // Creation of the questionnaire div
    let questionnaire = document.createElement('div');
    questionnaire.id = 'questionnaire';

    // Adding questions to the questionnaire
    questionnaire.appendChild(createQuestion('Récolte eau:', distwat, (value) => distwat = value));
    questionnaire.appendChild(createQuestion('Récolte nourriture:', distfood, (value) => distfood = value));

    // Added event handler for each input
    let inputs = questionnaire.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInput);
    });

    // Adding the questionnaire to the central element
    central.appendChild(questionnaire);

    updateCompt();
}

function createQuestion(labelText, num, updateValue) {
    let question = document.createElement('div');
    question.className = 'question';

    let label = document.createElement('label');
    label.textContent = labelText;

    let input = document.createElement('input');
    input.type = 'number';
    input.value = num;
    input.min = 0;
    input.max = crewRes;

        // Added an event handler to update the corresponding value
        input.addEventListener('input', (event) => {
            // Empêcher les valeurs négatives
            if (parseInt(event.target.value) < 0) {
                event.target.value = 0;
            }
    
            // Calcul du total des autres inputs
            let otherInputsTotal = 0;
            document.querySelectorAll('#questionnaire input').forEach(otherInput => {
                if (otherInput !== event.target) {
                    otherInputsTotal += parseInt(otherInput.value) || 0;
                }
            });
    
            // Limits the maximum value of the current input
            let maxAllowed = crewRes - otherInputsTotal;
            if (parseInt(event.target.value) > maxAllowed) {
                event.target.value = maxAllowed;
            }
    
            // Update corresponding value
            updateValue(parseInt(event.target.value) || 0);
            handleInput(event);
        });
    
        question.appendChild(label);
        question.appendChild(input);
    
        return question;
    }
    
    function checkTotal() {
        let inputs = document.querySelectorAll('#questionnaire input');
        let total = 0;
    
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
    
        // Returns true if the sum is within limits, otherwise false
        return total <= crewRes;
    }
    
    // Event handler to check total sum
    function handleInput(event) {
        // Checks if the sum exceeds crewRes
        if (!checkTotal()) {
            // If the sum exceeds crewRes, restore the previous value
            event.target.value = event.target.oldValue || 0;
        } 
        else {
            // Otherwise, update the previous value
            event.target.oldValue = event.target.value;
        }
        // Update counter
        updateCompt();
    }
    
    function updateCompt() {
        let inputs = document.querySelectorAll('#questionnaire input');
        let total = 0;
    
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
    
        // Update span with remaining value
        document.getElementById('compt').textContent = crewRes - total;
    }
    
function addRessources(){
    let tile=""
    let moral = false
    if (tabTiles[y][x]==='TileNS'){
        tile=Nil.data
    }
    else if (tabTiles[y][x]==='TileC'){
        tile=village.data
        moral = true
    }
    else if (tabTiles[y][x]==='TilesD'){
        tile=desert.data
    }
    else if (tabTiles[y][x]==='TileDC'){
        tile=Dcity.data
        moral = true
    }
    else if (tabTiles[y][x]==='TileFC'){
        tile=Fcity.data
        moral = true
    }
    else if (tabTiles[y][x]==='TileO'){
        tile=oasis.data
    }
    if (moral){
        moralRes = moralRes + (tile.moraleYield*(crewRes-(distfood+distwat)))
        moral.textContent=moralRes
    }
    waterRes=waterRes+(distwat*tile.waterYield)
    water.textContent = waterRes
    rationRes=rationRes+(distfood*tile.foodYield)
    ration.textContent=rationRes

}

function afficheRessources(){
    water.textContent = waterRes
    ration.textContent=rationRes
    moral.textContent=moralRes
    membres.textContent = crewRes
    authority.textContent=authorityRes
    authority.textContent=authorityRes
    
}