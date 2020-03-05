function expressionCalculator(expr) {

 let regExpArrFirst = [/\([^\(\)]*\)/,
  /(?<leftNum>\-?\d+(\.\d+)?\b)[\s+]?(?<sing>[/*])[\s+]?(?<rightNum>\-?\d+(\.\d+)?\b)/, 
  /(?<leftNum>\-?\d+(\.\d+)?\b)[\s+]?(?<sing>[+-])[\s+]?(?<rightNum>\-?\d+(\.\d+)?\b)/];
  for (let i = 0; i < 3; i++) {

    let miniExpr = expr.match(regExpArrFirst[i]);

    if (i === 0 && miniExpr) {
      let str = miniExpr[0].slice(1, -1);
    expr = expr.replace(regExpArrFirst[i],  expressionCalculator(str))+'';
    return expressionCalculator(expr);
    } else if (miniExpr == null) {
      continue;
    }
    if (miniExpr) {
      let {leftNum , rightNum, sing} = miniExpr.groups;
        if (sing) {
          let newExpr = expr.replace(
            regExpArrFirst[i],
            caclulator(leftNum, sing[0], rightNum)
          );
          return expressionCalculator(newExpr);
        }   
    }
  }
  if (Number(expr) || expr == 0) {
    return Number(expr);
  } else if (expr.match(/\s/)) {
      expr = expr.split(' ').join('');
    return expressionCalculator(expr);
    } else if (isNaN(expr)){
     console.log(expr);
    throw new Error("ExpressionError: Brackets must be paired");
  }
  

  function caclulator(left, sing, right) { // возвращяем строку
    switch (sing) {
      case "+":
        return (+left + (+right))+'';
      case "-":
        return (+left - +right)+'';
      case "*":
        return (+left * +right)+'';
      case "/":
        if (!+right) {
          throw new Error("TypeError: Division by zero.");
        } else {
          return (+left / +right).toFixed(15)+'';
        }
    }
  }
}

module.exports = {
  expressionCalculator
};


