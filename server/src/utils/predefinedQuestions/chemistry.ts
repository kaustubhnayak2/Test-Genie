import { QuestionType } from '../../types/quiz';

export const chemistryQuestions: QuestionType[] = [
  {
    text: "What is the chemical symbol for gold?",
    options: [
      { text: "Go", isCorrect: false },
      { text: "Gd", isCorrect: false },
      { text: "Au", isCorrect: true },
      { text: "Ag", isCorrect: false }
    ],
    explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum' meaning gold."
  },
  {
    text: "Which of the following is NOT a state of matter?",
    options: [
      { text: "Solid", isCorrect: false },
      { text: "Liquid", isCorrect: false },
      { text: "Gas", isCorrect: false },
      { text: "Element", isCorrect: true }
    ],
    explanation: "Element is not a state of matter. The four common states of matter are solid, liquid, gas, and plasma."
  },
  {
    text: "What is the pH of a neutral solution at 25°C?",
    options: [
      { text: "0", isCorrect: false },
      { text: "7", isCorrect: true },
      { text: "14", isCorrect: false },
      { text: "1", isCorrect: false }
    ],
    explanation: "A neutral solution has a pH of 7 at 25°C. Solutions with pH less than 7 are acidic, and those with pH greater than 7 are basic."
  },
  {
    text: "Which element has the highest electronegativity?",
    options: [
      { text: "Oxygen", isCorrect: false },
      { text: "Chlorine", isCorrect: false },
      { text: "Fluorine", isCorrect: true },
      { text: "Nitrogen", isCorrect: false }
    ],
    explanation: "Fluorine has the highest electronegativity value (3.98 on the Pauling scale) of all elements in the periodic table."
  },
  {
    text: "What is the chemical formula for sodium chloride?",
    options: [
      { text: "NaCl₂", isCorrect: false },
      { text: "Na₂Cl", isCorrect: false },
      { text: "NaCl", isCorrect: true },
      { text: "Na₂Cl₂", isCorrect: false }
    ],
    explanation: "Sodium chloride (table salt) has the chemical formula NaCl, representing one sodium ion (Na⁺) bonded to one chloride ion (Cl⁻)."
  },
  {
    text: "Which of the following is an example of a chemical change?",
    options: [
      { text: "Melting ice", isCorrect: false },
      { text: "Cutting paper", isCorrect: false },
      { text: "Boiling water", isCorrect: false },
      { text: "Burning wood", isCorrect: true }
    ],
    explanation: "Burning wood is a chemical change as it involves a chemical reaction (combustion) that produces new substances. The other options are physical changes that don't alter the chemical composition."
  },
  {
    text: "What is the main component of natural gas?",
    options: [
      { text: "Ethane", isCorrect: false },
      { text: "Methane", isCorrect: true },
      { text: "Propane", isCorrect: false },
      { text: "Butane", isCorrect: false }
    ],
    explanation: "Methane (CH₄) is the primary component of natural gas, typically making up about 70-90% of its composition."
  },
  {
    text: "Which subatomic particle has a positive charge?",
    options: [
      { text: "Proton", isCorrect: true },
      { text: "Neutron", isCorrect: false },
      { text: "Electron", isCorrect: false },
      { text: "Photon", isCorrect: false }
    ],
    explanation: "Protons have a positive charge, neutrons have no charge (neutral), and electrons have a negative charge."
  },
  {
    text: "What is the chemical formula for water?",
    options: [
      { text: "H₂O", isCorrect: true },
      { text: "CO₂", isCorrect: false },
      { text: "H₂O₂", isCorrect: false },
      { text: "HO", isCorrect: false }
    ],
    explanation: "Water has the chemical formula H₂O, representing two hydrogen atoms bonded to one oxygen atom."
  },
  {
    text: "Which of the following elements is a noble gas?",
    options: [
      { text: "Chlorine", isCorrect: false },
      { text: "Oxygen", isCorrect: false },
      { text: "Argon", isCorrect: true },
      { text: "Sodium", isCorrect: false }
    ],
    explanation: "Argon is a noble gas, which are elements in Group 18 of the periodic table characterized by their full valence electron shells and chemical inertness."
  },
  {
    text: "What is the most abundant element in the Earth's crust?",
    options: [
      { text: "Silicon", isCorrect: false },
      { text: "Oxygen", isCorrect: true },
      { text: "Aluminum", isCorrect: false },
      { text: "Iron", isCorrect: false }
    ],
    explanation: "Oxygen is the most abundant element in the Earth's crust, making up approximately 46% by mass."
  },
  {
    text: "Which of the following is NOT an example of an acid?",
    options: [
      { text: "Hydrochloric acid", isCorrect: false },
      { text: "Acetic acid", isCorrect: false },
      { text: "Sulfuric acid", isCorrect: false },
      { text: "Sodium hydroxide", isCorrect: true }
    ],
    explanation: "Sodium hydroxide (NaOH) is not an acid; it is a strong base (alkali). The other options are all acids."
  },
  {
    text: "What type of chemical reaction occurs when two or more substances combine to form a new compound?",
    options: [
      { text: "Decomposition reaction", isCorrect: false },
      { text: "Single replacement reaction", isCorrect: false },
      { text: "Double replacement reaction", isCorrect: false },
      { text: "Synthesis reaction", isCorrect: true }
    ],
    explanation: "A synthesis reaction (also called a combination reaction) occurs when two or more simple substances combine to form a more complex product."
  },
  {
    text: "Which of the following is a molecular compound?",
    options: [
      { text: "NaCl", isCorrect: false },
      { text: "H₂O", isCorrect: true },
      { text: "CaO", isCorrect: false },
      { text: "MgCl₂", isCorrect: false }
    ],
    explanation: "H₂O (water) is a molecular compound formed by covalent bonding between atoms. The other options are ionic compounds."
  },
  {
    text: "What is the chemical name for baking soda?",
    options: [
      { text: "Sodium chloride", isCorrect: false },
      { text: "Sodium hydroxide", isCorrect: false },
      { text: "Sodium bicarbonate", isCorrect: true },
      { text: "Sodium carbonate", isCorrect: false }
    ],
    explanation: "Baking soda is sodium bicarbonate (NaHCO₃), which is a chemical compound with wide-ranging applications including baking, cleaning, and as a pH buffer."
  },
  {
    text: "What law states that energy can neither be created nor destroyed?",
    options: [
      { text: "Law of Conservation of Mass", isCorrect: false },
      { text: "Law of Conservation of Energy", isCorrect: true },
      { text: "Law of Definite Proportions", isCorrect: false },
      { text: "Law of Multiple Proportions", isCorrect: false }
    ],
    explanation: "The Law of Conservation of Energy states that energy cannot be created or destroyed, only transformed from one form to another."
  },
  {
    text: "Which of the following is NOT a type of chemical bond?",
    options: [
      { text: "Ionic bond", isCorrect: false },
      { text: "Covalent bond", isCorrect: false },
      { text: "Metallic bond", isCorrect: false },
      { text: "Nuclear bond", isCorrect: true }
    ],
    explanation: "Nuclear bond is not a type of chemical bond. The three main types of chemical bonds are ionic, covalent, and metallic bonds."
  },
  {
    text: "What is the functional group in alcohols?",
    options: [
      { text: "Carboxyl group (-COOH)", isCorrect: false },
      { text: "Carbonyl group (C=O)", isCorrect: false },
      { text: "Hydroxyl group (-OH)", isCorrect: true },
      { text: "Amino group (-NH₂)", isCorrect: false }
    ],
    explanation: "Alcohols are characterized by the presence of a hydroxyl (-OH) functional group attached to a carbon atom."
  },
  {
    text: "Which of the following elements is a transition metal?",
    options: [
      { text: "Sodium", isCorrect: false },
      { text: "Calcium", isCorrect: false },
      { text: "Iron", isCorrect: true },
      { text: "Bromine", isCorrect: false }
    ],
    explanation: "Iron is a transition metal, characterized by the partially filled d-orbital and typically located in the middle section of the periodic table."
  },
  {
    text: "What is the process of separating components of a mixture based on their different boiling points?",
    options: [
      { text: "Filtration", isCorrect: false },
      { text: "Chromatography", isCorrect: false },
      { text: "Distillation", isCorrect: true },
      { text: "Crystallization", isCorrect: false }
    ],
    explanation: "Distillation is a method of separating components of a mixture based on their different boiling points by heating the mixture and selectively condensing the vapor."
  },
  {
    text: "Which of these elements has the highest atomic number?",
    options: [
      { text: "Carbon", isCorrect: false },
      { text: "Nitrogen", isCorrect: false },
      { text: "Oxygen", isCorrect: false },
      { text: "Fluorine", isCorrect: true }
    ],
    explanation: "Fluorine has the highest atomic number (9) among the options. Carbon has 6, nitrogen has 7, and oxygen has 8."
  },
  {
    text: "What is the chemical formula for sulfuric acid?",
    options: [
      { text: "H₂SO₃", isCorrect: false },
      { text: "H₂SO₄", isCorrect: true },
      { text: "HNO₃", isCorrect: false },
      { text: "HCl", isCorrect: false }
    ],
    explanation: "Sulfuric acid has the chemical formula H₂SO₄. It is a strong, corrosive acid commonly used in various industrial applications."
  },
  {
    text: "Which of the following is NOT a greenhouse gas?",
    options: [
      { text: "Carbon dioxide", isCorrect: false },
      { text: "Methane", isCorrect: false },
      { text: "Water vapor", isCorrect: false },
      { text: "Nitrogen", isCorrect: true }
    ],
    explanation: "Nitrogen (N₂) is not a greenhouse gas. Common greenhouse gases include carbon dioxide, methane, water vapor, and nitrous oxide (not to be confused with nitrogen gas)."
  },
  {
    text: "What is the process by which a solid changes directly to a gas without passing through the liquid state?",
    options: [
      { text: "Evaporation", isCorrect: false },
      { text: "Condensation", isCorrect: false },
      { text: "Sublimation", isCorrect: true },
      { text: "Deposition", isCorrect: false }
    ],
    explanation: "Sublimation is the process by which a solid changes directly to a gas without passing through the liquid state. An example is dry ice (solid CO₂) changing directly to gaseous CO₂."
  },
  {
    text: "Which of these is NOT an allotrope of carbon?",
    options: [
      { text: "Diamond", isCorrect: false },
      { text: "Graphite", isCorrect: false },
      { text: "Fullerene", isCorrect: false },
      { text: "Oxygen", isCorrect: true }
    ],
    explanation: "Oxygen is not an allotrope of carbon. Diamond, graphite, and fullerenes are all allotropes of carbon, which means they are different structural forms of the same element."
  },
  {
    text: "What is the chemical process by which fats and oils are converted to soap?",
    options: [
      { text: "Hydrogenation", isCorrect: false },
      { text: "Saponification", isCorrect: true },
      { text: "Esterification", isCorrect: false },
      { text: "Fermentation", isCorrect: false }
    ],
    explanation: "Saponification is the chemical reaction between a fat or oil and a base (like sodium hydroxide) that produces soap and glycerol."
  },
  {
    text: "Which element has the electron configuration 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s² 4d¹⁰ 5p⁶ 6s² 4f¹⁴ 5d¹⁰ 6p⁶ 7s² 5f¹⁴ 6d¹?",
    options: [
      { text: "Gold", isCorrect: false },
      { text: "Lead", isCorrect: false },
      { text: "Lawrencium", isCorrect: true },
      { text: "Mercury", isCorrect: false }
    ],
    explanation: "Lawrencium (Lr, element 103) has this electron configuration. It's a synthetic actinide element with atomic number 103."
  },
  {
    text: "What type of reaction occurs when an acid and a base combine?",
    options: [
      { text: "Redox reaction", isCorrect: false },
      { text: "Neutralization reaction", isCorrect: true },
      { text: "Combustion reaction", isCorrect: false },
      { text: "Decomposition reaction", isCorrect: false }
    ],
    explanation: "A neutralization reaction occurs when an acid and a base combine, typically producing a salt and water."
  },
  {
    text: "What is the most common isotope of hydrogen called?",
    options: [
      { text: "Protium", isCorrect: true },
      { text: "Deuterium", isCorrect: false },
      { text: "Tritium", isCorrect: false },
      { text: "Hydrogen-1", isCorrect: false }
    ],
    explanation: "Protium (¹H) is the most common isotope of hydrogen, consisting of one proton and no neutrons, and makes up about 99.98% of all hydrogen atoms."
  },
  {
    text: "Which of the following is a reducing agent?",
    options: [
      { text: "H⁺", isCorrect: false },
      { text: "O₂", isCorrect: false },
      { text: "Cl₂", isCorrect: false },
      { text: "H₂", isCorrect: true }
    ],
    explanation: "Hydrogen gas (H₂) is a reducing agent, which means it can donate electrons to another species in a redox reaction, causing the other species to be reduced while the hydrogen is oxidized."
  }
]; 