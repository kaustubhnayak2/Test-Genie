import { QuestionType } from '../../types/quiz';

export const mathematicsQuestions: QuestionType[] = [
  {
    text: "What is the value of π (pi) to two decimal places?",
    options: [
      { text: "3.14", isCorrect: true },
      { text: "3.16", isCorrect: false },
      { text: "3.12", isCorrect: false },
      { text: "3.18", isCorrect: false }
    ],
    explanation: "π (pi) is approximately equal to 3.14159..., so to two decimal places it's 3.14."
  },
  {
    text: "What is the result of 7 × 8?",
    options: [
      { text: "54", isCorrect: false },
      { text: "56", isCorrect: true },
      { text: "58", isCorrect: false },
      { text: "52", isCorrect: false }
    ],
    explanation: "Multiplying 7 by 8 gives 56."
  },
  {
    text: "What is the square root of 144?",
    options: [
      { text: "12", isCorrect: true },
      { text: "14", isCorrect: false },
      { text: "10", isCorrect: false },
      { text: "16", isCorrect: false }
    ],
    explanation: "The square root of 144 is 12 because 12 × 12 = 144."
  },
  {
    text: "Which of these is a prime number?",
    options: [
      { text: "21", isCorrect: false },
      { text: "33", isCorrect: false },
      { text: "15", isCorrect: false },
      { text: "23", isCorrect: true }
    ],
    explanation: "23 is a prime number because it can only be divided by 1 and itself without a remainder."
  },
  {
    text: "What is the sum of the angles in a triangle?",
    options: [
      { text: "90 degrees", isCorrect: false },
      { text: "180 degrees", isCorrect: true },
      { text: "270 degrees", isCorrect: false },
      { text: "360 degrees", isCorrect: false }
    ],
    explanation: "The sum of the angles in any triangle is always 180 degrees."
  },
  {
    text: "What is the result of 12² (12 squared)?",
    options: [
      { text: "122", isCorrect: false },
      { text: "144", isCorrect: true },
      { text: "124", isCorrect: false },
      { text: "142", isCorrect: false }
    ],
    explanation: "12² = 12 × 12 = 144."
  },
  {
    text: "What is 3/4 as a decimal?",
    options: [
      { text: "0.75", isCorrect: true },
      { text: "0.67", isCorrect: false },
      { text: "0.7", isCorrect: false },
      { text: "0.8", isCorrect: false }
    ],
    explanation: "3/4 = 0.75 because 3 ÷ 4 = 0.75."
  },
  {
    text: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
    options: [
      { text: "24", isCorrect: false },
      { text: "32", isCorrect: true },
      { text: "20", isCorrect: false },
      { text: "30", isCorrect: false }
    ],
    explanation: "Each number in the sequence is multiplied by 2 to get the next number. So 16 × 2 = 32."
  },
  {
    text: "What is the value of 5! (5 factorial)?",
    options: [
      { text: "25", isCorrect: false },
      { text: "120", isCorrect: true },
      { text: "60", isCorrect: false },
      { text: "20", isCorrect: false }
    ],
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120."
  },
  {
    text: "What is the area of a circle with radius 5 cm?",
    options: [
      { text: "25π cm²", isCorrect: true },
      { text: "10π cm²", isCorrect: false },
      { text: "15π cm²", isCorrect: false },
      { text: "20π cm²", isCorrect: false }
    ],
    explanation: "The area of a circle is πr². With r = 5 cm, the area is π × 5² = 25π cm²."
  },
  {
    text: "What is the value of x in the equation 3x + 7 = 22?",
    options: [
      { text: "5", isCorrect: true },
      { text: "7", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "6", isCorrect: false }
    ],
    explanation: "3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 5"
  },
  {
    text: "What is the slope of a line that passes through the points (2, 3) and (6, 5)?",
    options: [
      { text: "0.5", isCorrect: true },
      { text: "1", isCorrect: false },
      { text: "2", isCorrect: false },
      { text: "1.5", isCorrect: false }
    ],
    explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (5 - 3)/(6 - 2) = 2/4 = 0.5"
  },
  {
    text: "What is the sum of the first 10 natural numbers?",
    options: [
      { text: "45", isCorrect: false },
      { text: "55", isCorrect: true },
      { text: "50", isCorrect: false },
      { text: "60", isCorrect: false }
    ],
    explanation: "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55."
  },
  {
    text: "What is the perimeter of a square with sides of length 9 cm?",
    options: [
      { text: "36 cm", isCorrect: true },
      { text: "81 cm", isCorrect: false },
      { text: "18 cm", isCorrect: false },
      { text: "27 cm", isCorrect: false }
    ],
    explanation: "The perimeter of a square is 4 × side length. So with sides of 9 cm, the perimeter is 4 × 9 = 36 cm."
  },
  {
    text: "Which number is not divisible by 3?",
    options: [
      { text: "21", isCorrect: false },
      { text: "33", isCorrect: false },
      { text: "17", isCorrect: true },
      { text: "27", isCorrect: false }
    ],
    explanation: "17 is not divisible by 3 because 17 ÷ 3 = 5 with a remainder of 2."
  },
  {
    text: "What is the simplest form of the fraction 24/36?",
    options: [
      { text: "6/9", isCorrect: false },
      { text: "4/6", isCorrect: false },
      { text: "2/3", isCorrect: true },
      { text: "3/4", isCorrect: false }
    ],
    explanation: "The greatest common divisor of 24 and 36 is 12. Dividing both numbers by 12 gives 24/36 = 2/3."
  },
  {
    text: "What is the volume of a cube with sides of length 4 cm?",
    options: [
      { text: "16 cm³", isCorrect: false },
      { text: "64 cm³", isCorrect: true },
      { text: "32 cm³", isCorrect: false },
      { text: "48 cm³", isCorrect: false }
    ],
    explanation: "The volume of a cube is (side length)³. So with sides of 4 cm, the volume is 4³ = 64 cm³."
  },
  {
    text: "What is the value of log₁₀(100)?",
    options: [
      { text: "10", isCorrect: false },
      { text: "2", isCorrect: true },
      { text: "1", isCorrect: false },
      { text: "20", isCorrect: false }
    ],
    explanation: "log₁₀(100) = 2 because 10² = 100."
  },
  {
    text: "Which of these is equal to 0.125?",
    options: [
      { text: "1/5", isCorrect: false },
      { text: "1/8", isCorrect: true },
      { text: "1/10", isCorrect: false },
      { text: "1/4", isCorrect: false }
    ],
    explanation: "0.125 = 125/1000 = 1/8 in simplified form."
  },
  {
    text: "What is the Pythagorean theorem?",
    options: [
      { text: "a² + b² = c²", isCorrect: true },
      { text: "a + b = c", isCorrect: false },
      { text: "a² - b² = c²", isCorrect: false },
      { text: "a × b = c", isCorrect: false }
    ],
    explanation: "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b): a² + b² = c²."
  },
  {
    text: "What is 20% of 80?",
    options: [
      { text: "16", isCorrect: true },
      { text: "18", isCorrect: false },
      { text: "20", isCorrect: false },
      { text: "14", isCorrect: false }
    ],
    explanation: "20% of 80 = 0.2 × 80 = 16."
  },
  {
    text: "What is the value of sin(90°)?",
    options: [
      { text: "0", isCorrect: false },
      { text: "1", isCorrect: true },
      { text: "2", isCorrect: false },
      { text: "0.5", isCorrect: false }
    ],
    explanation: "sin(90°) = 1."
  },
  {
    text: "What is the greatest common divisor (GCD) of 56 and 24?",
    options: [
      { text: "8", isCorrect: true },
      { text: "4", isCorrect: false },
      { text: "12", isCorrect: false },
      { text: "6", isCorrect: false }
    ],
    explanation: "The greatest common divisor of 56 and 24 is 8."
  },
  {
    text: "What is the result of (-3)²?",
    options: [
      { text: "-9", isCorrect: false },
      { text: "9", isCorrect: true },
      { text: "-6", isCorrect: false },
      { text: "6", isCorrect: false }
    ],
    explanation: "(-3)² = (-3) × (-3) = 9."
  },
  {
    text: "In a right triangle, if one angle is 90° and another is 30°, what is the measure of the third angle?",
    options: [
      { text: "60°", isCorrect: true },
      { text: "45°", isCorrect: false },
      { text: "30°", isCorrect: false },
      { text: "75°", isCorrect: false }
    ],
    explanation: "The sum of angles in a triangle is 180°. So the third angle is 180° - 90° - 30° = 60°."
  },
  {
    text: "What is the derivative of x³?",
    options: [
      { text: "3x²", isCorrect: true },
      { text: "x²", isCorrect: false },
      { text: "3x", isCorrect: false },
      { text: "4x³", isCorrect: false }
    ],
    explanation: "The derivative of x^n is n×x^(n-1), so the derivative of x³ is 3×x² = 3x²."
  },
  {
    text: "What is the circumference of a circle with diameter 10 cm?",
    options: [
      { text: "10π cm", isCorrect: true },
      { text: "5π cm", isCorrect: false },
      { text: "20π cm", isCorrect: false },
      { text: "100π cm", isCorrect: false }
    ],
    explanation: "The circumference of a circle is π × diameter. So with a diameter of 10 cm, the circumference is π × 10 = 10π cm."
  },
  {
    text: "What is the value of cos(0°)?",
    options: [
      { text: "0", isCorrect: false },
      { text: "1", isCorrect: true },
      { text: "-1", isCorrect: false },
      { text: "0.5", isCorrect: false }
    ],
    explanation: "cos(0°) = 1."
  },
  {
    text: "What is the slope of a horizontal line?",
    options: [
      { text: "0", isCorrect: true },
      { text: "1", isCorrect: false },
      { text: "Undefined", isCorrect: false },
      { text: "Depends on the line", isCorrect: false }
    ],
    explanation: "A horizontal line has a slope of 0 because its y-coordinate doesn't change as x increases."
  },
  {
    text: "What is the result of 2^8?",
    options: [
      { text: "256", isCorrect: true },
      { text: "128", isCorrect: false },
      { text: "64", isCorrect: false },
      { text: "512", isCorrect: false }
    ],
    explanation: "2^8 = 2×2×2×2×2×2×2×2 = 256."
  }
]; 