---
grade: JSS 1
subject: Information Technology
term: 02
week: 02
topic: Computer Hardware I: Central Processing Unit & System Unit
assessment_category: Continuous Assessment
weight_percent: 40
---

## Hook
When you look at a car, the steering wheel allows you to steer and the headlights allow you to see at night, but what actually drives the vehicle forward? The powerful engine hidden underneath the hood! In a computer system, the keyboard lets you type words and the monitor lets you see vibrant images, but where does the actual "thinking," calculating, and decision-making occur? It takes place inside a protective metallic casing called the **System Unit**, resting on the main circuit board on a thumbnail-sized silicon chip known as the **Central Processing Unit (CPU)**. Often celebrated as the "brain of the computer," this microscopic powerhouse executes billions of calculations every second without making a single computational error. How does this tiny piece of silicon coordinate millions of complex operations simultaneously? Let us step inside the System Unit and discover the inner anatomy of the CPU!

## Key Terms
- Term: System Unit
  Definition: The main rectangular protective enclosure (chassis or tower) that houses the vital internal electronic components of a computer, including the motherboard, power supply, and CPU.
- Term: Central Processing Unit (CPU)
  Definition: The primary hardware microprocessor that interprets, directs, coordinates, and executes program instructions, functioning as the computational brain of the computer system.
- Term: Control Unit (CU)
  Definition: The supervisory subunit inside the CPU that manages, directs, and coordinates the flow of data, instructions, and timing signals between the processor, memory, and peripheral devices.
- Term: Arithmetic Logic Unit (ALU)
  Definition: The operational subunit inside the CPU that executes all mathematical computations (addition, subtraction, multiplication) and logical comparisons (AND, OR, greater than, equal to).
- Term: Register
  Definition: A tiny, high-speed temporary storage location directly inside the CPU that holds data, memory addresses, and instructions currently undergoing immediate processing.
- Term: Machine Cycle (Instruction Cycle)
  Definition: The continuous four-step operational sequence executed by the CPU to process every single program instruction: Fetch, Decode, Execute, and Store.
- Term: System Clock
  Definition: An internal quartz crystal timing circuit that emits electrical pulses at precise, steady intervals to synchronize all processing operations inside the CPU, measured in Gigahertz (GHz).

## Core Concept
### Inside the System Unit: The Motherboard & Core Components
The large rectangular box standing beside or underneath a desktop monitor is the **System Unit** (often mistakenly called "the CPU" by beginners). The System Unit is the protective fortress of the computer, shielding delicate microcircuits from dust, physical shock, and electrical interference. 

Inside the System Unit, you will find:
1. **The Motherboard (System Board):** The primary printed circuit board that physically connects and permits communication between the CPU, RAM, storage drives, and expansion cards.
2. **The Power Supply Unit (PSU):** Converts high-voltage alternating current (AC) electricity from the wall outlet into low-voltage direct current (DC) required by internal chips.
3. **The Central Processing Unit (CPU):** Mounted securely in a zero-insertion-force (ZIF) socket on the motherboard, covered by a metallic heat sink and an active cooling fan.
4. **Primary Memory (RAM Slots):** High-speed electronic memory sticks plugged into vertical slots adjacent to the CPU.
5. **Secondary Storage Drives:** Solid-State Drives (SSDs) and Hard Disk Drives (HDDs) mounted in internal drive bays.

[IMAGE: alt="A cutaway diagram of the computer system unit showing the motherboard, CPU chip with cooling fan, RAM memory modules, and power supply unit" caption="Anatomy of the Computer System Unit: The motherboard serves as the central highway linking the CPU, RAM, and internal peripherals"]

---

### Internal Architecture of the Central Processing Unit (CPU)
The CPU is the intellectual command center of the computer system. It does not act as one single monolithic block; rather, it is divided into three interconnected, highly specialized functional subunits:

