exports.getJson = function(onSuccess,onError,arg) {
	var json,url,xhr;
	url = "https://raw.githubusercontent.com/lukasepramos/Pesquisa/master/jsonQuestionario.txt"; //Criar url com json
	xhr = Ti.Network.createHTTPClient({
	    onload: function() {
		    json = JSON.parse(this.responseText);
		    onSuccess(json);
	    },
	    onerror: function(e) {
		Ti.API.debug("STATUS: " + this.status);
		Ti.API.debug("TEXT:   " + this.responseText);
		Ti.API.debug("ERROR:  " + e.error);
		onError();
		alert('There was an error retrieving the remote data. Try again.');
	    },
	    timeout:5000
	});
	xhr.open("GET", url);
	xhr.send();
	return json;
};
