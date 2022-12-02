let numberCombo=[];

function generateCombinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}
numberCombo = [...Array(10000).keys()].map(key => JSON.stringify(key))

module.exports={
    numberCombo
}