// Here we have all the event listener that are used all around the other files
bag.onclick = Inventory
events.onclick = Events
caravane.onclick = Caravane
assign.onclick= assignate

move.addEventListener('click', function() {
    Display();
}); 

function eventListenerController(){
    let buttLeft=document.querySelector('#currButt2')
    let buttRight=document.querySelector('#currButt4')
    let buttUp=document.querySelector('#currButt1')
    let buttDown=document.querySelector('#currButt5')

    buttUp.addEventListener('click', function(){
        y=y-1
        MoveCurrent()
    }) 

    buttDown.addEventListener('click', function(){
        y=y+1
        MoveCurrent()
    })
    
    buttRight.addEventListener('click', function(){ 
        x=x+1
        MoveCurrent()
    })

    buttLeft.addEventListener('click', function(){ 
        if (x!==0){
            if (tabView[y][x]==='hidden'){
                chanceSpecial()
            } 
            addRessources()
            moveRessources()
            x=x-1
            tabView[y][x]='visible'
            Display()
        }
        
    })
}

function addEventVille(){
    let buttMiddle=document.querySelector('#currButt3')
    buttMiddle.addEventListener('click',function(){
        if (['TileC', 'TileDC', 'TileFC'].includes(tabTiles[y][x])) {
            init++
            buy()
        }
        else {
            central.innerHTML=""
        }
    })
}

function eventBag(elemen, key){
    elemen.addEventListener('click', function() {
        (function(capturedKey) {
            DetailObject(capturedKey);
        })(key);
        
    });
}

resolve.addEventListener('click', function() {
    central.innerHTML=""
    audiotest.play()
    for (let i=1; i<8; i++){
                
                let newdiv = document.createElement('div');
                newdiv.style.backgroundImage = "url(déplacement/tuto" + i + ".png)";
                newdiv.style.backgroundSize = "contain";
                newdiv.style.height = '44%';
                newdiv.style.width = '55%'; 
                newdiv.style.marginBottom='10px';
                central.appendChild(newdiv);
    }
});