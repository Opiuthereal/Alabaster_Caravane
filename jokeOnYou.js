// here is what will be show on the start screen 

var audio=new Audio("déplacement/Jojo.mp3")

function accueil() {
    document.body.innerHTML = '';

    let container = document.createElement('div');
    container.className = 'container';

    let imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    let abdulImage = document.createElement('img');
    abdulImage.src = 'déplacement/abdul.png';
    abdulImage.alt = 'Abdul';

    let centeredText = document.createElement('p');
    centeredText.className = 'centered-text';
    centeredText.textContent = "La caravane d'Albâtre";

    let startButton = document.createElement('button');
    startButton.textContent = "Start";
    startButton.id="button2"
    startButton.onclick = function() {
        window.location.href = 'index.html';
    };

    imageContainer.appendChild(abdulImage);
    container.appendChild(imageContainer);
    container.appendChild(centeredText);
    container.appendChild(startButton);

    document.body.appendChild(container);
    audio.play()
    }
