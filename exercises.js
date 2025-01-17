let words_rus = [];
let words_eng = [];
let result = "";

function addWords() {
    // Add words to the arrays
    const rusInput = document.getElementById("rus").value;
    const engInput = document.getElementById("eng").value;

    // Only add if inputs are not empty
    if (rusInput && engInput) {
        words_rus.push(rusInput);
        words_eng.push(engInput);
    }

    // Reset and rebuild the result
    result = "";
    for (let i = 0; i < words_rus.length; i++) {
        result += `${words_rus[i]} - ${words_eng[i]}<br>`;
    }

    // Update the result on the page
    document.getElementById("result").innerHTML = result;

    // Clear input fields
    document.getElementById("rus").value = "";
    document.getElementById("eng").value = "";
}

function deleteLastWord() {
    // Remove the last words from both arrays
    if (words_rus.length > 0) {
        words_rus.pop();
        words_eng.pop();
    }

    // Reset and rebuild the result
    result = "";
    for (let i = 0; i < words_rus.length; i++) {
        result += `${words_rus[i]} - ${words_eng[i]}<br>`;
    }

    // Update the result on the page
    document.getElementById("result").innerHTML = result;
}

function generateHTML() {

    for (let x = 0; x < words_rus.length; x++) {
        words_rus[x] = `"` + words_rus[x] + `"`;
    }

    for (let y = 0; y < words_eng.length; y++) {
        words_eng[y] = `"` + words_eng[y] + `"`;
    }


    //${words_rus}
    const html = `
    <!doctype html>
<html>

    <head>
        <title>Our Funky HTML Page</title>
        
        <meta name="description" content="Our first page">
        <meta name="keywords" content="html tutorial template">
        <style>
            div {
                width: 50%; /* Adjust width as needed */
                margin: auto;
                text-align: center;
            }
            .result {
                margin: 20px auto;
            }
        </style>
    </head>

    <body>

        <div>

            <input type="button" id="submit" value="Next" onClick="nextCard()">
            <input type="button" id="submit" value="Delete" onClick="deleteCard()">

        </div>

        <div class="cards" id="cards"></div>

    </body>

    <script>
                // JavaScript code

        // Separate arrays for the first and second words/phrases
        const firstWords = [${words_rus}];
        const secondWords = [${words_eng}];

        // Variables to track current pair and toggle state
        let currentIndex = 0;
        let toggle = 0; // 0 for the first word/phrase, 1 for both words/phrases

        function shuffleArray(array1, array2) {
            for (let i = array1.length - 1; i > 0; i--) {
                // Generate a random index between 0 and i
                const j = Math.floor(Math.random() * (i + 1));
                // Swap elements at indices i and j
                [array1[i], array1[j]] = [array1[j], array1[i]];
                [array2[i], array2[j]] = [array2[j], array2[i]];
            }
            return array1, array2;
        }

        shuffleArray(firstWords, secondWords);

        // Function to display the next card
        function nextCard() {

            // Get the element to display the text
            const cardElement = document.getElementById("cards");

            if (firstWords.length === 0) {
                cardElement.textContent = "No pairs left!";
            }
            else {
                // Display the current word/phrase based on toggle state
                if (toggle === 0) {
                    cardElement.textContent = firstWords[currentIndex]; // Show first word/phrase
                } else {
                    cardElement.textContent = firstWords[currentIndex] + " - " + secondWords[currentIndex]; // Show both words/phrases
            }

            // Toggle between 0 and 1
            toggle = 1 - toggle;

            // If we just finished showing both words/phrases, move to the next pair
            if (toggle === 0) {
                currentIndex = (currentIndex + 1) % firstWords.length; // Loop back to the first pair when done
            }
            }

        }

        // Function to delete the current pair
        function deleteCard() {
            if (firstWords.length === 0) {
                alert("No more pairs to delete!");
                return;
            }

            if (toggle === 0) {
                // Remove the current pair from both arrays
                firstWords.splice((currentIndex-1), 1);
                secondWords.splice((currentIndex-1), 1);
            }
            else {
                // Remove the current pair from both arrays
                firstWords.splice(currentIndex, 1);
                secondWords.splice(currentIndex, 1);
            }

            

            // Adjust the index to stay at the current valid position
            if (currentIndex >= firstWords.length && firstWords.length > 0) {
                currentIndex = 0; // Reset to the first pair if we delete the last pair
            }

            // Clear the displayed text
            const cardElement = document.getElementById("cards");
            cardElement.textContent = "";

            // Reset the toggle state
            toggle = 0;

            // Notify the user if all pairs are deleted
            if (firstWords.length === 0) {
                cardElement.textContent = "No pairs left!";
            }
        }

    </script>

</html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: "text/html" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated.html";

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);

    words_rus = [];
    words_eng = [];
    result = "";
    document.getElementById("result").innerHTML = result;
}
