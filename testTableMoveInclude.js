//File where the map is created and managed

function Display() {
    if (init=== 0){
        central.innerHTML='';
        init++
        for (let i = 0; i < tabElem.length; i++) {
            audioElement.play()
            // Create a container for each row
            let container = document.createElement('div');
            container.id = 'medium' + i;
    
            central.appendChild(container);
            format(container, 'father', '', '');
    
            for (let j = 0; j < tabElem[i].length; j++) {
                let div = document.createElement('div');
                div.id = tabElem[i][j];
                container.appendChild(div);
                format(div, 'tile', i, j);
            }
        }
        let classPos='#'+tabElem[y][x];
        let pos=document.querySelector(classPos);
        createController(pos);
        central.scrollTo(((x-2)*200)+100 , (y-2)*100)
    }
    else if (init === 1){
        central.innerHTML='';
        let overall=document.querySelector('#overall').cloneNode(true)

        for (let i = 0; i < tabElem.length; i++) {
            // Create a container for each row
            let container = document.createElement('div');
            container.id = 'medium' + i;
    
            central.appendChild(container);
            format(container, 'father', '', '');
    
            for (let j = 0; j < tabElem[i].length; j++) {
                let div = document.createElement('div');
                div.id = tabElem[i][j];
                container.appendChild(div);
                format(div, 'tile', i, j);
            }
        }
        let classPos='#'+tabElem[y][x];
        let pos=document.querySelector(classPos);
        pos.appendChild(overall)
        assertSpecial()
        eventListenerController()
        central.scrollTo(((x-2)*200)+100 , (y-2)*100)
        }
    else {
        buy()
    }

    afficheRessources()
}


function format(selected, type,k,l){ //transform the css of a given type
    if (type==='father'){
        let width=tabElem[0].length*200
        selected.style.height='100px';
        selected.style.width=''+width+'px';
        selected.style.display='flex';
        selected.style.justifyContent='space-between';
    }

    if (type==='tile'){
        selected.style.height='100%';
        selected.style.width='200px';
        selected.style.visibility=tabView[k][l];
        let bg="url(déplacement/"+tabTiles[k][l]+".png)"
        selected.style.backgroundImage = bg
    }  
}

function createController(selected) {
    
    selected.innerHTML='';
    selected.style.visibility='visible';
    let count=1;
        
    let overall=document.createElement('div')
    overall.id='overall'
    selected.appendChild(overall)
    overall.style.backgroundColor='transparent'
    overall.style.height='100%'
    overall.style.width='100%'
        

    for (let i = 0; i < 3; i++) {
        let container = document.createElement('div');
        container.id = 'min' + i;
        overall.appendChild(container);
        container.style.width='100%';
        container.style.height='33%';
        container.style.backgroundColor='transparent';
        container.display='flex';
    }
    for (let j = 0; j < 3; j++){
        let chose='#min'+j;
        let chosen=document.querySelector(chose);
        chosen.style.display='flex';
        if (j%2===0){ 
            chosen.style.justifyContent='center';
        }
        else{
            chosen.style.justifyContent='space-between';
        }
        if (j%2===0){
            let button=document.createElement('button');
            button.id='currButt'+count;
            chosen.appendChild(button)
            button.style.height='100%';
            count++;
            disting=disting+1
            if (disting===1){
                button.addEventListener('click', function(){
                    y=y-1
                    MoveCurrent()
                }) 
            }
            else {
                button.addEventListener('click', function(){
                    y=y+1
                    MoveCurrent()
                })
            }
        }
        else{
            let butt1=document.createElement('button');
            let butt2=document.createElement('button');
            let butt3=document.createElement('button');

            butt1.id='currButt'+count;
            count++
            butt2.id='currButt'+count;
            count++
            butt3.id='currButt'+count;
            count++

            chosen.appendChild(butt1);
            chosen.appendChild(butt2);
            chosen.appendChild(butt3);


            butt1.style.height='100%';
            butt2.style.height='100%';
            butt2.style.visibility='hidden';
            butt3.style.height='100%';

            butt3.addEventListener('click', function(){ 
                x=x+1
                MoveCurrent()
            })
            butt1.addEventListener('click', function(){ 
                x=x-1
                MoveCurrent()
            })
        }
    }
    saveOverall()  
}

