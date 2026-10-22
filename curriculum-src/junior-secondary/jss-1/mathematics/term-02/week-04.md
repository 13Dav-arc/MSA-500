---
grade: JSS 1
subject: Mathematics
term: 02
week: 04
topic: Numbers in Base 2 — Place Values and Binary Addition
assessment_category: Continuous Assessment
weight_percent: 40
---

## Hook
Did you know that the smartphone in your pocket, the laptop on a teacher's desk, and the world's most powerful supercomputers do not understand the numbers 2, 3, 4, 5, 6, 7, 8, or 9? Inside every computer chip, there are billions of microscopic electronic switches that can only be either **OFF** (represented by 0) or **ON** (represented by 1). This two-digit counting language of machines is called the **binary number system** (Base 2)[cite: 3]! By learning how to count and add in Base 2, you are learning the secret language that powers the entire digital world.

## Key Terms
- Term: Binary Number System (Base 2)
  Definition: A numbering system that uses only two digits, 0 and 1, with place values based on powers of two ($1, 2, 4, 8, 16, \dots$)[cite: 3].
- Term: Denary Number System (Base 10)
  Definition: The standard decimal counting system used in everyday life that uses ten digits ($0, 1, 2, 3, 4, 5, 6, 7, 8, 9$) with place values based on powers of ten.
- Term: Bit
  Definition: A single binary digit, either a 0 or a 1, which represents the smallest unit of data in computing.
- Term: Binary Addition
  Definition: The process of combining two or more binary numbers according to specific base 2 addition rules[cite: 3].
- Term: Carry Over
  Definition: Transferring a value of 2 (which is written as $10_2$) to the next higher place value column on the left during addition[cite: 3].

## Core Concept
### What is Base 2 (Binary)?
In our everyday decimal system (**Base 10**), we count from 0 to 9 before grouping into tens, hundreds, and thousands. In the **binary system (Base 2)**, we only have two digits: **0** and **1**[cite: 3]. Once we reach 2, we must bundle it into the next place value column[cite: 3]. To show that a number is in Base 2, we write a small subscript 2 at the bottom right, such as $11_2$ or $101_2$[cite: 3].

### Binary Place Values
In Base 10, place values from right to left are units ($10^0 = 1$), tens ($10^1 = 10$), hundreds ($10^2 = 100$), and thousands ($10^3 = 1000$).
In Base 2, place values from right to left double each time, following powers of 2:
- $2^0 = \mathbf{1}$ (Units column)
- $2^1 = \mathbf{2}$ (Twos column)
- $2^2 = \mathbf{4}$ (Fours column)
- $2^3 = \mathbf{8}$ (Eights column)
- $2^4 = \mathbf{16}$ (Sixteens column)

*Converting Binary to Base 10:*
To convert a binary number like $1101_2$ to Base 10[cite: 3]:
$$\begin{aligned}
1101_2 &= (1 \times 2^3) + (1 \times 2^2) + (0 \times 2^1) + (1 \times 2^0) \\
&= (1 \times 8) + (1 \times 4) + (0 \times 2) + (1 \times 1) \\
&= 8 + 4 + 0 + 1 = 13_{10}
\end{aligned}$$

### The Four Fundamental Rules of Binary Addition
When adding binary numbers column by column from right to left, we apply four simple rules[cite: 3]:
1. $0 + 0 = \mathbf{0}$[cite: 3]
2. $1 + 0 = \mathbf{1}$[cite: 3]
3. $0 + 1 = \mathbf{1}$[cite: 3]
4. $1 + 1 = \mathbf{10_2}$ (write down $0$ and carry $1$ over to the next column to the left)[cite: 3]

If there is already a carried-over $1$ from a previous column, you may encounter three ones:
- $1 + 1 + 1 = \mathbf{11_2}$ (write down $1$ and carry $1$ over to the next column)

[IMAGE: alt="Diagram of a binary addition table displaying the basic rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 with carry over illustration" caption="The Four Fundamental Rules of Binary Addition in Base 2"]

## Comparative Matrix
Heading: Comparing the Base 10 (Denary) and Base 2 (Binary) Number Systems
- Label: Available Digits
  Title: Base 10 vs Base 2 Digits
  Body: Base 10 uses ten digits ($0, 1, 2, 3, 4, 5, 6, 7, 8, 9$), whereas Base 2 uses only two digits ($0$ and $1$)[cite: 3].
- Label: Place Value Progression
  Title: Powers of Ten vs Powers of Two
  Body: Place values in Base 10 multiply by ten ($1, 10, 100, 1000$), while place values in Base 2 double each step ($1, 2, 4, 8, 16, 32$)[cite: 3].
- Label: Bundling Rule
  Title: Grouping Value
  Body: In Base 10, ten units make 1 ten ($9 + 1 = 10_{10}$); in Base 2, two units make 1 two ($1 + 1 = 10_2$)[cite: 3].
- Label: Real-World Use
  Title: Everyday Trade vs Computing
  Body: Base 10 is used by humans for shopping, counting currency, and everyday trade, while Base 2 is used internally by computer processors and digital circuits.