```
                            ┌───────────────────────────────────────────────┐
                            │         CENTRAL PROCESSING UNIT (CPU)         │
                            │                                               │
                            │   ┌───────────────────────────────────────┐   │
                            │   │             CONTROL UNIT              │   │
                            │   │  - Supervises data flow               │   │
                            │   │  - Fetches & decodes instructions     │   │
                            │   └───────────────────┬───────────────────┘   │
                            │                       │                       │
                            │   ┌───────────────────┴───────────────────┐   │
                            │   │     ARITHMETIC LOGIC UNIT (ALU)       │   │
                            │   │  - Arithmetic (+, -, *, /)            │   │
                            │   │  - Logic Comparisons (=, <, >, AND)   │   │
                            │   └───────────────────┬───────────────────┘   │
                            │                       │                       │
                            │   ┌───────────────────┴───────────────────┐   │
                            │   │          INTERNAL REGISTERS           │   │
                            │   │  - High-speed temporary memory        │   │
                            │   │  - Program Counter, Accumulator       │   │
                            │   └───────────────────────────────────────┘   │
                            └───────────────────────▲───────────────────────┘
                                                    │
                                   System Bus (Data & Address)
                                                    │
                                                    ▼
                                    PRIMARY STORAGE / MEMORY (RAM)
```

#### 1. The Control Unit (CU) — The Traffic Director
The Control Unit acts as the manager or "traffic police officer" of the computer:
- It does not calculate numbers or process data itself.
- It retrieves (fetches) instructions from primary memory (RAM) in proper sequence.
- It interprets (decodes) what each instruction means.
- It sends electronic command signals to the ALU, memory, and input/output devices telling them exactly when and how to respond.

#### 2. The Arithmetic Logic Unit (ALU) — The Calculator & Judge
The Arithmetic Logic Unit is the mathematical powerhouse and logical brain of the CPU. It performs two categories of operations:
- **Arithmetic Operations:** Basic mathematical calculations including addition ($+$), subtraction ($-$), multiplication ($\times$), and division ($\div$).
- **Logical Operations:** Comparisons between two data items to evaluate conditions and make decisions:
  - *Relational tests:* Is $A = B$? Is $A > B$? Is $A < B$?
  - *Logical evaluations:* Boolean operations such as `AND`, `OR`, and `NOT`.

#### 3. Internal Registers — The Scratchpad
Registers are special, microscopic high-speed memory cells embedded directly within the CPU circuitry:
- They hold data values and memory addresses that the ALU needs right at that exact microsecond.
- Key registers include:
  - **Program Counter (PC):** Holds the memory address of the next instruction to be fetched.
  - **Instruction Register (IR):** Holds the current instruction while it is being decoded.
  - **Accumulator (ACC):** Temporarily stores the immediate results of arithmetic calculations produced by the ALU.

---

### The Machine Cycle (Instruction Cycle)
Every single task executed by a computer—whether typing a character, loading a video game, or applying an Instagram photo filter—is broken down into millions of basic instructions. The CPU processes each instruction through the four-stage **Machine Cycle**:

1. **Fetch:** The Control Unit retrieves the instruction from a designated memory address in RAM and loads it into an internal register.
2. **Decode:** The Control Unit translates the instruction into binary electrical control signals that the processor's circuitry understands.
3. **Execute:** The Arithmetic Logic Unit carries out the requested operation (e.g., adding two numbers or evaluating a comparison).
4. **Store (Write-back):** The resulting data from the execution is written back into a register or returned to RAM memory for future use.

**Processor Speed & Clock Rate:**
The speed of the machine cycle is dictated by the **System Clock**. Each tick of the clock allows the CPU to advance through operational steps. A modern CPU rated at **$3.5\text{ GHz}$** (Gigahertz) ticks **3.5 billion times every single second**!

## Comparative Matrix

