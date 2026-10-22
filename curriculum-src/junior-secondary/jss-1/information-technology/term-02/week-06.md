---
grade: JSS 1
subject: Information Technology
term: 02
week: 06
topic: Computer Hardware IV: Storage Devices (Primary Memory & Secondary Storage)
assessment_category: Continuous Assessment
weight_percent: 40
---

## Hook
Have you ever been typing an essay, preparing a school presentation, or designing a graphic on a computer when suddenly the power went out, and you had not clicked the "Save" icon? When the electricity returned and you booted the computer back up, your essay had vanished into thin air! Why did that happen? Because while you were actively typing, your work was resting inside a super-fast, temporary workspace called **RAM**—a type of memory that requires continuous electric current to keep its thoughts alive. But think about the photos, music tracks, and videos you saved on your phone last year: they stay there safely even when your phone battery is completely dead and switched off for weeks! This dramatic difference reveals the two-tier memory system of computers: **Primary Memory (RAM and ROM)** versus **Secondary Storage (Hard Drives, SSDs, and Flash Drives)**.

## Key Terms
- Term: Primary Memory (Main Memory)
  Definition: The high-speed semiconductor memory directly connected to and addressable by the CPU, consisting of Random Access Memory (RAM) and Read-Only Memory (ROM).
- Term: Random Access Memory (RAM)
  Definition: The volatile, high-speed working memory of a computer that temporarily holds the active operating system, running application programs, and current data being processed.
- Term: Read-Only Memory (ROM)
  Definition: The non-volatile, permanent semiconductor memory chip pre-programmed by the manufacturer containing startup instructions (BIOS/UEFI) required to boot the computer.
- Term: Volatile Memory
  Definition: A category of computer memory that requires continuous electrical power to preserve its stored data; when power is lost or switched off, its contents are instantly erased.
- Term: Non-Volatile Memory
  Definition: A category of memory or storage that retains its saved data permanently, even when electrical power is completely disconnected.
- Term: Secondary Storage (Auxiliary Storage)
  Definition: Permanent, non-volatile storage hardware (such as SSDs, HDDs, and USB flash drives) used to store operating systems, programs, and user files permanently.
- Term: Solid-State Drive (SSD)
  Definition: A modern, high-speed secondary storage device that records data electronically on non-volatile flash memory chips with zero moving mechanical parts.
- Term: Hard Disk Drive (HDD)
  Definition: A traditional magnetic secondary storage device that records data magnetically onto rapidly spinning metal platters using movable mechanical read/write heads.

## Core Concept
### The Computer Memory Hierarchy
Computer memory is structured like a tiered pyramid: the fastest memory is tiny and positioned right next to the CPU, while the largest, permanent storage devices are slightly slower and positioned further away:

```
                            ▲
                           / \      [ CPU Registers ]        - Ultra-fast, tiny capacity
                          /   \     [ CPU Cache L1/L2/L3 ]   - High-speed buffer
                         /     \    [ Primary RAM ]          - Fast, volatile active memory
                        /       \   [ Solid-State Drive ]    - Fast, permanent secondary storage
                       /_________\  [ Hard Disk Drive ]      - Large, magnetic permanent storage
```

[IMAGE: alt="A comparison diagram showing Primary RAM memory sticks, a ROM chip on a motherboard, and secondary storage devices like an SSD, hard disk, and USB flash drive" caption="The Spectrum of Computer Memory: Volatile Primary RAM versus Permanent Non-Volatile Secondary Storage"]

---

### Primary Memory: RAM versus ROM
Primary memory is mounted directly on the motherboard so the CPU can access program instructions at near-instantaneous speed.

#### 1. Random Access Memory (RAM)
- **Nature:** **Volatile**. It relies on continuous electrical charges. If the computer is rebooted, switched off, or experiences a power surge, everything in RAM is wiped clean.
- **Function:** Serves as the computer's active, temporary workspace. When you launch Microsoft Word or open a browser tab, the program is copied from your permanent storage drive into RAM so the CPU can interact with it without delay.
- **Read/Write Capability:** The CPU can both *read* data from RAM and *write* new data into RAM millions of times per second.
- **Capacity:** Typically measured in **Gigabytes (GB)**, such as $4\text{ GB}, 8\text{ GB}, 16\text{ GB}$, or $32\text{ GB}$.

