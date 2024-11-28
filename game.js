//file defining the behavior of the buttons appearing around the game screen

function Inventory() {
    central.innerHTML = "";
    Object.keys(Bag).forEach((key, i) => {
        let butt = document.createElement('button');
        butt.className = "BagCss";
        butt.id = "bag" + i;
        butt.style.backgroundImage="url(déplacement/"+Bag[key][2]+".png)"
        butt.style.backgroundSize="contain"
        butt.textContent= `${Bag[key][1]}`
        central.appendChild(butt);
        
        // Use IIFE(function used immediatly after being declared) to capture the value of `key`
        (function(capturedKey) {
            eventBag(butt, capturedKey);
        })(key);
    });
}

//Used when we click on the bag button
function DetailObject(type) {

    var returnButton = document.createElement('button');
    var returnButtonText = document.createElement('p');
    var detailObjectCenter = document.createElement('div');
    var detailObjectImage = document.createElement('div');
    var detailObjectCharacteristics = document.createElement('div');
    var detailObjectDescription = document.createElement('div');

    //update HTML properties
    returnButton.id = 'return';
    returnButtonText.textContent = 'Return';
    returnButton.appendChild(returnButtonText);
    returnButton.addEventListener('click', Inventory); // adding the click event
    detailObjectCenter.id = 'detailobjectcenter';
    detailObjectImage.id = 'detailobjectimage';
    detailObjectCharacteristics.id = 'detailobjectcharacteristics';
    detailObjectDescription.id = 'detailobjectdescription';
    detailObjectCharacteristics.textContent = 'caractéristiques';
    detailObjectDescription.textContent = 'description';

    //Configure CSS properties
    detailObjectImage.style.backgroundImage="url(déplacement/"+Bag[type][2]+".png)"
    detailObjectImage.style.backgroundSize='contain'

    // Adding elements around the gaming screen
    central.innerHTML = ''; 
    central.appendChild(returnButton);
    central.appendChild(detailObjectCenter);
    detailObjectCenter.appendChild(detailObjectImage);
    detailObjectCenter.appendChild(detailObjectCharacteristics);
    central.appendChild(detailObjectDescription);
}


//Used when we click on the Event button
function Events () {
    central.innerHTML = "<div id='eventsimage'>div1</div>" + "<div id='eventstext'>texte évènement</div>" + "<button id='eventsbutton'>bouton 1</button>" + "<button id='eventsbutton'>bouton 2</button>" + "<button id='eventsbutton'>bouton 3</button>"
}

// used when we click on the caravane button
function Caravane () {
    central.innerHTML = "<div id='StatsUnit'> <div id=m>membres</div>   </div>         <div id='StatsUnitSpecial'> <div id=m>membres speciaux</div>  <span id= 'stats'>0</span> <span id= 'stats'>0</span>   <span id= 'stats'>0</div> </span>     <div id='MembersButton'>Membres = ???</div> <button id='MembersButton' onclick='Afficher_membres_speciaux()'>Membres spéciaux</button>";          
    let unit=document.querySelector('#StatsUnit')
    unit.appendChild(famine)
    unit.appendChild(morale)
    unit.appendChild(membres)

}

function Afficher_membres_speciaux () {

    central.innerHTML = "<div id='StatsUnitFinal'>  <span id= 'stats'>0</span> <span id= 'stats'>0</span>   <span id= 'stats'>0</span> </div>"
    for(let i=0; i<101; i++) {
        let button=document.createElement("button");
        button.className="membres"+i
        button.textContent="membres"
        central.appendChild(button)
        button.style.width="100%";
    }
}

//Used to reset game when game has ended
function reset(){
y=2;
x=2;
init=0
tracker=36;
disting=0
debensRes =1000
waterRes = 50
crewRes = 20
moralRes = 50
authorityRes = 10
rationRes = 80
papyruRes = 10
famineRes = 0
moraleYield=0
distwat=0
distfood=0

tiles=['TileD','TileNS','TileD','TileD'];

tabElem=[
    ['elem1', 'elem2', 'elem3', 'elem4', 'elem5', 'elem6'],
    ['elem7', 'elem8', 'elem9', 'elem10', 'elem11', 'elem12'],
    ['elem13', 'elem14', 'elem15', 'elem16', 'elem17', 'elem18'],
    ['elem19', 'elem20', 'elem21', 'elem22', 'elem23', 'elem24'],
    ['elem25', 'elem26', 'elem27', 'elem28', 'elem29', 'elem30'], 
    ['elem31', 'elem32', 'elem33', 'elem34', 'elem35', 'elem36']
];
tabView = [
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'visible', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
]; // if the element should be shown or not

tabTiles=[
    ['TileD', 'TileNS', 'TileNS', 'TileD', 'TileD','TileD'],
    ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileNS', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileNS', 'TileD', 'TileNS', 'TileNS', 'TileNS','TileNS'],
    ['TileNS', 'TileD', 'TileNS', 'TileD', 'TileNS','TileD']
]


Bag = {
    'debens':['debens',debensRes, 'money'], 
    'water':['water',waterRes,'goutte'], 
    'rations':['rations',rationRes,'food'],
    'papyrus':['papyrus',papyruRes,'papyrus']
}

Nil= { 
    type: 'nil_shore', 
    data: {waterYield: 3, foodYield: 1}, 
    }

village = {type: 'village', data: {waterYield: 2, moraleYield:
        moraleYield, buy: [], sell: [{type: 'rations', volume: 100, price: 4}, {type: 'horses',
        volume: 3, price: 500}]}};

Fcity = {type: 'fluvial_city', data: {waterYield: 3, moraleYield:
    moraleYield, buy: [{type: 'weapons', volume: 20, price: 100}], sell: [{type:
    'papyrus', volume: 50, price: 20}, {type: 'rations', volume: 100, price: 6},
    {type: 'weapons', volume: 20, price: 200}]}};

desert = {type: 'desert', data: {}}

oasis = {type: 'oasis', data: {waterYield: 3, foodYield: 3}}

Dcity = {type: 'desert_city', data: {waterYield: 1, moraleYield:
    moraleYield, buy: [{type: 'papyrus', volume: 50, price: 40}], sell: [{type:
    'rations', volume: 100, price: 8}, {type: 'camels', volume: 2, price:
    1000}]}};
}