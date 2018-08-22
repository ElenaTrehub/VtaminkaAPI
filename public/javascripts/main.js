"use strict";
;(function (){

    let mainButton = document.querySelector("#mainButton");

    if(mainButton){

        let textElement = document.querySelector("h1");

        mainButton.addEventListener('click' , function (){
            console.log(`This is main button! Text: ${textElement.textContent} `);
        } );

    }//if

})();