#### 2. Read-Only Memory (ROM)
- **Nature:** **Non-Volatile**. Data is burned permanently into the silicon microchip during manufacturing. It retains its contents indefinitely without electricity.
- **Function:** Stores the critical firmware startup code known as the **BIOS (Basic Input/Output System)** or modern **UEFI**. When you press the power button, the CPU reads ROM to execute the **Power-On Self-Test (POST)** (checking that keyboard, RAM, and storage are working) and launches the **Bootstrap Loader** to load Windows from the SSD into RAM.
- **Read-Only Nature:** Standard users cannot write to or erase normal ROM chips; the computer can only *read* the stored startup instructions.

---

### Secondary Storage: Permanent Media
Because RAM is volatile and loses everything on power-off, computers rely on **Secondary Storage** to save operating systems, applications, documents, and multimedia permanently.

#### 1. Magnetic Storage Media
- **Hard Disk Drive (HDD):** Contains rigid circular aluminum platters coated with magnetic material that spin at $5,400$ to $7,200\text{ RPM}$ (revolutions per minute). Electromagnetic read/write heads float on a cushion of air millionths of an inch above the platters to record binary bits.
  - *Pros:* Massive storage capacity ($1\text{ TB} – 10\text{ TB}$) at an affordable cost.
  - *Cons:* Slower data access, vulnerable to physical drop damage due to moving mechanical parts.

#### 2. Solid-State (Flash) Storage Media
- **Solid-State Drives (SSDs):** Uses microscopic silicon flash memory chips (NAND flash) to store data electronically.
  - *Pros:* Extremely fast data read/write speeds (boots Windows in 10 seconds), completely silent, consumes very little electrical battery power, and has no moving parts (immune to physical bumps and drops).
  - *Standard Form:* Internal M.2 or 2.5-inch drives, external USB flash drives ("thumb drives"), and MicroSD cards in smartphones.

#### 3. Optical Storage Media
Optical discs store digital data as microscopic indentations called **pits** and flat areas called **lands** etched onto a reflective polycarbonate disc, read by a precision laser beam:
- **Compact Disc (CD):** Capacity of approximately **$700\text{ MB}$** (used for audio albums and software).
- **Digital Versatile Disc (DVD):** Capacity of approximately **$4.7\text{ GB}$** (single-layer) to **$8.5\text{ GB}$** (dual-layer) (used for movies).
- **Blu-ray Disc (BD):** Uses a blue-violet laser with a shorter wavelength to pack up to **$25\text{ GB}$** (single-layer) or **$50\text{ GB}$** (dual-layer) (used for High-Definition 4K movies).

---

### Standard Units of Computer Data Storage
Every piece of data stored in memory is measured in standard binary units:
- **Bit (Binary Digit):** The smallest unit of data, represented as `0` or `1`.
- **Byte ($B$):** A group of **8 bits**, representing a single alphanumeric character (e.g., the letter "M").
- **Kilobyte ($KB$):** $1,024\text{ Bytes}$ ($2^{10}$ bytes) — roughly a paragraph of plain text.
- **Megabyte ($MB$):** $1,024\text{ Kilobytes}$ ($2^{20}$ bytes) — roughly a standard 3-minute MP3 song or high-res photo.
- **Gigabyte ($GB$):** $1,024\text{ Megabytes}$ ($2^{30}$ bytes) — roughly an hour of HD video.
- **Terabyte ($TB$):** $1,024\text{ Gigabytes}$ ($2^{40}$ bytes) — a massive personal digital library of thousands of movies and applications.

## Comparative Matrix

