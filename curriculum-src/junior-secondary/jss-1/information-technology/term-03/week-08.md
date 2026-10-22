---
grade: JSS 1
subject: Information Technology
term: 03
week: 08
topic: Introduction to Computer Networks and the Internet
assessment_category: Continuous Assessment
weight_percent: 40
---

## Hook
Imagine walking into a school library where every single book is kept locked inside a separate wooden safe, and there is no master catalogue, no librarian, and no way to share notes with anyone else. If you wanted to read ten different chapters, you would have to run around unlocking ten separate safes! Before computer networks were invented, that is exactly how computers operated—they were isolated digital islands. If you typed an assignment on a computer in one classroom, the only way to print it was to save it onto a physical floppy disk, take off your shoes, and sprint across the hot sun to another building with a printer! Today, fifty computers in a school laboratory can share a single high-speed laser printer, access a central library database, and browse millions of educational websites across the globe simultaneously. How do computers talk to each other across cables and airwaves? The answer lies in the architecture of **Computer Networks** and the global **Internet**!

## Key Terms
- Term: Computer Network
  Definition: An interconnected collection of two or more autonomous computing devices linked together by transmission media (cables or wireless signals) to share hardware resources, software, and data files.
- Term: Local Area Network (LAN)
  Definition: A computer network restricted to a small, localized geographical area, such as a single computer laboratory, school building, home, or corporate office suite.
- Term: Wide Area Network (WAN)
  Definition: A large-scale telecommunication network that spans broad geographical territories across cities, states, nations, or entire continents (with the Internet being the premier example).
- Term: Network Topology
  Definition: The physical or logical geometric arrangement and pattern in which computers, cables, and peripheral devices are connected together within a network.
- Term: Web Browser
  Definition: An application software program (such as Google Chrome, Mozilla Firefox, or Microsoft Edge) used to locate, retrieve, interpret, and visually display web pages from the World Wide Web.
- Term: Search Engine
  Definition: An online software service and database program (such as Google or Bing) that searches, indexes, and retrieves relevant web pages based on user-entered keywords.
- Term: Uniform Resource Locator (URL)
  Definition: The standardized global alphanumeric web address used by web browsers to locate and retrieve a specific file, page, or resource on the World Wide Web.

## Core Concept
### Why Connect Computers in a Network?
Connecting independent computers into a network provides three major institutional benefits:
1. **Resource Sharing:** Rather than purchasing an expensive laser printer or flatbed scanner for every individual computer, all fifty computers in a school lab share one centralized network printer.
2. **Instant File Sharing:** Users can transfer homework files, digital textbooks, and videos instantly without copying them onto USB flash drives.
3. **Centralized Data Storage & Security:** Student report cards and exam results are stored securely on a central school server with automated daily backups.

[IMAGE: alt="A diagram illustrating a Local Area Network (LAN) star topology connecting desktop computers, laptops, and a shared printer to a central switch" caption="Local Area Network (LAN): Interconnecting workstations and shared peripherals through a central network switch"]

---

### Classification of Networks by Geographical Scope
1. **Personal Area Network (PAN):**
   - **Range:** Within 10 meters (around a single individual).
   - *Example:* Connecting a smartphone to wireless Bluetooth earbuds, a smartwatch, or a portable wireless speaker.
2. **Local Area Network (LAN):**
   - **Range:** Within a single room, school lab, office building, or campus.
   - *Technology:* Uses Ethernet copper cables (twisted pair) or local Wi-Fi (WLAN).
   - *Speed:* Ultra-high data speeds ($100\text{ Mbps}$ to $1\text{ Gbps}$).
3. **Metropolitan Area Network (MAN):**
   - **Range:** Across an entire city or metropolitan region ($10\text{ to } 50\text{ km}$).
   - *Example:* Linking all commercial bank branches across Lagos or connecting city government offices in Abuja via high-speed fiber-optic lines.
4. **Wide Area Network (WAN):**
   - **Range:** Transcontinental and worldwide.
   - *Technology:* Combines undersea fiber cables, microwave radio relays, and communications satellites.
   - *The Ultimate WAN:* **The Internet** is the largest, most famous Wide Area Network in human history!

---

### Physical Network Topologies
Network topology describes the physical layout of cables and devices:

#### 1. Star Topology (The Modern Industry Standard)
- **Design:** Every computer connects directly to a central networking device known as a **Switch** or **Hub** via its own dedicated cable.
- **Advantage:** Highly reliable and easy to troubleshoot. If one student's cable is damaged or disconnected, only that single workstation goes offline; the rest of the school lab continues operating smoothly!
- **Disadvantage:** If the central switch device burns out or loses power, the entire network fails.

