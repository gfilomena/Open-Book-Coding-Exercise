import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  input: string = '';
  result: string = '';
  displayValue = '';

  onButtonClick(value: string) {
    if (value === '=') {
      this.displayValue = this.evaluateMathExpression(
        this.displayValue
      ).toString();
    } else if (value === 'C') {
      this.displayValue = '';
    } else {
      this.displayValue += value;
    }
  }

  evaluateMathExpression(expression: string): number {
    const trigFunctions = ['sin', 'cos', 'tan'];

    for (const trigFunction of trigFunctions) {
      while (expression.includes(trigFunction)) {
        const start = expression.indexOf(trigFunction);
        const end = expression.indexOf(')', start);
        const arg = this.evaluateMathExpression(
          expression.slice(start + trigFunction.length + 1, end)
        );
        let value;
        switch (trigFunction) {
          case 'sin':
            value = Math.sin(arg);
            break;
          case 'cos':
            value = Math.cos(arg);
            break;
          case 'tan':
            value = Math.tan(arg);
            break;
        }

        expression =
          expression.slice(0, start) + value + expression.slice(end + 1);
      }
    }

    return eval(expression);
  }
}
