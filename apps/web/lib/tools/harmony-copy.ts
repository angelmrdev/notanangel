export const harmonyCopy = {
  "B01": {
    "en": [
      "Interactive Camelot Wheel",
      "Explore all 24 musical keys and find compatible transitions for harmonic DJ mixing.",
      "Select a key on the wheel or in the menu. The highlighted keys show the same key, its relative major or minor, and adjacent keys.",
      "For example, 8A (A minor) connects to 7A, 9A and 8B (C major). Listen to the overlapping melodies before committing to a transition.",
      "Does the wheel guarantee a good mix?",
      "No. Arrangement, bass lines, tempo and the accuracy of key detection also matter."
    ],
    "es": [
      "Rueda Camelot interactiva",
      "Explora las 24 tonalidades y encuentra transiciones compatibles para la mezcla armónica DJ.",
      "Selecciona una tonalidad en la rueda o en el menú. Se resaltan la misma tonalidad, su relativa mayor o menor y las tonalidades vecinas.",
      "Por ejemplo, 8A (La menor) conecta con 7A, 9A y 8B (Do mayor). Escucha las melodías superpuestas antes de realizar la transición.",
      "¿La rueda garantiza una buena mezcla?",
      "No. También influyen los arreglos, los bajos, el tempo y la precisión del análisis tonal."
    ]
  },
  "B02": {
    "en": [
      "Musical Key Converter – Camelot & Open Key",
      "Free musical key converter: search all 24 major and minor keys, convert Camelot and Open Key codes, and explore enharmonic spellings and scales.",
      "Choose a key from the menu using any of the three displayed notations. The result shows their equivalents.",
      "A minor is 8A in Camelot and 1m in Open Key. C major is 8B and 1d. Enharmonic spellings such as G sharp and A flat refer to the same pitch class in equal temperament.",
      "Does conversion change the sound?",
      "No. These are different labels for the same key; no audio is transposed."
    ],
    "es": [
      "Conversor de tonalidades – Camelot y Open Key",
      "Conversor gratuito de las 24 tonalidades mayores y menores entre notación musical, Camelot y Open Key, con enarmonías y escalas.",
      "Elige una tonalidad del menú mediante cualquiera de las tres notaciones mostradas. El resultado presenta sus equivalencias.",
      "La menor corresponde a 8A en Camelot y 1m en Open Key. Do mayor es 8B y 1d. Las grafías enarmónicas, como Sol sostenido y La bemol, representan la misma clase de altura en temperamento igual.",
      "¿La conversión modifica el sonido?",
      "No. Son nombres diferentes para la misma tonalidad; no se transpone ningún audio."
    ]
  },
  "B03": {
    "en": [
      "Musical Key Compatibility Checker",
      "Compare two musical keys and identify basic harmonic mixing relationships.",
      "Select the source and target keys. The result identifies identical, relative or adjacent keys, or a combination outside these basic rules.",
      "An 8A to 9A transition is adjacent; 8A to 8B is relative. For other combinations, try percussion-only transitions or shorter overlaps and listen carefully.",
      "Can I mix keys outside these rules?",
      "Yes. These rules are starting points, not restrictions. Musical context determines whether a transition works."
    ],
    "es": [
      "Comprobador de compatibilidad de tonalidades",
      "Compara dos tonalidades e identifica relaciones básicas de mezcla armónica.",
      "Selecciona la tonalidad de origen y la de destino. El resultado identifica tonalidades iguales, relativas, vecinas o combinaciones fuera de estas reglas básicas.",
      "Una transición de 8A a 9A es vecina; de 8A a 8B es relativa. Para otras combinaciones, prueba transiciones de percusión o solapamientos breves y escucha el resultado.",
      "¿Puedo mezclar fuera de estas reglas?",
      "Sí. Son puntos de partida, no restricciones. El contexto musical determina si funciona una transición."
    ]
  }
} as const;
export type HarmonyId=keyof typeof harmonyCopy;
