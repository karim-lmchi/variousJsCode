function MoleculeToAtome() {
    var word = 'HMg[H(SO3)2]2Pe4';
    var obj = {};

    var regexParenthese = /(\((.*?)\))+.{1}/gm;
    var arrayParentheses = [...word.matchAll(regexParenthese)];
    var regexHook = /\[(.*?)\]+.{1}/gm;
    var arrayHook = [...word.matchAll(regexHook)];

    for (let element of arrayHook) {
        word = word.replace(element[0], '');
    }
    for (let element of arrayParentheses) {
        word = word.replace(element[0], '');
    }
    return console.log(word, arrayHook, arrayParentheses);
}