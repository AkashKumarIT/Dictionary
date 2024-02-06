const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getwordinfo(form.elements[0].value);

})

const getwordinfo = async (word)=>{
    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json();
    console.log(data);

    resultDiv.innerHTML = `
    <h3 class="head"><strong>Word:-</strong> ${data[0].word}</h3>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Phonetics:- </strong>${data[0].phonetics[0].text}</p>
    <p><strong>Meaning:-</strong> ${data[0].meanings[0].definitions[0].definition===undefined? "Not Found":data[0].meanings[0].definitions[0].definition}</p>
    <p><strong>Example:-</strong> ${data[0].meanings[0].definitions[0].example===undefined? "Not found":data[0].meanings[0].definitions[0].example}</p>
    <p><strong>Antonyms:-</strong></p>
    `;
    
    let n = data[0].meanings[0].definitions[0].antonyms.length;
    if(n===0){
        resultDiv.innerHTML += `<p>Not Found</p>`;
    }
    else{
    for(let i = 0; i<n;i++){
        resultDiv.innerHTML += `<li>${data[0].meanings[0].definitions[0].antonyms[i]}</li>`;
    }
    }

    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
        
    } catch (error) 
    {
        resultDiv.innerHTML = `<p>The word could not be found, Try something else.</p>`;
    }
}