| Evaluation Criterion | Control Unit (CU) | Arithmetic Logic Unit (ALU) | Internal Registers | Primary Memory (RAM) |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Function** | Directs data flow and supervises hardware operations | Executes mathematical calculations and logical tests | Holds intermediate data and addresses during immediate execution | Holds active programs and user data during computer operation |
| **Computational Role** | Superintends (does not do math) | Computes and compares | Scratchpad / holding bay | Temporary general memory pool |
| **Physical Location** | Built inside CPU silicon die | Built inside CPU silicon die | Built inside CPU silicon die | Separate circuit sticks plugged into motherboard |
| **Operating Speed** | Extremely fast (processor clock speed) | Extremely fast (processor clock speed) | The fastest storage in the entire computer | Fast, but slower than internal CPU registers |
| **Capacity** | Control circuitry | Operational circuitry | Very small (measured in bytes or bits) | Large (measured in Gigabytes, e.g., 8 GB – 32 GB) |
| **Human Body Analogy** | The nervous system directing muscles | The logical reasoning part of the brain | Immediate thoughts in your active consciousness | Short-term notepad memory on your study desk |

## Common Mistakes
- **Mistake 1: Calling the entire rectangular system unit casing "the CPU".**
  *Correction:* The large metallic or plastic box is called the **System Unit**. The **CPU** is the miniature microchip mounted onto the motherboard inside that box beneath the cooling fan.
- **Mistake 2: Thinking the CPU stores your permanent files like songs, movies, and school essays.**
  *Correction:* The CPU has virtually zero permanent storage capacity. It only processes active instructions. Permanent files are saved on secondary storage drives (such as Solid-State Drives or Hard Disk Drives).
- **Mistake 3: Confusing the Control Unit with the Arithmetic Logic Unit.**
  *Correction:* The Control Unit never calculates; it manages and directs. The Arithmetic Logic Unit does not supervise; it calculates and compares.

## Worked Examples
### Example 1: Tracing an Arithmetic Instruction through the Machine Cycle
Trace how a computer processes the command to add two numbers: $18 + 22 = 40$.

**Step-by-Step Cycle Execution:**
1. **Fetch:** The Control Unit queries RAM at a specific memory location and fetches the instruction: `ADD 18, 22`.
2. **Decode:** The Control Unit decodes the instruction code. It recognizes that this is an addition operation and signals the ALU to prepare for addition, transferring the numbers $18$ and $22$ into the CPU registers.
3. **Execute:** The Arithmetic Logic Unit adds the two integers together:
   $$18 + 22 = 40$$
4. **Store:** The result ($40$) is placed into the Accumulator register, and the Control Unit instructs that it be saved to a specific memory cell in RAM so the application program can display "40" on the monitor screen.

---

### Example 2: Calculating Machine Cycle Processing Frequency
A student's laptop has an Intel Core i5 processor rated at a clock speed of $2.4\text{ GHz}$. Calculate how many machine cycle clock pulses this processor generates every second.

**Step-by-Step Calculation:**
1. Recall the metric prefix for "Giga":
   $$1\text{ Hertz (Hz)} = 1\text{ cycle per second}$$
   $$1\text{ Megahertz (MHz)} = 1,000,000\text{ cycles per second } (10^6\text{ Hz})$$
   $$1\text{ Gigahertz (GHz)} = 1,000,000,000\text{ cycles per second } (10^9\text{ Hz})$$
2. Multiply the clock frequency by one billion:
   $$\text{Cycles per second} = 2.4 \times 1,000,000,000\text{ Hz} = 2,400,000,000\text{ cycles per second}$$
3. **Answer:** The laptop's processor generates **2.4 billion clock cycles per second**, allowing it to process instructions at blinding speed.

## Guardian Sync
Together with your parent or guardian, locate a desktop or laptop computer in your home or school office:
1. **Locate the System Unit:** If it is a desktop, point out the metal tower casing (the System Unit) and explain that the CPU is safely mounted inside. If it is a laptop, explain that the System Unit is built directly underneath the keyboard!
2. **Feel the Heat Sink Vent:** Put your hand near the small exhaust vent on the side or back of the computer. Feel the warm air blowing out.
3. **Explain the Heat:** Explain to your guardian that when the CPU executes billions of machine cycles per second, electricity passing through microscopic silicon transistors creates heat, which is why computers require cooling fans and metal heat sinks to prevent overheating.

## Quiz

