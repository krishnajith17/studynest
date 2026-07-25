export const initialCourses = [
  {
    code: "23ECE101",
    title: "Nature Inspired Engineering",
    category: "SCI",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    description: "Learn engineering designs inspired by biological systems and structures in nature, such as bullet train aerodynamics, self-cleaning surfaces, and bat echolocation.",
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
    additionalResources: [
      { label: "Janine Benyus - Biomimicry TED Talk", url: "https://tinyurl.com/Janine-01" },
      { label: "Michael Pawlyn - Eco-Engineering", url: "https://tinyurl.com/Pawlyn-01" },
      { label: "Biomimicry Institute Resources", url: "https://tinyurl.com/Biomimicry-01" },
      { label: "AskNature Platform", url: "https://asknature.org/" }
    ],
    parts: ["Unit 1: Biological Inspiration", "Unit 2: Biomimetics Examples", "Unit 3: Bio-inspired Innovations", "Complete Question Bank"]
  },
  {
    code: "23MAT124",
    title: "Engineering Mathematics I",
    category: "SCI",
    credits: 4,
    ltp: "3-1-0",
    semester: 1,
    description: "Foundational calculus, linear ordinary differential equations, and matrix algebra for general engineering computation.",
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
    parts: ["Unit 1: Calculus Limits & continuity", "Unit 2: Differential Equations", "Unit 3: Matrix Algebra & Eigenvalues", "Previous Year Papers"]
  },
  {
    code: "23ECE102",
    title: "Problem Solving and Algorithmic Thinking",
    category: "ENGG",
    credits: 2,
    ltp: "1-0-3",
    semester: 1,
    description: "Computational logic, modeling tools, algorithm tracing, complexity analysis, and introduction to Python programming.",
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
    parts: ["Unit 1: Algorithms & Python Basics", "Unit 2: Algorithmic Thinking", "Unit 3: Complexity Analysis", "Lab Experiment Guide"]
  },
  {
    code: "23ECE103",
    title: "Fundamentals of Electrical Engineering",
    category: "ENGG",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    description: "AC & DC circuit analysis (laws and theorems), electromagnetism, power factor, and principles of electrical machines.",
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
    parts: ["Unit 1: DC Circuit Laws & Theorems", "Unit 2: AC Circuits & Power Factor", "Unit 3: Transformer & Motor Principles", "Formulas Cheat Sheet"]
  },
  {
    code: "23ECE104",
    title: "Physics of Semiconductors",
    category: "SCI",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    description: "Semiconductor crystal structures, Fermi-Dirac statistics, carrier transport, energy bands, PN junction mechanics, and MOSFET physics.",
    textbooks: [
      {
        title: "Semiconductor Device Fundamentals",
        author: "Pierret R.F.",
        publisher: "Pearson (Indian Edition)",
        year: 2006,
        link: "https://www.google.com/search?q=Semiconductor+Device+Fundamentals+Pierret"
      },
      {
        title: "Semiconductor Physics and Devices",
        author: "Donald Neaman",
        publisher: "McGraw-Hill",
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
    parts: ["Unit 1: Crystal Structures & Miller Indices", "Unit 2: Carrier Transport & Fermi Levels", "Unit 3: PN Junctions & MOSFET Physics", "Lecture Diagrams PDF"]
  },
  {
    code: "23ECE181",
    title: "Electrical Engineering Laboratory",
    category: "ENGG",
    credits: 1,
    ltp: "0-0-3",
    semester: 1,
    description: "Practical experiments for verifying circuit theorems, KVL/KCL, measuring motor speed, and testing single-phase transformers.",
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
    parts: ["Verification of Superposition Theorem", "Kirchhoff's Laws & Voltage Division", "Transformer Turns Ratio Measurement", "Lab Viva Q&A Guide"]
  },
  {
    code: "23ENG101",
    title: "Technical Communication",
    category: "ENGG",
    credits: 3,
    ltp: "2-0-3",
    semester: 1,
    description: "Formal writing, technical report generation, presentation style, punctuation, grammar, and scientific correspondence.",
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
        publisher: "Harcourt Brace",
        year: 2003,
        edition: "V Edition",
        link: "https://www.google.com/search?q=Technical+Communication+Reader+Centred+Approach+Anderson"
      }
    ],
    references: [
      {
        title: "The Elements of Style",
        author: "Strunk, William Jr. and White, E.B.",
        publisher: "Allyn & Bacon",
        year: 1999,
        link: "https://www.google.com/search?q=The+Elements+of+Style+Strunk+White"
      },
      {
        title: "Technical Report Writing Today",
        author: "Riordan, G. Daniel and Pauley, E. Steven",
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
    parts: ["Unit 1: Grammar Rules & Sentences", "Unit 2: Letter Writing & Correspondence", "Unit 3: Technical Paper & Report Writing", "Common Errors Cheat Sheet"]
  },
  {
    code: "22ADM101",
    title: "Foundations of Indian Heritage",
    category: "ENGG",
    credits: 2,
    ltp: "2-0-1",
    semester: 1,
    description: "A cultural exploration of ancient Indian education, personality models, yoga practices, and the historical values of Indian Mahatmas.",
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
        author: "Aurobindo",
        publisher: "The Sri Aurobindo Library Inc.",
        year: 1953,
        link: "https://www.google.com/search?q=Foundations+of+Indian+Culture+Aurobindo"
      },
      {
        title: "The Wonder That Was India",
        author: "Basham A. L.",
        publisher: "Sidwick and Jackson",
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
    parts: ["Unit 1: Educational Heritage & Early Subcontinent", "Unit 2: Indian Mahatmas & Approach to Life", "Unit 3: Metaphors in Nature & Yoga Philosophy", "Full Syllabus Notes"]
  },
  {
    code: "22AVP103",
    title: "Mastery Over Mind (MAOM)",
    category: "HUM",
    credits: 2,
    ltp: "1-0-2",
    semester: 1,
    description: "Stress management, science of meditation, MA OM meditation practice, and emotional/relationship health.",
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
      },
      {
        title: "The Science of Meditation: How to Change Your Brain, Mind and Body",
        author: "Daniel Goleman and Richard J. Davidson",
        publisher: "Penguin Books",
        year: 2017,
        link: "https://www.google.com/search?q=The+Science+of+Meditation+Goleman+Davidson"
      }
    ],
    parts: ["Unit 1: Introduction to Meditation & Benefits", "Unit 2: Causes of Stress & Relieving Techniques", "Unit 3: Science of Meditation & Research Details", "MA OM Meditation Guide"]
  },
  {
    code: "23MAT130",
    title: "Engineering Mathematics II",
    category: "SCI",
    credits: 4,
    ltp: "3-1-0",
    semester: 2,
    description: "Multivariable calculus, vector calculus, line/surface integration, green's theorem, and linear algebra matrices transformations.",
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
        title: "Elementary Linear Algebra",
        author: "Howard Anton and Chris Rorres",
        publisher: "Wiley",
        year: 2015,
        edition: "11th Edition",
        link: "https://www.google.com/search?q=Elementary+Linear+Algebra+Anton+Rorres+11th+Edition"
      }
    ],
    references: [
      {
        title: "Advanced Engineering Mathematics",
        author: "Dennis G. Zill and Michael R. Cullen",
        publisher: "CBS Publishers",
        year: 2012,
        edition: "Second Edition",
        link: "https://www.google.com/search?q=Advanced+Engineering+Mathematics+Zill+Cullen+2nd+Edition"
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
    parts: ["Unit 1: Vector Spaces & Decompositions", "Unit 2: Vector Differentiation & tangent", "Unit 3: Vector Integration & Green's Theorem", "Final Exam Question Set"]
  },
  {
    code: "23ECE105",
    title: "Computer Programming",
    category: "ENGG",
    credits: 3,
    ltp: "3-0-0",
    semester: 2,
    description: "Syntax and semantics of C programming, pointers, memory allocation, structure variables, data types, and C file input/output.",
    textbooks: [
      {
        title: "The C Programming language",
        author: "Kernighan, B.W and Ritchie, D.M",
        publisher: "Pearson Education",
        year: 2015,
        edition: "Second Edition",
        link: "https://www.google.com/search?q=The+C+Programming+language+Kernighan+Ritchie"
      },
      {
        title: "Computer Science: A structured programming approach using C",
        author: "Forouzan BA, Gilberg RF",
        publisher: "Cengage Learning",
        year: 2006,
        edition: "Third Edition",
        link: "https://www.google.com/search?q=Computer+Science+structured+programming+approach+C+Forouzan"
      }
    ],
    references: [
      {
        title: "Programming With C",
        author: "Byron Gottfried",
        publisher: "McGraw Hill",
        year: 2018,
        edition: "Fourth Edition",
        link: "https://www.google.com/search?q=Programming+With+C+Gottfried+4th+Edition"
      },
      {
        title: "C Programming Absolute Beginner's Guide",
        author: "Greg Perry and Dean Miller",
        publisher: "Que Publishing",
        year: 2013,
        edition: "Third Edition",
        link: "https://www.google.com/search?q=C+Programming+Absolute+Beginners+Guide+Perry+Miller"
      },
      {
        title: "Problem Solving and Program Design in C",
        author: "Jeri Hanly and Elliot Koffman",
        publisher: "Addison Wesley",
        year: 2007,
        edition: "Fifth Edition",
        link: "https://www.google.com/search?q=Problem+Solving+and+Program+Design+in+C+Hanly+Koffman"
      }
    ],
    parts: ["Unit 1: C basics & operators", "Unit 2: Loops, Recursion & Arrays", "Unit 3: Pointers, Structures & Files", "Programming Practice Problems"]
  }
];
