const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace state and functions for sysMessage
code = code.replace(/owlQuote/g, 'sysMessage');
code = code.replace(/setOwlQuote/g, 'setSysMessage');
code = code.replace(/changeOwlQuote/g, 'changeSysMessage');
code = code.replace(/funnyQuotes/g, 'cyberQuotes');
code = code.replace(/Unbox study guides worth talking about! Grab a book-card below./g, 'Accessing data shards. Select a module to begin decryption.');
code = code.replace(/Warning: Cramming the night before might cause temporary feather loss./g, 'Warning: Overclocking your brain might cause temporary memory leaks.');
code = code.replace(/Exams are like bird nests: built twig by twig \\(or slide by slide\\)./g, 'Data is power. Equip yourself before the finals run.');
code = code.replace(/Don't count your chickens before they pass their exams!/g, "Don't let your neural net crash during the exam.");
code = code.replace(/Your brain is a nest. Fill it with knowledge, not just dust./g, 'Your brain is a drive. Fill it with knowledge, not bloatware.');
code = code.replace(/Be like the owl: wise, awake at night, and screaming internally./g, 'Netrunners never sleep, they just recharge.');
code = code.replace(/Study hard! If you fail, the birds will mock you from the trees./g, 'Bypass the firewall. Download the syllabus.');
code = code.replace(/A download a day keeps the failing grade away! Or at least makes you feel productive./g, 'A download a day keeps the system failure away.');

// Admin strings
code = code.replace(/Admin verified! Welcome to the book binder dashboard./g, 'ROOT ACCESS GRANTED. Welcome to the mainframe.');
code = code.replace(/Hint: Capital letters.../g, 'Hint: STUDY');
code = code.replace(/Successfully bound new course book:/g, 'Successfully compiled new data matrix:');
code = code.replace(/Inserted exam notes/g, 'Uploaded data shard');
code = code.replace(/Removed/g, 'Purged');

// Download sequence strings
code = code.replace(/"egg"/g, '"locked"');
code = code.replace(/"shaking"/g, '"decrypting"');
code = code.replace(/"cracked"/g, '"downloading"');
code = code.replace(/"hatched"/g, '"unlocked"');
code = code.replace(/A wise study-bird flew away with your PDF:/g, 'Data decrypted. Shard downloaded successfully:');
code = code.replace(/Incubated Resource:/g, 'Extracted Data Node:');
code = code.replace(/StudyNest Aardvark/g, 'CyberNest Netrunners');

// CARD_THEMES
const newThemes = `const CARD_THEMES = [
  { bg: "rgba(10, 189, 198, 0.1)", border: "var(--neon-cyan)" },
  { bg: "rgba(234, 0, 217, 0.1)", border: "var(--neon-pink)" },
  { bg: "rgba(113, 28, 145, 0.1)", border: "var(--neon-purple)" }
];`;
code = code.replace(/const CARD_THEMES = \[\s*\{[\s\S]*?\}\s*\];/g, newThemes);

// Remove nest-wings
code = code.replace(/<div className="nest-wings"[\s\S]*?<\/div>/g, '');

// Navbar text
code = code.replace(/StudyNest/g, 'CyberNest');
code = code.replace(/ALL BOOKS/g, 'DATA CATALOG');
code = code.replace(/HATCHED BOX/g, 'DECRYPTED SHARDS');
code = code.replace(/Hatched Box/g, 'Decrypted Shards');
code = code.replace(/Incubator Admin/g, 'ROOT ACCESS');
code = code.replace(/📚/g, '🌐');
code = code.replace(/🐣/g, '💾');
code = code.replace(/🐤/g, '🟢');
code = code.replace(/🥚/g, '🔒');
code = code.replace(/🦉/g, '🤖');
code = code.replace(/🪺/g, '⚡');
code = code.replace(/🪹/g, '⚡');
code = code.replace(/🍂/g, '⚠️');
code = code.replace(/💡/g, '💬');

// Hero section text
code = code.replace(/Incubator Hub/g, 'NETRUNNER HUB');
code = code.replace(/Unbox study guides worth talking about\./g, 'DECRYPT EXAM SHARDS.');
code = code.replace(/Join the book club that's anything but traditional\. Pick your courses, unbox reference books, and hatch premium PDF study materials straight to your local nest\./g, 'Access the underground network. Decrypt study notes, bypass the firewalls, and download premium PDF data shards straight to your local drive.');
code = code.replace(/Syllabus scanned & sorted by hand/g, 'DATA SCANNED & SORTED BY NETRUNNERS');
code = code.replace(/Nest Guard/g, 'SYSTEM ADMIN');

// Modal text
code = code.replace(/Entering Incubator/g, 'SYSTEM OVERRIDE');
code = code.replace(/Incubator access is locked\. Enter the passcode to proceed\./g, 'Root access is restricted. Enter the authorization key to proceed.');
code = code.replace(/Confirm Chirp/g, 'AUTHORIZE');
code = code.replace(/Hatching Resource/g, 'Decrypting Resource');
code = code.replace(/Study Bird Flying!/g, 'Download Complete!');
code = code.replace(/\*Chirp Crack Chirp!\*/g, '*Bypass Complete*');

// Book cover styling
code = code.replace(/style={{ backgroundColor: theme\.bg }}/g, 'style={{ backgroundColor: theme.bg, borderColor: theme.border }}');
code = code.replace(/<div className="book-cover-cat">/g, '<div className="book-cover-cat" style={{ color: theme.border }}>');
code = code.replace(/<div className="book-cover-code">/g, '<div className="book-cover-code" style={{ textShadow: `0 0 8px ${theme.border}`, color: theme.border }}>');

// History strings
code = code.replace(/Track downloaded exam eggs/g, 'Track decrypted data shards');
code = code.replace(/No eggs hatched yet!/g, 'No shards decrypted yet!');
code = code.replace(/Unbox resources on the main page to hatch study guides./g, 'Decrypt resources on the main page to download data shards.');
code = code.replace(/Clear Box/g, 'Clear Log');
code = code.replace(/Your catalog of study-chicks was cleared!/g, 'Data log purged successfully.');

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx updated!');
