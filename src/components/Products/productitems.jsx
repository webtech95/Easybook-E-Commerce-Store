// products.js
export const Products = [

  
  // ----- KIDS BOOKS (1–12) -----
  { id: 1, name: "The Secret Garden Adventure", price: 399, oldPrice: 599, category: "kids", image: "https://picsum.photos/seed/secretGarden/300/200" },
  { id: 2, name: "Math Magic for Young Minds", price: 349, oldPrice: 549, category: "kids", image: "https://picsum.photos/seed/mathMagic/300/200" },
  { id: 3, name: "Bedtime Stories with Animals", price: 299, oldPrice: 499, category: "kids", image: "https://picsum.photos/seed/bedtimeAnimals/300/200" },
  { id: 4, name: "Learn to Draw Funny Monsters", price: 449, oldPrice: 649, category: "kids", image: "https://picsum.photos/seed/funnyMonsters/300/200" },
  { id: 5, name: "The Little Explorer's Atlas", price: 499, oldPrice: 699, category: "kids", image: "https://picsum.photos/seed/explorerAtlas/300/200" },
  { id: 6, name: "Fairy Tales Around the World", price: 379, oldPrice: 579, category: "kids", image: "https://picsum.photos/seed/fairyTales/300/200" },
  { id: 7, name: "My First Science Experiments", price: 429, oldPrice: 629, category: "kids", image: "https://picsum.photos/seed/scienceKids/300/200" },
  { id: 8, name: "The Brave Little Knight", price: 319, oldPrice: 519, category: "kids", image: "https://picsum.photos/seed/braveKnight/300/200" },
  { id: 9, name: "Riddle Me This – Kids Edition", price: 359, oldPrice: 559, category: "kids", image: "https://picsum.photos/seed/kidsRiddles/300/200" },
  { id: 10, name: "Ocean Wonders: A Picture Book", price: 399, oldPrice: 599, category: "kids", image: "https://picsum.photos/seed/oceanWonders/300/200" },
  { id: 11, name: "The Rainbow Unicorn", price: 279, oldPrice: 479, category: "kids", image: "https://picsum.photos/seed/rainbowUnicorn/300/200" },
  { id: 12, name: "Space Adventures for Kids", price: 469, oldPrice: 669, category: "kids", image: "https://picsum.photos/seed/spaceAdventures/300/200" },

  // ----- ADULT BOOKS (13–30) -----
  { id: 13, name: "The Silent Patient", price: 899, oldPrice: 1299, category: "adults", image: "https://picsum.photos/seed/silentPatient/300/200" },
  { id: 14, name: "Atomic Habits", price: 749, oldPrice: 1099, category: "adults", image: "https://picsum.photos/seed/atomicHabits/300/200" },
  { id: 15, name: "Becoming", price: 999, oldPrice: 1399, category: "adults", image: "https://picsum.photos/seed/becoming/300/200" },
  { id: 16, name: "The Midnight Library", price: 849, oldPrice: 1249, category: "adults", image: "https://picsum.photos/seed/midnightLibrary/300/200" },
  { id: 17, name: "Sapiens: A Brief History", price: 1199, oldPrice: 1599, category: "adults", image: "https://picsum.photos/seed/sapiens/300/200" },
  { id: 18, name: "Where the Crawdads Sing", price: 929, oldPrice: 1349, category: "adults", image: "https://picsum.photos/seed/crawdads/300/200" },
  { id: 19, name: "The Psychology of Money", price: 699, oldPrice: 999, category: "adults", image: "https://picsum.photos/seed/psychMoney/300/200" },
  { id: 20, name: "Dune (Movie Tie-in)", price: 1049, oldPrice: 1449, category: "adults", image: "https://picsum.photos/seed/dune/300/200" },
  { id: 21, name: "The 7 Habits of Highly Effective People", price: 1099, oldPrice: 1499, category: "adults", image: "https://picsum.photos/seed/7habits/300/200" },
  { id: 22, name: "Normal People", price: 799, oldPrice: 1199, category: "adults", image: "https://picsum.photos/seed/normalPeople/300/200" },
  { id: 23, name: "The Alchemist", price: 699, oldPrice: 999, category: "adults", image: "https://picsum.photos/seed/alchemist/300/200" },
  { id: 24, name: "Thinking, Fast and Slow", price: 1249, oldPrice: 1649, category: "adults", image: "https://picsum.photos/seed/fastSlow/300/200" },
  { id: 25, name: "Educated", price: 879, oldPrice: 1279, category: "adults", image: "https://picsum.photos/seed/educated/300/200" },
  { id: 26, name: "The Hitchhiker's Guide to the Galaxy", price: 749, oldPrice: 1049, category: "adults", image: "https://picsum.photos/seed/hitchhiker/300/200" },
  { id: 27, name: "Project Hail Mary", price: 1149, oldPrice: 1549, category: "adults", image: "https://picsum.photos/seed/hailMary/300/200" },
  { id: 28, name: "It Ends With Us", price: 849, oldPrice: 1249, category: "adults", image: "https://picsum.photos/seed/endsWithUs/300/200" },
  { id: 29, name: "The Four Agreements", price: 649, oldPrice: 949, category: "adults", image: "https://picsum.photos/seed/agreements/300/200" },

  // ----- FAMILY BOOKS (30–42) -----
  { id: 30, name: "Family Game Night: 100 Fun Ideas", price: 549, oldPrice: 799, category: "family", image: "https://picsum.photos/seed/familyGame/300/200" },
  { id: 31, name: "Cooking Together: Family Recipes", price: 649, oldPrice: 899, category: "family", image: "https://picsum.photos/seed/familyCooking/300/200" },
  { id: 32, name: "The Mindful Family", price: 599, oldPrice: 849, category: "family", image: "https://picsum.photos/seed/mindfulFamily/300/200" },
  { id: 33, name: "Family Travel Journal", price: 499, oldPrice: 749, category: "family", image: "https://picsum.photos/seed/travelJournal/300/200" },
  { id: 34, name: "Bedtime Stories for All Ages", price: 449, oldPrice: 699, category: "family", image: "https://picsum.photos/seed/allAgesStories/300/200" },
  { id: 35, name: "The Family Gratitude Book", price: 399, oldPrice: 649, category: "family", image: "https://picsum.photos/seed/familyGratitude/300/200" },
  { id: 36, name: "Weekend Craft Projects for Families", price: 699, oldPrice: 949, category: "family", image: "https://picsum.photos/seed/craftFamily/300/200" },
  { id: 37, name: "Family Puzzles & Brain Teasers", price: 529, oldPrice: 779, category: "family", image: "https://picsum.photos/seed/familyPuzzles/300/200" },
  { id: 38, name: "Parenting with Love and Logic", price: 799, oldPrice: 1099, category: "family", image: "https://picsum.photos/seed/parentingLogic/300/200" },
  { id: 39, name: "The Family Camping Guide", price: 579, oldPrice: 829, category: "family", image: "https://picsum.photos/seed/familyCamping/300/200" },
  { id: 40, name: "Together: A Family Devotional", price: 469, oldPrice: 719, category: "family", image: "https://picsum.photos/seed/devotional/300/200" },
  { id: 41, name: "Family Movie Night: 101 Classics", price: 619, oldPrice: 869, category: "family", image: "https://picsum.photos/seed/movieNight/300/200" },
  { id: 42, name: "The Joy of Family Gardening", price: 549, oldPrice: 799, category: "family", image: "https://picsum.photos/seed/familyGardening/300/200" },

  // ----- FICTION (43–50) -----
  { id: 43, name: "Circe", price: 899, oldPrice: 1299, category: "fiction", image: "https://picsum.photos/seed/circe/300/200" },
  { id: 44, name: "The Night Circus", price: 849, oldPrice: 1199, category: "fiction", image: "https://picsum.photos/seed/nightCircus/300/200" },
  { id: 45, name: "A Gentleman in Moscow", price: 1049, oldPrice: 1449, category: "fiction", image: "https://picsum.photos/seed/gentlemanMoscow/300/200" },
  { id: 46, name: "The Vanishing Half", price: 929, oldPrice: 1349, category: "fiction", image: "https://picsum.photos/seed/vanishingHalf/300/200" },
  { id: 47, name: "Klara and the Sun", price: 1099, oldPrice: 1499, category: "fiction", image: "https://picsum.photos/seed/klaraSun/300/200" },

  // ----- NON-FICTION (48–52) -----
  { id: 48, name: "The Body: A Guide for Occupants", price: 999, oldPrice: 1399, category: "non-fiction", image: "https://picsum.photos/seed/bodyGuide/300/200" },
  { id: 49, name: "The Code Breaker", price: 1199, oldPrice: 1599, category: "non-fiction", image: "https://picsum.photos/seed/codeBreaker/300/200" },
  { id: 50, name: "The Anthropocene Reviewed", price: 879, oldPrice: 1279, category: "non-fiction", image: "https://picsum.photos/seed/anthropocene/300/200" },
  { id: 51, name: "Empire of Pain", price: 999, oldPrice: 1399, category: "non-fiction", image: "https://picsum.photos/seed/empirePain/300/200" },

  // ----- SELF-HELP (52–55) -----
  { id: 52, name: "Dare to Lead", price: 749, oldPrice: 1099, category: "self-help", image: "https://picsum.photos/seed/dareLead/300/200" },
  { id: 53, name: "The Gifts of Imperfection", price: 649, oldPrice: 949, category: "self-help", image: "https://picsum.photos/seed/giftsImperfection/300/200" },
  { id: 54, name: "Can't Hurt Me", price: 799, oldPrice: 1199, category: "self-help", image: "https://picsum.photos/seed/cantHurtMe/300/200" },

  // ----- THRILLER (55–58) -----
  { id: 55, name: "The Guest List", price: 899, oldPrice: 1299, category: "thriller", image: "https://picsum.photos/seed/guestList/300/200" },
  { id: 56, name: "The Hunting Party", price: 849, oldPrice: 1249, category: "thriller", image: "https://picsum.photos/seed/huntingParty/300/200" },

  // ----- ROMANCE (57–60) -----
  { id: 57, name: "The Love Hypothesis", price: 799, oldPrice: 1149, category: "romance", image: "https://picsum.photos/seed/loveHypothesis/300/200" },
  { id: 58, name: "People We Meet on Vacation", price: 849, oldPrice: 1199, category: "romance", image: "https://picsum.photos/seed/peopleMeet/300/200" },
];