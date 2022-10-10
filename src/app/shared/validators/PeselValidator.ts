import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const PeselValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const arrayLetters = (control.value || '').split("");
  let sum = arrayLetters[0] * 1 + arrayLetters[1] * 3 + arrayLetters[2] * 7 + arrayLetters[3] * 9 + arrayLetters[4] * 1 +
    arrayLetters[5] * 3 + arrayLetters[6] * 7 + arrayLetters[7] * 9 + arrayLetters[8] * 1 + arrayLetters[9] * 3;
  const lastDigit = String(sum).slice(-1);
  const lastDigit2Num = Number(lastDigit);
  let isEqual: boolean;
  if (lastDigit2Num === 0) {
    isEqual = lastDigit2Num == arrayLetters[10];
  } else {
    isEqual = (10 - lastDigit2Num) == arrayLetters[10];
  }
  return isEqual ? null : {'pesel': true};
}
