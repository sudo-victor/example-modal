console.log('TESTE')
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

const exampleFormControlInput1 = document.querySelector('#exampleFormControlInput1')
const exampleFormControlTextarea1 = document.querySelector('#exampleFormControlTextarea1')
const botaoDeEnvio = document.querySelector('#botao-de-envio')

let respostaCorretaAtual = null
let listaQuestoes = []
let respostas = [1,2,3]
let indiceQuestaoAtual = 0

async function postQuestion(question) {
  return fetch('http://localhost:3000/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(question),
  })
}

async function visualizarQuestoes() {
  return fetch('http://localhost:3000/questions')
}

const containerDePerguntas = document.querySelector('#perguntas')

window.addEventListener('DOMContentLoaded', async (e) => {
  const response = await visualizarQuestoes()
  const questions = await response.json()
  const respostaCorretaDaPrimeiraQuestao = questions[0].respostaCorreta
  respostaCorretaAtual = respostaCorretaDaPrimeiraQuestao
  
  questions.forEach((question) => {
    const html = `
      <div>${question.email}<div>
      <div>
        <input type="radio" name="respostaCorreta" value="1" />
        <input type="radio" name="respostaCorreta" value="2" />
        <input type="radio" name="respostaCorreta" value="3" />
      <div>
    `

    containerDePerguntas.innerHTML += html
  })

  containerDePerguntas.innerHTML += `
  <button id="confirmar-reposta" onclick="validarResposta()">confirmar resposta</button>
  `
})

function validarResposta() {
  const respostaUsuario = document.querySelector('input[name="respostaCorreta"]:checked').value
  // pegar a resposta do banco
  if(Number(respostaUsuario) === respostaCorretaAtual) {
    console.log('UHULL')
  } else {
    console.log('Nao consegue ne moises')
  }
}

botaoDeEnvio.addEventListener('click', async (e) => {
  e.preventDefault();
  const respostaCorreta = document.querySelector('input[name="respostaCorreta"]:checked').value
  const email = exampleFormControlInput1.value
  const descricao = exampleFormControlTextarea1.value

  const data = {
    "email": email,
    "descricao": descricao,
    "respostaCorreta": Number(respostaCorreta)
  }

  await postQuestion(data)
})
