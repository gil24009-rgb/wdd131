"use strict";

/*
  Ponder: JS Variables and Constants
  All output goes to the console.
*/

console.clear();
console.log("Ponder: JS Variables and Constants");

console.group("1) Constants and Variables");

const PI = 3.14;
let radius = 3;

console.log("PI:", PI);
console.log("radius:", radius);

const area1 = PI * radius * radius;
console.log("area with radius 3:", area1);

radius = 5;
const area2 = PI * radius * radius;
console.log("radius after update:", radius);
console.log("area with radius 5:", area2);

try {
  // Demonstrate that constants cannot be reassigned
  // This will throw in strict mode
  // eslint-disable-next-line no-const-assign
  PI = 3.14159;
} catch (err) {
  console.log("Reassigning PI throws an error as expected:", err.message);
}

console.groupEnd();

console.group("2) Type Coercion");

const one = 1;
const two = "2";

console.log("one (number):", one, "type:", typeof one);
console.log("two (string):", two, "type:", typeof two);

console.log("one + two:", one + two, "result type:", typeof (one + two));
console.log("one - two:", one - two, "result type:", typeof (one - two));
console.log("one * two:", one * two, "result type:", typeof (one * two));
console.log("one / two:", one / two, "result type:", typeof (one / two));

const twoAsNumber = Number(two);
console.log("Number(two):", twoAsNumber, "type:", typeof twoAsNumber);
console.log("one + Number(two):", one + twoAsNumber);

const sample = "12px";
console.log("parseInt('12px', 10):", parseInt(sample, 10));
console.log("Number('12px'):", Number(sample), "NaN means not a valid number");

const value = 10;
console.log("String(10) + ' apples':", String(value) + " apples");
console.log("Template literal example:", `${value} apples`);

console.groupEnd();

console.group("3) Global and Block Scope");

let course = "CSE131"; // global scope

if (true) {
  let student = "John"; // block scope
  const cohort = "Winter"; // block scope constant

  console.log("Inside block, course:", course);
  console.log("Inside block, student:", student);
  console.log("Inside block, cohort:", cohort);

  // Shadowing example
  let courseShadow = "CSE131";
  if (true) {
    let courseShadow = "WDD131";
    console.log("Inside nested block, courseShadow:", courseShadow);
  }
  console.log("Back to outer block, courseShadow:", courseShadow);
}

console.log("Outside block, course:", course);

try {
  // student is not defined here because it was block scoped
  // ReferenceError will be caught so the script continues
  // eslint-disable-next-line no-undef
  console.log(student);
} catch (err) {
  console.log("Accessing a block scoped variable outside the block fails:", err.message);
}

console.groupEnd();

console.log("Done. Review groups above for each concept.");