| Evaluated Feature | Random Access Memory (RAM) | Read-Only Memory (ROM) | Hard Disk Drive (HDD) | Solid-State Drive (SSD) |
| :--- | :--- | :--- | :--- | :--- |
| **Memory Category** | Primary Memory (Working) | Primary Memory (Firmware) | Secondary Storage (Magnetic) | Secondary Storage (Flash) |
| **Volatility** | **Volatile** (lost when powered off) | **Non-Volatile** (permanent) | **Non-Volatile** (permanent) | **Non-Volatile** (permanent) |
| **Read / Write Status** | High-speed Read & Write | Read-Only (factory written) | Read & Write | High-speed Read & Write |
| **Operating Speed** | Extremely fast (nanoseconds) | Extremely fast (nanoseconds) | Moderate (milliseconds) | Very fast (microseconds) |
| **Moving Parts?** | None (silicon chips) | None (silicon chips) | Yes (spinning platters & heads) | None (solid flash chips) |
| **Typical Capacity** | 4 GB – 32 GB | 4 MB – 16 MB | 500 GB – 4 TB+ | 256 GB – 2 TB+ |
| **Primary Content** | Active OS, open apps, current data | BIOS / UEFI bootstrap boot code | User files, installed programs | User files, fast OS boot partition |

## Common Mistakes
- **Mistake 1: Confusing RAM capacity with Storage Drive capacity.**
  *Correction:* Students often say, "My smartphone has 128 GB of RAM." That is incorrect. The smartphone has **128 GB of secondary flash storage** (for saving thousands of photos and apps) and typically **4 GB or 6 GB of RAM** (for running open apps).
- **Mistake 2: Believing ROM and RAM are interchangeable because both end in "OM/AM".**
  *Correction:* RAM is volatile and changes continuously as you open and close software. ROM is permanent, cannot be altered by normal programs, and holds the computer's startup code.
- **Mistake 3: Thinking that deleting a file in RAM deletes it from the hard drive.**
  *Correction:* RAM only holds a temporary working copy. Closing an unsaved file removes the active copy from RAM, but the original saved version remains safely on the hard drive or SSD.

## Worked Examples
### Example 1: Storage Capacity and File Calculation
A student owns a $32\text{ GB}$ USB flash drive. If a high-resolution educational video lesson takes up $500\text{ MB}$ of storage space, how many complete video lessons can the student store on the flash drive?

**Step-by-Step Solution:**
1. Convert the flash drive's capacity from Gigabytes ($GB$) to Megabytes ($MB$):
   $$\text{Capacity in MB} = 32\text{ GB} \times 1,024\text{ MB/GB} = 32,768\text{ MB}$$
2. Divide the total capacity by the size of one video lesson ($500\text{ MB}$):
   $$\text{Number of Videos} = \frac{32,768\text{ MB}}{500\text{ MB}} = 65.536$$
3. **Conclusion:** The student can store **65 complete video lessons** on the flash drive (with approximately $268\text{ MB}$ of spare space remaining).

---

### Example 2: Tracing the Boot Sequence from ROM to RAM
Trace what happens inside memory when a computer is powered on:
1. **Power Applied:** Electricity reaches the motherboard, triggering the CPU.
2. **ROM Takes Control:** The CPU immediately accesses **ROM** to execute the **BIOS (Basic Input/Output System)**.
3. **POST Execution:** The BIOS runs the Power-On Self-Test (POST) to verify that the keyboard, monitor, and memory are connected.
4. **Bootstrapping to RAM:** The BIOS searches the **Secondary Storage (SSD/HDD)**, finds the Windows Operating System files, and copies the essential system kernel into **RAM**.
5. **Execution in RAM:** The CPU runs Windows from RAM, displaying the desktop login screen to the user.

## Guardian Sync
Together with your parent or guardian, take out a smartphone and perform a quick "Memory vs Storage Check":
1. Open the phone's **Settings** app and tap on **About Phone** or **Device Care / Storage**.
2. Identify the **RAM**: You will see a smaller number like $4\text{ GB}$ or $8\text{ GB}$. Explain to your guardian that this is the active workspace where currently open apps live.
3. Identify the **Internal Storage**: You will see a much larger number like $64\text{ GB}$ or $128\text{ GB}$. Explain that this is permanent flash secondary storage holding all family photos, WhatsApp videos, and installed apps even when the phone is turned off!

## Quiz