function saveOverall(){
    let overall=document.querySelector('#overall').cloneNode(true)
    let save=document.createElement('div')
    save.id = 'save';
    save.style.visibility='hidden'
    total.appendChild(save)
    save.appendChild(overall)
}

function MoveCurrent(){
    if (y===1){
        let eTab=[]
        let vTab=[]
        let ccount=tabElem[0]
        let tTab = new Array(ccount.length).fill(null);
        for (let i=0;i<ccount.length;i++){
            eTab.push('elem'+tracker)
            vTab.push('hidden')
            tTab[i] = addRightTile('up', i, tTab);
            tracker++
        }
        y++
        tabElem.splice(0,0,eTab)
        tabView.splice(0,0,vTab)
        tabTiles.splice(0,0,tTab)
    }

    else if (y===tabElem.length-2){
        let eTab=[]
        let vTab=[]
        let ccount=tabElem[0]
        let tTab = new Array(ccount.length).fill(null);
        for (let i=0;i<ccount.length;i++){
            eTab.push('elem'+tracker)
            vTab.push('hidden')
            tTab[i] = addRightTile('up', i, tTab);
            tracker++
        }
        tabElem.push(eTab)
        tabView.push(vTab)
        tabTiles.push(tTab)
    }

    else if (x===tabElem[0].length-2){
        let tTab = new Array(tabElem.length).fill(null);
        for (let i=0;i<tabElem.length;i++){
            tabElem[i].push('elem'+tracker)
            tabView[i].push('hidden')
            let nTile=addRightTile('left',i,tTab)
            tTab[i]=nTile
            tabTiles[i].push(nTile)
            tracker++
        }

    }
    if (tabView[y][x]==='hidden'){
        chanceSpecial()
    } 
    tabView[y][x]='visible'
    Display()
    addRessources()
    moveRessources()
}

function chanceSpecial() {
    let chance=Math.random()*100
    if (tabTiles[y][x]==='TileNS') {
        if (chance<33){
            tabTiles[y][x]='TileFC'
        }
        else if (chance<50){
            tabTiles[y][x]='TileC'
        }
    }
    else {
        if (chance<16.5){
            tabTiles[y][x]='TileDC'
        }
        else if (chance<29) {
            tabTiles[y][x]='TileO'
        }
        else if (chance<50){
            tabTiles[y][x]='TileC'
        }
    }
    
}

function assertSpecial(){
    if (['TileC','TileDC','TileFC','TileO'].includes(tabTiles[y][x])){
        let butt3=document.querySelector('#currButt3')
        butt3.style.visibility='visible'
        addEventVille()
    }
}

