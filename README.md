# MMM-DailyPokemon

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

MMM-DailyPokemon provides a unique Pokemon each day, as well as information about that Pokemon.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
			module: "MMM-DailyPokemon",
			position: "top_center",
			config: {
                updateInterval: 600000,
                minPoke: 4, //I don't like Bulbasaur, or its evolutions!
				maxPoke: 151,
                grayscale: true,
                showType: true,                
			}
		}
    ]
}
```

## Configuration options


| Option           | Description
|----------------- |-----------
| `updateInterval` | *Optional* How frequently you want it to update. Defaulted to once a day
| `showType`       | *Optional* Displays the Pokemon's type
| `grayscale`      | *Optional* Makes all images black and white to fit Mirror themes
| `minPoke`        | *Optional* Start of your range. MUST be at least 1.
| `maxPoke`        | *Optional* End of your range. MUST be 802 or below <br/><br/>**Generations** <br/><br/> 
                    `Gen 1` - 001 to 151 <br/>
                    `Gen 2` - 152 to 251 <br/>
                    `Gen 3` - 252 to 386 <br/>
                    `Gen 4` - 387 to 493 <br/>
                    `Gen 5` - 494 to 649 <br/>   
                    `Gen 6` - 650 to 721 <br/>
                    `Gen 7` - 722 to 802 (Technically 809, but the API only supports 802)
