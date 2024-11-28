// File to define selling items

function sell() { 
    central.innerHTML = "<button id='Vente' onclick='buy()'> Acheter </button> <button id='return' onclick='resetMove()'>Retour</button>";
    if (tabTiles[y][x] === 'TileFC') {
        currentCity = Fcity;
    } else if (tabTiles[y][x] === 'TileDC') {
        currentCity = Dcity;
    } else if (tabTiles[y][x] === 'TileC') {
        currentCity = village;
    }
    for (let i = 0; i < currentCity.data.buy.length; i++) {
        let itemType = currentCity.data.buy[i]["type"];
        central.innerHTML += `
            <div id='Case'>
                <div class='product' id='produit${i}'></div>
                <div id='price'>
                    ${currentCity.data.buy[i]["price"]}
                    <div id='desc${i}' class='nom'>${itemType}</div>
                    <div id='max${i}' class='volume'>${currentCity.data.buy[i]["volume"]}</div>
                    <div id='cout${i}' class='prix'></div>
                </div>
                <button id='acheter${i}' class='buy' onclick='quan(${i}, "${itemType}")'>Vendre</button>
            </div>`;
        let curr=document.querySelector("#produit"+i)
        curr.style.backgroundImage="url(déplacement/"+Bag[currentCity.data.buy[i].type][2]+".png)"
        curr.style.backgroundSize="contain"
    }
    afficheRessources()
}

function quan(index, itemType) {
    let maxVolume = Math.min(currentCity.data.buy[index]["volume"], Bag[itemType][1]);
    let pricePerUnit = currentCity.data.buy[index]["price"];
    
    central.innerHTML = `
        <div id='money'>
            <img src='déplacement/money.png' alt='Money'>
            <span id='currentMoney'>${debensRes}</span>
        </div>
        <div id='quantity'>
            <p>Quantité:</p>
            <input type='number' id='quantityInput' min='0' max='${maxVolume}' value='0'>
        </div>
        <button id='confirmButton' onclick='confirmSale(${index}, "${itemType}")'>Confirmer</button>
    `;

    // Add an event listener to update estimated earnings
    document.getElementById('quantityInput').addEventListener('input', function() {
        let quantity = parseInt(this.value, 10) || 0;
        let totalEarnings = Math.floor(quantity * pricePerUnit*0.95);
        let newMoney = debensRes + totalEarnings;
        document.getElementById('currentMoney').innerText = newMoney;
    });
}

function confirmSale(index, itemType) {
    let quantity = parseInt(document.getElementById('quantityInput').value, 10);
    let pricePerUnit = currentCity.data.buy[index]["price"];
    let totalValue = (quantity * pricePerUnit *0.95);
    debensRes += totalValue;

    // Update available volume in currentCity
    currentCity.data.buy[index]["volume"] -= quantity;

    // Update the bag if necessary
    Bag[itemType][1] -= quantity;

    // Update the quantity sold display
    let soldQuantityElement = document.getElementById('max' + index);
    if (soldQuantityElement) {
        soldQuantityElement.innerText = currentCity.data.buy[index]["volume"];
    }

    // Update money display
    let moneyElement = document.querySelector('#currentMoney');
    if (moneyElement) {
        moneyElement.innerText = debensRes;
    }

    // Return to sales screen
    sell();
    afficheRessources()
}
