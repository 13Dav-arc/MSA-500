---
grade: JSS 1
subject: Mathematics
term: 02
week: 06
topic: Numbers in Base 2 — Binary Subtraction and Multiplication
assessment_category: Continuous Assessment
weight_percent: 40
---

## Hook
When digital computers calculate differences or scale up quantities, they do not borrow tens or recite decimal times tables like $7 \times 8 = 56$. Instead, microprocessors perform subtraction and multiplication using only zeros and ones, swapping bits and shifting electrical pulses[cite: 2]. Mastering binary subtraction and multiplication unlocks the computational logic that powers software graphics, cryptography, and digital calculators[cite: 2].

## Key Terms
- Term: Binary Subtraction
  Definition: The mathematical process of taking one base 2 numeral away from another using place value borrowing where $1\text{ two} = 10_2$[cite: 2].
- Term: Borrowing in Base 2
  Definition: Taking a value of 1 from a higher column on the left, which becomes a value of 2 (written as $10_2$) in the column receiving it[cite: 2].
- Term: Binary Multiplication
  Definition: The repeated addition of binary numbers governed by the truth conditions $0 \times 0 = 0$, $1 \times 0 = 0$, $0 \times 1 = 0$, and $1 \times 1 = 1$[cite: 2].
- Term: Partial Product
  Definition: The intermediate binary numbers produced by multiplying the multiplicand by each individual bit of the multiplier before column addition[cite: 2].

## Core Concept
### Rules of Binary Subtraction
Binary subtraction follows four basic rules for single digits[cite: 2]:
1. $0 - 0 = \mathbf{0}$[cite: 2]
2. $1 - 0 = \mathbf{1}$[cite: 2]
3. $1 - 1 = \mathbf{0}$[cite: 2]
4. $10_2 - 1 = \mathbf{1}$ (when borrowing $1$ from the next higher column, that $1$ equals $2_{10}$, so $2 - 1 = 1$)[cite: 2]

When subtracting column by column from right to left, if you need to subtract $1$ from $0$, you must borrow $1$ from the column immediately to the left[cite: 2]. The borrowed $1$ enters the current column as $10_2$ (which equals decimal $2$)[cite: 2]. Therefore, $10_2 - 1 = 1$[cite: 2].

[IMAGE: alt="Diagram illustrating binary subtraction and multiplication rules with borrowing steps" caption="Fundamental Rules of Binary Subtraction and Long Multiplication"]

### Rules of Binary Multiplication
Multiplication in Base 2 is simpler than in Base 10 because there are only four single-digit multiplication rules[cite: 2]:
1. $0 \times 0 = \mathbf{0}$[cite: 2]
2. $1 \times 0 = \mathbf{0}$[cite: 2]
3. $0 \times 1 = \mathbf{0}$[cite: 2]
4. $1 \times 1 = \mathbf{1}$[cite: 2]

To multiply larger binary numerals, use long multiplication:
- Multiply the top number by each bit of the bottom number from right to left[cite: 2].
- Each row of partial products is shifted one place to the left, exactly like in base 10 arithmetic[cite: 2].
- Finally, add all the partial products together using the binary addition rules ($1 + 1 = 10_2$)[cite: 2].

## Comparative Matrix
Heading: Comparing Binary Subtraction and Multiplication Operations
- Label: Borrowing vs Carrying
  Title: Subtraction Borrowing vs Addition Carrying
  Body: Borrowing takes 1 from the left column to become 2 ($10_2$) in the lower column[cite: 2], while carrying moves a bundled 2 ($10_2$) upward to the next left column[cite: 2].
- Label: Operation Mechanics
  Title: Subtraction vs Multiplication
  Body: Subtraction removes values column by column using borrowing[cite: 2], whereas multiplication generates shifted copies of the top number that are summed using binary addition[cite: 2].
- Label: Multiplicative Outputs
  Title: Multiplication by 1 vs Multiplication by 0
  Body: Multiplying any binary string by 1 reproduces the exact string unchanged[cite: 2], whereas multiplying by 0 yields an entire row of zeros[cite: 2].

## Common Mistakes
- Mistake: Treating a borrowed digit in binary subtraction as 10 (decimal ten).
  Fact: Borrowing $1$ from a higher binary column yields $10_2$, which represents two ($2_{10}$), not ten[cite: 2].
- Mistake: Forgetting to shift partial products one place to the left during long multiplication.
  Fact: Each successive partial product must shift one column to the left to align with the correct binary place value ($1, 2, 4, 8, \dots$)[cite: 2].

## Worked Examples
### Example A: Binary Subtraction with Borrowing
Context: Subtract $100_2$ from $110_2$[cite: 2].
Problem: Compute $110_2 - 100_2$ and verify using Base 10[cite: 2].
Fix:
$$\begin{array}{r@{\quad}l}
  110_2 \\
