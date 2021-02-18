function MoleculeToAtome() {
    var word = 'HMgPe4';
    var wordParenthese = '(SO3)2';
    var wordHook = '[H(SO3)2]2';
    var obj = {};

    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    var arrayParentheses = [...word.matchAll(regexParenthese)];
    var regexHook = /\[(.*?)\]+.{1}/gm;
    var arrayHook = [...word.matchAll(regexHook)];

    // for (let element of arrayHook) {
    //     word = word.replace(element[0], '');
    // }
    // for (let element of arrayParentheses) {
    //     word = word.replace(element[0], '');
    // }

    if (word.length > 0) {
        var atomes = [...word.matchAll(/[A-Z]{1}[a-z]*[0-9]*/gm)];
        for (let atome of atomes) {
            var numAtome = (/[0-9]/gm).exec(atome[0]);
            var letterAtome = (/[A-Z]{1}[a-z]{0,}/gm).exec(atome[0]);
            var keys = Object.keys(obj);
            if (keys.includes(letterAtome)) {

            } else {
                obj[letterAtome] = numAtome !== null ? Number(numAtome[0]) : 1;
            }
        }
    }

    return obj;
}