// Input chemical formula
// Output an object with number of all different atomes
function MoleculeToAtome() {
    var formula = 'ABC4[F(GBH2)2]2';
    var result = {};

    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    var regexHook = /\[(.*?)\]+.{1}/gm;
    
    var arrayHook = formula.match(regexHook);
    if (arrayHook !== null) {
        for (let element of arrayHook) {
            formula = formula.replace(element, '');
        }
    }
    var arrayParentheses = formula.match(regexParenthese);
    if (arrayParentheses !== null) {
        for (let element of arrayParentheses) {
            formula = formula.replace(element, '');
        }
    }

    if (arrayHook !== null) {
        Hook(arrayHook, result);
    }
    if (arrayParentheses !== null) {
        Parentheses(arrayParentheses, result);
    }
    if (formula.length > 0) {
        SimpleAtome(formula, result);
    }

    return result;
}

/**
 * 
 * @param {String} formula, Only one atom or a part of the chemical formula
 * @param {Object} result, An object that we fill
 * @param {Number} numParenthese, Number before parentheses
 * @param {Number} numHook, Number before hooks
 * @result void
 */
function SimpleAtome(formula, result, numParenthese = 1, numHook = 0) {
    var atomes = formula.match(/[A-Z]{1}[a-z]*[0-9]*/gm);
    for (let atome of atomes) {
        var numAtome = (/[0-9]/gm).exec(atome);
        var letterAtome = (/[A-Z]{1}[a-z]{0,}/gm).exec(atome)[0];
        var keys = Object.keys(result);
        if (keys.includes(letterAtome)) {
            if (numAtome !== null) {
                result[letterAtome] = result[letterAtome] + Number(numAtome[0]) + (Number(numAtome[0]) * numHook);
            } else {
                result[letterAtome] = result[letterAtome] + (1 * numParenthese) + ((1 * numParenthese) * numHook);
            }
        } else {
            if (numAtome !== null) {
                result[letterAtome] = numHook === 0 ? Number(numAtome[0]) * numParenthese : (Number(numAtome[0]) * numParenthese * numHook);
            } else {
                result[letterAtome] = numHook === 0 ? 1 * numParenthese : (numParenthese * numHook);
            }
        }
    }
}

/**
 * 
 * @param {String[]} formulas, An array of all part of the chemical formula between parentheses
 * @param {Object} result, An object that we fill
 * @param {Number} numParenthese, Number before parentheses
 * @param {Number} numHook, Number before hooks
 * @result void
 */
function Parentheses(formulas, result, numParenthese = 1, numHook = 0) {
    for (let formula of formulas) {
        numParenthese = Number(formula[formula.length - 1]);
        var atomes = formula.match(/[A-Z]{1}[a-z]*[0-9]*/gm);
        for (let i = 0; i < atomes.length; i++) {
            var atome = atomes[i];
            SimpleAtome(atome, result, numParenthese, numHook);
        }
    }

}

/**
 * 
 * @param {*} formulas, An array of all part of the chemical formula between hooks
 * @param {*} result, , An object that we fill
 * @result void 
 */
function Hook(formulas, result) {
    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    for (let formula of formulas) {
        var numHook = Number(formula[formula.length - 1]);
        var arrayParentheses = formula.match(regexParenthese);
        var newFormula = '';
        
        for (let par of arrayParentheses) {
            newFormula = formula.replace(par, '');
        }

        if (arrayParentheses.length > 0) {
            Parentheses(arrayParentheses, result, 1, numHook);
        }
        if (newFormula.length > 0) {
            SimpleAtome(newFormula, result, 1, numHook);
        }
    }
}