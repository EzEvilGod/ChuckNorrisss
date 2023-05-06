const jokeTxt = document.querySelector("#joxe-text")
const categorySelect = document.querySelector("#category-select")
const jokeBtn = document.querySelector("#joke-button")

jokeBtn.addEventListener('click', function(e){
    e.preventDefault()
    loadJoke()
})

function loadCategories(){
    let categories = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
    //let category = categorySelect.value

    categories.forEach(category => {
        const opt = document.createElement("option")
        opt.value = category
        opt.innerHTML = category
        categorySelect.appendChild(opt)
    })

}

function loadJoke(){
    
    let url = 'https://api.chucknorris.io/jokes/random'
    let category = categorySelect.value
   // let urlCategories = url += `?category=${categorySelect.value}`

    if(category === "Casuale"){
        fetch("https://api.chucknorris.io/jokes/random")
            .then(ThenCallActive)
            .then(FinalCallBack)
            .catch(CatchCallActive)
    } else {
        fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(ThenCallActive)
            .then(FinalCallBack)
            .catch(CatchCallActive)
    }
}

function ThenCallActive(response){
    if(response.status === 200){
        return response.json()
    }
}

function FinalCallBack(data){
    document.querySelector(".ChuckNorrisPhraseContent").innerHTML = data.value
    const urlV = document.querySelector(".ChuckNorrisUrlsContent").innerHTML = data.url

    document.querySelector("#ChuckNorrisLink").addEventListener('click', function(){
        window.location.href = urlV
    })
}

function CatchCallActive(){
    document.querySelector(".ChuckNorrisPhraseContent").innerHTML = "nessuna battuta"
}



document.querySelector(".ChuckNorrisButtonCopied").addEventListener("click", function(e) {
    let CopyArea = document.querySelector(".ChuckNorrisPhraseContent");

    let range = document.createRange();
    range.selectNode(CopyArea);

    navigator.clipboard.writeText(CopyArea.textContent);
    let CopyAler = document.execCommand('copy');
    alert('testo copiato: '+ CopyArea.textContent);
    return CopyAler;
})


loadCategories()