### Q1 [single-choice]
Stem: What is the primary operational difference between Random Access Memory (RAM) and Read-Only Memory (ROM)?
A) RAM is volatile working memory that loses its contents when powered off, while ROM is permanent non-volatile memory that retains its contents indefinitely (correct)
B) RAM is used only for printing, while ROM is used only for internet browsing
C) RAM holds permanent startup instructions, while ROM holds open user applications
D) RAM cannot be accessed by the CPU, while ROM stores all user music files
Feedback: RAM is volatile temporary working memory; ROM is non-volatile permanent memory containing firmware startup instructions.

### Q2 [single-choice]
Stem: What does the term "volatile memory" mean in computer science?
A) Memory that requires continuous electrical power to retain its data, losing all contents when power is disconnected (correct)
B) Memory that physically explodes when exposed to high temperatures
C) Memory that can only be written to once in a factory
D) Memory that holds permanent movies and musical songs
Feedback: Volatile memory (such as RAM) requires continuous electrical current; if power is cut, all stored data is wiped instantly.

### Q3 [single-choice]
Stem: Which essential computer startup program is permanently stored inside the Read-Only Memory (ROM) chip?
A) BIOS (Basic Input/Output System) / Bootstrap loader (correct)
B) Microsoft Word word processing application
C) Google Chrome web browser
D) Anti-virus scanning definitions
Feedback: The BIOS (Basic Input/Output System) is stored in ROM to perform hardware checks (POST) and boot the operating system when the computer is turned on.

### Q4 [single-choice]
Stem: How many bits make up one standard computer Byte?
A) 8 bits (correct)
B) 4 bits
C) 16 bits
D) 1,024 bits
Feedback: Exactly 8 binary bits (combinations of 0s and 1s) make up one standard computer byte, capable of representing one character.

### Q5 [single-choice]
Stem: What type of modern secondary storage device uses non-volatile silicon flash memory chips and has zero moving mechanical parts?
A) Solid-State Drive (SSD) (correct)
B) Traditional Hard Disk Drive (HDD)
C) Dot matrix ribbon drive
D) Floppy diskette
Feedback: Solid-State Drives (SSDs) use flash memory chips with no moving parts, providing silent, durable, and ultra-fast storage.

### Q6 [single-choice]
Stem: What mechanical components inside a traditional Hard Disk Drive (HDD) read and write data onto spinning magnetic platters?
A) Electromagnetic read/write heads (correct)
B) Chemical laser nozzles
C) Silicon transistor gates
D) Thermal heating pins
Feedback: Traditional HDDs use magnetic read/write heads hovering on air cushions above spinning platters to record and retrieve binary data.

### Q7 [single-choice]
Stem: What is the standard data storage capacity of a conventional single-layer Compact Disc (CD)?
A) Approximately 700 Megabytes (MB) (correct)
B) Approximately 4.7 Gigabytes (GB)
C) Exactly 25 Gigabytes (GB)
D) 1 Terabyte (TB)
Feedback: A standard Compact Disc (CD-ROM) holds approximately 700 MB of digital data or 80 minutes of audio.

### Q8 [single-choice]
Stem: What optical storage disc uses a blue-violet laser with a short wavelength to store up to 25 GB to 50 GB of high-definition video?
A) Blu-ray Disc (BD) (correct)
B) Compact Disc (CD)
C) Digital Versatile Disc (DVD)
D) Floppy Disk
Feedback: Blu-ray discs use precision blue-violet lasers to store up to 25 GB (single-layer) or 50 GB (dual-layer) of data.

### Q9 [single-choice]
Stem: Exactly how many Gigabytes (GB) are contained in one Terabyte (TB)?
A) 1,024 GB (correct)
B) 100 GB
C) 500 GB
D) 1,000,000 GB
Feedback: In binary computer measurement, 1 Terabyte ($TB$) is equal to exactly $1,024$ Gigabytes ($GB$).

### Q10 [single-choice]
Stem: Why does a computer copy an application program from the secondary SSD storage into primary RAM when you launch it?
A) The CPU accesses instructions from RAM thousands of times faster than from secondary storage drives (correct)
B) Secondary storage drives cannot hold software programs
C) RAM permanently burns the application into the computer chassis
D) The monitor screen can only display pixels directly from the power supply
Feedback: RAM operates at nanosecond speeds, allowing the CPU to read and execute instructions vastly faster than reading directly from secondary storage drives.

