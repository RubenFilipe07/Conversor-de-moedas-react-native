var resultado;

$.ajax({
    type: "GET",
    dataType: "JSON",
    url: "https://economia.awesomeapi.com.br/json/all",
    success: function (data) {
        resultado = data
    },
    error: function (data) {
        M.toast({ html:'Erro! o site não conseguiu carregar os valores atuais da cotação. Tente novamente mais tarde. :(', displayLength: 15000})
    }
});

function converter() {
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

    function getHorarioAtualizacao(moeda) {
        var data = (resultado[moeda]["create_date"])
        //Mudando a formatação da data para DD/MM/AA 
        var dia = data.substring(8, 10)
        var mes = data.substring(5, 7)
        var ano = data.substring(0, 4)
        var hora = data.substring(11, 16)
        var dataFormatada = `${dia}/${mes}/${ano} às ${hora}`
        var atualizacao = document.querySelector("#atualizacao");
        atualizacao.innerHTML = 'Cotação atualizada em ' + dataFormatada;
    }

    var num = document.querySelector("#entrada").value;
    num = parseFloat(num);

    var calculo;

    var saida = document.querySelector("#saida");
    var selecionado = document.querySelector("#moedas").value;

    if (isNaN(num) == true && selecionado == "NULL") {
        M.toast({ html: 'Digite um valor e escolha uma moeda!'})
    } else {
        if (isNaN(num) == true) {
            M.toast({ html: "Digite um valor!" })
        }
        if (selecionado == "NULL") {
            M.toast({ html: "Escolha uma moeda!" })
        }
    }

    if (num <= 0) {
        M.toast({ html: "Valor inválido! Digite somente valores positivos e diferentes de zero" })
    }

    if (selecionado == "EUR" && isNaN(num) == false) {
        calculo = num * euro
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'EUR' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("EUR")
    }

    if (selecionado == "USD" && isNaN(num) == false) {
        calculo = num * dolar
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("USD")
    }

    if (selecionado == "CAD" && isNaN(num) == false) {
        calculo = num * dolarCanadense
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'CAD' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("CAD")
    }

    if (selecionado == "AUD" && isNaN(num) == false) {
        calculo = num * dolarAustraliano
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'AUD' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("AUD")
    }

    if (selecionado == "GBP" && isNaN(num) == false) {
        calculo = num * libra
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'GBP' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("GBP")
    }

    if (selecionado == "ARS" && isNaN(num) == false) {
        calculo = num * peso
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'ARS' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("ARS")
    }

    if (selecionado == "JPY" && isNaN(num) == false) {
        calculo = num * iene
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'JPY' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("JPY")
    }

    if (selecionado == "CNY" && isNaN(num) == false) {
        calculo = num * yuan
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'CNY' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("CNY")
    }

    if (selecionado == "CHF" && isNaN(num) == false) {
        calculo = num * franco
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'CHF' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("CHF")
    }

    if (selecionado == "ILS" && isNaN(num) == false) {
        calculo = num * shekel
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'ILS' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("ILS")
    }

    if (selecionado == "BTC" && isNaN(num) == false) {
        btcoin = btcoin
        calculo = num * btcoin
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'BTC' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("BTC")
    }

    if (selecionado == "ETH" && isNaN(num) == false) {
        calculo = num * ethereum
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'ETH' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("ETH")
    }

    if (selecionado == "LTC" && isNaN(num) == false) {
        calculo = num * ltcoin
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'LTC' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("LTC")
    }

    if (selecionado == "DOGE" && isNaN(num) == false) {
        calculo = num * dogecoin
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'XDG' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("DOGE")
    }

    if (selecionado == "XRP" && isNaN(num) == false) {
        calculo = num * xrp
        num = num.toLocaleString('en-us', { style: 'currency', currency: 'XRP' });
        calculo = calculo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        saida.innerHTML = `${num} = ${calculo}`
        getHorarioAtualizacao("XRP")
    }

}