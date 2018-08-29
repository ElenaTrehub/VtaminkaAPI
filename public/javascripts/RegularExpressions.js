"use strict";

class RegularExpressions{

    static get CategoryTitleExpression(){
        return /^[a-z0-9а-я\s_\-:]{2,50}$/i
    };
    static get LanguageTitleExpression(){
        return /^[a-zа-я()]{2,50}$/i
    };

    static get LanguageReductionExpression(){
        return /^[A-Z]{2,5}$/
    };
}