#### 2. Bus Topology (Historical Linear Layout)
- **Design:** All computers are connected sequentially along a single central cable known as the **backbone**, with terminators at both ends.
- **Advantage:** Inexpensive; requires minimal cabling.
- **Disadvantage:** If the main central backbone cable breaks or frays at any single point, the entire network immediately collapses!

#### 3. Ring Topology
- **Design:** Every computer connects to exactly two neighboring devices, forming a continuous closed loop or circle. Data packets travel in one direction around the ring.
- **Disadvantage:** If one computer in the ring fails, data flow around the circle is broken.

---

### Navigating the World Wide Web
The **World Wide Web (WWW)**, invented in 1989 by British computer scientist **Sir Tim Berners-Lee**, is an information system of interlinked hypertext documents accessed over the Internet:

#### 1. Web Browser versus Search Engine
- A **Web Browser** is a software application installed on your local computer or phone (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) that interprets HTML code and displays visual web pages.
- A **Search Engine** is an online database service running on remote web servers (e.g., Google Search, Microsoft Bing) that allows you to type keywords to find relevant websites. You use a *Web Browser* to visit a *Search Engine*!

#### 2. Anatomy of a Uniform Resource Locator (URL)
A URL is the exact web address of a specific document on the Internet:
$$\underbrace{\text{https://}}_{\text{1. Protocol}} \quad \underbrace{\text{www.}}_{\text{2. Subdomain}} \quad \underbrace{\text{msaglobal}}_{\text{3. Domain Name}} \quad \underbrace{\text{.edu.ng}}_{\text{4. Top-Level Domain (TLD)}} \quad \underbrace{\text{/curriculum/jss1}}_{\text{5. Path to Resource}}$$
1. **Protocol (`https://`):** Hypertext Transfer Protocol Secure—governs how data is encrypted and transferred.
2. **Subdomain (`www.`):** Indicates the World Wide Web service.
3. **Domain Name (`msaglobal`):** The unique registered name of the organization.
4. **Top-Level Domain (`.edu.ng`):** Shows the category and country code (`.edu` for educational institution, `.ng` for Nigeria).
5. **Path (`/curriculum/jss1`):** The exact directory folder and file located on the host server.

## Comparative Matrix

| Network Type | Geographical Coverage | Typical Transmission Medium | Data Transfer Speed | Common Concrete Example |
| :--- | :--- | :--- | :--- | :--- |
| **PAN (Personal Area Network)** | Within 10 meters (personal space) | Short-range wireless (Bluetooth) | Moderate (up to 3 Mbps) | Smartphone linked to Bluetooth earbuds |
| **LAN (Local Area Network)** | Single room, building, or campus | Ethernet cables (Cat6), Wi-Fi | Extremely High (100 Mbps – 10 Gbps) | School computer laboratory, office LAN |
| **MAN (Metropolitan Area Network)**| An entire city (10 – 50 km) | Fiber optic cables, wireless microwave | High (100 Mbps – 1 Gbps) | Linking all commercial bank branches in Lagos |
| **WAN (Wide Area Network)** | Nationwide, continental, or global | Undersea fiber cables, satellites | Variable (depends on internet bandwidth) | The Global Internet, CBN interbank switch |

## Common Mistakes
- **Mistake 1: Confusing a Web Browser with a Search Engine.**
  *Correction:* A **Web Browser** is the software tool you open (like Google Chrome or Edge). A **Search Engine** is the search website you visit (like Google.com or Bing.com). Chrome is the vehicle; Google Search is the destination!
- **Mistake 2: Believing that if one computer fails in a Star Topology, the whole network fails.**
  *Correction:* In a **Star Topology**, each computer has its own independent cable connected to the central switch. If one computer or cable fails, all other computers continue working normally. The network only goes down if the central switch itself fails.
- **Mistake 3: Confusing the Internet with the World Wide Web.**
  *Correction:* The **Internet** is the physical networking hardware (cables, routers, servers). The **World Wide Web (WWW)** is a collection of multimedia documents and web pages linked together that travel over that physical internet infrastructure.

## Worked Examples
### Example 1: Selecting the Appropriate Network Classification
Identify whether each scenario describes a PAN, LAN, MAN, or WAN:
1. *Scenario A:* A student transfers a music track from their smartphone to a friend's smartwatch across the study desk using Bluetooth.
   - **Classification:** **PAN (Personal Area Network)**. It covers a personal radius of less than 10 meters.
2. *Scenario B:* A hospital in Ibadan connects fifty computers, three digital X-ray machines, and six departmental printers located within the same four-story building.
   - **Classification:** **LAN (Local Area Network)**. The network is confined to a single institutional building.
3. *Scenario C:* A multinational oil company links its deep-sea offshore drilling rigs in the Atlantic Ocean to its corporate headquarters in Abuja and its technical design center in Houston, Texas.
   - **Classification:** **WAN (Wide Area Network)**. It spans multiple countries, continents, and oceans via satellite and undersea cables.

---

### Example 2: Deconstructing a Nigerian Web Address (URL)
Analyze the components of the following URL: `https://www.jamb.gov.ng/utme/cbt-portal`
- **`https://`:** The **Secure Protocol** (encrypts data transmission between user and server).
- **`www.`:** The **World Wide Web** host identifier.
- **`jamb`:** The official **Domain Name** (Joint Admissions and Matriculation Board).
- **`.gov.ng`:** The **Country-Code Top-Level Domain** (`.gov` indicates an official Nigerian government agency, and `.ng` represents Nigeria).
- **`/utme/cbt-portal`:** The specific **Path** to the examination web page on the server.

## Guardian Sync
Together with your parent or guardian, explore the network connections in your home or on your smartphone:
1. **Identify the Wi-Fi Local Network (LAN):** Look at your home Wi-Fi router or portable MiFi device. Explain that your smartphone, smart television, and laptop are linked together in a local wireless network (WLAN).
2. **Inspect a URL:** Open a web browser on your phone. Look at the address bar at the top. Point out the padlock icon indicating `https://` (secure encryption) and identify the domain name of a favorite Nigerian website (e.g., `punchng.com` or `vanguardngr.com`).
3. **Discuss Network Sharing:** Discuss how different family members can print documents on the same home wireless printer from different rooms without plugging in any wires!

## Quiz

### Q1 [single-choice]
Stem: What is a computer network fundamentally defined as?
A) An interconnected collection of two or more autonomous computers linked by cables or wireless signals to share resources and data (correct)
B) A single standalone computer disconnected from all outside cables
C) A physical filing cabinet containing printed paper examination sheets
D) An electronic calculation engine without any memory registers
Feedback: A computer network links two or more computers together via wired or wireless channels to exchange data and share peripheral hardware.

