"use strict";

(function (){

    let attributesSelect = document.querySelector('#attributesSelect');
    let attributesTable = document.querySelector('#productAttributes');
    let addAttributeValue = document.querySelector('#addAttributeValue');
    let attributeValueInput = document.querySelector('#currentAttributeValue');

    let attributes = [];

    if( attributesSelect ){

        attributesSelect.addEventListener('change' , function (){

            let attributeID = this.value;
            let attributeTitle = this.querySelector(`option[data-attribute-id='${attributeID}']`).textContent;

            if(attributeID === -1){
                return;
            }//if

            let exist = attributes.find( ( attr )=> attr.attributeID === attributeID );

            if( exist ){
                return;
            }//if

            attributes.push( {
                attributeID: attributeID,
                attributeTitle: attributeTitle,
                attributeValue: ''
            } );

        });

    }//if

    if( addAttributeValue ){

        addAttributeValue.addEventListener('click' , function (){

            let attributeID = attributesSelect.value;

            if( attributeID === -1 ){
                return;
            }//if

            let attribute = attributes.find( ( attr )=> attr.attributeID === attributeID );

            if(attribute){

                attribute.attributeValue = attributeValueInput.value;

            }//if

            while(attributesTable.firstChild){
                attributesTable.removeChild(attributesTable.firstChild);
            }//while

            attributes.forEach( ( attr )=>{

                attributesTable.innerHTML += `
                    <td>${attr.attributeID}</td>
                    <td>${attr.attributeTitle}</td>
                    <td>${attr.attributeValue}</td>
                    <td></td>
                `;

            } )

        });

    }//if

})();