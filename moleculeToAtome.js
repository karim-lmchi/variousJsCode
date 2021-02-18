function MoleculeToAtome() {
    var formula = 'ABC4[F(GBH2)2]2';
    var result = {};

    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    var regexHook = /\[(.*?)\]+.{1}/gm;
    
    var arrayHook = [...formula.matchAll(regexHook)];
    for (let element of arrayHook) {
        formula = formula.replace(element[0], '');
    }
    var arrayParentheses = [...formula.matchAll(regexParenthese)];
    for (let element of arrayParentheses) {
        formula = formula.replace(element[0], '');
    }

    if (arrayHook.length > 0) {
        Hook(arrayHook, result);
    }
    if (arrayParentheses.length > 0) {
        Parentheses(arrayParentheses, result);
    }
    if (formula.length > 0) {
        SimpleAtome(formula, result);
    }

    return result;
}

function SimpleAtome(formula, result, numParenthese = 1, numHook = 0) {
    var atomes = [...formula.matchAll(/[A-Z]{1}[a-z]*[0-9]*/gm)];
    for (let atome of atomes) {
        var numAtome = (/[0-9]/gm).exec(atome[0]);
        var letterAtome = (/[A-Z]{1}[a-z]{0,}/gm).exec(atome[0])[0];
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

function Parentheses(formulas, result, numParenthese = 1, numHook = 0) {
    for (let formula of formulas) {
        numParenthese = Number(formula[0][formula[0].length - 1]);
        var atomes = [...formula[0].matchAll(/[A-Z]{1}[a-z]*[0-9]*/gm)];
        for (let i = 0; i < atomes.length; i++) {
            var atome = atomes[i][0];
            SimpleAtome(atome, result, numParenthese, numHook);
        }
    }

}

function Hook(formulas, result) {
    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    for (let formula of formulas) {
        var numHook = Number(formula[0][formula[0].length - 1]);
        var arrayParentheses = [...formula[1].matchAll(regexParenthese)];
        var newFormula = '';
        
        for (let par of arrayParentheses) {
            newFormula = formula[1].replace(par[0], '');
        }

        if (arrayParentheses.length > 0) {
            Parentheses(arrayParentheses, result, 1, numHook);
        }
        if (newFormula.length > 0) {
            SimpleAtome(newFormula, result, 1, numHook);
        }
    }
}