- 100_2 \\
\hline
  010_2 & = 10_2
\end{array}$$
- Units column: $0 - 0 = 0$[cite: 2].
- Twos column: $1 - 0 = 1$[cite: 2].
- Fours column: $1 - 1 = 0$[cite: 2].
- Verification: $110_2 = 6_{10}$ and $100_2 = 4_{10}$; $6 - 4 = 2_{10} = 10_2$[cite: 2].

### Example B: Long Binary Subtraction Across Multiple Bits
Context: Subtract $10011_2$ from $11011_2$[cite: 2].
Problem: Calculate $11011_2 - 10011_2$[cite: 2].
Fix:
$$\begin{array}{r@{\quad}l}
  11011_2 \\
- 10011_2 \\
\hline
  01000_2 & = 1000_2
\end{array}$$
- Units column: $1 - 1 = 0$[cite: 2].
- Twos column: $1 - 1 = 0$[cite: 2].
- Fours column: $0 - 0 = 0$[cite: 2].
- Eights column: $1 - 0 = 1$[cite: 2].
- Sixteens column: $1 - 1 = 0$[cite: 2].
- Verification: $11011_2 = 27_{10}$ and $10011_2 = 19_{10}$; $27 - 19 = 8_{10} = 1000_2$[cite: 2].

### Example C: Binary Multiplication
Context: Multiply $11_2$ by $11_2$[cite: 2].
Problem: Find the binary product of $11_2 \times 11_2$[cite: 2].
Fix:
$$\begin{array}{r@{\quad}l}
    11_2 \\
  \times 11_2 \\
  \hline
    11 \\
  + 11\phantom{0} \\
  \hline
   1001_2
\end{array}$$
- First partial row: $1 \times 11_2 = 11$[cite: 2].
- Second partial row: $1 \times 11_2 = 11$, shifted left by one place[cite: 2].
- Column sum: $1$ in units; $1 + 1 = 10_2$ (write 0, carry 1); $1 + \text{carry } 1 = 10_2$ (write 10)[cite: 2].
- Verification: $11_2 = 3_{10}$; $3 \times 3 = 9_{10} = 1001_2$[cite: 2].

## Guardian Sync
Practice binary multiplication with your guardian tonight[cite: 2]. Write down $101_2$ ($5_{10}$) and multiply it by $11_2$ ($3_{10}$) on paper[cite: 2]. Show them how the partial products add up to $1111_2$ ($15_{10}$) using only zeros and ones[cite: 2].

## Quiz
### Q1 [single-choice]
Stem: In binary subtraction, what is the result of $0 - 0$?
A) 0 (correct)[cite: 2]
B) 1
C) 10
D) -1
Feedback: According to the rules of binary subtraction, $0 - 0 = 0$[cite: 2].

### Q2 [single-choice]
Stem: In Base 2 numerals, what is $1 - 0$?
A) 1 (correct)[cite: 2]
B) 0
C) 10
D) 2
Feedback: Taking 0 away from 1 leaves 1[cite: 2].

### Q3 [single-choice]
Stem: What is the result of $1 - 1$ in binary subtraction?
A) 0 (correct)[cite: 2]
B) 1
C) 10
D) 11
Feedback: Subtracting 1 from 1 gives 0[cite: 2].

### Q4 [single-choice]
Stem: When borrowing 1 from the next higher column in binary subtraction, what decimal value does that borrowed 1 represent in the receiving column?
A) 2 (correct)[cite: 2]
B) 10
C) 1
D) 4
Feedback: In Base 2, 1 from a higher column equals $10_2$, which represents 2 in decimal ($2_{10}$)[cite: 2].

### Q5 [single-choice]
Stem: What is $10_2 - 1$ in binary arithmetic?
A) 1 (correct)[cite: 2]
B) 0
C) 2
D) 10
Feedback: $10_2$ represents decimal 2; subtracting 1 gives 1 ($10_2 - 1 = 1$)[cite: 2].

### Q6 [single-choice]
Stem: Calculate $11_2 - 10_2$:
A) $1_2$ (or $01_2$) (correct)[cite: 2]
B) $10_2$
C) $0_2$
D) $11_2$
Feedback: In Base 2: $1 - 0 = 1$ and $1 - 1 = 0$, giving $01_2 = 1_2$[cite: 2].

### Q7 [single-choice]
Stem: Calculate $111_2 - 110_2$:
A) $1_2$ (correct)[cite: 2]
B) $10_2$
C) $100_2$
D) $11_2$
Feedback: $111_2 (7_{10}) - 110_2 (6_{10}) = 1_{10} = 1_2$[cite: 2].