### Q11 [single-choice]
Stem: What hardware component executes the Power-On Self-Test (POST) to verify that memory, keyboard, and drives are functioning during startup?
A) The ROM BIOS firmware (correct)
B) The application spreadsheet software
C) The mouse driver utility
D) The thermal printer roller
Feedback: The BIOS firmware stored in ROM initiates the POST routine immediately after power is applied to ensure core hardware is operational.

### Q12 [single-choice]
Stem: Which of the following is an example of portable, removable solid-state flash memory?
A) USB Flash Drive (Thumb Drive) (correct)
B) Internal spinning hard disk platter
C) Cathode ray vacuum tube
D) Dot matrix print head
Feedback: USB flash drives (thumb drives) and MicroSD memory cards are compact, removable solid-state storage devices.

### Q13 [single-choice]
Stem: What happens to a document being typed in Microsoft Word if a power blackout occurs before the user clicks "Save"?
A) The typed changes in volatile RAM are lost completely (correct)
B) The computer automatically prints the document onto paper
C) The document is permanently transferred into ROM
D) The document is saved automatically onto an optical CD
Feedback: Unsaved work resides only in volatile RAM; if power cuts, the electrical charges dissipate, causing unsaved data to be lost.

### Q14 [single-choice]
Stem: What optical storage media typically holds approximately 4.7 GB of data, commonly used for standard-definition movies?
A) Digital Versatile Disc (DVD) (correct)
B) Compact Disc (CD)
C) Magnetic tape reel
D) Punched paper card
Feedback: Standard single-layer DVDs have a storage capacity of 4.7 GB, making them popular for distributing full-length movies.

### Q15 [true-false]
Stem: Solid-state drives (SSDs) are more durable and resistant to physical shock than traditional hard disk drives because SSDs have no moving mechanical parts.
A) True (correct)
B) False
Feedback: SSDs record data electronically on flash chips with zero moving parts, making them far more resilient against drops and shocks than spinning HDDs.

### Q16 [true-false]
Stem: When a user buys a computer with 8 GB of RAM and 512 GB of SSD storage, the 8 GB of RAM is where movies and photos are permanently saved.
A) True
B) False (correct)
Feedback: Permanent files like movies and photos are saved in the 512 GB SSD storage. The 8 GB of RAM is temporary workspace used while running programs.

### Q17 [multi-select]
Stem: Which of the following memory and storage media are classified as Non-Volatile (retaining data when power is turned off)? (Select all that apply)
A) Read-Only Memory (ROM) (correct)
B) Solid-State Drive (SSD) (correct)
C) Hard Disk Drive (HDD) (correct)
D) Random Access Memory (RAM)
Feedback: ROM, SSDs, and HDDs are non-volatile and retain data permanently without power. RAM is volatile and loses data when power is disconnected.

### Q18 [multi-select]
Stem: Which two of the following are classified as Optical Storage media? (Select two)
A) Compact Disc (CD) (correct)
B) Digital Versatile Disc (DVD) (correct)
C) USB Flash thumb drive
D) MicroSD memory card
Feedback: CDs and DVDs are optical discs read by laser beams. Flash thumb drives and MicroSD cards are solid-state flash storage devices.

### Q19 [matching]
Stem: Match each memory or storage technology to its primary characteristic:
Clue: RAM -> Volatile working memory holding open programs and active data during operation
Clue: ROM -> Non-volatile memory chip holding factory startup BIOS boot instructions
Clue: SSD -> High-speed secondary storage using silent flash chips with no moving parts
Clue: HDD -> Magnetic storage recording data on rapidly spinning metallic platters
Feedback: RAM is volatile working memory; ROM holds BIOS; SSD uses flash chips; HDD uses spinning magnetic platters.

### Q20 [matching]
Stem: Match each data storage unit to its exact binary equivalent:
Clue: 1 Byte -> 8 binary bits
Clue: 1 Kilobyte (KB) -> 1,024 Bytes
Clue: 1 Megabyte (MB) -> 1,024 Kilobytes
Clue: 1 Gigabyte (GB) -> 1,024 Megabytes
Feedback: 1 Byte = 8 bits; 1 KB = 1,024 B; 1 MB = 1,024 KB; 1 GB = 1,024 MB.
