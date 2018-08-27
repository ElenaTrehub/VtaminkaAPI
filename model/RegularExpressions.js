"use strict";

class RegularExpressions{

    static get CategoryTitleExpression(){
        return /^[a-z0-9а-я\s_\-:]{2,50}$/i
    };

    static get ProductTitleExpression(){
        return /^[a-z0-9а-я\s_\-:]{2,75}$/i
    }

    static get ProductDescriptionExpression(){
        return /^[a-z0-9а-я\s_\-:,.;"'?!()]{2,1000}$/i
    }

}

module.exports = RegularExpressions;