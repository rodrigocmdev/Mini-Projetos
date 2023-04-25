'use strict'

const fomatarDigito = (digito) => `0${digito}`.slice(-2)

const atualizar = (tempo) => {
    const segundos = document.getElementById('segundos')

    segundos.textContent = formatarDigito(tempo)
}

const contagemRegressiva = (tempo) => {
    const pararContagem = () => clearInterval(id)

    const contar = () => {
        if (tempo == 0) {
           pararContagem()
        }
        atualizar (tempo)
        tempo--
    }
    const id = setInterval(contar, 1000)
}

contagemRegressiva(12)