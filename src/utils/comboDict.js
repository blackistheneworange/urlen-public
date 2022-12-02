let comboDict={};

function generateComboDict(comboA, comboB){
    const len = comboA.length > comboB.length ? comboB.length : comboA.length;
    for(let i=0;i<len;i++){
        comboDict[comboA[i]] = comboB[i];
    }
}

module.exports={
    generateComboDict,
    comboDict
}