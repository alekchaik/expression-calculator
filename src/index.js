function eval() {
  // Do not use eval!!!
  return;
}
function expressionCalculator(expr) {
  expr = expr.replace(/\s/g, "");
  let operands = ["*", "/", "-", "+", "(", ")"];
  let arr = [];
  let bracketsAmount = 0;
  this.parseArray = function(arr) {
    let test = {
      "*"(previousNum, num) {
        return previousNum * num;
      },
      "/"(previousNum, num) {
        if (num == 0) throw new Error("TypeError: Division by zero.");
        return previousNum / num;
      },
      "-"(previousNum, num) {
        return previousNum - num;
      },
      "+"(previousNum, num) {
        return previousNum + num;
      }
    };
    let operands = ["/", "*", "-", "+"];
    for (let i = 0; i < 4; i++) {
      while (arr.indexOf(operands[i]) != -1) {
        let index = arr.indexOf(operands[i]);
        let num = test[operands[i]](arr[index - 1], arr[index + 1]);
        let rightPart = arr.slice(index + 2);
        arr = arr.slice(0, index - 1);
        arr.push(num);
        arr = arr.concat(rightPart);
      }
    }
    return arr;
  };
  for (let i = 0; i < expr.length; i++) {
    let operandIndex;
    let num;
    if (!operands.includes(expr[i])) {
      operandIndex = expr.slice(i).search(/\D/);
      if (operandIndex != -1) {
        num = +expr.slice(i, i + operandIndex);
        i += operandIndex - 1;
        arr.push(num);
      } else {
        num = +expr.slice(i);
        arr.push(num);
        break;
      }
    } else {
      bracketsAmount += expr[i] == ")" ? 1 : expr[i] == "(" ? -1 : 0;
      arr.push(expr[i]);
    }
  }
  if (bracketsAmount != 0)
    throw new Error("ExpressionError: Brackets must be paired");
  let resArr;
  while (arr.includes("(")) {
    let openingIndex = arr.lastIndexOf("(");
    let closingIndex = arr.indexOf(")", openingIndex);
    resArr = arr.slice(0, openingIndex);
    resArr = resArr
      .concat(parseArray(arr.slice(openingIndex + 1, closingIndex)))
      .concat(arr.slice(closingIndex + 1));
    arr = [].concat(resArr);
  }
  resArr = parseArray(arr);
  return parseFloat(resArr.join(""));
}

module.exports = {
  expressionCalculator
};
