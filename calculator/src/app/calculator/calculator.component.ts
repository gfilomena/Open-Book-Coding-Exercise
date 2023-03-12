import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RandomService } from '../services/random.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnDestroy {
  constructor(private randomService: RandomService) {}

  listHistory: string[] = [];
  displayValue = '';
  isValid: boolean = true;
  private readonly unsubscribe$ = new Subject();

  handleKey(value: string) {
    if (value === 'C') {
      this.displayValue = '';
      return;
    } else if (value === 'RAND') {
      this.getRandomValue();
    } else {
      this.displayValue += value;
    }

    const expression = this.displayValue;
    this.isValid = this.isValidExpression(this.displayValue);
    if (this.isValid) {
      this.displayValue = this.evaluateMathExpression(
        this.displayValue
      ).toString();
      this.updateHistory(`${expression}  =  ${this.displayValue}`);
    }
  }

  getRandomValue() {
    this.randomService
      .getValue()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: Number) => (this.displayValue += value));
  }

  updateHistory(expression: string) {
    if (this.listHistory.length >= 5) {
      this.listHistory.shift();
    }
    this.listHistory.push(expression);
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

  isValidExpression(expr: string): boolean {
    // Remove any whitespace from the expression
    expr = expr.replace(/\s+/g, '');

    // Define a regex pattern to match valid expressions
    const pattern =
      /^(?:\d+(?:\.\d+)?|[\+\-]?\d+(?:\.\d+)?|\b(sin|cos|tan)\b\()|(?:[+\-*/()])$/;

    // Check if the expression matches the pattern
    if (!pattern.test(expr)) {
      return false;
    }

    // Count the number of open and closed parentheses
    let openParentheses = 0;
    let closedParentheses = 0;

    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '(') {
        openParentheses++;
      } else if (expr[i] === ')') {
        closedParentheses++;
      }

      // Check if there are more closed parentheses than open parentheses
      if (closedParentheses > openParentheses) {
        return false;
      }
    }

    // Check if the number of open parentheses equals the number of closed parentheses
    if (openParentheses !== closedParentheses) {
      return false;
    }

    // Check if the expression ends with an operator
    const lastChar = expr[expr.length - 1];
    if (
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/'
    ) {
      return false;
    }

    // The expression is valid
    return true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }
}
