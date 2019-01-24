/* global Module */

/* Magic Mirror
 * Module: MMM-DailyPokemon
 *
 * By 
 * MIT Licensed.
 */

Module.register("MMM-DailyPokemon", {
	defaults: {
		updateInterval: 86400000, //1 Day
		grayscale: true,//Turns pokemon image and type images gray to match magic mirror styles
		minPoke: 1, //Default to all pokemon
		maxPoke: 802,//Highest number - 802 pokemon currently exist
		showType: true //Shows type icons below pokemon's image
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() { //Setting up interval for refresh
		var self = this;
		
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function() { //Creating initial div
		var wrapper = document.createElement("div");
		wrapper.id = "poke-wrapper";
		var header = document.createElement("h4");
		header.innerHTML = "Daily Pokemon";
		header.id = "poke-header";
		
		wrapper.appendChild(header);
		this.getData(wrapper);//Sending the request
		return wrapper;
	},
	
	getData: function(wrapper) { //Sends XHTTPRequest
		var self = this;
		var pokeNumber = Math.round(Math.random()*(this.config.maxPoke - this.config.minPoke) + this.config.minPoke);
		var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokeNumber + "/";
		var httpRequest = new XMLHttpRequest();
		
		httpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText));
				var responsePokemon = JSON.parse(this.responseText);
				Log.log(responsePokemon.name);
				self.createContent(responsePokemon, wrapper);
			} else {
				return "Loading...";
			}
		}
		httpRequest.open("GET", apiURL, true);
		httpRequest.send();
	},
	
	createContent: function(data, wrapper) { //Creates the elements for display

		var pokeName = document.createElement("p");
		//TODO - maybe add an option to get rid of Pokedex #
		pokeName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1) + " - #" + data.id;
		wrapper.appendChild(pokeName);
		
		var pokePic = document.createElement("img");
		pokePic.src = data.sprites.front_default;
		pokePic.id = "poke-pic";
		if(this.config.grayscale) { 
			pokePic.id = "poke-pic-grayscale"; 
		}
		wrapper.appendChild(pokePic);
		
		var types = document.createElement("div");
		types.id = "poke-types";
		var type1 = document.createElement("p");
		var type1Img = document.createElement("img");
		type1Img.src = "https://serebii.net/pokedex-dp/type/" + data.types[0].type.name + ".gif"
		if(this.config.grayscale){
				type1Img.id = "poke-pic-grayscale-type"
			}
		type1.appendChild(type1Img);
		//type1.innerHTML = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
		types.appendChild(type1);
		if(data.types[1]){
			var type2 = document.createElement("p");
			var type2Img = document.createElement("img");
			if(this.config.grayscale){
				type2Img.id = "poke-pic-grayscale-type"
			}
			type2Img.src = "https://serebii.net/pokedex-dp/type/" + data.types[1].type.name + ".gif"
			//type2.innerHTML = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1)
			type2.appendChild(type2Img);
			types.appendChild(type2);
		}
		wrapper.appendChild(types);
		
		//TODO - Add in a stats table
	},
	
	getStyles: function() {
		return [this.file('MMM-DailyPokemon.css')]
	},
});
