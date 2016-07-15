var wMain;
var vAbertura, vPadrao, vFinal;
var lAbertura, lFinal, lEnum;
var bIniciar;
var questao;
var conexao;
var i;
var respostas = [];
var checkButton = require('lib');
var radioButton = require('lib');
var alternativas;
var json,url,xhr;

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

lEnum = Titanium.UI.createLabel({
   	font: {fontSize: 16},
	text: "",
	letf: 10,
	color: 'white'
});

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
	var questao;
	conexao = require('conexao');
	json = conexao.getJson();
	i=0;
	questao = json.questao[i];
	lEnum.setText = questao.enunciado;
	switch (questao.type) {
	case 'check':
		alternativas = checkButton.createCheckButtonGroup({
		    groupId : 1,
		    width : Ti.UI.SIZE,
		    height : Ti.UI.SIZE,
		    left : 20,
		    layout : 'vertical',
		    checkItemsValue : questao.alternativas,
		    checkItemsPadding : 10,
		    checkItemsBackgroundSelectedImage : '/images/Programa/radio-checked.gif',
		    checkItemsBackgroundImage : '/images/Programa/radio-unchecked.gif',
		    checkItemsWidth : Ti.UI.SIZE,
		    checkItemsHeight : Ti.UI.SIZE,
		    labelColor : '#111',
		});
		break;
	case 'radio':
			alternativas = radioButton.createRadioButtonGroup({
		    groupId : 1,
		    width : Ti.UI.SIZE,
		    height : Ti.UI.SIZE,
		    left : 20,
		    layout : 'vertical',
		    radioItemsValue : questao.alternativas,
		    radioItemsPadding : 10,
		    radioItemsBackgroundSelectedImage : '/images/Programa/radio-checked.gif',
		    radioItemsBackgroundImage : '/images/Programa/radio-unchecked.gif',
		    radioItemsWidth : Ti.UI.SIZE,
		    radioItemsHeight : Ti.UI.SIZE,
		    labelColor : '#111',
		});
    	break;
	default:
    	alert('Error');
    	break;
	}
	
	bIniciar.setTitle = "proximo";
	vPadrao.add(lEnum);
	vPadrao.add(alternativas);
	vPadrao.add(bIniciar);
	
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
