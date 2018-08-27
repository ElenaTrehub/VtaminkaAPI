"use strict";

(function (){

    let attributesSelect = document.querySelector('#attributesSelect');
    let attributesTable = document.querySelector('#productAttributes');
    let addAttributeValue = document.querySelector('#addAttributeValue');
    let attributeValueInput = document.querySelector('#currentAttributeValue');
    let addProductButton = document.querySelector('#addProductButton');

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

    if(addProductButton){

        addProductButton.addEventListener('click' ,async function (){

            let children = document.querySelector('#categoriesSelect').children;

            let selectedCategoriesOptions = [].filter.call(children , ( opt )=> { return opt.selected === true; });

            if( selectedCategoriesOptions.length === 0 ){
                alert('Категории не установлены!');
                return;
            }//if

            let categoriesIds = [].map.call(  selectedCategoriesOptions , ( opt )=> { return +opt.value; } );

            let productTitle = document.querySelector('#productTitle').value;
            let productPrice = document.querySelector('#productPrice').value;
            let productDescription = document.querySelector('#productDescription').value;

            let productImage = document.querySelector('#productImage');

            let data = new FormData();

            data.append('image', productImage.files[0]);
            data.append('categories', JSON.stringify(categoriesIds));
            data.append('attributes' , JSON.stringify(attributes));
            data.append('productTitle' , productTitle);
            data.append('productDescription' , productDescription);
            data.append('productPrice' , productPrice);


            try{

                let request = await fetch(`${window.ServerAddress}panel/products/new` , {
                    method: 'POST',
                    body: data
                });

                let response = await request.json();

                console.log(response);

            }//try
            catch(ex){

                console.log('ex' , ex);

            }//catch

        });

    }//if

})();