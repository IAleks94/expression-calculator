function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let regExpArrFirst = [/\([^\(]*\)/,
  /(?<leftNum>\-?\d+(\.\d+)?\b)[\s+]?(?<sing>[/*])[\s+]?(?<rightNum>\-?\d+(\.\d+)?\b)/, 
  /(?<leftNum>\-?\d+(\.\d+)?\b)[\s+]?(?<sing>[+-])[\s+]?(?<rightNum>\-?\d+(\.\d+)?\b)/];
  for (let i = 0; i < 3; i++) {
  //  console.log('regExpArrFirst ' +regExpArrFirst[i]);
  //  console.log('expr ' + expr);
    let miniExpr = expr.match(regExpArrFirst[i]);
  // console.log('miniExpr ' +miniExpr);
    if (i === 0 && miniExpr) {
      let str = miniExpr[0].match(/[^\(].+[^\)]/)+'';
   //   console.log('str ' + str);
    expr = expr.replace(regExpArrFirst[i],  expressionCalculator(str))+'';
   // console.log('получаем ' + expr);
    return expressionCalculator(expr);
    } else if (miniExpr == null) {
      continue;
    }
  //  console.log(regExpArrFirst[i]);
    //console.log("miniExpr: ", miniExpr);
    if (miniExpr) {
    //  console.log(miniExpr.groups);
     // console.log(miniExpr);
      let {leftNum , rightNum, sing} = miniExpr.groups;
        if (sing) {
          let newExpr = expr.replace(
            regExpArrFirst[i],
            caclulator(leftNum, sing[0], rightNum)
          );
         //console.log('newExpr= ' +newExpr);
          return expressionCalculator(newExpr);
        }   
    }
  }
  if (Number(expr) || expr == 0) {
    return Number(expr);
  } else if (expr.match(/\s/)) {
    //  console.log(expr);
      expr = expr.split(' ').join('');
    return expressionCalculator(expr);
    } else if (isNaN(expr)){
    //  console.log(expr);
    throw new Error("ExpressionError: Brackets must be paired");
  }
  

  function caclulator(left, sing, right) { // возвращяем строку
   // console.log(`${left} ${sing} ${right}`);
    switch (sing) {
      case "+":
        return (+left + (+right))+'';
        break;
      case "-":
        return (+left - +right)+'';
        break;
      case "*":
        return (+left * +right)+'';
        break;
      case "/":
        if (!+right) {
          throw new Error("TypeError: Division by zero.");
        } else {
          return (+left / +right)+'';
        }

        break;
    }
  }
}

module.exports = {
  expressionCalculator
};

 // const expr = '((1 + 2) * 3';
// // const result = -10.0227;

//   let answer = expressionCalculator(expr);
//    console.log('answer ' +answer);
// //   console.log( typeof answer);


// console.log('isNaN("2 +2"): ', isNaN(' 2 +2'));

//  function sum(num) {
//    num *2
//    return sum(num*2);
//  }

//console.log(Number(+'-51' + +'0.8181818181'));
