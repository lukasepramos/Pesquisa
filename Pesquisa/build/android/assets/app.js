var wMain;
var vAbertura, vPadrao, vFinal;
var lAbertura, lFinal;
var bIniciar;
var questao,json,url,xhr;
var funcao;
var i;
var respostas = [];

//window
wMain = Titanium.UI.createWindow({
width: 'auto',
height: 'auto',
backgroundColor: '#000000',
title: 'Questionário'
});

//Views
vAbertura = Titanium.UI.createView({
    height:'auto',
    width:'auto',
    backgroundColor:'#061149',
    top:10,
    left:10,
    right:10,
  	bottom:10,
    borderRadius: 15
});

vPadrao = Titanium.UI.createView({
	height:'auto',
    width:'auto',
    layout: "horizontal",
    backgroundColor:'#061149',
    top:10,
    left:10,
    right:10,
  	bottom:10,
    borderRadius: 15
});

var vFinal = Titanium.UI.createView({
	height:'auto',
    width:'auto',
    backgroundColor:'#061149',
    top:10,
    left:10,
    right:10,
  	bottom:10,
    borderRadius: 15
});

//labels
lAbertura = Titanium.UI.createLabel({
	font: {fontSize: 18, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	top:5,
	text: 'Bem vindo ao questionário:',
	verticalAlign:'center',
	color: '#FFFFFF'
});

lFinal = Titanium.UI.createLabel({
	font: {fontSize: 18, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	top:5,
	text: 'Obrigado por participar do questionário!!!',
	verticalAlign:'center',
	color: '#FFFFFF'
});

//Call other function
funcao = require('function');

//Buttons
bIniciar = Titanium.UI.createButton({
   title: 'Iniciar Pesquisa',
   top: 400,
   width: 'auto',
   height: 'auto',
   verticalAlign: 'center'
});

bProximo = Titanium.UI.createButton({
	title: 'Proxima',
   	bot: 10,
   	right: 10,
   	width: 'auto',
   	height: 'auto'
});

//buttons events

bIniciar.addEventListener('click',function(e)
{
	i=1;
	questao = json.questao[i];
	vPadrao = funcao.fFill(questao, vPadrao);
	vPadrao.add(bProximo);
	wMain.add(vPadrao);
});

bProximo.addEventListener('click',function(e)
{
	
	i++;
	if(i<json.questao.length){
		questao = json.questao[i];
		vPadrao = funcao.fFill(questao, vPadrao);
		vPadrao.add(bProximo);
		wMain.remove(vAbertura);
		wMain.add(vPadrao);
	}
	else{
		vFinal.add(lFinal);
		wMain.add(vFinal);	
	}
});


//definindo a função
/*fUpdate = function(){
	if(i<json.questao.length)
	{
		questao = json.questao[i];
		lNum = Titanium.UI.createLabel({
	   	font: {fontSize: 18},
			top:10,
			width: "100%",
			text: "Questão Numero: " + questao.num + "\n",
			color: 'white',
			verticalAlign: 'center'
		});
		lEnum = Titanium.UI.createLabel({
	   	font: {fontSize: 16},
			text: questao.enunciado,
			letf: 10,
			color: 'white'
		});
		bResp1 = Titanium.UI.createButton({
			title: questao.alternativas.a,
	   		top: 200,
	   		width: "100%",
	   		height: "auto",
	   		verticalAlign: 'center'
		});
		bResp1.addEventListener('click',function(e)
		{
			if(questao.alternativas.a==questao.resposta)
			{
				alert('Correto');
				acertos++;
			}
			else
			{
				alert('Errado');
			}
			i++;
      vPadrao.removeAllChildren();
			fUpdate();
		});
		bResp2 = Titanium.UI.createButton({
			title: questao.alternativas.b,
	   		width: "100%",
	   		height: "auto",
	   		verticalAlign: 'center'
		});
		bResp2.addEventListener('click',function(e)
		{
			if(questao.alternativas.b==questao.resposta)
			{
				alert('Correto');
				acertos++;
			}
			else
			{
				alert('Errado');
			}
			i++;
			vPadrao.removeAllChildren();
			fUpdate();
		});
		bResp3 = Titanium.UI.createButton({
			title: questao.alternativas.c,
	   		width: "100%",
	   		height: "auto",
	   		verticalAlign: 'center'
		});
		bResp3.addEventListener('click',function(e)
		{
			if(questao.alternativas.c==questao.resposta)
			{
				alert('Correto');
				acertos++;
			}
			else
			{
				alert('Errado');
			}
			i++;
			vPadrao.removeAllChildren();
			fUpdate();
		});
		bResp4 = Titanium.UI.createButton({
			title: questao.alternativas.d,
	   		width: "100%",
	   		height: "auto",
	   		verticalAlign: 'center'
		});
		bResp4.addEventListener('click',function(e)
		{
			if(questao.alternativas.d==questao.resposta)
			{
				alert('Correto');
				acertos++;
			}
			else
			{
				alert('Errado');
			}
			i++;
			vPadrao.removeAllChildren();
			fUpdate();
		});
		  vPadrao.add(lNum);
	   	vPadrao.add(lEnum);
	   	vPadrao.add(bResp1);
	   	vPadrao.add(bResp2);
	   	vPadrao.add(bResp3);
	   	vPadrao.add(bResp4);
	   	wMain.add(vPadrao);
	}
	else
	{
		lResutado = Titanium.UI.createLabel({
	   		font: {fontSize: 18},
			width: "100%",
			text: "Acertou: " + acertos,
			color: 'white',
			verticalAlign: 'center'
		});
		vFinal.add(lResutado);
		wMain.add(vFinal);
	}

};
*/

//Entrada do JSON
url = "https://raw.githubusercontent.com/lukasepramos/Pesquisa/master/jsonQuestionario.txt"; //Criar url com json
xhr = Ti.Network.createHTTPClient({
    onload: function() {
    json = JSON.parse(this.responseText);
    },
    onerror: function(e) {
	Ti.API.debug("STATUS: " + this.status);
	Ti.API.debug("TEXT:   " + this.responseText);
	Ti.API.debug("ERROR:  " + e.error);
	alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});

xhr.open("GET", url);
xhr.send();
vAbertura.add(lAbertura);
wMain.add(vAbertura);
vAbertura.add(bIniciar);
wMain.open();