## Common Mistakes
- Mistake: Writing $1 + 1 = 2$ inside a binary addition working.
  Fact: The digit "2" does not exist in Base 2; two is written as $10_2$, meaning you must write $0$ and carry $1$ to the left[cite: 3].
- Mistake: Reading $10_2$ as "ten" instead of "one-zero base two".
  Fact: $10_2$ represents the quantity two ($1 \text{ two} + 0 \text{ units}$), not the decimal number ten.
- Mistake: Forgetting to add the carried-over $1$ in subsequent columns.
  Fact: Always write your small carried-over digits clearly above the next column so they are not skipped during summation.

## Worked Examples
### Example A: Adding Two-Digit Binary Numbers
Context: Add $10_2$ and $11_2$[cite: 3].
Problem: Calculate the sum and verify using Base 10[cite: 3].
Fix: 
Line up the digits in place value columns:
$$\begin{array}{r@{\quad}l}
  10_2 & (\text{Units: } 0, \text{Twos: } 1) \\
+ 11_2 & (\text{Units: } 1, \text{Twos: } 1) \\
\hline
 101_2 &
\end{array}$$
- **Units column:** $0 + 1 = 1$[cite: 3].
- **Twos column:** $1 + 1 = 10_2$ (write 0, carry 1 to the next column)[cite: 3].
- **Result:** $101_2$[cite: 3].
- *Verification:* $10_2 = 2_{10}$ and $11_2 = 3_{10}$. In Base 10: $2 + 3 = 5_{10}$. Converting $101_2$: $(1 \times 4) + (0 \times 2) + (1 \times 1) = 5_{10}$. The answer is verified!

### Example B: Adding Identical Two-Digit Binaries
Context: Find the sum of $11_2$ and $11_2$[cite: 3].
Problem: Apply the carry-over rule in successive columns[cite: 3].
Fix:
$$\begin{array}{r@{\quad}l}
  \overset{1}{1}1_2 \\
+ \phantom{1}11_2 \\
\hline
 110_2
\end{array}$$
- **Units column:** $1 + 1 = 10_2$ (write down $0$, carry $1$)[cite: 3].
- **Twos column:** Carried $1 + 1 + 1 = 11_2$ (write down $11$).
- **Result:** $110_2$[cite: 3].
- *Verification:* $11_2 = 3_{10}$. In Base 10: $3 + 3 = 6_{10}$. Converting $110_2$: $(1 \times 4) + (1 \times 2) + (0 \times 1) = 6_{10}$.

### Example C: Adding Three-Digit Binary Numbers
Context: Find the sum of $101_2$ and $111_2$[cite: 3].
Problem: Perform column addition with multiple carries[cite: 3].
Fix:
$$\begin{array}{r@{\quad}l}
  \overset{1}{1}\overset{1}{0}1_2 \\
+ 111_2 \\
\hline
 1100_2
\end{array}$$
- **Units column:** $1 + 1 = 10_2$ (write down $0$, carry $1$)[cite: 3].
- **Twos column:** $0 + 1 + \text{carried } 1 = 10_2$ (write down $0$, carry $1$).
- **Fours column:** $1 + 1 + \text{carried } 1 = 11_2$ (write down $11$).
- **Result:** $1100_2$.
- *Verification:* $101_2 = 5_{10}$ and $111_2 = 7_{10}$. In Base 10: $5 + 7 = 12_{10}$. Converting $1100_2$: $(1 \times 8) + (1 \times 4) + (0 \times 2) + (0 \times 1) = 12_{10}$.

## Guardian Sync
Explain to your guardian tonight that computers think using only 0 and 1 because their electronic switches can only be turned OFF or ON. Teach your guardian the binary rule $1 + 1 = 10_2$, and work through adding $10_2 + 10_2$ together to show them that it equals $100_2$ (which is 4 in our normal counting)[cite: 3]!

## Quiz
### Q1 [single-choice]
Stem: Which two digits are the only symbols used in the binary (Base 2) number system?
A) 0 and 1 (correct)[cite: 3]
B) 1 and 2
C) 0 and 2
D) 1 and 10
Feedback: Base 2 uses only two digits: 0 and 1[cite: 3].

### Q2 [single-choice]
Stem: In binary addition, what is the result of $0 + 0$?
A) 0 (correct)[cite: 3]
B) 1
C) 10
D) 2
Feedback: $0 + 0 = 0$ in binary addition[cite: 3].

### Q3 [single-choice]
Stem: In binary addition, what is the value of $1 + 0$?
A) 1 (correct)[cite: 3]
B) 0
C) 10
D) 2
Feedback: $1 + 0 = 1$[cite: 3].

### Q4 [single-choice]
Stem: In Base 2 numerals, what is $1 + 1$?
A) $10_2$ (correct)[cite: 3]
B) $2_2$
C) $11_2$
D) $0_2$
Feedback: In Base 2, $1 + 1 = 10_2$ (which equals 2 in decimal)[cite: 3].

