// file where all the varidables are defined 

var central=document.querySelector('#central')
var bag=document.querySelector('#Bag')
var events=document.querySelector('#events')
var caravane=document.querySelector('#cav')
var famine=document.querySelector('#famineTurns')
var morale=document.querySelector('#morale')
var membres=document.querySelector('#crew')
var start=document.querySelector('#start')
var move=document.querySelector('#movement');
var resolve=document.querySelector('#resolve')
var total=document.querySelector('#total')
var water=document.querySelector('#water')
var ration=document.querySelector('#rations')
var moral=document.querySelector('#morale')
var authority=document.querySelector('#authority')
var assign=document.querySelector("#assignate")
var deb=document.querySelector("#debens")
var autor=document.querySelector("auth")
var audioElement = document.getElementById('background-audio')


var y=2;
var x=2;
var init=0
var tracker=37;
var disting=0
var debensRes =1000
var waterRes = 50
var crewRes = 20
var moralRes = 50
var authorityRes = 10
var rationRes = 80
var papyruRes = 10
var famineRes = 0
var moraleYield=4
var distwat=0
var distfood=0
var weaponsRes=5
var camelsRes=5 
var horsesRes=5
var currentCity = '';

var tiles=['TileD','TileNS','TileD','TileD'];

var tabElem=[
    ['elem1', 'elem2', 'elem3', 'elem4', 'elem5', 'elem6'],
    ['elem7', 'elem8', 'elem9', 'elem10', 'elem11', 'elem12'],
    ['elem13', 'elem14', 'elem15', 'elem16', 'elem17', 'elem18'],
    ['elem19', 'elem20', 'elem21', 'elem22', 'elem23', 'elem24'],
    ['elem25', 'elem26', 'elem27', 'elem28', 'elem29', 'elem30'], 
    ['elem31', 'elem32', 'elem33', 'elem34', 'elem35', 'elem36']
];
var tabView = [
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'visible', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
    ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
]; // if the case of the map should be shown or not

var tabTiles=[
    ['TileD', 'TileNS', 'TileNS', 'TileD', 'TileD','TileD'],
    ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileNS', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
    ['TileNS', 'TileD', 'TileNS', 'TileNS', 'TileNS','TileNS'],
    ['TileNS', 'TileD', 'TileNS', 'TileD', 'TileNS','TileD']
]

var Bag = {
    'debens':['debens',debensRes, 'money'], 
    'water':['water',waterRes,'goutte'], 
    'rations':['rations',rationRes,'food'],
    'papyrus':['papyrus',papyruRes,'papyrus'],
    'horses' :['horses',horsesRes,'horse'],
    'camels' :['camels',camelsRes,'camel'],
    'weapons' :['weapons',weaponsRes,'weapon']
}

var Nil= { 
    type: 'nil_shore', 
    data: {waterYield: 3, foodYield: 2}, 
    }

var village = {type: 'village', data: {waterYield: 2, foodYield: 0, moraleYield:
        moraleYield, buy: [], sell: [{type: 'rations', volume: 100, price: 4}, {type: 'horses',
        volume: 3, price: 500}]}};

var Fcity = {type: 'fluvial_city', data: {waterYield: 3, foodYield: 0, moraleYield:
    moraleYield, buy: [{type: 'weapons', volume: 20, price: 100}], sell: [{type:
    'papyrus', volume: 50, price: 20}, {type: 'rations', volume: 100, price: 6},
    {type: 'weapons', volume: 20, price: 200}]}};

var desert = {type: 'desert', data: {waterYield: 0, foodYield: 0}}

var oasis = {type: 'oasis', data: {waterYield: 3, foodYield: 3}}

var Dcity = {type: 'desert_city', data: {waterYield: 1, foodYield: 0, moraleYield:
    moraleYield, buy: [{type: 'papyrus', volume: 50, price: 40}], sell: [{type:
    'rations', volume: 100, price: 8}, {type: 'camels', volume: 2, price:
    1000}]}};

var audiotest= new Audio('déplacement/help.mp3')