'use strict';

// Euler's Totient function, φ(n) [sometimes called the phi function], is used to determine the number of numbers less than n which are relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, φ(9)=6.

// n	Relatively Prime	φ(n)	n / φ(n)
// 2	1	                1	    2
// 3	1, 2	            2	    1.5
// 4	1, 3	            2	    2
// 5	1, 2, 3, 4	      4	    1.25
// 6	1, 5	            2	    3
// 7	1, 2, 3, 4, 5, 6	6	    1.1666...
// 8	1, 3, 5, 7	      4	    2
// 9	1, 2, 4, 5, 7, 8	6	    1.5
// 10	1, 3, 7, 9	      4	    2.5
// It can be seen that n = 6 produces a maximum n / φ(n) for n ≤ 10.

// Find the value of n ≤ 1,000,000 for which n / φ(n) is a maximum.

// const bigInt = require('big-integer');
const sieve = require('../../lib/sieve-of-atkin');

// const generatePrimes = limit => {
//   let number = 1;
//   const primeArray = [];
//   while (number <= limit){
//     if (bigInt(number).isPrime()){
//       primeArray.push(number);
//     }
//     number++;
//   }
//   return primeArray;
// };

const totientFunction = (number, primeArray) => {
  if (primeArray[number]){
    return number - 1;
  }

  const primeFactors = [];

  for (let prime in primeArray){
    if (!primeArray[prime]) continue;
    if (Number(prime) > number) break;
    if (number % Number(prime) === 0){
      primeFactors.push(prime);
    }
  }

  const totientFactors = [number];

  for (let prime of primeFactors){
    totientFactors.push((1 - (1 / prime)));
  }

  return totientFactors.reduce((ac, v) => v * ac, 1);
};

const maxNdivPhiN = limit => {
  const primeArray = sieve(limit);
  let maxN = null;
  let max = 0;
  let number = 2;

  while (number <= limit) {
    // console.log(number);
    const phiN = totientFunction(number, primeArray);
    if (number / phiN > max){
      max = number / phiN;
      maxN = number;
      // console.log(maxN, phiN);
    }
    number++;
  }
  return maxN;
};

console.log(maxNdivPhiN(1000000));