### Q5 [single-choice]
Stem: What is the binary sum of $10_2 + 11_2$?
A) $101_2$ (correct)[cite: 3]
B) $111_2$
C) $110_2$
D) $100_2$
Feedback: $10_2 + 11_2 = 101_2$ ($2 + 3 = 5_{10}$)[cite: 3].

### Q6 [single-choice]
Stem: Find the sum of $11_2 + 11_2$:
A) $110_2$ (correct)[cite: 3]
B) $100_2$
C) $101_2$
D) $111_2$
Feedback: $11_2 + 11_2 = 110_2$ ($3 + 3 = 6_{10}$)[cite: 3].

### Q7 [single-choice]
Stem: Calculate $10_2 + 10_2$ in Base 2:
A) $100_2$ (correct)[cite: 3]
B) $20_2$
C) $110_2$
D) $101_2$
Feedback: $10_2 + 10_2 = 100_2$ ($2 + 2 = 4_{10}$)[cite: 3].

### Q8 [single-choice]
Stem: Calculate $10_2 + 01_2$:
A) $11_2$ (correct)[cite: 3]
B) $101_2$
C) $100_2$
D) $01_2$
Feedback: $10_2 + 01_2 = 11_2$ ($2 + 1 = 3_{10}$)[cite: 3].

### Q9 [single-choice]
Stem: What is the Base 10 (denary) value of the binary number $11_2$?
A) 3 (correct)[cite: 3]
B) 2
C) 11
D) 4
Feedback: $11_2 = (1 \times 2) + (1 \times 1) = 3_{10}$.

### Q10 [single-choice]
Stem: What is the Base 10 value of $100_2$?
A) 4 (correct)[cite: 3]
B) 2
C) 8
D) 100
Feedback: $100_2 = (1 \times 4) + (0 \times 2) + (0 \times 1) = 4_{10}$.

### Q11 [single-choice]
Stem: In binary addition, when three ones are added together ($1 + 1 + 1$), the result is:
A) $11_2$ (correct)
B) $10_2$
C) $3_2$
D) $100_2$
Feedback: $1 + 1 + 1 = 3_{10}$, which is written as $11_2$ in binary.

### Q12 [single-choice]
Stem: Calculate the sum of $110_2 + 101_2$:
A) $1011_2$ (correct)[cite: 3]
B) $1111_2$
C) $1101_2$
D) $1001_2$
Feedback: $110_2 (6) + 101_2 (5) = 11_{10} = 1011_2$[cite: 3].

### Q13 [single-choice]
Stem: What is the place value of the third digit from the right in a binary number?
A) 4 (Fours column) (correct)
B) 3
C) 100
D) 8
Feedback: Place values in binary are $2^0=1$, $2^1=2$, and $2^2=4$.

### Q14 [single-choice]
Stem: Convert the decimal number $5$ into its binary equivalent:
A) $101_2$ (correct)[cite: 3]
B) $110_2$
C) $111_2$
D) $011_2$
Feedback: $5 = 4 + 1 = 101_2$.

### Q15 [true-false]
Statement: The digit 2 can be written directly into a binary column when adding binary numbers.
Answer: false[cite: 3]
Feedback: The digit 2 does not exist in Base 2; the quantity 2 is written as $10_2$ (write 0 and carry 1)[cite: 3].

### Q16 [true-false]
Statement: The binary system is widely used in electronic computers because electrical circuits can easily represent two states: ON and OFF.
Answer: true
Feedback: Digital computers operate on binary logic where switches are either ON (1) or OFF (0).

### Q17 [multi-select]
Stem: Select TWO correct binary addition statements:
Correct: $1 + 0 = 1$[cite: 3], $1 + 1 = 10_2$[cite: 3]
Incorrect: $1 + 1 = 2$[cite: 3], $0 + 0 = 1$[cite: 3]
Feedback: In Base 2, $1 + 0 = 1$ and $1 + 1 = 10_2$[cite: 3].

### Q18 [multi-select]
Stem: Select TWO binary numbers that have an odd decimal value:
Correct: $11_2$ ($3_{10}$)[cite: 3], $101_2$ ($5_{10}$)[cite: 3]
Incorrect: $10_2$ ($2_{10}$)[cite: 3], $100_2$ ($4_{10}$)[cite: 3]
Feedback: Binary numbers ending in 1 have odd values ($11_2 = 3$, $101_2 = 5$).

### Q19 [matching]
Stem: Match each binary addition problem with its correct sum:
Pairs:
- $10_2 + 01_2$ -> $11_2$[cite: 3]
- $10_2 + 10_2$ -> $100_2$[cite: 3]
- $10_2 + 11_2$ -> $101_2$[cite: 3]
Feedback: $10_2 + 01_2 = 11_2$, $10_2 + 10_2 = 100_2$, and $10_2 + 11_2 = 101_2$[cite: 3].

### Q20 [matching]
Stem: Match each binary number with its decimal (Base 10) equivalent:
Pairs:
- $10_2$ -> 2[cite: 3]
- $11_2$ -> 3[cite: 3]
- $101_2$ -> 5[cite: 3]
Feedback: $10_2 = 2_{10}$, $11_2 = 3_{10}$, and $101_2 = 5_{10}$[cite: 3].