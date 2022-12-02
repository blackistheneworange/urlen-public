let textCombo = []

function generate(){
    textCombo=[];
    const combo1=['1','2','3','4','5','6','7','8','9','0'];
    const combo2=['}',':','!','@','#','$','%','^','&','*','(','{',')','-','_','+','=','~','`','?',']','[','<','>','|'];
    textCombo=[...combo1];
    for(let i=97;i<123;i++){
        combo1.push(String.fromCharCode(i))
    }
    for(let i=65;i<91;i++){
        combo1.push(String.fromCharCode(i))
    }
    for(let i=0;i<combo1.length;i++){
        for(let j=0;j<combo2.length;j++){
            textCombo.push(combo1[i]+combo2[j]);
        }
    }
}
generate();
module.exports={
    textCombo,
    generate
}