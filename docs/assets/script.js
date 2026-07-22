let form = document.querySelector('form');
let input = document.querySelector('#nome');
let botao = document.querySelector('#botao');

function sendMessage(text) {
    let textSanitized = text.trim()
    if (textSanitized.length > 0) {
        console.log(textSanitized);
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('Campo: ', input.value)
})

