"use strict";

(function (){

    let attributesSelect = document.querySelector('#attributesSelect');
    let categoriesSelect = document.querySelector('#categoriesSelect');
    let attributesTable = document.querySelector('#productAttributes');
    let addAttributeValue = document.querySelector('#addAttributeValue');
    let attributeValueInput = document.querySelector('#currentAttributeValue');
    let addProductButton = document.querySelector('#addProductButton');
    let changeProductButton = document.querySelector('#changeProductButton');
    let productImage = document.querySelector('#productImage');


    let attributes = [];
    let removeButtons = [];
    let removeImageButtons = [];



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


            let categoriesExist = JSON.parse(categoriesSelect.getAttribute('data-productCategories'));
            console.log(categoriesExist);

            if (categoriesExist) {

                for (let i = 0; i < categoriesSelect.children.length; i++) {
                    let categoryID = categoriesSelect.children[i].value;
                    for (let j = 0; j < categoriesExist.length; j++) {

                        if(categoryID==categoriesExist[j].categoryID){
                            console.log(categoryID);
                            console.log(categoriesExist[j].categoryID);
                            categoriesSelect.children[i].selected = "true";
                        }

                    }//for j

                }//for i


            }//if

    }//if

    if( addAttributeValue ){

        let attributesExist = JSON.parse(addAttributeValue.getAttribute('data-attributes'));

        if(attributesExist){

            for(let i=0; i<attributesExist.length; i++){

                attributes.splice(0, 0, {
                    attributeID: attributesExist[i].attributeID,
                    attributeTitle: attributesExist[i].attributeTitle,
                    attributeValue: attributesExist[i].pAttributes.attributeValue});
            }


        }

        //console.log(attributes);
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
                    <td>
                        <button type="button" class="btn btn-danger" data-product-id=${attr.attributeID}>
                            Удалить атрибут
                        </button>
                    </td>
                `;

            } )

            removeButtons = document.querySelectorAll('.btn-danger');
            console.log(removeButtons);

            [].forEach.call( removeButtons , ( button )=> {

                //let removeButton = document.querySelector('.btn-danger');
                //console.log(removeButton);
                button.addEventListener('click' , async function (){


                    let attrDeleteID = +button.dataset.productId;


                    let attrDelete = attributes.find( ( attr )=> +attr.attributeID === attrDeleteID );


                    let indexAttrDelete = attributes.indexOf(attrDelete);

                    attributes.splice(indexAttrDelete, 1);


                    attributesTable.deleteRow(+indexAttrDelete);



                });

            });
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


    removeImageButtons = document.querySelectorAll('.btn-wrapper');


    [].forEach.call( removeImageButtons , ( button )=> {


        button.addEventListener('click' , async function (){

            let cartDelete = button.parentElement;
            cartDelete.style.display="none";


        });

    });

    if(changeProductButton){

        changeProductButton.addEventListener('click' ,async function (){

            let productID = changeProductButton.dataset.productId;
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

            data.append('productID', productID);
            data.append('image', productImage.files[0]);
            data.append('categories', JSON.stringify(categoriesIds));
            data.append('attributes' , JSON.stringify(attributes));
            data.append('productTitle' , productTitle);
            data.append('productDescription' , productDescription);
            data.append('productPrice' , productPrice);


            try{

                let request = await fetch(`${window.ServerAddress}panel/products/new` , {
                    method: 'PUT',
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