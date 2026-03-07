import type { MachineData } from '../types/TmTuple';

export const examples: MachineData[] = [
  {
    name: "Incremento unário",
    description: "Adiciona 1 ao final da sequência. Entrada: >111 (3). Saída: >1111 (4).",
    table: [
      ["", "1", ">", "b"],
      ["q0", "q0 1 R", "q0 > R", "q1 1 P"]
    ],
    tape: [">", "1", "1", "1"],
    finState: "q1"
  },
  {
    name: "Soma unária (a + b)",
    description: "Soma dois números unários separados por +. Entrada: >111+1 (3+1). Saída: >1111 (4).",
    table: [
      ["", "1", "+", ">", "b"],
      ["q0", "q0 1 R", "q1 1 R", "q0 > R", ""],
      ["q1", "q1 1 R", "", "", "q2 b L"],
      ["q2", "q3 b P", "", "", ""]
    ],
    tape: [">", "1", "1", "1", "+", "1"],
    finState: "q3"
  },
  {
    name: "(3x) / 4",
    description: "Calcula 3x/4 em unário. Entrada: >11111111 (8). Saída: >111111 (6).",
    table: [
      ["", "1", "X", "Y", ">", "b"],
      ["q0", "q0 X R", "", "", "q0 > R", "q1 b L"],
      ["q1", "q1 1 L", "q2 1 R", "", "q4 > R", ""],
      ["q2", "q2 1 R", "", "", "", "q3 1 R"],
      ["q3", "", "", "", "", "q1 1 L"],
      ["q4", "q5 X R", "", "q10 Y R", "", ""],
      ["q5", "q5 1 R", "", "q6 Y L", "", "q6 b L"],
      ["q6", "q7 Y L", "", "", "", ""],
      ["q7", "q8 Y L", "", "", "", ""],
      ["q8", "q9 Y L", "", "", "", ""],
      ["q9", "q9 1 L", "q4 X R", "", "", ""],
      ["q10", "", "", "q10 Y R", "", "q11 b L"],
      ["q11", "", "q11 1 L", "q11 b L", "q12 > P", ""]
    ],
    tape: [">", "1", "1", "1", "1", "1", "1", "1", "1"],
    finState: "q12"
  }
];
