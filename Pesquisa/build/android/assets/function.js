var fFill, fFillRadio, fFillCheck;
var i;
var tButton = [], row;
var bAlternativa;
var tableView;
var lNum, lEnum;




exports.fFill = function(questao, vPad){
	switch (questao.type) {
		case 'check':
    		vPad = fFillCheck(questao, vPad);
    		break;
		case 'radio':
	    	vPad = fFillRadio(questao, vPad);
	    	break;
		default:
	    	alert('Error');
	    	break;
}
	return vPad;
};

fFillCheck = function(questao, vPad){
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
	vPad.add(lNum);
   	vPad.add(lEnum);
	for(i = 0; i<questao.alternativas.length;i++){
		row = Titanium.UI.createTableViewRow();
		bAlternativa = Ti.UI.createButton({
	        title : questao.alternativas[i],
	        width : '100%',
	        height : 'auto',
	        backgroundColor : 'transparent',
	        borderWidth: 2,
	    	borderRadius: 3,
	        borderColor: '#000000',
	        buttonid : i,
	        value : false
	    });
	    vPad.add(bAlternativa);
		};
		
	/*bAlternativa.ligar = function() {
    	this.borderColor = '#FFFFFF';
    	this.value = true;
	};

	bAlternativa.desligar = function() {
    	this.borderColor = '#000000';
    	this.value = false;
	};*/
	
	/*bAlternativa.addEventListener('click', function(e) {
        /*if(false == e.source.value) {
        e.source.ligar();
    } else {
        e.source.desligar();
    }
    });*/
    tableView = Ti.UI.createTableView({
    	data : tButton
    });
 	
   	return vPad;
};

fFillRadio = function(questao, vPad){
	i = 0;	
};