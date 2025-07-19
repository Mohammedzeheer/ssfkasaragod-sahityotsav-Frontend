const categories = ["Test"];
const teams = ["Test"];
const fieldNames = {
  itemId: "Item",
  firstPrize: "First Prize",
  firstTeam: "First Team",
  secPrize: "Second Prize",
  secTeam: "Second Team",
  thirdPrize: "Third Prize",
  thirdTeam: "Third Team",
  categoryId: "Category",
};

const itemsByCategory = {
  General: [
    "Test",
  ],
  Junior: [
    "Test",
  ],
  Premier: [
    "Test",
  ],
  Senior: [
    "Test",
  ],
  "Sub junior": [
    "Test",
  ],
};

const steps = [
  "Add all teams, categories, and items before starting the program.",
  "You can start adding results only after starting the program.",
  "Once the program is started, you cannot edit or delete teams, categories, or items.",
  "If you need to make changes, you must stop the program first.",
  "Stopping the program will delete all added results.",
  "There's also a reset button to clear all data and start fresh.",
];

const slides = [
];
export { categories, teams, itemsByCategory, slides ,steps,fieldNames};