### Q1 [single-choice]
Stem: What is the primary function of the Central Processing Unit (CPU) in a computer system?
A) To interpret, coordinate, and execute program instructions, acting as the computational brain (correct)
B) To print high-resolution color photographs on glossy paper
C) To supply high-voltage alternating electrical current to wall sockets
D) To physically clean the interior dust from computer cooling fans
Feedback: The CPU is the primary computational engine of the computer that interprets, coordinates, and executes program instructions.

### Q2 [single-choice]
Stem: What is the large rectangular metallic box that houses the motherboard, power supply, CPU, and storage drives called?
A) The System Unit (correct)
B) The Central Processing Unit
C) The Liquid Crystal Monitor
D) The Peripheral Terminal
Feedback: The protective external enclosure housing the internal electronic components of a computer is called the System Unit.

### Q3 [single-choice]
Stem: Which subunit of the CPU acts as the supervisor, directing data flow and coordinating operations between components without performing calculations?
A) Control Unit (CU) (correct)
B) Arithmetic Logic Unit (ALU)
C) Accumulator
D) Power Supply Unit
Feedback: The Control Unit (CU) manages and coordinates the flow of data and instructions throughout the computer; it directs traffic but does not perform arithmetic.

### Q4 [single-choice]
Stem: Which subunit of the CPU is specifically responsible for performing mathematical calculations and logical comparisons?
A) Arithmetic Logic Unit (ALU) (correct)
B) Control Unit (CU)
C) System Clock
D) Read-Only Memory
Feedback: The Arithmetic Logic Unit (ALU) executes all arithmetic calculations (addition, subtraction) and logical comparisons (equal to, greater than).

### Q5 [single-choice]
Stem: What are the microscopic, ultra-high-speed temporary storage cells located directly inside the CPU called?
A) Registers (correct)
B) Flash drives
C) Hard drives
D) Floppy discs
Feedback: Registers are tiny, high-speed memory cells built directly inside the CPU that hold immediate data, addresses, and instructions during processing.

### Q6 [single-choice]
Stem: What are the four stages of the CPU Machine Cycle in correct chronological order?
A) Fetch -> Decode -> Execute -> Store (correct)
B) Store -> Execute -> Decode -> Fetch
C) Decode -> Fetch -> Store -> Execute
D) Execute -> Store -> Fetch -> Decode
Feedback: The CPU executes instructions by continuously cycling through four steps: Fetch (retrieve), Decode (interpret), Execute (perform), and Store (save results).

### Q7 [single-choice]
Stem: During which stage of the machine cycle does the Control Unit retrieve an instruction from primary memory (RAM)?
A) Fetch (correct)
B) Decode
C) Execute
D) Store
Feedback: In the Fetch stage, the Control Unit retrieves the instruction from memory (RAM) and places it into an internal register.

### Q8 [single-choice]
Stem: What is the main printed circuit board inside the System Unit that connects the CPU, memory, and all peripheral devices called?
A) Motherboard (System Board) (correct)
B) Expansion card
C) Power Supply Unit
D) Heat sink
Feedback: The Motherboard is the central printed circuit board that provides physical sockets and electronic buses linking the CPU, RAM, and storage.

### Q9 [single-choice]
Stem: What unit of frequency measurement is commonly used to express the clock speed of modern computer processors?
A) Gigahertz (GHz) (correct)
B) Kilowatt-hours (kWh)
C) Gallons per minute
D) Revolutions per second
Feedback: Modern processor clock speeds are rated in Gigahertz (GHz), representing billions of clock cycles per second.

### Q10 [single-choice]
Stem: Why is a metal heat sink and cooling fan mounted directly on top of the CPU chip?
A) To absorb and dissipate the intense heat generated by billions of transistor switches per second (correct)
B) To protect the CPU from computer software viruses
C) To amplify audio sound coming from computer games
D) To convert direct current into alternating current
Feedback: Processors generate significant heat due to electrical resistance across billions of microscopic switches; heat sinks and fans prevent thermal damage and crashes.

