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
		showType: true, //Shows type icons below pokemon's image
		stats: true,  //Displays pokemon stat table
		language: "en", 
		genera: true,  //Sub-description for the pokemon
		gbaMode: true, //Changes font to GBA style 
		nameSize: 32 //Changes header size - px
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
		if(this.config.stats === true){
			wrapper.style.width = "400px";
		} else {
			wrapper.style.width = "200px";
		}
		var header = document.createElement("h4");
		header.innerHTML = "Daily Pokemon";
		header.id = "poke-header";
		
		//wrapper.appendChild(header);
		this.getData(wrapper);//Sending the request
		return wrapper;
	},
	
	getData: function(wrapper) { //Sends XHTTPRequest
		var self = this;
		var pokeNumber = Math.round(Math.random()*(this.config.maxPoke - this.config.minPoke) + this.config.minPoke);
		var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokeNumber + "/";
		var httpRequest = new XMLHttpRequest();

		var languageApiURL = "https://pokeapi.co/api/v2/pokemon-species/" + pokeNumber + "/";
		var languageHttpRequest = new XMLHttpRequest();
		var translatedName;
		var languageChosen = this.config.language;

		languageHttpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				Log.log(response);

				if(self.config.genera){
					response.genera.forEach(genera => {
						if(genera.language.name == languageChosen){
							var pokeSubName = document.getElementById("poke-subname");
							pokeSubName.innerHTML = genera.genus
						}
					});
				}

				// Get Translated Name
				if(languageChosen){
					response.names.forEach(nameObject => {
						if(nameObject.language.name == languageChosen){
							translatedName = nameObject.name;
							var pokeName = document.getElementById("poke-name");
							pokeName.innerHTML = translatedName.charAt(0).toUpperCase() + translatedName.slice(1) + " - #" + pokeNumber
						}
					});
				}
			}
			 else {
				 return "Loading...";
			 }

		}
		
		httpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText));
				var responsePokemon = JSON.parse(this.responseText);
				Log.log(responsePokemon);
				languageHttpRequest.open("GET", languageApiURL, true);
				languageHttpRequest.send();
				

				self.createContent(responsePokemon, wrapper);
			} else {
				return "Loading...";
			}
		}
		httpRequest.open("GET", apiURL, true);
		httpRequest.send();
	},
	
	createContent: function(data, wrapper) { //Creates the elements for display
		var pokeWrapper = document.createElement("div");
		pokeWrapper.id = "poke-info";
		var flexWrapper = document.createElement("div");
		flexWrapper.id = "flex-wrapper";
		var pokeName = document.createElement("p");
		//TODO - maybe add an option to get rid of Pokedex #
		pokeName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1) + " - #" + data.id;
		pokeName.id = "poke-name";

		if(this.config.gbaMode) pokeName.style.fontFamily = "'pokegb'";

		// Font size/style modification
		if(this.config.nameSize != 32) {
			if(this.config.gbaMode){
				pokeName.style.cssText = "font-size:" + this.config.nameSize + "px; font-family: 'pokegb';";
			} else {
				pokeName.style.cssText = "font-size:" + this.config.nameSize + "px;";
			}
		} else if(this.config.nameSize == 32) {//Changing default size if gbaMode is enabled without size changes added
			if(this.config.gbaMode){
				pokeName.style.cssText = "font-size: 22px; font-family: 'pokegb';";
			}
		}
		
		wrapper.appendChild(pokeName);

		if(this.config.genera){
			var pokeSubName = document.createElement("p");
			//TODO - maybe add an option to get rid of Pokedex #
			pokeSubName.id = "poke-subname";
			if(this.config.gbaMode) pokeSubName.style.cssText = "font-family: 'pokegb'";
			wrapper.appendChild(pokeSubName);
		}
		
		var pokePic = document.createElement("img");
		pokePic.src = data.sprites.front_default;
		pokePic.id = "poke-pic";
		if(this.config.grayscale) { 
			pokePic.id = "poke-pic-grayscale"; 
		}
		pokeWrapper.appendChild(pokePic);
		
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
		pokeWrapper.appendChild(types);
		flexWrapper.appendChild(pokeWrapper);
		
		statWrapper = document.createElement("div");
		//TODO - Add in a stats table
		if(this.config.stats){
			var statTable = document.createElement("table");
			if(this.config.gbaMode) statTable.style.cssText = "font-family: 'pokegb'";
			
			for(let i=5; i>=0; i--){//Inverted to list stats in right order
				let tr = document.createElement("tr");
				let tdName = document.createElement("td");
				let tdStat = document.createElement("td");

				tdName.innerHTML = this.translate(data.stats[i].stat.name);
				tdStat.innerHTML = data.stats[i].base_stat;

				tr.appendChild(tdName);
				tr.appendChild(tdStat);
				statTable.appendChild(tr);
			}

			statWrapper.appendChild(statTable);
			flexWrapper.appendChild(statWrapper);
		}
		wrapper.appendChild(flexWrapper);
	},
	
	getStyles: function() {
		return [this.file('MMM-DailyPokemon.css')]
	},

	getTranslations: function() {
		return {
			en: "translations/en.json",
			fr: "translations/fr.json"
		}
	}
});