### Q2 [single-choice]
Stem: What type of computer network is confined to a localized geographical area, such as a single classroom, computer laboratory, or school building?
A) Local Area Network (LAN) (correct)
B) Wide Area Network (WAN)
C) Metropolitan Area Network (MAN)
D) Satellite Broadcast Network
Feedback: A Local Area Network (LAN) spans a small, localized area such as a school building, office suite, or home.

### Q3 [single-choice]
Stem: What type of network covers an entire city or metropolitan municipality, typically connecting multiple institutional branches?
A) Metropolitan Area Network (MAN) (correct)
B) Personal Area Network (PAN)
C) Local Area Network (LAN)
D) Microscopic Area Network (MAN)
Feedback: A Metropolitan Area Network (MAN) spans an entire city or town, connecting multiple LANs across a municipality.

### Q4 [single-choice]
Stem: What category of computer network spans broad geographical regions across states, nations, continents, or the entire globe?
A) Wide Area Network (WAN) (correct)
B) Local Area Network (LAN)
C) Personal Area Network (PAN)
D) Desktop Bus Network
Feedback: A Wide Area Network (WAN) covers broad geographical territories across countries and continents, with the Internet being the premier example.

### Q5 [single-choice]
Stem: What short-range personal network technology uses high-frequency radio waves to connect a smartphone to wireless earbuds within a 10-meter radius?
A) Bluetooth / Personal Area Network (PAN) (correct)
B) Wide Area Network (WAN)
C) Undersea fiber-optic network
D) Satellite transponder network
Feedback: Personal Area Networks (PANs), commonly implemented with Bluetooth, connect personal gadgets within a short 10-meter radius.

### Q6 [single-choice]
Stem: What term describes the physical or logical geometric pattern in which computers and cables are laid out in a network?
A) Network Topology (correct)
B) Network Protocol
C) Network Bandwidth
D) Network Firmware
Feedback: Network Topology refers to the physical or logical layout and structure of nodes and connecting cables in a network.

### Q7 [single-choice]
Stem: Which modern network topology connects all client computers individually to a central Switch or Hub using dedicated cables?
A) Star Topology (correct)
B) Bus Topology
C) Ring Topology
D) Mesh Topology
Feedback: In a Star Topology, every workstation connects independently to a central switch, making it the most reliable and common LAN architecture.

### Q8 [single-choice]
Stem: What is the primary operational advantage of a Star Topology in a school computer laboratory?
A) If one computer or cable fails, all other computers continue working normally without disruption (correct)
B) It requires zero network cables or electrical switches
C) It automatically types homework assignments for students
D) It operates without an operating system
Feedback: In a Star Topology, individual cable breaks do not bring down the entire network; only the affected computer is disconnected.