### Q8 [single-choice]
Stem: Calculate $110_2 - 100_2$:
A) $10_2$ (correct)[cite: 2]
B) $1_2$
C) $100_2$
D) $11_2$
Feedback: $110_2 (6_{10}) - 100_2 (4_{10}) = 2_{10} = 10_2$[cite: 2].

### Q9 [single-choice]
Stem: What is the result of the binary multiplication $0 \times 1$?
A) 0 (correct)[cite: 2]
B) 1
C) 10
D) 2
Feedback: Multiplying zero by any number results in zero: $0 \times 1 = 0$[cite: 2].

### Q10 [single-choice]
Stem: What is the result of $1 \times 1$ in binary arithmetic?
A) 1 (correct)[cite: 2]
B) 0
C) 10
D) 2
Feedback: In binary multiplication, $1 \times 1 = 1$[cite: 2].

### Q11 [single-choice]
Stem: Multiply the binary numbers $11_2 \times 11_2$:
A) $1001_2$ (correct)[cite: 2]
B) $1101_2$
C) $1111_2$
D) $1011_2$
Feedback: $11_2 (3_{10}) \times 11_2 (3_{10}) = 9_{10} = 1001_2$[cite: 2].

### Q12 [single-choice]
Stem: Calculate the product of $101_2 \times 11_2$:
A) $1111_2$ (correct)[cite: 2]
B) $1001_2$
C) $1101_2$
D) $1110_2$
Feedback: $101_2 (5_{10}) \times 11_2 (3_{10}) = 15_{10} = 1111_2$[cite: 2].

### Q13 [single-choice]
Stem: Calculate $1011_2 \times 101_2$:
A) $110111_2$ (correct)[cite: 2]
B) $101111_2$
C) $111011_2$
D) $100111_2$
Feedback: $1011_2 (11_{10}) \times 101_2 (5_{10}) = 55_{10} = 110111_2$[cite: 2].

### Q14 [single-choice]
Stem: What is the value of $(1000_2)^2$ in Base 2?
A) $1000000_2$ (correct)[cite: 2]
B) $10000_2$
C) $100000_2$
D) $110000_2$
Feedback: $1000_2 = 8_{10}$; $8^2 = 64_{10} = 1000000_2$[cite: 2].

### Q15 [true-false]
Statement: In binary multiplication, multiplying any binary number by 0 gives 0.
Answer: true[cite: 2]
Feedback: In binary arithmetic, $0 \times 0 = 0$ and $1 \times 0 = 0$[cite: 2].

### Q16 [true-false]
Statement: In binary subtraction, borrowing a 1 from an adjacent higher column gives 10 units in the decimal sense.
Answer: false[cite: 2]
Feedback: Borrowing a 1 in Base 2 transfers a value of $2$ ($10_2$), not ten ($10_{10}$)[cite: 2].

### Q17 [multi-select]
Stem: Select TWO correct binary multiplication equations:
Correct: $1 \times 0 = 0$[cite: 2], $1 \times 1 = 1$[cite: 2]
Incorrect: $1 \times 1 = 2$[cite: 2], $0 \times 1 = 1$[cite: 2]
Feedback: In Base 2, $1 \times 0 = 0$ and $1 \times 1 = 1$[cite: 2].

### Q18 [multi-select]
Stem: Select TWO binary subtractions that equal $1_2$:
Correct: $11_2 - 10_2$[cite: 2], $10_2 - 1_2$[cite: 2]
Incorrect: $11_2 - 1_2$[cite: 2], $100_2 - 10_2$[cite: 2]
Feedback: $11_2 - 10_2 = 1_2$ ($3 - 2 = 1$) and $10_2 - 1_2 = 1_2$ ($2 - 1 = 1$)[cite: 2].

### Q19 [matching]
Stem: Match each binary subtraction problem with its difference:
Pairs:
- $11_2 - 10_2$ -> $1_2$[cite: 2]
- $110_2 - 100_2$ -> $10_2$[cite: 2]
- $11011_2 - 10011_2$ -> $1000_2$[cite: 2]
Feedback: $11_2 - 10_2 = 1_2$, $110_2 - 100_2 = 10_2$, and $11011_2 - 10011_2 = 1000_2$[cite: 2].

### Q20 [matching]
Stem: Match each binary multiplication problem with its product:
Pairs:
- $11_2 \times 11_2$ -> $1001_2$[cite: 2]
- $101_2 \times 11_2$ -> $1111_2$[cite: 2]
- $1011_2 \times 101_2$ -> $110111_2$[cite: 2]
Feedback: $11_2 \times 11_2 = 1001_2$, $101_2 \times 11_2 = 1111_2$, and $1011_2 \times 101_2 = 110111_2$[cite: 2].