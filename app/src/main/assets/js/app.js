var resultado;

function getDados(){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://economia.awesomeapi.com.br/json/all",
        success: function (data) {
            resultado = data
        },
        error: function () {
            M.toast({ html:'Erro! o site não conseguiu carregar os valores atuais da cotação. Tente novamente mais tarde.', displayLength: 15000})
        }
    });
}

function converter() {
    
    try {
        var euro = resultado["EUR"]["bid"]
        var dolar = resultado["USD"]["bid"]
        var dolarCanadense = resultado["CAD"]["bid"]
        var dolarAustraliano = resultado["AUD"]["bid"]
        var libra = resultado["GBP"]["bid"]
        var peso = resultado["ARS"]["bid"]
        var iene = resultado["JPY"]["bid"]
        var yuan = resultado["CNY"]["bid"]
        var franco = resultado["CHF"]["bid"]
        var shekel = resultado["ILS"]["bid"]
        var btcoin = resultado["BTC"]["bid"]
        var ethereum = resultado["ETH"]["bid"]
        var ltcoin = resultado["LTC"]["bid"]
        var dogecoin = resultado["DOGE"]["bid"]
        var xrp = resultado["XRP"]["bid"]
      
    } catch (error) {
        if(euro === undefined){
            getDados()
        }
    }  

    function getHorarioAtualizacao(codigoMoeda) {
        var data = (resultado[codigoMoeda]["create_date"])
        //Mudando a formatação da data para DD/MM/AA 
        var dia = data.substring(8, 10)
        var mes = data.substring(5, 7)
        var ano = data.substring(0, 4)
        var hora = data.substring(11, 16)
        var dataFormatada = `${dia}/${mes}/${ano} às ${hora}`
        var atualizacao = document.querySelector("#atualizacao");
        atualizacao.innerHTML = 'Cotação atualizada em ' + dataFormatada;
    }

    var numeroDigitado = document.querySelector("#entrada").value;
    numeroDigitado = parseFloat(numeroDigitado);

    var calculo;

    var saida = document.querySelector("#saida");
    var selecionado = document.querySelector("#moedas").value;

    if (isNaN(numeroDigitado) == true && selecionado == "NULL" && euro != undefined) {
        M.toast({ html: 'Digite um valor e escolha uma moeda!', displayLength: 2500})
    } else {
        if (isNaN(numeroDigitado) == true && euro != undefined) {
            M.toast({ html: "Digite um valor!", displayLength: 2500})
        }
        if (selecionado == "NULL" && euro != undefined) {
            M.toast({ html: "Escolha uma moeda!", displayLength: 2500})
        }
    }

    function calcular(valorMoeda, codigoMoeda){
        calculo = numeroDigitado * valorMoeda
        numeroDigitado = numeroDigitado.toLocaleString('en-us', { style: 'currency', currency: codigoMoeda });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${numeroDigitado} = ${calculo}`
        getHorarioAtualizacao(codigoMoeda)
    }


    if (numeroDigitado <= 0) {
        M.toast({ html: "Valor inválido! Digite somente valores positivos e diferentes de zero", displayLength: 4000})
    }

    if (selecionado == "EUR" && !isNaN(numeroDigitado) && !isNaN(euro)) {
        calcular(euro, "EUR")
    }

    if (selecionado == "USD" && !isNaN(numeroDigitado) && !isNaN(dolar)) {
        calcular(dolar, "USD")
    }

    if (selecionado == "CAD" && !isNaN(numeroDigitado) && !isNaN(dolarCanadense)) {
        calcular(dolarCanadense, "CAD")        
    }

    if (selecionado == "AUD" && !isNaN(numeroDigitado) && !isNaN(dolarAustraliano)) {
        calcular(dolarAustraliano, "AUD")
    }

    if (selecionado == "GBP" && !isNaN(numeroDigitado) && !isNaN(libra)) {
        calcular(libra, "GBP")
    }

    if (selecionado == "ARS" && !isNaN(numeroDigitado) && !isNaN(peso)) {
        calcular(peso, "ARS")
    }

    if (selecionado == "JPY" && !isNaN(numeroDigitado) && !isNaN(iene)) {
        calcular(iene, "JPY")
    }

    if (selecionado == "CNY" && !isNaN(numeroDigitado) && !isNaN(yuan)) {
        calcular(yuan, "CNY")
    }

    if (selecionado == "CHF" && !isNaN(numeroDigitado) && !isNaN(franco)) {
        calcular(franco, "CHF")
    }

    if (selecionado == "ILS" && !isNaN(numeroDigitado) && !isNaN(shekel)) {
        calcular(shekel, "ILS")
    }

    if (selecionado == "BTC" && !isNaN(numeroDigitado) && !isNaN(btcoin)) {
        btcoin = btcoin * 1000
        calcular(btcoin, "BTC")
    }

    if (selecionado == "ETH" && !isNaN(numeroDigitado) && !isNaN(ethereum)) {
        calcular(ethereum, "ETH")
    }

    if (selecionado == "LTC" && !isNaN(numeroDigitado) && !isNaN(ltcoin)) {
        calcular(ltcoin, "LTC")
    }

    if (selecionado == "DOGE" && !isNaN(numeroDigitado) && !isNaN(dogecoin)) {
        calcular(dogecoin, "XDG")
    }

    if (selecionado == "XRP" && !isNaN(numeroDigitado) && !isNaN(xrp)) {
        calcular(xrp, "XRP")
    }

}