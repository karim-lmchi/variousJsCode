function MoleculeToAtome() {
    var word = 'HMgPe4';
    var wordParenthese = '(HSO3)2';
    var wordHook = '[H(SO3)2]2';
    var obj = {};

    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    var arrayParentheses = [...wordParenthese.matchAll(regexParenthese)];
    var regexHook = /\[(.*?)\]+.{1}/gm;
    var arrayHook = [...word.matchAll(regexHook)];

    // for (let element of arrayHook) {
    //     word = word.replace(element[0], '');
    // }
    // for (let element of arrayParentheses) {
    //     word = word.replace(element[0], '');
    // }

    if (arrayParentheses.length > 0) {
        Parentheses(arrayParentheses, obj);
    }
    if (word.length > 0) {
        SimpleAtome(word, obj);
    }

    return obj;
}

function SimpleAtome(word, obj, numParenthese = 1) {
    var atomes = [...word.matchAll(/[A-Z]{1}[a-z]*[0-9]*/gm)];
    for (let element of atomes) {
        var numAtome = (/[0-9]/gm).exec(element[0]);
        var letterAtome = (/[A-Z]{1}[a-z]{0,}/gm).exec(element[0])[0];
        var keys = Object.keys(obj);
        if (keys.includes(letterAtome)) {
            obj[letterAtome] = numAtome !== null ? obj[letterAtome] + Number(numAtome[0]) : obj[letterAtome] + (1 * numParenthese);
        } else {
            obj[letterAtome] = numAtome !== null ? Number(numAtome[0]) * numParenthese : 1 * numParenthese;
        }
    }
}

function Parentheses(array, obj) {
    for (let element of array) {
        var numParenthese = Number(element[0][element[0].length - 1]);
        var atomes = [...element[0].matchAll(/[A-Z]{1}[a-z]*[0-9]*/gm)];
        for (let i = 0; i < atomes.length; i++) {
            var atome = atomes[i][0];
            SimpleAtome(atome, obj, numParenthese);
        }
    }
}