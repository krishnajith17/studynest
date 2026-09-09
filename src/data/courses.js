export const DEPARTMENT_INFO = {
  institution: "Amrita Vishwa Vidyapeetham",
  school: "School of Engineering",
  department: "Department of Electronics and Communication Engineering",
  branch: "Electronics and Computer Engineering (EAC)",
  vision: "To provide a value-based learning environment for producing engineers with a blend of technical skills, moral values and leadership qualities in the field of Electronics, Communication and Computing channelized towards technological advancement to cater to the needs of the industry and the society.",
  missions: [
    "M1: Achieving excellence in teaching and learning with an emphasis on fundamental knowledge and hands-on exposure to match the state-of-the-art in technology.",
    "M2: Providing an environment for core competency development and enhancing quality research in emerging areas.",
    "M3: Facilitating professional growth to the students for higher education and career in industry and academia.",
    "M4: Imbibing the essence of human values, ethics and professional skills to sustain socio-economic development."
  ],
  peos: [
    { code: "PEO1", text: "To integrate fundamental knowledge of basic science, mathematics and engineering to work on complex problems in the field of electronics and communication engineering." },
    { code: "PEO2", text: "To promote independent research and continuous learning by providing hands-on exposure in electronics, signal processing and communication domains." },
    { code: "PEO3", text: "To provide a platform to explore and pursue interests in diversified fields for a successful career." },
    { code: "PEO4", text: "To nurture team spirit and leadership qualities with a sense of social responsibility and produce engineers with an ability to integrate engineering and society." }
  ],
  psos: [
    { code: "PSO1", text: "To design, develop and prototype Electronic Systems." },
    { code: "PSO2", text: "To develop Cyber-Physical & Automated Systems." },
    { code: "PSO3", text: "To design and develop Embedded Systems." }
  ],
  evaluationPattern: {
    theory: {
      continuousAssessment: "30%",
      midTermExam: "30%",
      endSemProject: "40%",
      details: "Continuous assessment includes up to four quizzes/assignments."
    },
    lab: {
      continuousAssessment: "40%",
      midTermExam: "20%",
      endSemProject: "40%",
      details: "High weightage given to prototype system development at the end."
    },
    valuePrograms: {
      continuousAssessment: "50%",
      endSemester: "50%",
      details: "Presentations, speaking activities, and term projects."
    }
  }
};

export const CATEGORIES = {
  ALL: "all",
  SCI: "SCI",
  ENGG: "ENGG",
  HUM: "HUM",
};

