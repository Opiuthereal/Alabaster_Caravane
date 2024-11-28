// Use when we are in the buying menue


// function to update what to show in the page
function buy() {
    central.innerHTML = `
        <button id='Vente' onclick='sell()'>Vendre</button> 
        <button id='return' onclick='resetMove()'>Retour</button>
    `;
    let city = "";
    if (tabTiles[y][x] === 'TileFC') {
        city = Fcity;
    } else if (tabTiles[y][x] === 'TileDC') {
        city = Dcity;
    } else if (tabTiles[y][x] === 'TileC') {
        city = village;
    }

    for (let i = 0; i < city.data.sell.length; i++) {
        central.innerHTML += `   
        <div id='Case'>
                <div class='product' id='produit${i}'></div>
                <div id='price'>
                    ${city.data.sell[i].price}
                    <div id='desc${i}' class='nom'>${city.data.sell[i].type}</div>
                    <div id='max${i}' class='volume'>${city.data.sell[i].volume}</div>
                    <div id='cout${i}' class='prix'></div>
                </div>
                <button id='acheter${i}' class='buy' onclick='quantite(${i})'>Acheter</button>
            </div>
        `;
        let curr=document.querySelector("#produit"+i)
        curr.style.backgroundImage="url(déplacement/"+Bag[city.data.sell[i].type][2]+".png)"
        curr.style.backgroundSize="contain"
    }
    afficheRessources()
}

// Function that handle the quantity we want to buy
function quantite(index) {
    let city = "";
    if (tabTiles[y][x] === 'TileFC') {
        city = Fcity;
    } else if (tabTiles[y][x] === 'TileDC') {
        city = Dcity;
    } else if (tabTiles[y][x] === 'TileC') {
        city = village;
    }

    const item = city.data.sell[index];
    
    // Determine the maximum number of object the player can afford
    const maxAffordable = Math.min(Math.floor(debensRes / item.price), item.volume);
    
    central.innerHTML = `
        <button id='return' onclick='buy()'>Retour</button>
        <div>
            <img src='déplacement/money.png' alt='Money'>
            <p id='currentDebens'>${debensRes}</p>
        </div>
        <div id='quantity'>
            <label for='quantityInput'>Quantité pour ${item.type}:</label>
            <input type='number' id='quantityInput' name='quantityInput' min='0' max='${maxAffordable}' value='0' oninput='updateCost(${item.price})'>
            <button onclick='acheter(${index})'>Confirmer</button>
        </div>
    `;
    afficheRessources()
}


// function to update the total cost of what the player is buying and verify he don't buy too much compared to what he can afford
function updateCost(price) {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const totalCost = quantity * price;
    document.getElementById('currentDebens').textContent = debensRes - totalCost;
}

// Function to buy a object and update the number in the bag
function acheter(index) {
    let city = "";
    if (tabTiles[y][x] === 'TileFC') {
        city = Fcity;
    } else if (tabTiles[y][x] === 'TileDC') {
        city = Dcity;
    } else if (tabTiles[y][x] === 'TileC') {
        city = village;
    }

    const item = city.data.sell[index];
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const totalCost = quantity * item.price;

    if (quantity > 0 && quantity <= item.volume && totalCost <= debensRes) {

        item.volume -= quantity;
        debensRes -= totalCost;

        updateBag(item.type, quantity);
        
        // update what's should be shown on the screen
        buy();
    }
}

// Function to update the items in the bag
function updateBag(itemType, quantity) {

    // Verify if debens are in the bag
    if (!Bag.hasOwnProperty('debens')) {
        // If debens aren't found in the bag, initialise it with the actual amount the player have
        Bag.debens = ['debens', debensRes];
    }

    //Update number of debens and quantity of items in the bag
    Bag[itemType][1] += quantity;
    Bag.debens[1] = debensRes;

}