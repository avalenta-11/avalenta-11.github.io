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
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Our Funky HTML Page</title>
            <meta name="description" content="Our first page">
            <meta name="keywords" content="html tutorial template">
            <style>
                body {
                    background: #0EE2CA;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                .text {
                    text-align: center;
                    padding: 20px;
                    font-size: 1.5em;
                }

                .buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .buttons input {
                    padding: 10px 20px;
                    font-size: 1em;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: #005f73;
                    color: white;
                }

                .buttons input:hover {
                    background-color: #008000;
                }

                .cards {
                    margin: 0 auto;
                    font-size: 2em;
                    background: #FFF;
                    max-width: 90%;
                    width: 50%;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-bottom: 20px;
                }

                @media (max-width: 600px) {
                    .text {
                        font-size: 1.2em;
                    }

                    .cards {
                        font-size: 1em;
                        width: 90%;
                        padding: 15px;
                    }

                    .buttons input {
                        font-size: 0.9em;
                        padding: 8px 16px;
                    }
                }
            </style>
        </head>

        <body>

            <div class="text">
                <p><strong>Dictation</strong></p>
                <p>Translate from Russian into English.</p>
            </div>

            <div class="buttons">
                <input type="button" id="next" value="Next" onClick="nextCard()">
                <input type="button" id="delete" value="Delete" onClick="deleteCard()">
            </div>

            <div class="cards">
                <p id="cards"></p>
            </div>

            <div class="buttons">
                <input type="button" onclick="history.back()" value="Go Back">
            </div>

            <script>
                // JavaScript code remains the same
                const firstWords = [${words_rus}];
                const secondWords = [${words_eng}];
                let currentIndex = 0;
                let toggle = 0;

                function shuffleArray(array1, array2) {
                    for (let i = array1.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array1[i], array1[j]] = [array1[j], array1[i]];
                        [array2[i], array2[j]] = [array2[j], array2[i]];
                    }
                }

                shuffleArray(firstWords, secondWords);

                function nextCard() {
                    const cardElement = document.getElementById("cards");
                    if (firstWords.length === 0) {
                        cardElement.textContent = "No pairs left!";
                        return;
                    }

                    if (toggle === 0) {
                        cardElement.textContent = firstWords[currentIndex];
                    } else {
                        cardElement.textContent = firstWords[currentIndex] + " - " + secondWords[currentIndex];
                        currentIndex = (currentIndex + 1) % firstWords.length;
                    }
                    toggle = 1 - toggle;
                }

                function deleteCard() {
                    if (firstWords.length === 0) {
                        alert("No more pairs to delete!");
                        return;
                    }

                    firstWords.splice(currentIndex, 1);
                    secondWords.splice(currentIndex, 1);

                    if (currentIndex >= firstWords.length) {
                        currentIndex = 0;
                    }

                    const cardElement = document.getElementById("cards");
                    cardElement.textContent = firstWords.length === 0 ? "No pairs left!" : "";
                    toggle = 0;
                }
            </script>

        </body>

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