### Q9 [single-choice]
Stem: What historical network topology connected all computers sequentially along a single central backbone cable with terminators at both ends?
A) Bus Topology (correct)
B) Star Topology
C) Tree Topology
D) Wireless Mesh Topology
Feedback: In a Bus Topology, all network nodes tap into a single shared backbone cable; a break in the backbone halts the entire network.

### Q10 [single-choice]
Stem: What application software program (such as Google Chrome, Mozilla Firefox, or Microsoft Edge) is used to navigate and view web pages?
A) Web Browser (correct)
B) Search Engine
C) Operating System Kernel
D) Disk Defragmenter
Feedback: A Web Browser is a client application program that retrieves, interprets, and displays HTML web pages from web servers.

### Q11 [single-choice]
Stem: What online database service (such as Google or Bing) allows users to find websites by typing search keywords?
A) Search Engine (correct)
B) Web Browser
C) Device Driver
D) Antivirus Utility
Feedback: A Search Engine is an online service that indexes the web and returns relevant website links based on search queries.

### Q12 [single-choice]
Stem: Who invented the World Wide Web (WWW) in 1989 at CERN, formulating HTML, HTTP, and web addressing?
A) Sir Tim Berners-Lee (correct)
B) Bill Gates
C) Steve Jobs
D) Charles Babbage
Feedback: Sir Tim Berners-Lee invented the World Wide Web in 1989, creating the protocols that enabled interconnected hypertext documents.

### Q13 [single-choice]
Stem: What does the acronym "URL" stand for in web navigation?
A) Uniform Resource Locator (correct)
B) Universal Radio Link
C) Unified Registry Logic
D) User Resource Line
Feedback: URL stands for Uniform Resource Locator—the standardized global address of a specific page or resource on the World Wide Web.

### Q14 [single-choice]
Stem: In the website address "https://www.waecnigeria.org", what does the prefix "https://" indicate?
A) A secure encrypted communication protocol (Hypertext Transfer Protocol Secure) (correct)
B) The name of the school principal
C) The serial number of the user's computer monitor
D) The physical location of the classroom building
Feedback: `https://` indicates Hypertext Transfer Protocol Secure, meaning data exchanged between browser and server is encrypted for security.

### Q15 [true-false]
Stem: A Web Browser and a Search Engine are the exact same thing and perform the identical technical task.
A) True
B) False (correct)
Feedback: A Web Browser is the local software used to display web pages; a Search Engine is an online website used to search for information across the web.

### Q16 [true-false]
Stem: In a Star Topology, if the central network switch fails or loses power, all computers connected to that switch will lose network communication.
A) True (correct)
B) False
Feedback: The central switch is the single point of failure in a Star Topology; if it fails, all connected devices lose connectivity.

### Q17 [multi-select]
Stem: Which of the following are classified as Web Browsers used to view web pages? (Select all that apply)
A) Google Chrome (correct)
B) Mozilla Firefox (correct)
C) Microsoft Edge (correct)
D) Microsoft Excel
Feedback: Chrome, Firefox, and Edge are web browsers. Microsoft Excel is a spreadsheet application.

### Q18 [multi-select]
Stem: Which of the following are major advantages of connecting computers together in a Local Area Network (LAN)? (Select two)
A) Sharing expensive peripheral hardware like laser printers and scanners (correct)
B) Instant digital file and resource sharing between computers (correct)
C) Completely eliminating the need for electrical power in the building
D) Preventing students from ever making typographical errors
Feedback: Resource sharing (printers) and fast digital file sharing are primary benefits of a Local Area Network.

### Q19 [matching]
Stem: Match each network classification to its geographical scope:
Clue: PAN -> Personal Area Network covering a radius of under 10 meters around an individual
Clue: LAN -> Local Area Network covering a single room, school lab, or office building
Clue: MAN -> Metropolitan Area Network spanning a municipality or entire city
Clue: WAN -> Wide Area Network spanning across states, countries, or the entire globe
Feedback: PAN is personal; LAN is local; MAN is metropolitan; WAN is wide/global.

### Q20 [matching]
Stem: Match each URL component to its description in "https://www.waecnigeria.org":
Clue: https:// -> Secure communication transfer protocol
Clue: www. -> World Wide Web host subdomain
Clue: waecnigeria -> The registered organization domain name
Clue: .org -> Top-Level Domain indicating a non-profit organization
Feedback: https:// is the protocol; www. is the subdomain; waecnigeria is the domain name; .org is the TLD.