export const initialCourses = [
  {
    code: "23ECE101",
    title: "Nature Inspired Engineering",
    category: "SCI",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    prerequisite: "Nil",
    description: "Learn engineering designs inspired by biological systems and structures in nature, such as bullet train aerodynamics, self-cleaning surfaces, bat echolocation, and natural ventilation.",
    objectives: [
      "To provide an understanding of nature from an engineering perspective",
      "To enable the study of engineering systems inspired by nature",
      "To motivate the development of technological ideas based on nature"
    ],
    outcomes: [
      { code: "CO1", text: "Understand the principles of systems in nature" },
      { code: "CO2", text: "Understand engineering principles that are derived from nature" },
      { code: "CO3", text: "Identify and ideate technological concepts inspired by nature" },
      { code: "CO4", text: "Apply the concepts learnt to address simple engineering problems" }
    ],
    copoMapping: {
      CO1: { PO1: 3, PO7: 1, PO12: 1, PSO1: 1 },
      CO2: { PO1: 3, PO2: 2, PO7: 1, PO12: 1, PSO1: 1 },
      CO3: { PO1: 2, PO2: 3, PO7: 1, PO12: 2, PSO1: 2 },
      CO4: { PO1: 2, PO2: 3, PO7: 1, PO12: 2, PSO1: 2 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Biological Inspiration & Structural Efficiency",
        topics: "Introduction to Biological inspiration; Common characteristics of natural and engineered systems; Case studies: Bullet train aerodynamic shape inspired by Kingfisher's beak (reducing tunnel boom noise & stress); Beehive hexagonal structure (evaporative cooling and natural ventilation); Whale fin structure & tubercles applied to wind turbine blades; Velcro tape hooks and loops inspired by burdock burrs; Golden ratio in nature and Fibonacci numbers in dimensional geometry."
      },
      {
        number: 2,
        title: "Unit 2: Biomimetics & Functional Mechanics",
        topics: "Biomimetics – Mimicking nature; Case studies: Gene Therapy & Immunotherapy; Beaver structural engineering and dam design; Aerodynamics and flight dynamics of birds (wing morphing, heavier-than-air flight, humming bird hovering); Earthworm self-cleaning mechanics via small electric currents; Gecko & Lizard locomotion via van der Waals inter-atomic bonding; Lizard directional setae hair adhesion (stickiness without residue, Scotch tape); Bone self-healing and structural material shaping."
      },
      {
        number: 3,
        title: "Unit 3: Bio-inspired Innovations & Systems",
        topics: "Control Theory, feedback loops and biological homeostasis; Digital electronics and human neural logic; Dolphin and bat echolocation for sonar and ultrasound imaging; Artificial Intelligence and Artificial Neural Networks (ANN) modeled on biological brain networks."
      }
    ],
    parts: [
      "Unit 1: Biological Inspiration (Kingfisher, Beehive, Whale Fin, Velcro)",
      "Unit 2: Biomimetics (Beavers, Bird Flight, Gecko Adhesion, Bone Shaping)",
      "Unit 3: Bio-inspired Innovations (Control Theory, Echolocation, Neural Networks)",
      "Complete Question Bank & Case Study Review"
    ],
    textbooks: [
      {
        title: "Biomimicry: Innovation Inspired by Nature",
        author: "Benyus J P",
        publisher: "Mariner Books",
        year: 2002,
        isbn: "9780060533229",
        link: "https://www.google.com/search?q=Biomimicry+Innovation+Inspired+by+Nature+Benyus+ISBN+9780060533229"
      },
      {
        title: "The Shark's Paintbrush: Biomimicry and How Nature is Inspiring Innovation",
        author: "Harman J.",
        publisher: "White Cloud Press",
        year: 2013,
        isbn: "978-1935952848",
        link: "https://www.google.com/search?q=The+Shark+s+Paintbrush+Biomimicry+Harman+ISBN+9781935952848"
      },
      {
        title: "Biomimicry Innovation Inspired by Nature",
        author: "Matheney B.",
        publisher: "Self-Published",
        year: 2023,
        link: "https://www.google.com/search?q=Biomimicry+Innovation+Inspired+by+Nature+Matheney+2023"
      }
    ],
    references: [
      {
        title: "Engineering Education for the Next Generation – A Nature–Inspired Approach",
        author: "Stier S C.",
        publisher: "W W Norton & Co.",
        year: 2020,
        isbn: "978-0393713770",
        link: "https://www.google.com/search?q=Engineering+Education+for+the+Next+Generation+Stier+ISBN+9780393713770"
      },
      {
        title: "Biomimicry: When Nature Inspires Amazing Inventions",
        author: "Menu S, Walker E & Waters A",
        publisher: "Triangle Square Publishers",
        year: 2020,
        isbn: "978-1644210185",
        link: "https://www.google.com/search?q=Biomimicry+When+Nature+Inspires+Amazing+Inventions+Menu+ISBN+9781644210185"
      }
    ],
    externalResources: [
      { type: "database", title: "AskNature.org (Biomimicry Database)", url: "https://asknature.org/", desc: "World's largest biological design catalog with engineering strategies." },
      { type: "video", title: "Janine Benyus: Biomimicry in Action (TED Talk)", url: "https://www.ted.com/talks/janine_benyus_biomimicry_in_action", desc: "Foundational talk on deriving sustainable technology from 3.8 billion years of nature." },
      { type: "video", title: "Michael Pawlyn: Using Nature's Genius in Architecture (TED)", url: "https://www.ted.com/talks/michael_pawlyn_using_nature_s_genius_in_architecture", desc: "Case studies on architectural ventilation and high-efficiency structures." },
      { type: "course", title: "Biomimicry Institute Learning Portal", url: "https://biomimicry.org/resources/", desc: "Free design challenges and bio-inspired case study whitepapers." }
    ]
  },
  {
    code: "23MAT124",
    title: "Engineering Mathematics I",
    category: "SCI",
    credits: 4,
    ltp: "3-1-0",
    semester: 1,
    prerequisite: "Nil",
    description: "Foundational calculus, single variable limits and continuity, Mean Value Theorem, linear ordinary differential equations (ODEs), modeling electric circuits, and matrix algebra with eigenvalues.",
    objectives: [
      "To strengthen the concepts of single variable calculus and linear ODEs",
      "To provide the fundamentals of matrix algebra",
      "To introduce the concepts and importance of Eigen values and Eigen vectors"
    ],
    outcomes: [
      { code: "CO1", text: "Solve problems involving limits, derivatives and ODEs" },
      { code: "CO2", text: "Model and solve system of linear equations" },
      { code: "CO3", text: "Characterize systems using Eigen values and vectors" },
      { code: "CO4", text: "Apply the mathematical concepts learnt to engineering problems" }
    ],
    copoMapping: {
      CO1: { PO1: 3, PO12: 1 },
      CO2: { PO1: 3, PO2: 2, PO12: 2 },
      CO3: { PO1: 3, PO2: 2, PO12: 1 },
      CO4: { PO1: 3, PO2: 2, PO12: 2 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Single Variable Calculus",
        topics: "Limit and Continuity: Limit of Functions, Continuous functions, Discontinuities, Monotonic Functions, Infinite Limits; Derivatives, Integration - Definite Integrals, Mean value theorem for definite integrals, Fundamental Theorem of Calculus, Integration Techniques. Examples of applications in solving real engineering problems."
      },
      {
        number: 2,
        title: "Unit 2: Differential Equations & Circuit Modeling",
        topics: "Ordinary differential equations (ODE), Linear differential equations, Modelling problems: Electric circuits (RL, RC, RLC circuits); Second order Differential Equations, Homogeneous Systems and Non-homogeneous with constant coefficients, System of ODEs, Basic concepts and theory; Examples of engineering applications."
      },
      {
        number: 3,
        title: "Unit 3: Matrix Algebra & Eigenvalues",
        topics: "Review - System of linear Equations, linear independence; Properties of Matrices, Symmetric and Skew Symmetric Matrices, Hermitian and Skew Hermitian Matrices and Orthogonal matrices; Eigen values and Eigen vectors; Positive definite, negative definite and indefinite quadratic forms, Diagonalization and Orthogonal Diagonalization."
      }
    ],
    parts: [
      "Unit 1: Calculus Limits, Continuity & Integration Theorems",
      "Unit 2: Linear Differential Equations & Circuit Modeling",
      "Unit 3: Matrix Algebra, Hermitian Matrices & Eigenvalues",
      "Model Mid-Term & End-Sem Solved Problems"
    ],
    textbooks: [
      {
        title: "Advanced Engineering Mathematics",
        author: "E Kreyszig",
        publisher: "John Wiley and Sons",
        year: 2018,
        edition: "Tenth Edition",
        link: "https://www.google.com/search?q=Advanced+Engineering+Mathematics+Kreyszig+10th+Edition"
      },
      {
        title: "Engineering Mathematics",
        author: "Srimanta Pal and Subhodh C Bhunia",
        publisher: "John Wiley and Sons",
        year: 2012,
        edition: "Ninth Edition",
        link: "https://www.google.com/search?q=Engineering+Mathematics+Srimanta+Pal+Bhunia"
      }
    ],
    references: [
      {
        title: "Calculus",
        author: "Monty J. Strauss, Gerald J. Bradley and Karl J. Smith",
        publisher: "Prentice Hall",
        year: 2002,
        edition: "3rd Edition",
        link: "https://www.google.com/search?q=Calculus+Strauss+Bradley+Smith+3rd+Edition"
      },
      {
        title: "Advanced Engineering Mathematics",
        author: "Dennis G. Zill and Michael R. Cullen",
        publisher: "CBS Publishers",
        year: 2012,
        edition: "Second Edition",
        link: "https://www.google.com/search?q=Advanced+Engineering+Mathematics+Zill+Cullen+2nd+Edition"
      }
    ],
    externalResources: [
      { type: "simulator", title: "Desmos 3D & 2D Graphing Calculator", url: "https://www.desmos.com/calculator", desc: "Visualize limits, derivatives, curves, and 3D surfaces in real-time." },
      { type: "video", title: "3Blue1Brown: Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", desc: "Geometric intuition behind matrices, vectors, determinants, and eigenvalues." },
      { type: "video", title: "3Blue1Brown: Essence of Calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", desc: "Visual explanations of limits, derivatives, integrals, and MVT." },
      { type: "notes", title: "Paul's Online Math Notes (Calculus & ODEs)", url: "https://tutorial.math.lamar.edu/", desc: "Comprehensive step-by-step solved examples on ODEs and integration." }
    ]
  },
  {
    code: "23ECE102",
    title: "Problem Solving and Algorithmic Thinking",
    category: "ENGG",
    credits: 2,
    ltp: "1-0-3",
    semester: 1,
    prerequisite: "Nil",
    description: "Computational logic, cornerstones of computational thinking, state diagrams, flowcharts, pseudocode, sorting and searching algorithms, Big-O complexity analysis, and introduction to Python programming with 11 hands-on lab experiments.",
    objectives: [
      "To provide insight into computational logic",
      "To introduce the fundamentals of computational thinking",
      "To introduce computational approach to problem solving"
    ],
    outcomes: [
      { code: "CO1", text: "Understand the concepts of computational logic" },
      { code: "CO2", text: "Develop algorithmic thinking" },
      { code: "CO3", text: "Identify algorithms and their suitability" },
      { code: "CO4", text: "Apply algorithms to solve a problem" }
    ],
    copoMapping: {
      CO1: { PO1: 2, PO12: 3 },
      CO2: { PO1: 2, PO12: 2 },
      CO3: { PO1: 2, PO2: 2, PO12: 2 },
      CO4: { PO1: 3, PO2: 2, PO12: 2 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Introduction to Computational Logic",
        topics: "Introduction - Computational thinking, corner stones of computational thinking (decomposition, pattern recognition, abstraction, algorithm design); characteristics of algorithms; problem solving strategies, computational logic, Boolean expressions and logic, data organization, variables, list, arrays and strings."
      },
      {
        number: 2,
        title: "Unit 2: Algorithmic Thinking & Design",
        topics: "Algorithmic thinking – name binding, sequence, selection, repetition and modularization; Modeling tools: state diagrams, pseudocodes and flowcharts – code tracing - problem solving with algorithms – merging, searching, sorting and recursions – brute force and greedy algorithms."
      },
      {
        number: 3,
        title: "Unit 3: Complexity Analysis & Python Basics",
        topics: "Introduction to analysis of algorithms - Algorithmic complexity, linear, logarithmic and exponential computational complexity – Introduction to Python programming."
      }
    ],
    experiments: [
      "Exp 1: Familiarization with Flowgorithm visual programming environment",
      "Exp 2: Visualization of logical control flow using addition/subtraction",
      "Exp 3: Various formatting methods, circle area calculation, and odd/even check",
      "Exp 4: Arithmetic operations on vectors and matrices",
      "Exp 5: Solving quadratic equations and generation of Fibonacci numbers",
      "Exp 6: Modeling simple resistive electric circuits algorithmically",
      "Exp 7: Use of arrays in solving computational problems",
      "Exp 8: String operations, manipulation, and character traversal",
      "Exp 9: Linear Search and Binary Search algorithms implementation",
      "Exp 10: Sorting algorithms: Bubble Sort, Insertion Sort, and Selection Sort",
      "Exp 11: Modeling electrical circuits with dependent voltage/current sources"
    ],
    parts: [
      "Unit 1: Computational Thinking Cornerstones & Logic",
      "Unit 2: Flowcharts, Pseudocode & Sorting Algorithms",
      "Unit 3: Big-O Complexity Analysis & Python Syntax",
      "11 Practical Lab Experiments & Flowgorithm Guide"
    ],
    textbooks: [
      {
        title: "Computational Thinking for the Modern Problem Solver",
        author: "Riley DD, Hunt KA",
        publisher: "CRC Press",
        year: 2014,
        link: "https://www.google.com/search?q=Computational+Thinking+for+the+Modern+Problem+Solver+Riley+Hunt"
      },
      {
        title: "Starting Out with Programming Logic and Design",
        author: "Gaddis, Tony",
        publisher: "Pearson Education India",
        year: 2021,
        edition: "5th Edition",
        link: "https://www.google.com/search?q=Starting+Out+with+Programming+Logic+and+Design+Gaddis+5th+Edition"
      }
    ],
    references: [
      {
        title: "Computational Thinking: First Algorithms, Then Code",
        author: "Ferragina P, Luccio F",
        publisher: "Springer",
        year: 2018,
        link: "https://www.google.com/search?q=Computational+Thinking+First+Algorithms+Then+Code+Ferragina+Luccio"
      },
      {
        title: "Computational Thinking: A beginner's guide to Problem-solving and Programming",
        author: "Beecher K",
        publisher: "BCS Learning & Development",
        year: 2017,
        link: "https://www.google.com/search?q=Computational+Thinking+Beecher+BCS"
      }
    ],
    externalResources: [
      { type: "tool", title: "Flowgorithm Official Tool & Documentation", url: "http://www.flowgorithm.org/", desc: "Interactive flowchart programming environment used in EAC lab sessions." },
      { type: "simulator", title: "VisuAlgo: Visualising Data Structures & Algorithms", url: "https://visualgo.net/en", desc: "Step-by-step animations of Bubble, Selection, Insertion Sort and Binary Search." },
      { type: "tool", title: "Python Tutor: Visualize Code Execution", url: "https://pythontutor.com/", desc: "Step through Python code frame-by-frame to see variable memory bindings." },
      { type: "course", title: "Harvard CS50: Introduction to Computational Thinking", url: "https://cs50.harvard.edu/x/", desc: "World-renowned lectures on computational logic, arrays, and algorithms." }
    ]
  },
  {
    code: "23ECE103",
    title: "Fundamentals of Electrical Engineering",
    category: "ENGG",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    prerequisite: "Nil",
    description: "DC and AC circuit analysis, Ohm's law, Kirchhoff's laws, network theorems (Superposition, Thevenin, Norton, Maximum Power Transfer), power factor, complex power, DC motors/generators, single-phase transformers, and 3-phase induction motors.",
    objectives: [
      "To provide an understanding of fundamental electrical quantities and their measurements",
      "To help in the use of analytical tools for circuit analysis",
      "To provide an understanding of electromagnetic machines"
    ],
    outcomes: [
      { code: "CO1", text: "Understand fundamental electrical quantities" },
      { code: "CO2", text: "Understand the principles of electrical measurements" },
      { code: "CO3", text: "Analyse ac and dc circuits" },
      { code: "CO4", text: "Understand the operation of electromagnetic machines" }
    ],
    copoMapping: {
      CO1: { PO1: 3 },
      CO2: { PO1: 3, PO2: 2, PO12: 2 },
      CO3: { PO1: 3, PO2: 3, PO12: 2 },
      CO4: { PO1: 3 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Electrical Quantities & Waveforms",
        topics: "Introduction: AC, DC, Voltage, Current and Power; Current and Voltage sources (Dependent and Independent); Resistance, Inductance (Self & Mutual), Capacitance, Series and parallel combinations of R, L, C components, Wheatstone’s bridge. Power and Energy - Alternating voltage and current, Amplitude, phase, Average and RMS values of waveforms. Complex power, Power factor for purely resistive, RL, RC and RLC circuits."
      },
      {
        number: 2,
        title: "Unit 2: AC & DC Circuit Analysis and Theorems",
        topics: "AC and DC circuit Analysis – Ohm’s law, Kirchhoff’s voltage and Current law (KVL/KCL), Voltage divider and Current divider Rule, Star-Delta transformation, Mesh and Nodal Analysis, Source transformation, Superposition Theorem, Thevenin & Norton’s Theorems, and Maximum power transfer theorem."
      },
      {
        number: 3,
        title: "Unit 3: Electromagnetic Machines & Transformers",
        topics: "Electrical Machines – Construction, Principle of operation and applications, DC generator and DC Motors. Significance of back EMF and EMF equation. Types of DC motors, Speed, Torque, Torque-Speed characteristics, Load characteristics, Construction and working principles of three-phase induction motor and single-phase transformer."
      }
    ],
    parts: [
      "Unit 1: DC/AC Foundations, RMS Values & Power Factor",
      "Unit 2: KVL/KCL, Mesh/Nodal & Network Theorems",
      "Unit 3: DC Motors, Generators & Transformers",
      "Circuit Theorems & Problem Solving Cheat Sheet"
    ],
    textbooks: [
      {
        title: "Fundamentals of Electrical Circuits",
        author: "Charles K. Alexander, Matthew N. O. Sadiku",
        publisher: "Tata McGraw Hill",
        year: 2003,
        link: "https://www.google.com/search?q=Fundamentals+of+Electrical+Circuits+Alexander+Sadiku"
      },
      {
        title: "Electrical Machines",
        author: "D.P. Kothari and I.J. Nagrath",
        publisher: "McGraw Hill",
        year: 2017,
        link: "https://www.google.com/search?q=Electrical+Machines+Kothari+Nagrath+2017"
      }
    ],
    references: [
      {
        title: "Electrical Engineering Fundamentals",
        author: "Vincent DelToro",
        publisher: "PHI",
        year: 2011,
        edition: "Second Edition",
        link: "https://www.google.com/search?q=Electrical+Engineering+Fundamentals+DelToro+2nd+Edition"
      },
      {
        title: "Basic Electrical and Electronics Engineering",
        author: "S. K. Bhattcharya",
        publisher: "Pearson",
        year: 2012,
        link: "https://www.google.com/search?q=Basic+Electrical+and+Electronics+Engineering+Bhattacharya+Pearson"
      }
    ],
    externalResources: [
      { type: "simulator", title: "Falstad Circuit Simulator", url: "https://www.falstad.com/circuit/", desc: "Interactive in-browser circuit simulator to test RLC, Thevenin, and transformer circuits." },
      { type: "course", title: "NPTEL: Basic Electrical Circuits (IIT Madras)", url: "https://nptel.ac.in/courses/108101091", desc: "Prof. Nagendra Krishnapura's comprehensive lectures on network theorems and AC circuits." },
      { type: "notes", title: "All About Circuits: Electric Circuits Textbook", url: "https://www.allaboutcircuits.com/textbook/", desc: "Free open-source textbook covering DC/AC theory, impedance, and electrical machines." },
      { type: "simulator", title: "CircuitVerse Online Simulator", url: "https://circuitverse.org/simulator", desc: "Cloud-based modular circuit simulation with live waveform graphs." }
    ]
  },
  {
    code: "23ECE104",
    title: "Physics of Semiconductors",
    category: "SCI",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    prerequisite: "Nil",
    description: "Semiconductor physics, crystal structures, Bravais lattices, Miller indices, free electron theory, Fermi-Dirac distribution, carrier transport (drift, diffusion, Hall effect), PN junction mechanics, and MOSFET operating physics.",
    objectives: [
      "To provide an understanding of crystal structure",
      "To help appreciate the band gap nature of semiconductors",
      "To introduce the concepts of transport phenomena in semiconductors"
    ],
    outcomes: [
      { code: "CO1", text: "Understand the crystal structure of semiconductors" },
      { code: "CO2", text: "Understand semiconductors based on energy band gap" },
      { code: "CO3", text: "Understand current flow in semiconductors" },
      { code: "CO4", text: "Understand the behaviour of PN junctions & MOSFETs" }
    ],
    copoMapping: {
      CO1: { PO1: 3, PO12: 1 },
      CO2: { PO1: 3, PO12: 1 },
      CO3: { PO1: 3, PO12: 1 },
      CO4: { PO1: 3, PO12: 2 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Crystal Structures & Miller Indices",
        topics: "Crystal structures - Crystal lattice, basis, unit cell and lattice parameters, crystal systems and Bravais lattices – Structure and packing fractions of SC, BCC, FCC, diamond cubic, NaCl; ZnS structures – crystal planes, directions and Miller indices, Imperfections and defects in crystals."
      },
      {
        number: 2,
        title: "Unit 2: Band Theory & Carrier Transport",
        topics: "Classical free electron theory - Expression for electrical conductivity, Thermal conductivity - Quantum free electron theory; Tunneling – degenerate states, Fermi-Dirac statistics, Density of energy states, Energy bands in solids; Electron effective mass – concept of hole, Intrinsic Semiconductors, Energy band diagram, direct and indirect band gap semiconductors; Carrier concentration in intrinsic and extrinsic semiconductors – Variation of carrier concentration with temperature; Carrier transport in Semiconductors - Drift, mobility and diffusion, Hall effect."
      },
      {
        number: 3,
        title: "Unit 3: PN Junctions & MOSFET Physics",
        topics: "Basic structure of PN junctions – Built-in-potential, Space Charge region, electric field across junction, Forward and reverse bias, band diagram, minority carrier distribution across junction in forward and reverse bias, boundary conditions; Basics of MOSFET – Structure of MOSFET, band diagram of MOS, Ideal MOS Capacitor, FET operation and their applications."
      }
    ],
    parts: [
      "Unit 1: Bravais Lattices, Miller Indices & Packing Fractions",
      "Unit 2: Fermi-Dirac Statistics, Carrier Drift/Diffusion & Hall Effect",
      "Unit 3: PN Junction Built-in Potential & MOSFET Physics",
      "Band Diagram Visual Guides & Question Bank"
    ],
    textbooks: [
      {
        title: "Semiconductor Device Fundamentals",
        author: "R.F. Pierret",
        publisher: "Pearson (Indian Edition)",
        year: 2006,
        link: "https://www.google.com/search?q=Semiconductor+Device+Fundamentals+Pierret"
      },
      {
        title: "Semiconductor Physics and Devices",
        author: "Donald Neamen",
        publisher: "McGraw-Hill International",
        year: 2007,
        edition: "3rd Edition",
        link: "https://www.google.com/search?q=Semiconductor+Physics+and+Devices+Donald+Neamen"
      }
    ],
    references: [
      {
        title: "Introduction to Solid State Physics",
        author: "Charles Kittel",
        publisher: "Wiley India Edition",
        year: 2019,
        link: "https://www.google.com/search?q=Introduction+to+Solid+State+Physics+Kittel+Wiley"
      },
      {
        title: "Semiconductor Optoelectronics: Physics and Technology",
        author: "Jasprit Singh",
        publisher: "McGraw-Hill Education",
        year: 2019,
        link: "https://www.google.com/search?q=Semiconductor+Optoelectronics+Jasprit+Singh"
      },
      {
        title: "Solid State Electronic Devices",
        author: "Streetman and Banerjee",
        publisher: "PHI",
        year: 2014,
        link: "https://www.google.com/search?q=Solid+State+Electronic+Devices+Streetman+Banerjee"
      }
    ],
    externalResources: [
      { type: "simulator", title: "PhET: Semiconductors & PN Junction Simulator", url: "https://phet.colorado.edu/en/simulations/semiconductor", desc: "Interactive doping, energy bands, and electron-hole flow visualizer." },
      { type: "tool", title: "nanoHUB: Semiconductor Device Simulation Applets", url: "https://nanohub.org/resources/tools", desc: "Professional microelectronics modeling and carrier concentration applets." },
      { type: "course", title: "MIT 6.012: Microelectronic Devices and Circuits", url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/", desc: "MIT OpenCourseWare video lectures on PN junctions, MOSFETs, and band diagrams." },
      { type: "notes", title: "Brit Cruise: Semiconductor Physics Series", url: "https://www.youtube.com/playlist?list=PL74C4BC7C67BC9BEF", desc: "Intuitive video explanations of band gaps, Fermi level, and holes." }
    ]
  },
  {
    code: "23ECE181",
    title: "Electrical Engineering Laboratory",
    category: "ENGG",
    credits: 1,
    ltp: "0-0-3",
    semester: 1,
    prerequisite: "Nil",
    description: "Hands-on electrical laboratory for verifying KVL/KCL, network theorems (Superposition, Thevenin, Norton), speed control of DC motors, single-phase transformers, Wheatstone bridge measurements, and mandatory system development.",
    objectives: [
      "To provide hands-on experience of identifying electrical components and their specifications",
      "To help understand circuit theorems using practical circuits and measurements",
      "To demonstrate the principles of electrical machines"
    ],
    outcomes: [
      { code: "CO1", text: "Identify electrical components and their specifications" },
      { code: "CO2", text: "Measure electrical quantities such as voltage and current" },
      { code: "CO3", text: "Verify theorems for dc circuits" },
      { code: "CO4", text: "Understand the operation of electrical machines" }
    ],
    copoMapping: {
      CO1: { PO1: 3, PO9: 2, PO10: 2, PO12: 1, PSO1: 1 },
      CO2: { PO1: 3, PO9: 2, PO10: 2, PO12: 1, PSO1: 1 },
      CO3: { PO1: 3, PO9: 2, PO10: 2, PSO1: 1 },
      CO4: { PO1: 3, PO9: 2, PO10: 2, PSO1: 1 }
    },
    units: [
      {
        number: 1,
        title: "Laboratory System Requirements & Guidelines",
        topics: "Define a system covering most experiments (e.g. lamp load theorem validator, Wheatstone bridge with sensor arm). System-level explanation given at start; high weightage on final working prototype on PCB/casing (not bare breadboard)."
      }
    ],
    experiments: [
      "Exp 1: Identification of electrical components (resistors, inductors, capacitors) and their specifications",
      "Exp 2: Familiarization with equipment: Multimeter, Function Generator, DC Power Supply, and DSO",
      "Exp 3: Verification of Kirchhoff’s Current Law (KCL) and Voltage Law (KVL)",
      "Exp 4: Verification of Superposition Theorem with multiple power supplies",
      "Exp 5: Verification of Thevenin’s Theorem and Norton’s Theorem with load resistors",
      "Exp 6: Speed control of a D.C. Motor (armature and field control)",
      "Exp 7: Single-phase transformers – turns ratio measurement, Step-down and Step-up behavior",
      "Exp 8: Measurement of unknown resistance using Wheatstone Bridge",
      "Exp 9: Mandatory System Development Prototype (e.g., sensor-based automated load regulation)"
    ],
    parts: [
      "Multimeter, DSO & Function Generator Familiarization",
      "KVL, KCL & Network Theorems Verification",
      "DC Motor Speed Control & Transformer Turns Ratio",
      "Wheatstone Bridge & Mandatory Prototype Viva Guide"
    ],
    textbooks: [
      {
        title: "Electrical & Electronic Technology",
        author: "Hughes",
        publisher: "Pearson Education India",
        year: 2010,
        link: "https://www.google.com/search?q=Electrical+Electronic+Technology+Hughes"
      },
      {
        title: "Electrical Machines",
        author: "D. P. Kothari and I. J. Nagrath",
        publisher: "Tata McGraw-Hill",
        year: 2017,
        link: "https://www.google.com/search?q=Electrical+Machines+Kothari+Nagrath+2017"
      }
    ],
    references: [
      {
        title: "Advanced Electrical Technology",
        author: "H. Cotton",
        publisher: "Reem Publication Pvt. Ltd.",
        year: 2011,
        link: "https://www.google.com/search?q=Advanced+Electrical+Technology+Cotton"
      },
      {
        title: "Electrical Engineering Fundamentals",
        author: "Vincent Deltoro",
        publisher: "Pearson Education India",
        year: 2015,
        link: "https://www.google.com/search?q=Electrical+Engineering+Fundamentals+DelToro"
      }
    ],
    externalResources: [
      { type: "virtual-lab", title: "Virtual Labs: IIT Roorkee Electrical Circuit Lab", url: "https://www.vlab.co.in/broad-division-electrical-engineering", desc: "Official MHRD virtual laboratory simulations for Kirchhoff's laws and Thevenin circuits." },
      { type: "guide", title: "Digital Storage Oscilloscope (DSO) User & Measurement Guide", url: "https://www.tek.com/en/documents/primer/xyzs-oscilloscopes", desc: "Tektronix guide on triggering, probe calibration, and signal capture." },
      { type: "notes", title: "Electrical Lab Viva Voce Question Bank with Answers", url: "https://www.electrical4u.com/", desc: "Comprehensive review questions for lab internal & external viva." }
    ]
  },
  {
    code: "23ENG101",
    title: "Technical Communication",
    category: "ENGG",
    credits: 3,
    ltp: "2-0-3",
    semester: 1,
    prerequisite: "Nil",
    description: "Formal correspondence, mechanics of writing, grammar error analysis, user manuals, project proposals, technical report generation, IEEE documentation style, and professional oral presentations.",
    objectives: [
      "To develop techniques of scanning for specific information, comprehension and organization of ideas",
      "To introduce the fundamentals of mechanics of formal writing, documentation and presentation",
      "To introduce the art of critical thinking and analysis"
    ],
    outcomes: [
      { code: "CO1", text: "Apply basic elements of language in formal correspondence by interpreting and analyzing information logically" },
      { code: "CO2", text: "Understand and summarize technical documents" },
      { code: "CO3", text: "Understand the mechanics of writing and elements of formal correspondence" },
      { code: "CO4", text: "Compose project reports/documents, revise them for language accuracy and make technical presentations" }
    ],
    copoMapping: {
      CO1: { PO8: 2, PO9: 3, PO10: 3, PO12: 3 },
      CO2: { PO8: 2, PO9: 2, PO10: 3, PO12: 3 },
      CO3: { PO8: 2, PO9: 3, PO10: 3, PO12: 3 },
      CO4: { PO8: 2, PO9: 2, PO10: 3, PO12: 3 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Error Analysis & Mechanics of Writing",
        topics: "Error Analysis, Mechanics of Writing: Grammar rules - articles, tenses, auxiliary verbs (primary & modal), prepositions, subject-verb agreement, pronoun-antecedent agreement, discourse markers and sentence linkers, impersonal passive, modifiers, phrasal verbs, General Reading and Listening comprehension - rearrangement & organization of sentences."
      },
      {
        number: 2,
        title: "Unit 2: Technical Documents & Correspondence",
        topics: "Different kinds of written documents: Definitions, Descriptions, Instructions, Recommendations, User manuals, Reports, Proposals; Formal Correspondence: Writing Formal Letters/Emails; Punctuation; Scientific Reading & Listening Comprehension."
      },
      {
        number: 3,
        title: "Unit 3: Technical Papers & Project Presentations",
        topics: "Technical paper writing: Documentation style (IEEE/APA), Document editing, Proofreading, Organizing and Formatting; Tone and style; Graphical representation; Reading and listening comprehension of technical documents; Mini Technical project / Term paper (10-12 pages); Technical presentations."
      }
    ],
    parts: [
      "Unit 1: Grammar Rules, Sentence Linkers & Impersonal Passive",
      "Unit 2: User Manuals, Formal Letters, Proposals & Emails",
      "Unit 3: IEEE Paper Formatting, Mini Project & Presentations",
      "Common Writing Errors & Term Paper Checklist"
    ],
    textbooks: [
      {
        title: "Essential Communication Strategies for Scientists, Engineers and Technology Professionals",
        author: "Hirsh, Herbert L.",
        publisher: "IEEE Press",
        year: 2002,
        edition: "II Edition",
        link: "https://www.google.com/search?q=Essential+Communication+Strategies+Hirsh+IEEE"
      },
      {
        title: "Technical Communication: A Reader-Centred Approach",
        author: "Anderson, Paul V.",
        publisher: "Harcourt Brace College Publication",
        year: 2003,
        edition: "V Edition",
        link: "https://www.google.com/search?q=Technical+Communication+Reader+Centred+Approach+Anderson"
      }
    ],
    references: [
      {
        title: "The Elements of Style",
        author: "Strunk, William Jr. and White. EB.",
        publisher: "Allyn & Bacon",
        year: 1999,
        link: "https://www.google.com/search?q=The+Elements+of+Style+Strunk+White"
      },
      {
        title: "Technical Report Writing Today",
        author: "Riordan, G. Daniel and Pauley E. Steven",
        publisher: "Biztantra",
        year: 2004,
        edition: "VIII Edition",
        link: "https://www.google.com/search?q=Technical+Report+Writing+Today+Riordan+Pauley"
      },
      {
        title: "Practical English Usage",
        author: "Michael Swan",
        publisher: "Oxford University Press",
        year: 2000,
        link: "https://www.google.com/search?q=Practical+English+Usage+Michael+Swan"
      }
    ],
    externalResources: [
      { type: "writing", title: "Purdue Online Writing Lab (OWL)", url: "https://owl.purdue.edu/", desc: "Authoritative guides for technical formatting, grammar, and IEEE citations." },
      { type: "tool", title: "Overleaf LaTeX IEEE Manuscript Template", url: "https://www.overleaf.com/latex/templates/ieee-conference-template/grfzhngfhxbw", desc: "Standard IEEE two-column paper template for term paper submissions." },
      { type: "guide", title: "Toastmasters: Public Speaking & Presentation Tips", url: "https://www.toastmasters.org/resources/public-speaking-tips", desc: "Proven strategies for reducing anxiety and delivering impactful technical presentations." }
    ]
  },
  {
    code: "22ADM101",
    title: "Foundations of Indian Heritage",
    category: "HUM",
    credits: 2,
    ltp: "2-0-1",
    semester: 1,
    prerequisite: "Nil",
    description: "Cultural, philosophical, and historical exploration of ancient Indian education, personality models, yoga practices, holistic values of Indian Mahatmas, and conversations on compassion with Mata Amritanandamayi (Amma).",
    objectives: [
      "To study fundamental concepts of Indian Heritage",
      "To discuss the cultural, philosophical, and historical facets of India",
      "To familiarize eternal and all-pervading nature of India’s cultural and spiritual ethos"
    ],
    outcomes: [
      { code: "CO1", text: "Understand true essence of India’s cultural and spiritual heritage" },
      { code: "CO2", text: "Understand ethical and political strategic concepts to induce critical approach to various theories about India" },
      { code: "CO3", text: "Get familiarized with multidimension of man’s interaction with nature, fellow beings and society" },
      { code: "CO4", text: "Appreciate socio-political and strategic innovations based on Indian knowledge systems" }
    ],
    copoMapping: {
      CO1: { PO4: 2, PO8: 2 },
      CO2: { PO2: 1, PO6: 1, PO7: 1, PO8: 3 },
      CO3: { PO6: 1, PO7: 2, PO8: 3 },
      CO4: { PO1: 3, PO6: 3, PO7: 3, PO8: 3 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Educational Heritage & Early Indian Subcontinent",
        topics: "Introduction - Educational Heritage of Ancient India - Life and Happiness - Impact of Colonialism and Decolonization - A timeline of Early Indian Subcontinent (Takshashila, Nalanda, Gurukula systems)."
      },
      {
        number: 2,
        title: "Unit 2: Selflessness & Indian Mahatmas",
        topics: "Pinnacle of Selflessness and ultimate freedom - Indian approach towards life - Life and teachings of Indian Mahatmas (Sri Ramakrishna, Swami Vivekananda, Sri Aurobindo, Mahatma Gandhi)."
      },
      {
        number: 3,
        title: "Unit 3: Strategic Thinking & Nature Harmony",
        topics: "Man's association with Nature - Metaphors and Tropes - Indian approach towards strategic thinking - India: In the Views of Other Scholars and Travellers - Personality Development Through Yoga - Hallmark of Indian philosophical tradition - Conversations on Compassion with Amma."
      }
    ],
    parts: [
      "Unit 1: Ancient Educational Heritage & Decolonization Timeline",
      "Unit 2: Philosophy of Selflessness & Indian Mahatmas",
      "Unit 3: Nature Harmony, Yoga & Compassion with Amma",
      "Comprehensive Heritage Notes & Exam Discussion Guide"
    ],
    textbooks: [
      {
        title: "Foundations of Indian Heritage",
        author: "Amrita Vishwa Vidyapeetham Publication",
        publisher: "University Publication",
        year: 2020,
        link: "https://www.google.com/search?q=Foundations+of+Indian+Heritage+Amrita"
      }
    ],
    references: [
      {
        title: "Foundations of Indian Culture",
        author: "Sri Aurobindo",
        publisher: "The Sri Aurobindo Library Inc.",
        year: 1953,
        link: "https://www.google.com/search?q=Foundations+of+Indian+Culture+Aurobindo"
      },
      {
        title: "The Wonder That Was India",
        author: "Basham A. L.",
        publisher: "Sidgwick and Jackson",
        year: 1954,
        link: "https://www.google.com/search?q=The+Wonder+That+Was+India+Basham"
      },
      {
        title: "India, that is Bharat: Coloniality, Civilisation, Constitution",
        author: "Sai Deepak J.",
        publisher: "Bloomsbury",
        year: 2021,
        link: "https://www.google.com/search?q=India+that+is+Bharat+Sai+Deepak"
      }
    ],
    externalResources: [
      { type: "article", title: "Project Sahapedia: Encyclopedia of Indian Culture & Heritage", url: "https://www.sahapedia.org/", desc: "Curated open archive on traditional Indian knowledge systems, art, and philosophy." },
      { type: "video", title: "Complete Works of Swami Vivekananda (Audio & Text)", url: "https://www.ramakrishnavivekananda.info/", desc: "Digitized essays and lectures on Indian philosophy, education, and character building." },
      { type: "portal", title: "Amritapuri.org: Amma's Teachings on Compassion & Education", url: "https://www.amritapuri.org/", desc: "Teachings on education for living vs education for life." }
    ]
  },
  {
    code: "22AVP103",
    title: "Mastery Over Mind (MAOM)",
    category: "HUM",
    credits: 2,
    ltp: "1-0-2",
    semester: 1,
    prerequisite: "Nil",
    description: "Stress management, science of meditation, neurobiology of mindfulness, MA OM meditation practical training (Levels 1 to 5), interpersonal communication, and compassion-driven action aligned with UN SDG-3.",
    objectives: [
      "To enhance health and wellbeing of all faculty, staff, and students (UN SDG -3)",
      "To manage stressful emotions and anxiety, in turn facilitating inner peace and harmony",
      "To enhance the understanding of experiential learning based on the University’s mission: 'Education for Life along with Education for Living'"
    ],
    outcomes: [
      { code: "CO1", text: "Describe what meditation is and to understand its health benefits" },
      { code: "CO2", text: "Understand the causes of stress and how meditation improves well-being" },
      { code: "CO3", text: "Understand the science of meditation" },
      { code: "CO4", text: "Learn and practice MA OM meditation in daily life" },
      { code: "CO5", text: "Understand the application of meditation to improve communication and relationships" },
      { code: "CO6", text: "Understand the power of meditation in compassion-driven action" }
    ],
    copoMapping: {
      CO1: { PO8: 1, PO9: 2, PO10: 2, PO12: 2 },
      CO2: { PO2: 2, PO5: 2, PO8: 2, PO9: 2, PO12: 2 },
      CO3: { PO5: 2, PO8: 2, PO9: 2, PO10: 2, PO12: 2 },
      CO4: { PO3: 3, PO5: 3, PO7: 2, PO8: 3, PO9: 3, PO10: 3, PO12: 3, PSO1: 3 },
      CO5: { PO3: 2, PO5: 2, PO8: 2, PO9: 2, PO10: 3, PO12: 3 },
      CO6: { PO3: 2, PO8: 2, PO9: 2, PO10: 2, PO12: 2 }
    },
    units: [
      {
        number: 1,
        title: "Unit 1: Describe Meditation and Understand its Benefits (CO1)",
        topics: "A: Importance of meditation. How does meditation help to overcome obstacles in life (Pre-recorded video with Swami Shubhamritananda Puri). Readings: 'Why Meditate?', 'Stillness of the Mind' Chapter 17 in Amritam Gamaya (2022). B: Understand how meditation works for physical and mental health & personality development (Video with Dr. Ram Manohar). Reading: Cynthia Allen (2020) The Potential Health Benefits of Meditation."
      },
      {
        number: 2,
        title: "Unit 2: Causes of Stress & Wellbeing Improvement (CO2)",
        topics: "A: Preparing for meditation: aids for effective practice, role of sleep, physical activity, and balanced diet (Dr. Ram Manohar). B: Causes of stress, problems of tension, effects of stress on health. Stress management basics at home and workplace (Prof. Udhaykumar). Mayo Clinic: Meditation - A Simple Fast Way to Reduce Stress."
      },
      {
        number: 3,
        title: "Unit 3: The Science of Meditation (CO3)",
        topics: "A: Preliminary understanding of the science of meditation. What modern neuroimaging and scientific research tells us about tradition-based mindfulness (Video with Dr. Shyam Diwakar). B: How meditation aids brain and mental health. Reading: 'Science and Spirituality' in Amritam Gamaya."
      },
      {
        number: 4,
        title: "Unit 4: Practicing MA OM Meditation in Daily Life (CO4)",
        topics: "Guided meditation sessions following scripts provided (Level One to Level Five). Reading: MA OM and White Flower Meditation: A Brief Note (Swami Atmananda Puri); 'Live in the Present Moment'."
      },
      {
        number: 5,
        title: "Unit 5: Improving Communication and Relationships (CO5)",
        topics: "How meditation and mindfulness influence interpersonal communication in family, university and workplace (Video with Dr. Shobhana Madhavan). Reading: Emma Seppala (2022) '5 Unexpected Ways Meditation Improves Relationships a Lot'."
      },
      {
        number: 6,
        title: "Unit 6: Meditation and Compassion-driven Action (CO6)",
        topics: "How meditation motivates altruistic and prosocial behavior (Video with Dr. Shobhana Madhavan). Reading: Schindler & Friese (2022) 'The relation of mindfulness and prosocial behavior'; 'Sympathy and Compassion'."
      }
    ],
    parts: [
      "Unit 1: Understanding Meditation & Physical/Mental Health Benefits",
      "Unit 2: Stress Management, Sleep & Healthy Lifestyle Habits",
      "Unit 3: Neurobiology & Brain Science of Meditation (Dr. Shyam Diwakar)",
      "Unit 4: Guided MA OM & White Flower Meditation Practice (Levels 1-5)",
      "Unit 5: Mindful Communication & Interpersonal Relationships",
      "Unit 6: Compassion in Action & Prosocial Engagement"
    ],
    textbooks: [
      {
        title: "Meditation and Spiritual Life",
        author: "Swami Yatiswarananda",
        publisher: "Ramakrishna Math",
        year: 2010,
        link: "https://www.google.com/search?q=Meditation+and+Spiritual+Life+Yatiswarananda"
      },
      {
        title: "The Complete Works of Swami Vivekananda Vol VII",
        author: "Swami Vivekananda",
        publisher: "Advaita Ashram",
        year: 2012,
        link: "https://www.google.com/search?q=Complete+Works+of+Swami+Vivekananda+Vol+VII"
      },
      {
        title: "The Science of Meditation: How to Change Your Brain, Mind and Body",
        author: "Daniel Goleman and Richard J. Davidson",
        publisher: "Penguin Books",
        year: 2017,
        link: "https://www.google.com/search?q=The+Science+of+Meditation+Goleman+Davidson"
      }
    ],
    references: [
      {
        title: "Dhyana Yoga-Holy Gita",
        author: "Swami Chinmayananda",
        publisher: "Central Chinmaya Mission Trust",
        year: 2005,
        link: "https://www.google.com/search?q=Dhyana+Yoga+Holy+Gita+Swami+Chinmayananda"
      },
      {
        title: "Voice of God",
        author: "Chandrasekharendra Saraswati",
        publisher: "Sri Kanchi Kamakoti Peetam",
        year: 2008,
        link: "https://www.google.com/search?q=Voice+of+God+Chandrasekharendra+Saraswati"
      },
      {
        title: "Mind: It's Mysteries and Control",
        author: "Swami Sivananda Saraswati",
        publisher: "Divine Life Society",
        year: 2011,
        link: "https://www.google.com/search?q=Mind+Its+Mysteries+and+Control+Sivananda"
      }
    ],
    externalResources: [
      { type: "article", title: "Mayo Clinic: Meditation - A Simple, Fast Way to Reduce Stress", url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858", desc: "Clinical guide to emotional wellness and physiological benefits of regular meditation." },
      { type: "science", title: "Dr. Shyam Diwakar: Amrita Mind Brain Research", url: "https://www.amrita.edu/research/computational-neuroscience-and-neurophysiology/", desc: "Computational neuroscience and EEG studies on meditation from Amrita." },
      { type: "guide", title: "Guided 5-Minute Breathing & Focus Timer", url: "https://www.mindful.org/", desc: "Practical techniques for college students to reset focus between heavy study sessions." }
    ]
  }
];

export const ACADEMIC_QUOTES = [
  "“Education for life along with education for living.” – Sri Mata Amritanandamayi Devi",
  "“The function of education is to teach one to think intensively and to think critically.” – Martin Luther King, Jr.",
  "“Engineering is not merely know-how and execution; it is the art of solving problems for humanity.”",
  "“Study with a purpose, comprehend with clarity, and innovate with compassion.”",
  "“Live as if you were to die tomorrow. Learn as if you were to live forever.” – Mahatma Gandhi"
];
