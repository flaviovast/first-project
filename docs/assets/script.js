let botao =document.querySelector('button')
let aviso = document.querySelector('.aviso')
async function searchUser(username) {
  botao.innerText = 'Carregando...'
  botao.setAttribute('disabled','disabled')
  aviso.innerText = ''
  aviso.style.display = 'none'
  try {
  let response= await fetch(`https://api.github.com/users/${username}`)
  if (response.status === 200) {
   let data = await response.json()
   if (data.name) {
        document.querySelector('#name').innerText = data.name
        document.querySelector('#imagem').setAttribute('src', data.avatar_url)
        document.querySelector('#imagem').setAttribute('alt', data.name)
    console.log('funciona')
    }
  }else if (response.status === 404) {
    aviso.innerText = 'Usuario nao encontrado vagabunda'
    aviso.style.display = 'inline-block'
  } else {
    throw new Error()

  }
}catch (error) {
    aviso.innerText = 'tente novamoente mais tarde'
    aviso.style.display = 'block'
  
  }
botao.removeAttribute('disabled')
    botao.innerText = 'me clique'
  }


botao.addEventListener ('click', () => {
    searchUser('bonsieky')
  })  