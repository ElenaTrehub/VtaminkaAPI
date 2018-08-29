"use strict";


;(function (){

    let addLanguageButton = document.querySelector('#addLanguageButton');
    let messageBlock = document.querySelector('#message');
    let messageBlockReduction = document.querySelector('#messageBlock');

    //Добавление языка


    if(addLanguageButton){

        addLanguageButton.addEventListener('click' , async function (){

            let languageTitle = document.querySelector('#languageTitle').value;

            if(!languageTitle.match(RegularExpressions.LanguageTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название языка некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let languageReduction = document.querySelector('#languageReduction').value;

            if(!languageReduction.match(RegularExpressions.LanguageReductionExpression)){

                if( messageBlockReduction.classList.contains('alert-success') ){
                    messageBlockReduction.classList.remove('alert-success');
                }//if

                messageBlockReduction.classList.add('alert-danger');

                messageBlockReduction.textContent = "Название языка некорректно!";
                messageBlockReduction.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/languages/new` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'languageTitle': languageTitle,
                    'languageReduction': languageReduction
                })
            });

            let responseJSON = await request.json();

            messageBlock.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                if( messageBlock.classList.contains('alert-danger') ){
                    messageBlock.classList.remove('alert-danger');
                }//if

                messageBlock.classList.add('alert-success');

                messageBlock.style.display = 'block';

            }//if
            else{

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.style.display = 'block';

            }//else

            console.log(responseJSON);

        } );

    }//if



})();