function addRightTile(addLine,j,tTab){
    let corner=0
    if (addLine==='up' || addLine==='down'){
        if (addLine==='down'){
            corner = tabTiles[0].length()-1
        }
        if (j===0){
            if (tabTiles[corner][j]==='TileNS' && tabTiles[corner][j+1]==='TileD'){
                return 'TileNS'
            }
            else if (tabTiles[corner][j+1]==='TileNS') {
                return tiles[Math.floor(Math.random()*4)]
            }
            else{
                return 'TileD'
            }
        }
        else if (j===tabTiles[0].length-1){
            
            if (tTab[j-1]==='TileNS' && tabTiles[corner][j-1]==='TileNS') {
                return tiles[Math.floor(Math.random()*4)]
            }

            else if (tTab[j-1]==='TileD'){
                if (tabTiles[corner][j]==='TileNS'){
                    return 'TileNS'
                }
                else {
                    return 'TileD'
                }
            }
            else if (tTab[j-1]==='TileNS'){
                return 'TileNS'
            }
            else {
                return 'TileD'
            }
        }
        else if (tabTiles[corner][j]==='TileD'){
            if (tTab[j-1]==='TileNS' || tabTiles[y][j+1]==='TileNS'){
                return tiles[Math.floor(Math.random()*4)]
            }
            else {
                return 'TileD'
            }
        }
        else {
            if (tTab[j-1]==='TileNS') {
                if (tabTiles[corner][j-1]==='TileNS' ) {
                    return tiles[Math.floor(Math.random()*4)]
                }

                else {
                    return 'TileNS'
                }
            }
            else if (tabTiles[corner][j+1]==='TileNS'){
                return tiles[Math.floor(Math.random()*4)]
            }
            else {
                return 'TileNS'
            }
        }
        
    }
    else {
        if (addLine==='right'){
            corner = tabTiles.length()-1
        }
        if (j===0){
            if (tabTiles[j][corner]==='TileNS' && tabTiles[j+1][corner]==='TileD'){
                return 'TileNS'
            }
            else if (tabTiles[j+1][corner]==='TileNS') {
                return tiles[Math.floor(Math.random()*4)]
            }
            else{
                return 'TileD'
            }
        }
        else if (j===tabTiles.length-1){
            
            if (tTab[j-1]==='TileNS' && tabTiles[j-1][corner]==='TileNS') {
                return tiles[Math.floor(Math.random()*4)]
            }

            else if (tTab[j-1]==='TileD'){
                if (tabTiles[j][corner]==='TileNS'){
                    return 'TileNS'
                }
                else {
                    return 'TileD'
                }
            }
            else if (tTab[j-1]==='TileNS'){
                return 'TileNS'
            }
            else {
                return 'TileD'
            }
        }
        else if (tabTiles[j][corner]==='TileD'){
            if (tTab[j-1]==='TileNS' || tabTiles[j+1][x]==='TileNS'){
                return tiles[Math.floor(Math.random()*4)]
            }
            else {
                return 'TileD'
            }
        }
        else {
            if (tTab[j-1]==='TileNS'){
                if (tabTiles[j-1][corner]==='TileNS' ) {
                    return tiles[Math.floor(Math.random()*4)]
                }

                else {
                    return 'TileNS'
                }
            }
            else if (tabTiles[j+1][corner]==='TileNS'){
                return tiles[Math.floor(Math.random()*4)]
            }
            else {
                return 'TileNS'
            }
        }
        
    }
}

function resetMove(){
    if (tabTiles[y][x]==='TileFC'){
        Fcity = {type: 'fluvial_city', data: {waterYield: 3, moraleYield:
            moraleYield, buy: [{type: 'weapons', volume: 20, price: 100}], sell: [{type:
            'papyrus', volume: 50, price: 20}, {type: 'rations', volume: 100, price: 6},
            {type: 'weapons', volume: 20, price: 200}]}};
    }
    
    else if (tabTiles[y][x]==='TileDC'){
        Dcity = {type: 'desert_city', data: {waterYield: 1, moraleYield:
            moraleYield, buy: [{type: 'papyrus', volume: 50, price: 40}], sell: [{type:
            'rations', volume: 100, price: 8}, {type: 'camels', volume: 2, price:
            1000}]}};
    }

    else if (tabTiles[y][x]='TileC'){
        village = {type: 'village', data: {waterYield: 2, moraleYield:
            moraleYield, buy: [], sell: [{type: 'rations', volume: 100, price: 4}, {type: 'horses',
            volume: 3, price: 500}]}};
    }

    else if (tabTiles[y][x]='TileO'){
        oasis = {type: 'oasis', data: {waterYield: 3, foodYield: 3}}
    }


    x=2
    y=2
    tracker=37
    init=1
    tabElem=[
        ['elem1', 'elem2', 'elem3', 'elem4', 'elem5', 'elem6'],
        ['elem7', 'elem8', 'elem9', 'elem10', 'elem11', 'elem12'],
        ['elem13', 'elem14', 'elem15', 'elem16', 'elem17', 'elem18'],
        ['elem19', 'elem20', 'elem21', 'elem22', 'elem23', 'elem24'],
        ['elem25', 'elem26', 'elem27', 'elem28', 'elem29', 'elem30'], 
        ['elem31', 'elem32', 'elem33', 'elem34', 'elem35', 'elem36']
    ];
    tabTiles=[
        ['TileD', 'TileNS', 'TileNS', 'TileD', 'TileD','TileD'],
        ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
        ['TileD', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
        ['TileNS', 'TileNS', 'TileNS', 'TileNS', 'TileD','TileD'],
        ['TileNS', 'TileD', 'TileNS', 'TileNS', 'TileNS','TileNS'],
        ['TileNS', 'TileD', 'TileNS', 'TileD', 'TileNS','TileD']
    ];
    tabView=[
        ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
        ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
        ['hidden', 'hidden', 'visible', 'hidden', 'hidden', 'hidden'],
        ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
        ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
        ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
    ];
    Display()
}