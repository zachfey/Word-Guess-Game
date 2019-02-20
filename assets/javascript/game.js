var game, keyPress, alphabet, vowels, dictionary, currentWord, guessedLetters,
    numberGuesses, maxGuesses, blanks, userPrompt, i, char, id, msg, gameOver;


alphabet = ["a", "b", "c", "d", "e", "f", 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
vowels = ["a", "e", "i", "o", "u"]; //TODO if user guesses vowels wrong, minus two guesses
dictionary =["access", "account", "activity", "admin", "advantage", "animate", "app", "art", "attachment", "bandwidth", "banner", "blog", "bluetooth", "broadband", "browser", "bugs", "bytes", "camera", "cell", "code", "compile", "computer", "connection", "cookies", "copyright", "crash", "cyberspace", "data", "database", "debug", "design", "desktop", "develop", "digital", "disk", "display", "domain", "download", "email", "edit", "electronic", "element", "ethernet", "execute", "facebook", "font", "format", "freeware", "function", "gif", "hackers", "harddrive", "hardware", "hypertext", "icons", "input", "slack", "internet", "intranet", "joystick", "landscape", "laptop", "laser", "layout", "load", "mainframe", "matrix", "media", "megabyte", "memory", "modem", "monitor", "mouse", "navigate", "network", "online", "operate", "password", "performance", "privacy", "processor", "program", "project", "protocol", "query", "registry", "remote", "rom", "scan", "script", "search", "software", "statistics", "tech", "technology", "username", "password", "virus", "webmaster", "webpage", "website", "windows"];

function writeMessage(id, msg){ //handy function to write messages to html blocks based on id
    userPrompt = document.getElementById(id);
    userPrompt.innerHTML = msg;
}

game = { //define the game object
    currentWord: "",
    guessedLetters: [],
    numberGuesses: 0,
    blanks: [],
    maxGuesses: 10,
    gameOver: true,
    wins: 0,

    initialize: function(){ // this method intializes the game - resets all values which should be reset between games
        game.currentWord = dictionary[Math.floor(Math.random()*dictionary.length)] //select a random word from the dictionary defined above
        console.log(game.currentWord); //lets me cheat ;)
        game.guessedLetters = []; //clear out the guessed letters array
        game.numberGuesses = 0; //resset the number of guesses
        // console.log("game started");
        game.blanks = []; //clear out the current word blanks
        for(i = 0; i < game.currentWord.length; i ++){ // create the blanks array
            game.blanks.push("_");
        }
        writeMessage("currentWord", game.blanks.join(" "));
        writeMessage("remainingGuesses", game.maxGuesses);
        writeMessage("wins", game.wins);
        game.gameOver = false;
    },

    checkLetter: function(char){ // this method compares the entered letter to the word and letters already guessed
    
        if(game.guessedLetters.includes(char)){ //letter was already guessed. currently does nothing
            //TODO add to hangman
        } else{ //letter has not been guessed yet
            
            if(alphabet.includes(char)){ //if char is part of the alphabet
                console.log("letter pressed");
    
                if(game.currentWord.indexOf(char) === - 1){ //if char is not found in current word
                    game.guessedLetters.push(char); //add the guessed letter to the array of guessed letters
                    game.numberGuesses++; //increase the number of guesses
                    writeMessage("remainingGuesses", game.maxGuesses - game.numberGuesses); // output the dnumber of remaining guesses
                    writeMessage("guessedLetters", game.guessedLetters.join(", ")) //display all of the gussed letters
                } else{ //if char is found in current word
                    for(i = 0; i < game.currentWord.length; i++){ //loop through the word to find at which index(indices) the letter occurs
                        if(game.currentWord[i] === char){ 
                            game.blanks[i] = char; //replace the underscore with the correct letter
                        }
                    }
                    writeMessage("currentWord", game.blanks.join(" ")); //outputs the guessed word with blanks
                }
            }
        }
    },

    checkLose: function(){ //method to see if the user has lost the game
        if(game.numberGuesses >= game.maxGuesses){
            writeMessage("prompt", "You Lose! Press 'Enter' to try again!");
            game.gameOver = true;
        }
    },

    checkWin: function(){ //method to see if the user has won the game and updates the number of wins
        if(game.blanks.indexOf("_") === -1){//You Win!
            game.wins++;
            writeMessage("wins", game.wins);
            writeMessage("prompt", "You Win! Press 'Enter' to play again!")
            game.gameOver = true;
        }
    }
}


game.initialize(); //initialize the game

document.onkeyup = function(event){ //when the user presses a key
    keyPress = event.key //save the keypress
    console.log("Key pressed: " + keyPress);
    
    if(!game.gameOver){ //if the game is not over
        game.checkLetter(keyPress); 
        game.checkLose();
        game.checkWin(); 
    } else if(keyPress === 'Enter'){ //if the game is over and the user hit 'Enter"
        game.initialize(); //restart the game
    }

}





