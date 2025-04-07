import { QuestionType } from '../../types/quiz';

export const physicsQuestions: QuestionType[] = [
  {
    text: "What is Newton's First Law?",
    options: [
      { text: "Force equals mass times acceleration", isCorrect: false },
      { text: "Energy is conserved in isolated systems", isCorrect: false },
      { text: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force", isCorrect: true },
      { text: "For every action, there is an equal and opposite reaction", isCorrect: false }
    ],
    explanation: "Newton's First Law is also known as the Law of Inertia, which states that an object will maintain its state of rest or uniform motion in a straight line unless acted upon by an external force."
  },
  {
    text: "What is the SI unit of force?",
    options: [
      { text: "Joule", isCorrect: false },
      { text: "Newton", isCorrect: true },
      { text: "Watt", isCorrect: false },
      { text: "Pascal", isCorrect: false }
    ],
    explanation: "The SI unit of force is the Newton (N), which is defined as the force needed to accelerate a mass of one kilogram at a rate of one meter per second squared."
  },
  {
    text: "What is the speed of light in a vacuum?",
    options: [
      { text: "300,000 kilometers per second", isCorrect: true },
      { text: "300,000 meters per second", isCorrect: false },
      { text: "3,000,000 kilometers per second", isCorrect: false },
      { text: "30,000 kilometers per second", isCorrect: false }
    ],
    explanation: "The speed of light in a vacuum is approximately 2.99792458 × 10^8 meters per second, which is commonly rounded to 300,000 kilometers per second."
  },
  {
    text: "Which of these is NOT a fundamental force in physics?",
    options: [
      { text: "Gravitational force", isCorrect: false },
      { text: "Electromagnetic force", isCorrect: false },
      { text: "Nuclear force", isCorrect: false },
      { text: "Centrifugal force", isCorrect: true }
    ],
    explanation: "Centrifugal force is not a fundamental force in physics; it's actually a fictitious force. The four fundamental forces are gravitational, electromagnetic, strong nuclear, and weak nuclear forces."
  },
  {
    text: "What is the formula for kinetic energy?",
    options: [
      { text: "KE = m²v", isCorrect: false },
      { text: "KE = ½ mv²", isCorrect: true },
      { text: "KE = mv", isCorrect: false },
      { text: "KE = ½ m²v", isCorrect: false }
    ],
    explanation: "The kinetic energy of an object is defined as KE = ½ mv², where m is the mass and v is the velocity."
  },
  {
    text: "What principle states that energy cannot be created or destroyed, only transformed from one form to another?",
    options: [
      { text: "Newton's Third Law", isCorrect: false },
      { text: "Law of Conservation of Energy", isCorrect: true },
      { text: "Law of Conservation of Momentum", isCorrect: false },
      { text: "Heisenberg's Uncertainty Principle", isCorrect: false }
    ],
    explanation: "The Law of Conservation of Energy states that the total energy of an isolated system remains constant; it is neither created nor destroyed, just transformed from one form to another."
  },
  {
    text: "What is the unit of electrical resistance?",
    options: [
      { text: "Ohm", isCorrect: true },
      { text: "Volt", isCorrect: false },
      { text: "Ampere", isCorrect: false },
      { text: "Watt", isCorrect: false }
    ],
    explanation: "The unit of electrical resistance is the Ohm (Ω), named after German physicist Georg Simon Ohm."
  },
  {
    text: "What is Ohm's Law?",
    options: [
      { text: "V = IR", isCorrect: true },
      { text: "F = ma", isCorrect: false },
      { text: "E = mc²", isCorrect: false },
      { text: "P = VI", isCorrect: false }
    ],
    explanation: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage and inversely proportional to the resistance, expressed as V = IR, where V is voltage, I is current, and R is resistance."
  },
  {
    text: "Which scientist is credited with the Theory of Relativity?",
    options: [
      { text: "Isaac Newton", isCorrect: false },
      { text: "Albert Einstein", isCorrect: true },
      { text: "Niels Bohr", isCorrect: false },
      { text: "Max Planck", isCorrect: false }
    ],
    explanation: "Albert Einstein is credited with developing both the Special Theory of Relativity (1905) and the General Theory of Relativity (1915)."
  },
  {
    text: "What is the SI unit of electric current?",
    options: [
      { text: "Volt", isCorrect: false },
      { text: "Watt", isCorrect: false },
      { text: "Ampere", isCorrect: true },
      { text: "Coulomb", isCorrect: false }
    ],
    explanation: "The SI unit of electric current is the Ampere (A), named after the French physicist André-Marie Ampère."
  },
  {
    text: "What phenomenon describes the change in frequency of a wave in relation to an observer moving relative to the wave source?",
    options: [
      { text: "Refraction", isCorrect: false },
      { text: "Diffraction", isCorrect: false },
      { text: "Doppler Effect", isCorrect: true },
      { text: "Interference", isCorrect: false }
    ],
    explanation: "The Doppler Effect describes the change in frequency of a wave in relation to an observer moving relative to the wave source, such as the change in pitch of a siren as it passes by."
  },
  {
    text: "What is the formula for force?",
    options: [
      { text: "F = ma", isCorrect: true },
      { text: "F = mv", isCorrect: false },
      { text: "F = mg", isCorrect: false },
      { text: "F = mc²", isCorrect: false }
    ],
    explanation: "According to Newton's Second Law, force equals mass times acceleration, expressed as F = ma."
  },
  {
    text: "Which of these waves does NOT require a medium to travel?",
    options: [
      { text: "Sound waves", isCorrect: false },
      { text: "Water waves", isCorrect: false },
      { text: "Seismic waves", isCorrect: false },
      { text: "Electromagnetic waves", isCorrect: true }
    ],
    explanation: "Electromagnetic waves, including light, can travel through a vacuum and do not require a medium, unlike mechanical waves such as sound, water, or seismic waves."
  },
  {
    text: "What is the law of universal gravitation formulated by Isaac Newton?",
    options: [
      { text: "The force of gravity is proportional to mass", isCorrect: false },
      { text: "Every object in the universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them", isCorrect: true },
      { text: "Objects fall at the same rate regardless of mass", isCorrect: false },
      { text: "The force of gravity is constant throughout the universe", isCorrect: false }
    ],
    explanation: "Newton's Law of Universal Gravitation states that every particle attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them."
  },
  {
    text: "What is the SI unit of power?",
    options: [
      { text: "Joule", isCorrect: false },
      { text: "Newton", isCorrect: false },
      { text: "Watt", isCorrect: true },
      { text: "Pascal", isCorrect: false }
    ],
    explanation: "The SI unit of power is the Watt (W), named after the Scottish engineer James Watt. One watt is defined as one joule per second."
  },
  {
    text: "What is the formula for work?",
    options: [
      { text: "W = F × d × cosθ", isCorrect: true },
      { text: "W = m × g × h", isCorrect: false },
      { text: "W = ½ × m × v²", isCorrect: false },
      { text: "W = P × t", isCorrect: false }
    ],
    explanation: "Work is calculated as force times displacement times the cosine of the angle between them: W = F × d × cosθ. When force and displacement are parallel, cosθ = 1, simplifying to W = F × d."
  },
  {
    text: "What is the principle behind a hydraulic system?",
    options: [
      { text: "Bernoulli's principle", isCorrect: false },
      { text: "Archimedes' principle", isCorrect: false },
      { text: "Pascal's principle", isCorrect: true },
      { text: "Newton's principle", isCorrect: false }
    ],
    explanation: "Hydraulic systems operate based on Pascal's principle, which states that pressure applied to an enclosed fluid is transmitted undiminished to all parts of the fluid and to the walls of the container."
  },
  {
    text: "What is the relationship between frequency (f) and wavelength (λ) of a wave?",
    options: [
      { text: "f = λ × v", isCorrect: false },
      { text: "f × λ = v", isCorrect: true },
      { text: "f = v / λ", isCorrect: false },
      { text: "λ = f / v", isCorrect: false }
    ],
    explanation: "The relationship between frequency and wavelength is f × λ = v, where v is the wave velocity. This can also be expressed as f = v/λ or λ = v/f."
  },
  {
    text: "What is the SI unit of energy?",
    options: [
      { text: "Newton", isCorrect: false },
      { text: "Watt", isCorrect: false },
      { text: "Joule", isCorrect: true },
      { text: "Pascal", isCorrect: false }
    ],
    explanation: "The SI unit of energy is the Joule (J), named after the English physicist James Prescott Joule."
  },
  {
    text: "Which of these statements best describes Boyle's Law?",
    options: [
      { text: "The volume of a gas is directly proportional to its temperature at constant pressure", isCorrect: false },
      { text: "The pressure of a gas is directly proportional to its temperature at constant volume", isCorrect: false },
      { text: "The pressure of a gas is inversely proportional to its volume at constant temperature", isCorrect: true },
      { text: "The volume of a gas is inversely proportional to its temperature at constant pressure", isCorrect: false }
    ],
    explanation: "Boyle's Law states that the pressure of a gas is inversely proportional to its volume at constant temperature, which can be expressed as P₁V₁ = P₂V₂."
  },
  {
    text: "What is the formula for density?",
    options: [
      { text: "Density = Mass × Volume", isCorrect: false },
      { text: "Density = Mass / Volume", isCorrect: true },
      { text: "Density = Volume / Mass", isCorrect: false },
      { text: "Density = Mass + Volume", isCorrect: false }
    ],
    explanation: "Density is calculated as mass divided by volume: ρ = m/V."
  },
  {
    text: "What type of energy is possessed by an object due to its position or state?",
    options: [
      { text: "Kinetic energy", isCorrect: false },
      { text: "Thermal energy", isCorrect: false },
      { text: "Potential energy", isCorrect: true },
      { text: "Electrical energy", isCorrect: false }
    ],
    explanation: "Potential energy is the energy possessed by an object due to its position or state, such as gravitational potential energy for an object at height or elastic potential energy in a stretched spring."
  },
  {
    text: "Which law of thermodynamics states that entropy in an isolated system always increases over time?",
    options: [
      { text: "Zeroth Law", isCorrect: false },
      { text: "First Law", isCorrect: false },
      { text: "Second Law", isCorrect: true },
      { text: "Third Law", isCorrect: false }
    ],
    explanation: "The Second Law of Thermodynamics states that the entropy of an isolated system always increases over time, or remains constant in ideal cases."
  },
  {
    text: "What does Archimedes' Principle state?",
    options: [
      { text: "Any object completely or partially immersed in a fluid experiences an upward force equal to the weight of the fluid displaced", isCorrect: true },
      { text: "Objects with the same volume have the same density", isCorrect: false },
      { text: "The pressure in a fluid decreases with depth", isCorrect: false },
      { text: "Objects float if their density is less than the fluid they're in", isCorrect: false }
    ],
    explanation: "Archimedes' Principle states that any object completely or partially immersed in a fluid experiences an upward force (buoyancy) equal to the weight of the fluid displaced by the object."
  },
  {
    text: "What is the photoelectric effect?",
    options: [
      { text: "The emission of light by heated objects", isCorrect: false },
      { text: "The emission of electrons when light shines on a material", isCorrect: true },
      { text: "The bending of light as it passes through a material", isCorrect: false },
      { text: "The splitting of light into its component colors", isCorrect: false }
    ],
    explanation: "The photoelectric effect is the emission of electrons when light shines on a material, particularly metals. Einstein's explanation of this phenomenon helped establish the particle nature of light (photons)."
  },
  {
    text: "What is the formula for acceleration?",
    options: [
      { text: "a = v/t", isCorrect: false },
      { text: "a = (v - u)/t", isCorrect: true },
      { text: "a = v×t", isCorrect: false },
      { text: "a = s/t²", isCorrect: false }
    ],
    explanation: "Acceleration is the rate of change of velocity with respect to time, calculated as a = (v - u)/t, where v is final velocity, u is initial velocity, and t is time."
  },
  {
    text: "Which of these is NOT a state of matter?",
    options: [
      { text: "Solid", isCorrect: false },
      { text: "Liquid", isCorrect: false },
      { text: "Gas", isCorrect: false },
      { text: "Element", isCorrect: true }
    ],
    explanation: "Element is not a state of matter; it's a type of substance. The classical states of matter are solid, liquid, and gas, with additional states including plasma and Bose-Einstein condensates."
  },
  {
    text: "What is the SI unit of magnetic flux density?",
    options: [
      { text: "Tesla", isCorrect: true },
      { text: "Weber", isCorrect: false },
      { text: "Henry", isCorrect: false },
      { text: "Farad", isCorrect: false }
    ],
    explanation: "The SI unit of magnetic flux density (magnetic field strength) is the Tesla (T), named after the Serbian-American inventor Nikola Tesla."
  },
  {
    text: "Who proposed the quantum theory?",
    options: [
      { text: "Albert Einstein", isCorrect: false },
      { text: "Niels Bohr", isCorrect: false },
      { text: "Max Planck", isCorrect: true },
      { text: "Werner Heisenberg", isCorrect: false }
    ],
    explanation: "Max Planck proposed the quantum theory in 1900, suggesting that energy could only be emitted or absorbed in discrete units or quanta, which revolutionized our understanding of atomic and subatomic processes."
  }
]; 