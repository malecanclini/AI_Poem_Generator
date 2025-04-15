function displayPoem(response) {
  let poemElement = document.querySelector("#poem");
  poemElement.innerHTML = "";
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

let apiKey = "4c2d34edtb05a9b0ao32170dd17e08f4";
let apiURL =
  "https://api.shecodes.io/ai/v1/generate?prompt={prompt}&context={context}&key={key}";

function generatePoem(event) {
  event.preventDefault();
  let instructionsInput = document.querySelector("#user-instructions");
  let prompt = `User instructions: Generate a French poem about ${instructionsInput.value}`;
  let context =
    "You are a romantic french poem expert and love to write short poems. You mission is to generate a 4 line poem in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem and NOT at the beginning";
  let params = {
    prompt: prompt,
    context: context,
    key: apiKey,
  };

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generando un poema francés sobre ${instructionsInput.value}</div>`;

  axios
    .get(apiURL, { params })
    .then((response) => {
      displayPoem(response);
    })
    .catch((error) => {
      console.error("Error generando el poema:", error);
      poemElement.innerHTML =
        "Error generando el poema. Por favor, inténtalo de nuevo.";
    });
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
