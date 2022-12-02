const chars = ['1','2','3','4','5','6','7','8','9','0','a','A','b','B','c','C','d','D','e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']
.map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value);

const charsLength = chars.length;

function generate(numOfRandoms){

    let randomCode="";

    while(randomCode.length===0 || isRepetitive(randomCode)){
    //initial seed value
    const seed = getRandom(0,charsLength);

    //multiplier value
    const mulValue = getRandom(0,charsLength);

    //increment value
    const incValue = getRandom(0,charsLength);

    //modulus parameter
    const modParam = getRandom(1,charsLength);

    randomCode = linearCongruentialMethod(seed, mulValue, incValue, modParam, numOfRandoms);
        
    }

    return randomCode;
}

function getRandom(min,max){
    return Math.floor(Math.random()*((max-1)-min)+min);
}

function linearCongruentialMethod(seed, mulValue, incValue, modParam, numOfRandoms){

    let currIndex = seed, newIndex, finalCode = "";

    for(let i=0;i<numOfRandoms;i++){

        //get char for currIndex
        finalCode += chars[currIndex];

        newIndex = ((currIndex * mulValue) + incValue);
        if(newIndex >= charsLength){
            newIndex = newIndex%modParam;
        }
        currIndex = newIndex;
    }
    return finalCode;
}

function isRepetitive(code){
    const count = {};
    for(let i=0;i<code.length;i++){
        if(count[code[i]]){
            count[code[i]] += 1;
            if(count[code[i]] >= 3){
                return true;
            }
        }
        else{
            count[code[i]] = 1;
        }
    }
    return false;
}

module.exports = {
    generate
}