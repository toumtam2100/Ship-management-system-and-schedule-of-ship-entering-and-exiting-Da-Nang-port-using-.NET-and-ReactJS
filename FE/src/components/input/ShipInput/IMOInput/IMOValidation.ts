export const validateIMO = (inputValue: string): boolean => {
  
  const imoNumber = inputValue.startsWith('IMO') ? inputValue.slice(3) : inputValue;
  if (!/^\d{7}$/.test(imoNumber)) {
    //console.log(imoNumber + ' is in validateIMO');
    return false;
  }

  const digits = imoNumber.split('').map(Number);
  let sum = 0;

  for (let i = 0; i < 6; i++) {
    sum += digits[i] * (7 - i);
  }

  const calculatedCheckDigit = sum % 10;
  const checkDigit = digits[6];
  
  return checkDigit === calculatedCheckDigit;
};
