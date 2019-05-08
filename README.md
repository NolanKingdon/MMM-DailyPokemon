# MMM-DailyPokemon

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

MMM-DailyPokemon provides a unique Pokemon each day, as well as information about that Pokemon.

Built Using [PokeAPI](https://pokeapi.co/)

![Demo Image](https://github.com/Tomadelostacos/MMM-DailyPokemon/blob/feature/translation/images/demo.png)

## Using the module

To install, clone this repo into `~/MagicMirror/modules` directory. Then move in the folder and install required libraries
```
git clone https://github.com/Tomadelostacos/MMM-DailyPokemon
cd MMM-DailyPokemon
npm install
```

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: "MMM-DailyPokemon",
            position: "top_center",
            config: {
                updateInterval: 600000,
                minPoke: 4,
                maxPoke: 151,
                grayscale: true,
                showType: true,
                language: "en",
				genera: true, 
				gbaMode: true            
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
| `maxPoke`        | *Optional* End of your range. MUST be 802 or below <br><br>**Generations** <br/><br/> `Gen 1` - 001 to 151 <br> `Gen 2` - 152 to 251 <br> `Gen 3` - 252 to 386 <br> `Gen 4` - 387 to 493 <br> `Gen 5` - 494 to 649 <br> `Gen 6` - 650 to 721 <br> `Gen 7` - 722 to 802 (Technically 809, but the API only supports 802)
| `stats`          | *Optional* Displays Pokemon stats
| `language`       | *Optional* Change Pokemon name. <br><br>**Languages supported** <br/><br/> `zh-Hans` -  <br> `ja` - Japanese <br> `en` - English (default) <br> `it` - Italian <br> `es` - Spanish <br> `de` - Deutsch <br> `fr` - French <br>`zh-Hant` - Chinese <br>`ko` - Korean <br>`roomaji` - Japanese (In Roomaji, latin alphabet) <br>`ja-Hrkt` - Czech <br/> <br/>
| `genera`          | *Optional* Displays the genera (One or two words to describe the Pokemon) from the official Pokedex
| `gbaMode`         | *Optional* Displays text like in GBA Pokedex (Old-school font and old labels)

## Default Configuration

```js
var config = {
    modules: [
        {
            module: "MMM-DailyPokemon",
            position: "top_center",
            config: {
                updateInterval: 86400000, //1 Day
                grayscale: true,//Turns pokemon image and type images gray to match magic mirror styles
                minPoke: 1, //Default to all pokemon
                maxPoke: 802,//Highest number - 802 pokemon currently exist
                showType: true, //Shows type icons below pokemon's image
                stats: true,
                language: "en",
				genera: true,
				gbaMode: true         
            }
        }
    ]
}
```

## TODO
These are the things i'd like to add in the future

- Description of the Pokemon (Don't know wich rule i'm gonna use for it, the description from the latest game ? The first game the Pokemon appeared ? ), and option to hide it. 
- Modify fonts size
- Translate "type cards"
- Maybe add generation ? Capture rate ? Egg group ? Don't know at all ! 

If you got ideas, or corrections, let me know. I'm also not a NodeJS senior, so maybe my code can be better than it currently is, so let me know about it too ! 
