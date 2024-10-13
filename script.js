// Define the animals array with their names and image file paths
const animals = [
{ name: 'Car', image: 'car.jpg' },
{ name: 'Bus', image: 'bus.jpg' },
{ name: 'Bicycle', image: 'bicycle.jpg' },
{ name: 'Motorcycle', image: 'motorcycle.jpg' },
{ name: 'Train', image: 'train.jpg' },
{ name: 'Airplane', image: 'airplane.jpg' },
{ name: 'Taxi', image: 'taxi.jpg' },
{ name: 'Ship', image: 'ship.jpg' },
{ name: 'Tram', image: 'tram.jpg' },
{ name: 'Ferry', image: 'ferry.jpg' },
{ name: 'Helicopter', image: 'helicopter.jpg' },
{ name: 'Scooter', image: 'scooter.jpg' },
{ name: 'Cargo Ship', image: 'cargo-ship.jpg' },
{ name: 'Hoverboard', image: 'hoverboard.jpg' },
{ name: 'U.F.O', image: 'ufo.jpg' },
{ name: 'Hot Air Balloon', image: 'hot-air-balloon.jpg' },
{ name: 'Carriage', image: 'carriage.jpg' },
{ name: 'Snowmobile', image: 'snowmobile.jpg' },
{ name: 'Spacecraft', image: 'spacecraft.jpg' },
{ name: 'Tuk Tuk', image: 'tuk-tuk.jpg' },
{ name: 'Van', image: 'van.jpg' },
{ name: 'Ambulance', image: 'ambulance.jpg' },
{ name: 'Truck', image: 'truck.jpg' }
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
    if (clickCount < 3) {  // Allow speaking the name only if clicked less than 3 times
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
    } else {
        document.getElementById('gameMessage').textContent = 'Try again!';
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
        document.getElementById('gameMessage').textContent = 'Try again!';
    }
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

// Start the game once the window loads
window.onload = startGame;
