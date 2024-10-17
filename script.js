// Define the animals array with their names and image file paths
const animals = [
{ name: 'Car', image: 'car.jpg' },
{ name: 'Bus', image: 'bus.jpg' },
{ name: 'Bicycle', image: 'bicycle.jpg' },
{ name: 'Motorcycle', image: 'motorcycle.jpg' },
{ name: 'Train', image: 'train.jpg' },
{ name: 'Airplane', image: 'airplane.jpeg' },
{ name: 'Taxi', image: 'taxi.png' },
{ name: 'Ship', image: 'ship.jpg' },
{ name: 'Tram', image: 'tram.jpg' },
{ name: 'Ferry', image: 'ferry.jpg' },
{ name: 'Helicopter', image: 'helicopter.jpg' },
{ name: 'Scooter', image: 'scooter.jpg' },
{ name: 'Cargo Ship', image: 'cargo-ship.jpg' },
{ name: 'Hoverboard', image: 'hoverboard.jpg' },
{ name: 'U.F.O', image: 'ufo.jpg' },
{ name: 'Carriage', image: 'carriage.jpg' },
{ name: 'Snowmobile', image: 'snowmobile.jpg' },
{ name: 'Spacecraft', image: 'spacecraft.jpg' },
{ name: 'Tuk Tuk', image: 'tuk-tuk.jpg' },
{ name: 'Ambulance', image: 'ambulance.jpg' },
{ name: 'Truck', image: 'truck.jpg' },
{ name: 'Bulldozer', image: 'bulldozer.jpeg' },
{ name: 'Car', image: 'car.jpg' },
{ name: 'Cement Mixer Truck', image: 'cement-mixer-truck.png' },
{ name: 'Dump Truck', image: 'dump-truck.jpg' },
{ name: 'Excavator', image: 'excavator.jpeg' },
{ name: 'Forklift', image: 'forklift.jpg' },
{ name: 'Hot Air Balloon', image: 'hot-air-balloon.jpeg' },
{ name: 'Loader', image: 'loader.png' },
{ name: 'Motorcycle', image: 'motorcycle.jpg' },
{ name: 'Road Roller', image: 'road-roller.webp' },
{ name: 'Van', image: 'van.jpeg' },
{ name: 'Mobile Crane Truck', image: 'crane-truck.jpeg' },
{ name: 'Fire Truck', image: 'fire-truck.jpg' },
{ name: 'Garbage Truck', image: 'garbage-truck.jpg' },
{ name: 'Pickup Truck', image: 'pickup-truck.jpg' },
{ name: 'Tanker Truck', image: 'tanker-truck.jpg' },
{ name: 'Tractor', image: 'tractor.jpg' }
];

// Variables for tracking the current level and shuffled order of animals
let currentLevel = 0;
let shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
let clickCount = 0;  // Counter for image clicks

// Function to start the game
function startGame() {
    loadLevel(currentLevel);
    // Add click event listener to animal image for speech
    document.getElementById('animalImage').addEventListener('click', speakAnimalName);
}

// Function to load each level randomly
function loadLevel(levelIndex) {
    const level = shuffledLevels[levelIndex];
    const animal = animals[level];
    const wrongOptions = animals.filter(a => a !== animal);

    document.getElementById('animalImage').src = animal.image;

    const options = shuffleArray([animal.name, ...getRandomOptions(wrongOptions, 3)]);
    options.forEach((option, index) => {
        document.getElementById(`option${index}`).textContent = option;
    });
    // Reset click count for the new level
    clickCount = 0;

    document.getElementById('gameMessage').textContent = '';
}

// Function to make the browser say the animal name when image is clicked
function speakAnimalName() {
    if (clickCount < 2) {  // Allow speaking the name only if clicked less than 3 times
        const animal = animals[shuffledLevels[currentLevel]];
        const utterance = new SpeechSynthesisUtterance(animal.name);
        speechSynthesis.speak(utterance);
        clickCount++;  // Increment click count
    }
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}
// Function to play the sound if correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        // Play the correct answer sound
        document.getElementById('correctSound').play();
        setTimeout(() => {
            nextLevel();
        }, 1000);
    } else {
        // Play the shake animation on the button
        const selectedButton = document.getElementById(`option${selectedIndex}`);
        shakeButton(selectedButton);
    }
}

// Function to shake the button
function shakeButton(button) {
    button.classList.add('shake');

    // Remove the 'shake' class after the animation ends
    setTimeout(() => {
        button.classList.remove('shake');
    }, 500); // Match the animation duration in CSS
}


// Function to move to the next random level
function nextLevel() {
    currentLevel = (currentLevel + 1) % animals.length;
    if (currentLevel === 0) shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
    loadLevel(currentLevel);
}

// Helper function to get random options from the wrong answers
function getRandomOptions(arr, count) {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count).map(item => item.name);
}

// Helper function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
// Select all buttons with the class 'option-button'
const buttons = document.querySelectorAll('.option-button');

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Disable the button
    this.disabled = true;

    // Optionally perform your desired action here, like moving to the next level
    handleButtonClick(this);

    // Re-enable the button after 1 second (1000 milliseconds)
    setTimeout(() => {
      this.disabled = false;
    }, 1400);  // Adjust the timeout period as needed
  });
});

function handleButtonClick(button) {
  // Add your button click handling logic here
  console.log(button.textContent + " clicked!");
}

function changeAnimalImage(animalName) {
    const animalImage = document.getElementById('animalImage');
    animalImage.src = ''; // Clear the image first
    setTimeout(() => {
        animalImage.src = `path/to/your/images/${animalName}.jpg`; // Then load the new image
    }, 10); // Small delay ensures the image is properly reset
}

// Start the game once the window loads
window.onload = startGame;