### Q11 [single-choice]
Stem: Which specific register inside the CPU holds the memory address of the very next instruction waiting to be fetched?
A) Program Counter (PC) (correct)
B) Accumulator (ACC)
C) Memory Data Register
D) Instruction Register
Feedback: The Program Counter (PC) keeps track of memory addresses by holding the pointer to the next instruction in sequence.

### Q12 [single-choice]
Stem: Which specific register temporarily stores the immediate numerical result generated by an Arithmetic Logic Unit calculation?
A) Accumulator (correct)
B) Program Counter
C) Address Bus
D) System Clock
Feedback: The Accumulator is a dedicated register that temporarily holds the intermediate results of arithmetic and logical operations performed by the ALU.

### Q13 [single-choice]
Stem: What component inside the System Unit converts high-voltage alternating current (AC) electricity from the wall socket into regulated low-voltage direct current (DC)?
A) Power Supply Unit (PSU) (correct)
B) Central Processing Unit (CPU)
C) Motherboard
D) Solid-State Drive
Feedback: The Power Supply Unit (PSU) transforms mains AC power into smooth, regulated low-voltage DC power suitable for delicate electronic chips.

### Q14 [single-choice]
Stem: Which of the following is a logical operation performed by the Arithmetic Logic Unit (ALU)?
A) Evaluating whether Student Score >= 50 (correct)
B) Fetching an instruction from memory
C) Cooling down the processor heat sink
D) Formatting a magnetic floppy disk
Feedback: Comparing two data values (such as testing if a score is greater than or equal to 50) is a logical comparison performed by the ALU.

### Q15 [true-false]
Stem: The term "CPU" refers to the entire metal casing of a desktop computer sitting on the floor.
A) True
B) False (correct)
Feedback: The external box is called the System Unit. The CPU is the small silicon microchip mounted inside on the motherboard.

### Q16 [true-false]
Stem: The Control Unit (CU) performs all the mathematical calculations and multiplication operations inside the CPU.
A) True
B) False (correct)
Feedback: The Control Unit supervises and coordinates data flow; all arithmetic and mathematical calculations are executed exclusively by the Arithmetic Logic Unit (ALU).

### Q17 [multi-select]
Stem: Which of the following are the primary internal functional subunits of the Central Processing Unit (CPU)? (Select all that apply)
A) Control Unit (CU) (correct)
B) Arithmetic Logic Unit (ALU) (correct)
C) Internal Registers (correct)
D) Liquid Crystal Display (LCD)
Feedback: The CPU consists of the Control Unit (CU), Arithmetic Logic Unit (ALU), and internal high-speed Registers. An LCD is an external display monitor.

### Q18 [multi-select]
Stem: Which of the following components are physically housed inside a standard computer System Unit? (Select two)
A) Motherboard (correct)
B) Power Supply Unit (correct)
C) Paper laser printing drum
D) Handheld optical barcode reader
Feedback: The motherboard and power supply unit are located inside the System Unit. Printers and handheld barcode readers are external peripherals.

### Q19 [matching]
Stem: Match each CPU subunit or component to its operational role:
Clue: Control Unit (CU) -> Decodes program instructions and manages data flow like a traffic director
Clue: Arithmetic Logic Unit (ALU) -> Executes mathematical arithmetic and evaluates logical comparisons
Clue: Registers -> Provides tiny, ultra-high-speed temporary holding areas inside the processor
Clue: System Clock -> Generates continuous timing pulses to synchronize all CPU operations
Feedback: CU directs data flow; ALU calculates and compares; Registers store immediate data; System Clock synchronizes operations.

### Q20 [matching]
Stem: Match each machine cycle stage to its definition:
Clue: Fetch -> Retrieves an instruction from memory (RAM) and places it into an internal register
Clue: Decode -> Translates the instruction into binary electrical control signals
Clue: Execute -> Performs the requested mathematical calculation or logical comparison
Clue: Store -> Writes the computation result back into a register or memory location
Feedback: Fetch retrieves; Decode translates; Execute performs; Store writes back results.
