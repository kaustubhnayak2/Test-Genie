import { QuestionType } from '../../types/quiz';

export const biologyQuestions: QuestionType[] = [
  {
    text: "Which organelle is known as the 'powerhouse of the cell'?",
    options: [
      { text: "Mitochondria", isCorrect: true },
      { text: "Nucleus", isCorrect: false },
      { text: "Ribosome", isCorrect: false },
      { text: "Endoplasmic Reticulum", isCorrect: false }
    ],
    explanation: "Mitochondria are known as the 'powerhouse of the cell' because they generate most of the cell's supply of ATP (adenosine triphosphate), which is used as a source of chemical energy."
  },
  {
    text: "What is the primary function of DNA?",
    options: [
      { text: "Energy production", isCorrect: false },
      { text: "Protein synthesis", isCorrect: false },
      { text: "Genetic information storage", isCorrect: true },
      { text: "Cell movement", isCorrect: false }
    ],
    explanation: "DNA (deoxyribonucleic acid) serves as the primary storage molecule for genetic information in all living organisms."
  },
  {
    text: "Which of the following is NOT a nucleotide found in DNA?",
    options: [
      { text: "Adenine", isCorrect: false },
      { text: "Thymine", isCorrect: false },
      { text: "Uracil", isCorrect: true },
      { text: "Guanine", isCorrect: false }
    ],
    explanation: "Uracil is a nucleotide found in RNA, not DNA. DNA contains adenine, thymine, guanine, and cytosine."
  },
  {
    text: "Which process converts glucose into ATP without using oxygen?",
    options: [
      { text: "Photosynthesis", isCorrect: false },
      { text: "Anaerobic respiration", isCorrect: true },
      { text: "Aerobic respiration", isCorrect: false },
      { text: "Oxidative phosphorylation", isCorrect: false }
    ],
    explanation: "Anaerobic respiration is the process of converting glucose into ATP without using oxygen. This process is less efficient than aerobic respiration."
  },
  {
    text: "Which of the following is the correct order of taxonomic classification?",
    options: [
      { text: "Kingdom, Phylum, Class, Order, Family, Genus, Species", isCorrect: true },
      { text: "Kingdom, Class, Phylum, Order, Family, Genus, Species", isCorrect: false },
      { text: "Domain, Kingdom, Class, Order, Phylum, Family, Genus, Species", isCorrect: false },
      { text: "Species, Genus, Family, Order, Class, Phylum, Kingdom", isCorrect: false }
    ],
    explanation: "The correct order of taxonomic classification from most inclusive to most specific is: Kingdom, Phylum, Class, Order, Family, Genus, Species."
  },
  {
    text: "Which of the following is NOT a function of the liver?",
    options: [
      { text: "Detoxification of blood", isCorrect: false },
      { text: "Production of bile", isCorrect: false },
      { text: "Storage of glycogen", isCorrect: false },
      { text: "Production of insulin", isCorrect: true }
    ],
    explanation: "Insulin is produced by the pancreas, specifically by the beta cells in the islets of Langerhans, not by the liver."
  },
  {
    text: "What is the function of chlorophyll in plants?",
    options: [
      { text: "Absorb light energy for photosynthesis", isCorrect: true },
      { text: "Store energy as starch", isCorrect: false },
      { text: "Transport water throughout the plant", isCorrect: false },
      { text: "Regulate cell division", isCorrect: false }
    ],
    explanation: "Chlorophyll is a green pigment found in plants that absorbs light energy, which is then used in the process of photosynthesis to convert carbon dioxide and water into glucose and oxygen."
  },
  {
    text: "Which of the following is a vestigial structure in humans?",
    options: [
      { text: "Heart", isCorrect: false },
      { text: "Appendix", isCorrect: true },
      { text: "Brain", isCorrect: false },
      { text: "Liver", isCorrect: false }
    ],
    explanation: "The appendix is considered a vestigial structure in humans, meaning it has lost most of its original function through evolution. It may have a small role in immune function but is not essential."
  },
  {
    text: "What is the main function of white blood cells?",
    options: [
      { text: "Transport oxygen", isCorrect: false },
      { text: "Clot blood", isCorrect: false },
      { text: "Fight infection", isCorrect: true },
      { text: "Regulate body temperature", isCorrect: false }
    ],
    explanation: "White blood cells (leukocytes) are part of the immune system and primarily function to fight infections by recognizing and eliminating pathogens."
  },
  {
    text: "Which of the following is NOT a component of the central nervous system?",
    options: [
      { text: "Brain", isCorrect: false },
      { text: "Spinal cord", isCorrect: false },
      { text: "Sciatic nerve", isCorrect: true },
      { text: "Ventricles", isCorrect: false }
    ],
    explanation: "The sciatic nerve is part of the peripheral nervous system, not the central nervous system, which consists primarily of the brain and spinal cord."
  },
  {
    text: "What is the process by which plants make their own food using sunlight?",
    options: [
      { text: "Respiration", isCorrect: false },
      { text: "Transpiration", isCorrect: false },
      { text: "Photosynthesis", isCorrect: true },
      { text: "Fermentation", isCorrect: false }
    ],
    explanation: "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose."
  },
  {
    text: "Which of the following is an example of a dominant genetic trait in humans?",
    options: [
      { text: "Blue eyes", isCorrect: false },
      { text: "Attached earlobes", isCorrect: false },
      { text: "Free earlobes", isCorrect: true },
      { text: "Red-green colorblindness", isCorrect: false }
    ],
    explanation: "Free earlobes is a dominant genetic trait in humans, while attached earlobes is recessive."
  },
  {
    text: "What type of molecule is an enzyme?",
    options: [
      { text: "Lipid", isCorrect: false },
      { text: "Carbohydrate", isCorrect: false },
      { text: "Protein", isCorrect: true },
      { text: "Nucleic acid", isCorrect: false }
    ],
    explanation: "Enzymes are proteins that act as biological catalysts to speed up chemical reactions in cells without being consumed in the reaction."
  },
  {
    text: "Which of the following is NOT a function of bones?",
    options: [
      { text: "Protection of vital organs", isCorrect: false },
      { text: "Production of blood cells", isCorrect: false },
      { text: "Storage of minerals", isCorrect: false },
      { text: "Digestion of food", isCorrect: true }
    ],
    explanation: "Bones do not participate in the digestion of food. They provide structure, protect vital organs, produce blood cells in bone marrow, and store minerals like calcium and phosphorus."
  },
  {
    text: "Which hormone is responsible for regulating blood sugar levels?",
    options: [
      { text: "Estrogen", isCorrect: false },
      { text: "Testosterone", isCorrect: false },
      { text: "Insulin", isCorrect: true },
      { text: "Adrenaline", isCorrect: false }
    ],
    explanation: "Insulin, produced by the pancreas, regulates blood sugar levels by facilitating the absorption of glucose from the bloodstream into cells."
  },
  {
    text: "What is the largest organ in the human body?",
    options: [
      { text: "Heart", isCorrect: false },
      { text: "Liver", isCorrect: false },
      { text: "Skin", isCorrect: true },
      { text: "Brain", isCorrect: false }
    ],
    explanation: "The skin is the largest organ in the human body, with a surface area of about 2 square meters in adults."
  },
  {
    text: "Which of the following is NOT a function of the kidneys?",
    options: [
      { text: "Filtering blood", isCorrect: false },
      { text: "Regulating pH", isCorrect: false },
      { text: "Producing bile", isCorrect: true },
      { text: "Removing waste products", isCorrect: false }
    ],
    explanation: "Producing bile is a function of the liver, not the kidneys. The kidneys filter blood, remove waste products, regulate electrolyte balances, and help maintain pH levels."
  },
  {
    text: "Which of the following is an example of sexual reproduction?",
    options: [
      { text: "Budding in yeast", isCorrect: false },
      { text: "Binary fission in bacteria", isCorrect: false },
      { text: "Fertilization in humans", isCorrect: true },
      { text: "Regeneration in starfish", isCorrect: false }
    ],
    explanation: "Fertilization in humans is an example of sexual reproduction, which involves the fusion of gametes (sperm and egg) from two different individuals."
  },
  {
    text: "What is the primary function of the lymphatic system?",
    options: [
      { text: "Transport oxygen throughout the body", isCorrect: false },
      { text: "Return excess fluid to the blood", isCorrect: true },
      { text: "Regulate body temperature", isCorrect: false },
      { text: "Digest food", isCorrect: false }
    ],
    explanation: "The lymphatic system returns excess interstitial fluid to the blood and plays an important role in immune function by producing and activating lymphocytes."
  },
  {
    text: "What is the basic functional unit of the kidney?",
    options: [
      { text: "Alveolus", isCorrect: false },
      { text: "Neuron", isCorrect: false },
      { text: "Nephron", isCorrect: true },
      { text: "Hepatocyte", isCorrect: false }
    ],
    explanation: "The nephron is the basic functional unit of the kidney, responsible for filtering blood, reabsorbing useful substances, and eliminating wastes."
  },
  {
    text: "Which of the following is NOT a part of the digestive system?",
    options: [
      { text: "Esophagus", isCorrect: false },
      { text: "Gallbladder", isCorrect: false },
      { text: "Spleen", isCorrect: true },
      { text: "Pancreas", isCorrect: false }
    ],
    explanation: "The spleen is part of the lymphatic system, not the digestive system. It plays a role in filtering blood and recycling old red blood cells."
  },
  {
    text: "Which vitamin is produced when skin is exposed to sunlight?",
    options: [
      { text: "Vitamin A", isCorrect: false },
      { text: "Vitamin C", isCorrect: false },
      { text: "Vitamin D", isCorrect: true },
      { text: "Vitamin K", isCorrect: false }
    ],
    explanation: "Vitamin D is synthesized in the skin when it is exposed to ultraviolet B (UVB) rays from sunlight."
  },
  {
    text: "What is the scientific name for the human species?",
    options: [
      { text: "Homo sapiens", isCorrect: true },
      { text: "Homo erectus", isCorrect: false },
      { text: "Homo neanderthalensis", isCorrect: false },
      { text: "Homo habilis", isCorrect: false }
    ],
    explanation: "Homo sapiens is the scientific name for modern humans, meaning 'wise man' in Latin."
  },
  {
    text: "Which of the following is a correct statement about meiosis?",
    options: [
      { text: "It results in two identical daughter cells", isCorrect: false },
      { text: "It occurs in all body cells", isCorrect: false },
      { text: "It is involved in sexual reproduction", isCorrect: true },
      { text: "It does not involve DNA replication", isCorrect: false }
    ],
    explanation: "Meiosis is a type of cell division that occurs in sexually reproducing organisms and results in four haploid daughter cells (gametes) from a single diploid parent cell."
  },
  {
    text: "Which blood vessels carry blood away from the heart?",
    options: [
      { text: "Veins", isCorrect: false },
      { text: "Capillaries", isCorrect: false },
      { text: "Arteries", isCorrect: true },
      { text: "Venules", isCorrect: false }
    ],
    explanation: "Arteries are blood vessels that carry blood away from the heart to various tissues and organs throughout the body."
  },
  {
    text: "What is the function of hemoglobin in red blood cells?",
    options: [
      { text: "Fight infection", isCorrect: false },
      { text: "Transport oxygen", isCorrect: true },
      { text: "Clot blood", isCorrect: false },
      { text: "Produce antibodies", isCorrect: false }
    ],
    explanation: "Hemoglobin is a protein in red blood cells that binds to oxygen in the lungs and transports it to tissues throughout the body."
  },
  {
    text: "Which of the following is NOT a part of the human brain?",
    options: [
      { text: "Cerebellum", isCorrect: false },
      { text: "Medulla oblongata", isCorrect: false },
      { text: "Pituitary gland", isCorrect: false },
      { text: "Adrenal gland", isCorrect: true }
    ],
    explanation: "The adrenal gland is not part of the brain; it is an endocrine gland located above the kidneys that produces hormones such as adrenaline and cortisol."
  },
  {
    text: "What is the role of insulin in the body?",
    options: [
      { text: "Increase blood sugar levels", isCorrect: false },
      { text: "Decrease blood sugar levels", isCorrect: true },
      { text: "Increase heart rate", isCorrect: false },
      { text: "Decrease body temperature", isCorrect: false }
    ],
    explanation: "Insulin is a hormone that decreases blood sugar levels by promoting the uptake of glucose by cells and the storage of excess glucose as glycogen."
  },
  {
    text: "Which of the following is an autoimmune disease?",
    options: [
      { text: "Type 1 diabetes", isCorrect: true },
      { text: "Pneumonia", isCorrect: false },
      { text: "Malaria", isCorrect: false },
      { text: "Influenza", isCorrect: false }
    ],
    explanation: "Type 1 diabetes is an autoimmune disease in which the immune system attacks and destroys the insulin-producing beta cells in the pancreas."
  },
  {
    text: "What is the primary function of the large intestine?",
    options: [
      { text: "Digestion of food", isCorrect: false },
      { text: "Absorption of nutrients", isCorrect: false },
      { text: "Absorption of water and electrolytes", isCorrect: true },
      { text: "Production of bile", isCorrect: false }
    ],
    explanation: "The primary function of the large intestine is to absorb water and electrolytes from the digestive residue, forming and storing feces until elimination."
  }
]; 