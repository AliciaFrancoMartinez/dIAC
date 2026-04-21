const jsPsych = initJsPsych({
  on_finish: () => {
    // Results are handled in the final trial export step.
  }
});

const PNG_FILES = [
  "L-001_P-001_creature1_draw.png",
  "L-001_P-001_creature1_edit.png",
  "L-001_P-001_creature2_draw.png",
  "L-001_P-001_creature3_draw.png",
  "L-001_P-001_creature4_draw.png",
  "L-001_P-002_creature1_draw.png",
  "L-001_P-002_creature1_edit.png",
  "L-001_P-002_creature2_draw.png",
  "L-001_P-002_creature2_edit.png",
  "L-001_P-002_creature3_draw.png",
  "L-001_P-002_creature3_edit.png",
  "L-001_P-002_creature4_draw.png",
  "L-001_P-003_creature1_draw.png",
  "L-001_P-003_creature1_edit.png",
  "L-001_P-003_creature2_draw.png",
  "L-001_P-003_creature2_edit.png",
  "L-001_P-003_creature3_draw.png",
  "L-001_P-003_creature3_edit.png",
  "L-001_P-003_creature4_draw.png",
  "L-001_P-004_creature1_draw.png",
  "L-001_P-004_creature1_edit.png",
  "L-001_P-004_creature2_draw.png",
  "L-001_P-004_creature2_edit.png",
  "L-001_P-004_creature3_draw.png",
  "L-001_P-004_creature3_edit.png",
  "L-001_P-004_creature4_draw.png",
  "L-001_P-005_creature1_draw.png",
  "L-001_P-005_creature1_edit.png",
  "L-001_P-005_creature2_draw.png",
  "L-001_P-005_creature2_edit.png",
  "L-001_P-005_creature3_draw.png",
  "L-001_P-005_creature3_edit.png",
  "L-001_P-005_creature4_draw.png",
  "L-001_P-006_creature1_draw.png",
  "L-001_P-006_creature1_edit.png",
  "L-001_P-006_creature2_draw.png",
  "L-001_P-006_creature2_edit.png",
  "L-001_P-006_creature3_draw.png",
  "L-001_P-006_creature3_edit.png",
  "L-001_P-006_creature4_draw.png",
  "L-001_P-007_creature1_draw.png",
  "L-001_P-007_creature1_edit.png",
  "L-001_P-007_creature2_draw.png",
  "L-001_P-007_creature2_edit.png",
  "L-001_P-007_creature3_draw.png",
  "L-001_P-007_creature3_edit.png",
  "L-001_P-007_creature4_draw.png",
  "L-001_P-008_creature1_draw.png",
  "L-001_P-008_creature1_edit.png",
  "L-001_P-008_creature2_draw.png",
  "L-001_P-008_creature2_edit.png",
  "L-001_P-008_creature3_draw.png",
  "L-001_P-008_creature3_edit.png",
  "L-001_P-008_creature4_draw.png",
  "L-001_P-009_creature1_draw.png",
  "L-001_P-009_creature1_edit.png",
  "L-001_P-009_creature2_draw.png",
  "L-001_P-009_creature2_edit.png",
  "L-001_P-009_creature3_draw.png",
  "L-001_P-009_creature3_edit.png",
  "L-001_P-009_creature4_draw.png",
  "L-001_P-010_creature1_draw.png",
  "L-001_P-010_creature1_edit.png",
  "L-001_P-010_creature2_draw.png",
  "L-001_P-010_creature2_edit.png",
  "L-001_P-010_creature3_draw.png",
  "L-001_P-010_creature3_edit.png",
  "L-001_P-010_creature4_draw.png",
  "L-001_P-011_creature1_draw.png",
  "L-001_P-011_creature1_edit.png",
  "L-001_P-011_creature2_draw.png",
  "L-001_P-011_creature2_edit.png",
  "L-001_P-011_creature3_draw.png",
  "L-001_P-011_creature3_edit.png",
  "L-001_P-011_creature4_draw.png",
  "L-001_P-012_creature1_draw.png",
  "L-001_P-012_creature1_edit.png",
  "L-001_P-012_creature2_draw.png",
  "L-001_P-012_creature2_edit.png",
  "L-001_P-012_creature3_draw.png",
  "L-001_P-012_creature3_edit.png",
  "L-001_P-012_creature4_draw.png",
  "L-001_P-013_creature1_draw.png",
  "L-001_P-013_creature1_edit.png",
  "L-001_P-013_creature2_draw.png",
  "L-001_P-013_creature2_edit.png",
  "L-001_P-013_creature3_draw.png",
  "L-001_P-013_creature3_edit.png",
  "L-001_P-013_creature4_draw.png",
  "L-001_P-014_creature1_draw.png",
  "L-001_P-014_creature1_edit.png",
  "L-001_P-014_creature2_draw.png",
  "L-001_P-014_creature2_edit.png",
  "L-001_P-014_creature3_draw.png",
  "L-001_P-014_creature3_edit.png",
  "L-001_P-014_creature4_draw.png",
  "L-001_P-015_creature1_draw.png",
  "L-001_P-015_creature1_edit.png",
  "L-001_P-015_creature2_draw.png",
  "L-001_P-015_creature2_edit.png",
  "L-001_P-015_creature3_draw.png",
  "L-001_P-015_creature3_edit.png",
  "L-001_P-015_creature4_draw.png",
  "L-001_P-016_creature1_draw.png",
  "L-001_P-016_creature1_edit.png",
  "L-001_P-016_creature2_draw.png",
  "L-001_P-016_creature2_edit.png",
  "L-001_P-016_creature3_draw.png",
  "L-001_P-016_creature3_edit.png",
  "L-001_P-016_creature4_draw.png",
  "L-001_P-017_creature1_draw.png",
  "L-001_P-017_creature1_edit.png",
  "L-001_P-017_creature2_draw.png",
  "L-001_P-017_creature2_edit.png",
  "L-001_P-017_creature3_draw.png",
  "L-001_P-017_creature3_edit.png",
  "L-001_P-017_creature4_draw.png"
];

const CREATURE_ID_BY_FILE = new Map(
  [...PNG_FILES]
    .sort((a, b) => a.localeCompare(b))
    .map((fileName, idx) => [fileName, idx + 1])
);

let CREATURE_ITEMS = PNG_FILES.map(fileName => {
  const match = /^([A-Z]-\d{3})_(P-\d{3})_creature(\d+)_(draw|edit)\.png$/.exec(fileName);
  if (!match) {
    throw new Error(`Unexpected PNG file name: ${fileName}`);
  }
  return {
    file_name: fileName,
    image_path: `DrawingsNDescriptions/PNGs/${fileName}`,
    laboratory_id: match[1],
    participant_id: match[2],
    creature_number: Number(match[3]),
    phase: match[4],
    creature_id: CREATURE_ID_BY_FILE.get(fileName)
  };
}).filter(item => item.phase === "draw");

const CREATURE_TEXT_BY_FILE = {
  "L-001_P-001_creature1_draw.png": "Gilmor: A terrestrial creature capable of feeding with the tails that grow from the back of its head. It usually lives in places with many plants and vegetation, although not very tall.",
  "L-001_P-001_creature1_edit.png": "Gilmor: A terrestrial creature capable of feeding with the tails that grow from the back of its head. It usually lives in places with many plants and vegetation, although not very tall. Moves on the ground with tails",
  "L-001_P-001_creature2_draw.png": "Folig: A completely harmless creature of the air. It is capable of developing human-like arms along its body, which it uses to modify its color and thus scare predators.",
  "L-001_P-001_creature3_draw.png": "Michou: A predatory sea creature that hides by pretending to be a harmless blue ball, but when in sight of possible creatures it can eat, it comes out very quickly and attacks with its large fangs.",
  "L-001_P-001_creature4_draw.png": "fish: a normal fish that swims through the sea",
  "L-001_P-002_creature1_draw.png": "Litan: The Litan is a creature from the planet E-587, observed in a dry environment and on sticky soil. Although it may seem harmless, just being close to it is poisonous and can cause very serious injuries to humans.",
  "L-001_P-002_creature1_edit.png": "Litan: The Litan is a creature from the planet E-587, observed in a dry environment and on sticky soil. Although it may seem harmless, just being close to it is poisonous and can cause very serious injuries to humans. With his \"tongue\" he can detect the presence of another creature at enormous distances, which allows him to protect himself.",
  "L-001_P-002_creature2_draw.png": "Amanantis: Beautiful creature, just seeing it can leave you amazed. Although it seems that he has many eyes, he really has none, he observes through his senses. This is how he manages to fly and flow through his planet. Her hair helps her not to collide with anything and propel her forward.",
  "L-001_P-002_creature2_edit.png": "Amanantis: Beautiful creature, just seeing it can leave you amazed. Although it seems that he has many eyes, he really has none, he observes through his senses. This is how he manages to fly and flow through his planet. Her hair helps her not to collide with anything and propel her forward. In addition, it has many \"hairs\" that help it sense everything around it, even the feeling experienced by creatures nearby.",
  "L-001_P-002_creature3_draw.png": "Color Mimic: A gelatinous creature that moves in circles while sticking to the surface. In addition, when it moves, it takes on the color of the surface where it is located if that is what you want. Its natural color is dull yellow since its planet mostly has this color in the environment.",
  "L-001_P-002_creature3_edit.png": "Color Mimic: A gelatinous creature that moves in circles while sticking to the surface. In addition, when it moves, it takes on the color of the surface where it is located if that is what you want. Its natural color is dull yellow since its planet mostly has this color in the environment. It seems like they are two different creatures, but really it is the same separate one, they are both moved by the same system, as if they had the same brain. Able to do totally different things",
  "L-001_P-002_creature4_draw.png": "Martian: Green creature, with two very bulging eyes and two antennas located on its head.",
  "L-001_P-003_creature1_draw.png": "pinky demon: Serious face but much kinder than it seems",
  "L-001_P-003_creature1_edit.png": "pinky demon: Serious face but much kinder than it seems",
  "L-001_P-003_creature2_draw.png": "Attempt to calm down: A giant on top of a hill singing to calm himself down",
  "L-001_P-003_creature2_edit.png": "Attempt to calm down: A giant on top of a hill singing to calm himself down",
  "L-001_P-003_creature3_draw.png": "Observer: With it you can be yourself. Countless eyes that can see everything.",
  "L-001_P-003_creature3_edit.png": "Observer: With it you can be yourself. Countless eyes that can see everything.",
  "L-001_P-003_creature4_draw.png": "Little Sheep: Sheep painted in a moment",
  "L-001_P-004_creature1_draw.png": "Barrof: Although it looks huge, this almost 8 meter tall beast weighs a maximum of 10 kilograms, as it is full of liquids. It is soft and smooth, and runs bouncing against everything it finds. Of course, he has a very bad temper and will not hesitate to go after you.",
  "L-001_P-004_creature1_edit.png": "Barrof: Although it looks huge, this almost 8 meter tall beast weighs a maximum of 10 kilograms, as it is full of liquids. It is soft and smooth, and runs crashing into everything it finds. Of course, he has a very bad temper and will not hesitate to go after you. Surprisingly, it only has legs in the front, with enough strength for the entire body",
  "L-001_P-004_creature2_draw.png": "Lintins: It is a very curious but super shy bug. The most normal thing is that if you catch him looking you will not be able to see his eyes, since at the slightest movement he will hide them behind his body. It moves by jumping, and although it may not seem like it, it is usually the same size as an average human.",
  "L-001_P-004_creature2_edit.png": "Lintins: It is a very curious but super shy bug. The most normal thing is that if you catch him looking you will not be able to see his eyes, since at the slightest movement he will hide them behind his body. It moves by jumping, and although it may not seem like it, it is usually the same size as an average human. Its whiskers and antennae help it orient itself when its eyes are hidden, feeling around. They say that if you come close and manage to touch the tip of his horn, he will give you a wonderful gift.",
  "L-001_P-004_creature3_draw.png": "Tenny: His body is so flat that it is very easy to mistake it for the ground itself and walk on it. In fact, its small fins are easily confused with flowers and grasses on the ground. Even so, you won't hurt him, practically nothing wakes him up from his sleep, his favorite activity.",
  "L-001_P-004_creature3_edit.png": "Tenny: His body is so flat that it is very easy to mistake it for the ground itself and walk on it. In fact, its small fins are easily confused with flowers and grasses on the ground. Even so, you won't hurt him, practically nothing wakes him up from his sleep, his favorite activity. Its skin is made of a super resistant and pleasant material, so it sticks to the ground with barely visible spikes to avoid hunters or intruders.",
  "L-001_P-004_creature4_draw.png": "Rory: This bug loves to scare children and adults who have done bad things. They chase them as soon as the light goes out, hiding in corners never to be seen. It has many eyes to see everything well, sharp teeth to scare, and long arms that allow it to chase from afar.",
  "L-001_P-005_creature1_draw.png": "Pluffy: This adorable creature is very affectionate and likes to attract attention, which is why its colors are so striking. On their planet, they are usually well-known creatures because everyone likes them. She is nice, funny and a little clumsy.",
  "L-001_P-005_creature1_edit.png": "Pluffy: You will see this adorable creature flying through the air without any direction, since it is very distracted. She is also very affectionate and likes to attract attention, which is why her colors are so striking. On their planet, they are usually well-known creatures because everyone likes them. She is nice, funny and a little clumsy.",
  "L-001_P-005_creature2_draw.png": "Dift: This creature with this rough and dangerous appearance usually manages to scare away anyone who approaches. He doesn't like anyone to bother him, he is quite irascible and prefers solitude. If he gets angry, he will not hesitate to attack with his horn.",
  "L-001_P-005_creature2_edit.png": "Craig: This creature with this rough and dangerous appearance usually manages to scare away anyone who approaches. On his planet, he is usually known as a creature that does not like to be bothered by anyone, is quite irascible and prefers solitude. If he gets angry, he will not hesitate to attack with his horn.",
  "L-001_P-005_creature3_draw.png": "Xun: This creature is very brave and noble. He likes to surround himself with good company, he is very close to his friends, so he can't stand them being messed with and he wouldn't hesitate to change his usual calm temperament to defend them.",
  "L-001_P-005_creature3_edit.png": "Xun: On your planet, this creature is known for being very brave and noble. He likes to surround himself with good company, he is very close to his friends and can't stand it when people mess with them. He would not hesitate to change his usual calm temperament to defend them.",
  "L-001_P-005_creature4_draw.png": "Mor: This creature is known on its planet for spreading love everywhere. She is very happy, affectionate and friendly.",
  "L-001_P-006_creature1_draw.png": "ERILTE: This is a creature that lives in a world where depending on the eyes you have, you are born with greater magical abilities or not. Having only one eye, Erilte is in charge of the most basic and boring tasks, which do not require much magical, physical or intellectual ability. He is in charge of collecting food and lives in the countryside",
  "L-001_P-006_creature1_edit.png": "ERILTE: This is a creature that lives in a world where depending on the eyes you have, you are born with greater magical abilities or not. Having only one eye, Erilte is in charge of the most basic and boring tasks, which do not require much magical, physical or intellectual ability. It is responsible for collecting food and lives in the sea. Through its legs it is able to perceive where the objects are.",
  "L-001_P-006_creature2_draw.png": "KUWUNA: This is a creature that was born with three eyes and therefore is born with magical abilities greater than average, in his case he was born with a great healing capacity and is currently preparing to join the army as a doctor.",
  "L-001_P-006_creature2_edit.png": "KUWUNA: This is a creature that was born with three eyes and therefore is born with magical abilities greater than average, in his case he was born with a great healing capacity and is currently preparing to join the army as a doctor.  It has four tentacles that act as arms, making its work easier and it also has wings so it can come to the surface, something that many of us have the ability to do.",
  "L-001_P-006_creature3_draw.png": "PUHOR: PUHOR is the name of this species, it is the pet of many of the creatures and does not have eyes. It is created based on water and reproduces by division. They do not have any type of useful ability other than playing and entertaining the inhabitants of the planet.",
  "L-001_P-006_creature3_edit.png": "PUHOR: PUHOR is the name of this species, it is the pet of many of the creatures and does not have eyes. It is created based on water and reproduces by division. They do not have any type of useful ability other than playing and entertaining the inhabitants of the planet. They can be born with between 2 and 160 legs, and with these they walk in any direction since they do not have eyes and they guide themselves.",
  "L-001_P-006_creature4_draw.png": "Kira: She's a cat, she's 5 years old and also a little overweight. Very hostile character.",
  "L-001_P-007_creature1_draw.png": "Mr. Heartbreaker: He is a creature that watches over couples from the afterlife, and if he sees that one of the two is behaving badly with the other or does not take care of him, he punishes him with a giant mustache just like his own. However, if they behave well, they will be given infinite love.",
  "L-001_P-007_creature1_edit.png": "Mr. Heartbreaker: He is a creature that watches over couples from the afterlife, and if he sees that one of the two is behaving badly with the other or does not take care of him, he punishes him with a giant mustache just like his own. However, if they behave well, they will be given infinite love. If you cheat on your partner, he transforms and cheats on you just like his.",
  "L-001_P-007_creature2_draw.png": "Little Star: It is not a normal star, its greener color than usual differentiates it from the other stars, and of course! his three eyes too. If you are lucky enough to find her in the vast sky, she will grant you three wishes, one wish for each eye.",
  "L-001_P-007_creature2_edit.png": "Little Star: It is not a normal star, its greener color than usual differentiates it from the other stars, and of course! his three eyes too. If you are lucky enough to find her in the vast sky, she will grant you three wishes, one wish for each eye. On full moon nights, if you find it, it will grant you four wishes, one for each arm.",
  "L-001_P-007_creature3_draw.png": "The Blue King: He may be a little scary because of his somewhat human features, but he is actually very good. On lonely nights he appears to provide company and cheer you up with his smile.",
  "L-001_P-007_creature3_edit.png": "The Blue King: He may be a little scary because of his somewhat human features, but he is actually very good. On lonely nights he appears to provide company and cheer you up with his smile. If he notices that you are not paying attention to him, he will start blowing smoke from his ears to attract your attention.",
  "L-001_P-007_creature4_draw.png": "Jeff: This is Jeff and he's yellow.",
  "L-001_P-008_creature1_draw.png": "Rayux: At first glance it seems like a very dangerous and grumpy monster, but it doesn't want to hurt you... So, try not to touch it or you will be electrocuted.",
  "L-001_P-008_creature1_edit.png": "Rayux: At first glance it seems like a very dangerous and grumpy monster, but it doesn't want to hurt you... So, try not to touch it or you will be electrocuted. As soon as he enters the room the temperature rises until it is unbearable.",
  "L-001_P-008_creature2_draw.png": "Maruñosa: The first thing you're going to want to do is hug her, but after a while, you'll just want to get out of her arms...There's one problem, and she won't let you.",
  "L-001_P-008_creature2_edit.png": "Maruñosa: The first thing you're going to want to do is hug her, but after a while, you'll just want to get out of her arms...There's one problem, and she won't let you. It will be impossible to escape from his 6 arms. Will he have any more?",
  "L-001_P-008_creature3_draw.png": "Slimy: It wasn't always like this, at first it was a sphere, but when it suffered an accident it was brutally crushed. Thank goodness he has a good humor.",
  "L-001_P-008_creature3_edit.png": "Slimy: It wasn't always like this, at first it was a sphere, but when it suffered an accident it was brutally crushed. Thank goodness he has a good humor. He is very restless and is always playing, it seems that he does not learn from mistakes.",
  "L-001_P-008_creature4_draw.png": "Triesfera: A striking box that gives off an eye-catching sound. At the same moment you touch it, three very different heads emerge.",
  "L-001_P-009_creature1_draw.png": "Cora: Cora is the heart of a plant. Pink in appearance, it presents two Amsterdam tulips in hands that attracts even the coldest hearts. His cat ears allow him to be alert to all dangers.",
  "L-001_P-009_creature1_edit.png": "Cora: Cora is the heart of a plant. Pink in appearance, it presents two Amsterdam tulips in hands that attracts even the coldest hearts. His cat ears allow him to be alert to all dangers. It's super calm, its motto is \"flows like water.\"",
  "L-001_P-009_creature2_draw.png": "Piñastar: Piñastar is a pineapple-citizen of the Estrella city where every day is Carnival. Piñastar smiles even in the darkest moments and spreads his joy wherever he goes.",
  "L-001_P-009_creature2_edit.png": "Piñastar: Piñastar is a pineapple-citizen of the Estrella city where every day is Carnival. Piñastar smiles even in the darkest moments and spreads her joy and energy wherever she goes.",
  "L-001_P-009_creature3_draw.png": "Bao-bab: Bao-bab is a round bun that is softer and better than Bimbo bread, although its presence is scary. He loves to play tag although his short hands don't allow him to catch anyone. He is clumsy by nature but very helpful.",
  "L-001_P-009_creature3_edit.png": "Bao-bab: Bao-bab is a round bun that is softer and better than Bimbo bread, although its presence is scary. He loves to play tag although his short hands don't allow him to catch anyone. He is clumsy by nature but very helpful. He's hungry all the time. His favorite food is croquettes.",
  "L-001_P-009_creature4_draw.png": "Face to the Sun: Face to the Sun is a giant face with hair looking for the sun.",
  "L-001_P-010_creature1_draw.png": "dream: The human being is incapable of demonstrating, imagining or making visible something that has never been perceived, be it color or organisms, even less so when we are dreaming. So, those monsters that we think are terrifying may be a mere composition of your past experiences.",
  "L-001_P-010_creature1_edit.png": "dream: The human being is incapable of demonstrating, imagining or making visible something that has never been perceived, be it color or organisms, even less so when we are dreaming. So, those monsters that we think are terrifying may be a mere composition of your past experiences. This painting represents that ridiculousness and imagination and the impossibility of reaching its totality.",
  "L-001_P-010_creature2_draw.png": "Normal?: The painting shows a planet that is an indefinable number of light years away from our planet. Here there are phenomena that are inexplicable with human knowledge, given that this small world is governed by physical laws outside of our physical conception and is",
  "L-001_P-010_creature2_edit.png": "Normal?: The painting shows a planet that is an indefinable number of light years away from our planet. Here there are phenomena that are inexplicable with human knowledge, given that this small world is governed by physical laws outside of our physical conception. And is that what we call normal?",
  "L-001_P-010_creature3_draw.png": "ME?: An alien (or any other living being not known outside of Earth) appears that intends to invade Earth, therefore, its first action is to imitate humans and learn about their habits so that they can invade Earth more easily. However, he forgets that he has an antenna to receive information transmitted by his companions.",
  "L-001_P-010_creature3_edit.png": "ME?: An alien (or any other living being not known outside of Earth) appears that intends to invade Earth, therefore, its first action is to imitate humans and learn about their habits so that they can invade Earth more easily. However, he forgets that he has an antenna to receive information transmitted by his companions, which makes him very visible among \"normal\" human beings.",
  "L-001_P-010_creature4_draw.png": "It's an egg: This egg is Da Vinci's egg, each egg is different even if there are a billion eggs, but does this mean that Da Vinci is creative? Just the other way around, the fact of drawing a billion eggs is, moreover, a systematic way of training the techniques that an astistic must have, the process is monotonous, boring, it does not lead us to think about what lies beyond.",
  "L-001_P-011_creature1_draw.png": "RALO: It is a union between stones and sticks that, tired of being thrown, have opted to merge into a thinking (not sentient) being. It contains in its core a piece of gold and emerald that it uses to blind people who try to approach it to throw it into the air again and if that first barrier fails, they have at the top of the palillería a small detonator made from the waste they collect in the field. In this specific case it is a mixture of a leftover tortilla, strawberry gum, a hair tie and a condom.",
  "L-001_P-011_creature1_edit.png": "RALO: It is a union between stones and sticks that, tired of being thrown, have opted to merge into a thinking (not sentient) being.  It has a coating of rusty barbed wire. It contains in its core a piece of gold and emerald that it uses to blind people who try to approach it to throw it into the air again and if that second barrier fails, they have at the top of the palilleria a small detonator made from the waste they collect in the field. In this specific case it is a mixture of a leftover tortilla, strawberry gum, a hair tie and a condom.",
  "L-001_P-011_creature2_draw.png": "Doptro: It is a spirit that appears only when absolutely every living being nearby is observing it. His intention is purely defiant and despite his halo of will-o'-the-wisp he is totally innocent. It is increasingly difficult to see one either due to the overpopulation of its habitat or due to its extermination. Variants can be seen in the 3 primary colors but blue is the most common.",
  "L-001_P-011_creature2_edit.png": "Doptro: It is a spirit that appears only when absolutely every living being nearby is observing it. Its intention is purely defiant and despite its halo of will-o'-the-wisp it is completely harmless. It is increasingly difficult to see one either due to the overpopulation of its habitat or due to its extermination. Variants can be seen in the 3 primary colors but blue is the most common.",
  "L-001_P-011_creature3_draw.png": "XY: Finally, we find this nicotine mutation capable of flying due to the vapors given off by its wings. At first it moved by crawling but it adapted to the increasingly harsh environment so that, instead of having to drag its body, it glided over it. It injects high levels of melatonin with its beak so that people get so sleepy that they don't even want to smoke and, therefore, don't throw cigarette butts.\n\nIt is a creature that despises contact with its kind and the more lonely it feels, the stronger it becomes.",
  "L-001_P-011_creature3_edit.png": "XYN: Finally, we find this nicotine mutation capable of flying by the vapors given off by its wings. At first he moved by crawling but he adapted to the increasingly harsh environment so that, instead of having to drag his body across the ground, he glided over it. It injects high levels of melatonin with its beak so that people get so sleepy that they don't even want to smoke and, therefore, don't throw cigarette butts.\n\nThis is a creature that despises contact with its kind and the more lonely it feels, the stronger it becomes.",
  "L-001_P-011_creature4_draw.png": "NOISULI: It is the fruit of despair. A parasite that brings together everything that is supposed to make the spirit happy (flowers, love, stars and the look that we dedicate to us and that dedicates to us the deepest love) but perverts it and strips it of its essence. It is capable of serializing abruptly and infecting the happiest organisms there can be. The more elements we love, the more elements it will add to its shape.",
  "L-001_P-012_creature1_draw.png": "Pi: Pi is an infinite creature. Its main feature is its infinite memory capacity. In its infinite arms, it has the infinite decimal numbers of pi. Furthermore, in his heart you can see the symbol of infinity, where he keeps all the information he observes, reads, listens to, and is told. She is one of a kind and the most intelligent creature in the entire galaxy.",
  "L-001_P-012_creature1_edit.png": "Pi: Pi is an infinite creature. Its main feature is its infinite memory capacity. In its infinite arms, it has the infinite decimal numbers of pi. Furthermore, in her heart you can see the symbol of infinity, where she keeps all the information she observes, reads, listens to, is told, imagines... She is unique in her species and the most intelligent creature in the entire galaxy.",
  "L-001_P-012_creature2_draw.png": "Transporter: Transporter is the most loved creature in its galaxy, due to its main function, which is to transport anyone to the place they want. People get into Transporter and just by imagining where they want to go, Transporter takes them in a matter of seconds. It is very reliable, ecological and free of gas emissions. With his one eye he can see any place his passengers can imagine.",
  "L-001_P-012_creature2_edit.png": "Transporter: Transporter is the most loved creature in its galaxy, due to its main function, which is to transport anyone to the place they want. People get into Transporter and just by imagining where they want to go, Transporter takes them in a matter of seconds. It is very reliable, ecological and free of gas emissions. With his one eye he can see any place his passengers can imagine. It has two giant legs where passengers can fly up.",
  "L-001_P-012_creature3_draw.png": "Lovamor: Lovamor is love made a creature. Just by feeling their presence, the tense and hectic atmosphere changes into one full of love and peace. This superpower makes him unique and very loved by everyone who knows him. It can change anything, both mood and weather, turning a rainy day into a sunny day full of love for everyone.",
  "L-001_P-012_creature3_edit.png": "Lovamor: Lovamor is love made a creature. Just by feeling their presence, the tense and hectic atmosphere changes into one full of love and peace. This superpower makes him unique and very loved by everyone who knows him. It can change anything, both mood and weather, turning a rainy day into a sunny day full of love for everyone.",
  "L-001_P-012_creature4_draw.png": "Rash: Rash is a creature with the same characteristics and functions as human beings. There is nothing supernatural about her, that is, she has a limited short-term memory, she has tasks to do, she has problems, she has to eat, shop, pay the rent... She was expelled from her galaxy for being a poorly made replica of a human. He has nothing that any human doesn't have.",
  "L-001_P-013_creature1_draw.png": "Bristle Coconut: This creature is a coconut with sea urchin spines. In addition, it has characteristic vampire eyes, being also a variant of it since when it infects other coconuts with its thorns, a transformation and formation of the same thorns emerges in them. It also has a fluorescent pink mouth since it expels radiation through its mouth.",
  "L-001_P-013_creature1_edit.png": "Bristle Coconut: This creature is a coconut with sea urchin spines. In addition, it has characteristic vampire eyes, being also a variant of it since when it infects other coconuts with its thorns, a transformation and formation of the same thorns emerges in them. It also has a fluorescent pink mouth since it expels radiation through its mouth. It has a peculiarity, because on your birthday you can avoid radiation and infection to other beings. The lightning bolt indicates that it normally infects those on the right, due to a knock.",
  "L-001_P-013_creature2_draw.png": "Zombie Penguin: This creature is a penguin that has a magnetic arm on its head that attracts brains and its wave amplitude is of such magnitude that they leave the heads of living beings without even touching them. It is also green in color simulating its zombie mutation and is a bit misleading because despite its horrible main function, it has a heart-shaped mouth that allows only the brains of those people who are good to be saved.",
  "L-001_P-013_creature2_edit.png": "Zombie Penguin: This creature is a penguin that has a magnetic arm on its head that attracts brains and its wave amplitude is of such magnitude that they leave the heads of living beings without even touching them. It is also green in color simulating its zombie mutation and is a bit misleading because despite its horrible main function, it has a heart-shaped mouth that allows only the brains of those people who are good to be saved. A special characteristic is that it can not only act on the land, but also on the sea and the sky due to its scales and wings that give it these properties, making it almost immortal.",
  "L-001_P-013_creature3_draw.png": "Christmas Bear: This creature has merged the intent of a snowman and the color of a prototypical bear whose functions are opposite. On the one hand, the hearts at the base mean love, it is a bear incapable of doing harm a priori. However, it hides blue hands that symbolize its hidden face, related to the sea, ready to attract and devour the evil creatures of the ocean. The ears are also characterized by being feline at the same time as being",
  "L-001_P-013_creature3_edit.png": "Christmas Bear: This creature has merged the intent of a snowman and the color of a prototypical bear whose functions are opposite. On the one hand, the hearts at the base mean love, it is a bear incapable of doing harm a priori. However, it hides blue hands that symbolize its hidden face, related to the sea, ready to attract and devour the evil creatures of the ocean. The ears are also characterized by being feline as well as a bear. He is Santa Claus, or Grinch from the other galaxy (he shows gifts in the corner) but they are not common gifts, because instead of physical objects they provide mental qualities",
  "L-001_P-013_creature4_draw.png": "Unicorn Pig: It is a pig mutated into a unicorn with a horn and a star-shaped tail that can fly. It is pink (just like a pig) and has distinctive features of a unicorn such as its vivid colors and gentleness. He is able to save children who are in danger in their nightmares and take them to the dream world in the other galaxy.",
  "L-001_P-014_creature1_draw.png": "Bawbalius: This creature is found in the wettest and darkest places on the planet \"Arsimos\". Some describe it as the gelatinous bug, it is invertebrate, it only crawls, and it is almost immortal because if it is cut, another slimy Bawbalius is generated from one of its parts. He usually doesn't like company and is usually very territorial, but if you give him cookies he will let you into his cave.",
  "L-001_P-014_creature1_edit.png": "Bawbalius: This creature is found in the wettest and darkest places on the planet \"Arsimos\". Some describe it as the gelatinous bug, it is invertebrate, it only crawls, and it is almost immortal because if it is cut, another slimy Bawbalius is generated from one of its parts. All this usually scares hikers who visit the place, trying not to follow the slimy trail they leave in their wake. He usually doesn't like company and is usually very territorial, but if you give him cookies he will let you into his cave.",
  "L-001_P-014_creature2_draw.png": "TinaRita: This majestic creature is one of the most flirtatious on the planet Rimbunbertus. She likes to spend her time grooming herself, talking to the other TinaRitaurus, and filing her sharp claws. Although they seem harmless, they actually attract other species to later devour them and use them for bags.",
  "L-001_P-014_creature2_edit.png": "TinaRita: This majestic creature is one of the most flirtatious on the planet Rimbunbertus. She likes to spend her time grooming herself, talking to the other TinaRitaurus, and filing her sharp claws. Although they seem harmless, in reality their objective is to attract males of other species and then devour them and use their feet for bags.",
  "L-001_P-014_creature3_draw.png": "Eramio Palladio: Creatures of this species can measure between 5 to 7 meters in height. They are quite imposing so they intimidate any other species they encounter. Even so, they are quite friendly, in fact they are the least invasive creature on the planet Tromporio, but being so big it makes it very difficult for them to make new friends.",
  "L-001_P-014_creature3_edit.png": "Eramio Palladio: Creatures of this species can measure between 5 to 7 meters in height and spit blue fire. They are quite large so they intimidate any other species they encounter. Even so, they are quite friendly, in fact they are the least invasive creature on the planet Tromporio, but being so big it makes it very difficult for them to make new friends.",
  "L-001_P-014_creature4_draw.png": "Bob.: The creature presented in the image is Bob.",
  "L-001_P-015_creature1_draw.png": "billy: It's a sea creature that lives at ground level. It has a digging hand with which it collects all the shells (small crustaceans) (they are mainly its food. The three extremities on the other side of the body serve no purpose other than to hold on to amrine currents. It communicates by sticking out its tongue.",
  "L-001_P-015_creature1_edit.png": "billy: Billy is a sea creature that lives at ground level. It has a digging hand with which it collects all the shells (small crustaceans), which serve as its main food. The three limbs on the other side of the body serve no purpose other than to hold on to sea currents. It communicates by sticking out its tongue and the tentacles allow it to sense the conditions of the ground.",
  "L-001_P-015_creature2_draw.png": "gordi: this creature roams freely across the entire surface of the planet. Although it appears super cuckoo, it is a very ferocious predator and consumes about 10kg of meat a day (it is 3 meters tall). To capture its prey, it extends the plant it always holds and tilts it downwards. Pretending to be a tree. When her prey arrives, captivated by the aroma of the plant, she approaches and Gordi catches her.",
  "L-001_P-015_creature2_edit.png": "gordi: This creature roams freely across the entire surface of the planet. Although it looks super cute and chubby, it is a very ferocious predator and consumes about 10kg of meat a day (it is 3 meters tall). To capture its prey, it extends the plant it always holds and tilts it downwards, thus appearing like a tree. When her prey arrives, captivated by the aroma of the plant, she approaches and Gordi catches her.",
  "L-001_P-015_creature3_draw.png": "chispi: this charming creature may seem somewhat threatening because of its hollow eyes, but it is the kindest creature in this galaxy, it communicates by lanancing kisses, and captures plants (obviously, it is a herbivore) with its suction cups, which leaves the earth without visible consequences.",
  "L-001_P-015_creature3_edit.png": "chispi: this charming creature may seem somewhat threatening due to its hollow eyes, but it is the kindest creature in this galaxy, it communicates by giving it kisses, and captures the plants (obviously, it is a herbivore) with its suction cups, which leaves the earth without visible consequences. In addition, the shape of its legs allows it to walk in a delicate and non-irruptive way.",
  "L-001_P-015_creature4_draw.png": "fred: Fred sleeps, eats and drinks. He's nice. It lives seated, it feeds on what is around it (it is omnivorous.",
  "L-001_P-016_creature1_draw.png": "Turtuli: This creature lives on the planet Fukiki, it is an omnivorous creature composed mostly of a harmful pink substance, in addition to its purple tails full of poison. They usually seem very cute and you are curious to touch them, but if you touch them, your life is in danger, since their poison reaches the brain directly and kills the neurons.",
  "L-001_P-016_creature1_edit.png": "Turtuli: This creature lives on the planet Fukiki, it is an omnivorous creature composed mostly of a harmful pink substance, in addition to its purple tails full of poison. They usually seem very cute and you are curious to touch them, but if you touch them, your life is in danger, since their poison reaches the brain directly and kills the neurons. This creature is made up of 5 eyes, so it can see in 5 different dimensions, which makes it easier to find its food or prevent offenses from other creatures.",
  "L-001_P-016_creature2_draw.png": "Oniriki: This creature may seem very offensive, but the reality is that it is very affectionate, it likes warm environments and being close to people, it usually communicates with other species of creatures. One disadvantage could be said to be its red tail, which from the color you can guess has deadly poison, which it uses to attract females. This creature is made up of large, sharp thorns that it uses to protect itself from other offensive creatures.",
  "L-001_P-016_creature2_edit.png": "Oniriki: This creature may seem very offensive, but the reality is that it is very affectionate, it likes warm environments and being close to people, it usually communicates with other species of creatures. One disadvantage could be said to be its red tail, which from the color you can guess has deadly poison, which it uses to attract females. This creature is made up of large, sharp thorns that it uses to protect itself from other offensive creatures. The onikiri lives among green plants, which makes it easy to hide to hunt its prey, which are usually worms and other species.",
  "L-001_P-016_creature3_draw.png": "The Kiri slug: It is a creature that loves to be on walls, thanks to its composition it can adhere to all types of surfaces, even human skin. It is a green slug, but it does not have any poison. It likes to be in cold environments since in warm environments it can melt. Its size ranges from 10cm and it has a perculiar smell of leaves and autumn.",
  "L-001_P-016_creature3_edit.png": "The Kiri slug: It is a creature that loves to be on walls, thanks to its composition it can adhere to all types of surfaces, even human skin. It is a green slug, but it does not have any poison. It likes to be in cold environments and hide in green places, in order to easily camouflage itself. Furthermore, in warm environments it can melt. Its size ranges from 10cm and it has a perculiar smell of leaves and autumn. On its two legs, it has two special mouths with teeth around it.",
  "L-001_P-016_creature4_draw.png": "Kiara: It is a species of worm that lives in cold environments. In addition, it loves to be on the ice and play with other species of creatures. This creature is made up of two large heads, one of which has a huge eye to see ahead, and ears that help hear any small movement. In its \"tail\", it has another eye that helps from behind, and thus it cannot be caught off guard, in case of other species.",
  "L-001_P-017_creature1_draw.png": "volcano-egg creature: It is a creature that has only one eye, one nose and two arms. These are strangely positioned, with the arms being on the round-shaped \"head\" at the top, which is red with a gradient towards gray. The eye and nose are in the lathe, which is triangular in shape with the beak inside the head. The eye is orange and just below it is the nose. Finally it has 3 square legs at the base of the gray torso, just like the torso.",
  "L-001_P-017_creature1_edit.png": "volcano-egg creature: It is a creature that has only one eye, one nose and two arms. These are strangely positioned, with the arms being on the round-shaped \"head\" at the top, which is red with a gradient towards gray. On top of his head he has a yellow liquid that seems to simulate the lava of a volcano. The eye and nose are in the lathe, which is triangular in shape with the beak inside the head. The eye is orange and just below it is the nose. Finally it has 3 square legs at the base of the gray torso, just like the torso.",
  "L-001_P-017_creature2_draw.png": "frog area 51: The creature has an irregular shape, looking like a wave that rises in the center. It is green, has two lower legs, a yellow lightning bolt on top, a black cap on top of the wave, a smiling mouth in the middle with two white fangs sticking out, and finally two green eyes, each at one end.",
  "L-001_P-017_creature2_edit.png": "frog area 51: The creature has an irregular shape, looking like a wave that rises in the center. It is green in color, the texture of its skin is sticky, and it has scales that make its skin melt and drip. In addition, it has two lower legs, a yellow lightning bolt on top, a black cap on top of the top of the wave, a smiling mouth in the middle with two white fangs sticking out, and finally two green eyes, each one at one end.",
  "L-001_P-017_creature3_draw.png": "a thousand eyes and legs: The creature has an elongated and horizontal shape, is light blue and has 12 legs at the bottom, each one a different shade of blue. At the far right and left it has an eye, surrounded by a blue membrane that simulates an eyelid. Additionally, above each eye it has a purple horn full of smaller eyes that protrude from its head.",
  "L-001_P-017_creature3_edit.png": "a thousand eyes and legs: The creature has an elongated and horizontal shape, is light blue in color and has blue hairs that extend from its body in all directions. One stands out that is darker, longer and curlier than the rest. This one also has 12 legs at the bottom, each one a different shade of blue. At the far right and left it has an eye, surrounded by a blue membrane that simulates an eyelid. Additionally, above each eye it has a purple horn full of smaller eyes that protrude from its head.",
  "L-001_P-017_creature4_draw.png": "grayly gray: The creature is round and completely gray, it has two gray eyes, a toothless smiling mouth and two completely gray arms at its sides. Lastly, it has two gray lower legs as well.",

};

let orderedItems = [];
let previewItems = [];
let summaryByCreatureKey = new Map();
let ratingResponses = [];
let raterId = "";
const RATERS_PIPE_EXPERIMENT_ID = "xFJVeGFGahcV";
const RATERS_PROGRESS_STORAGE_PREFIX = "raters_progress";
const RATERS_PROGRESS_VERSION = 1;
const RATERS_TASK_KEY = "main";
let osfUploadFileName = "";
let pendingResumeData = null;
let catalogLoadPromise = null;

const DRAWINGS_BASE_PATH = "DrawingsNDescriptions";
const DRAWINGS_MANIFEST_JS_PATH = `${DRAWINGS_BASE_PATH}/catalog_manifest.js`;
const DRAWINGS_PNG_DIR = `${DRAWINGS_BASE_PATH}/PNGs/`;
const DRAWINGS_TXT_DIR = `${DRAWINGS_BASE_PATH}/TXTs/`;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCreatureKey(meta) {
  return `${meta.laboratory_id}_${meta.participant_id}_${meta.creature_number}_${meta.phase}`;
}

function loadSummaryData() {
  if (summaryByCreatureKey.size > 0) return;
  CREATURE_ITEMS.forEach(meta => {
    const key = getCreatureKey(meta);
    const raw = String(CREATURE_TEXT_BY_FILE[meta.file_name] || "").trim();
    summaryByCreatureKey.set(key, raw);
  });
}

function parseCreatureMetaFromFileName(fileName, fallbackCreatureId) {
  const match = /^([A-Z]-\d{3})_(P-\d{3})_creature(\d+)(?:_(draw|edit))?\.png$/i.exec(fileName);
  if (match) {
    return {
      file_name: fileName,
      image_path: `${DRAWINGS_PNG_DIR}${fileName}`,
      laboratory_id: String(match[1]).toUpperCase(),
      participant_id: String(match[2]).toUpperCase(),
      creature_number: Number(match[3]),
      phase: String(match[4] || "draw").toLowerCase(),
      creature_id: fallbackCreatureId
    };
  }

  const creatureMatch = /creature(\d+)/i.exec(fileName);
  const phase = /_edit\.png$/i.test(fileName) ? "edit" : "draw";
  return {
    file_name: fileName,
    image_path: `${DRAWINGS_PNG_DIR}${fileName}`,
    laboratory_id: "UNK",
    participant_id: "UNK",
    creature_number: creatureMatch ? Number(creatureMatch[1]) : fallbackCreatureId,
    phase,
    creature_id: fallbackCreatureId
  };
}

function parseManifestEntries(manifestJson) {
  const rawItems = Array.isArray(manifestJson?.items)
    ? manifestJson.items
    : Array.isArray(manifestJson?.png_files)
      ? manifestJson.png_files
      : [];

  const parsed = [];
  rawItems.forEach((entry, idx) => {
    if (typeof entry === "string") {
      parsed.push({ file_name: entry, text_file: null, order_index: idx + 1 });
      return;
    }
    if (!entry || typeof entry !== "object") return;

    const fileName = String(entry.file_name || entry.image_file || entry.png || "").trim();
    if (!fileName) return;
    const textFile = String(entry.text_file || entry.txt || "").trim() || null;
    parsed.push({ file_name: fileName, text_file: textFile, order_index: idx + 1 });
  });

  return parsed;
}

function inferTextFileName(fileName) {
  const stem = String(fileName || "").replace(/\.png$/i, "");
  const withoutPhase = stem.replace(/_(draw|edit)$/i, "");
  return [`${stem}.txt`, `${withoutPhase}.txt`];
}

async function loadCatalogFromDrawingsFolder() {
  if (catalogLoadPromise) return catalogLoadPromise;

  catalogLoadPromise = (async () => {
    try {
      const manifestJson = (typeof window !== "undefined") ? window.RATER_CATALOG_MANIFEST : null;
      if (!manifestJson || typeof manifestJson !== "object") {
        throw new Error(`Manifest variable not found. Make sure ${DRAWINGS_MANIFEST_JS_PATH} is loaded before timeline_RaterTask.js`);
      }
      const manifestEntries = parseManifestEntries(manifestJson);

      if (!manifestEntries.length) {
        throw new Error(`No entries found in ${DRAWINGS_MANIFEST_JS_PATH}.`);
      }

      const dynamicItems = manifestEntries
        .map((entry, idx) => ({ ...parseCreatureMetaFromFileName(entry.file_name, idx + 1), text_file: entry.text_file }))
        .filter(item => item.phase !== "edit")
        .map((item, idx) => ({ ...item, creature_id: idx + 1 }));

      if (!dynamicItems.length) {
        throw new Error("No drawable creature PNG files were found (all files looked like edit variants).");
      }

      const dynamicTextByFile = {};
      await Promise.all(dynamicItems.map(async item => {
        const candidateNames = item.text_file ? [item.text_file] : inferTextFileName(item.file_name);
        try {
          for (const txtFileName of candidateNames) {
            const txtResponse = await fetch(`${DRAWINGS_TXT_DIR}${txtFileName}`, { cache: "no-store" });
            if (!txtResponse.ok) continue;
            const text = String(await txtResponse.text()).trim();
            if (text) {
              dynamicTextByFile[item.file_name] = text;
              break;
            }
          }
        } catch (error) {
          // Keep empty description when a text file cannot be loaded.
        }
      }));

      CREATURE_ITEMS = dynamicItems;
      Object.keys(CREATURE_TEXT_BY_FILE).forEach(fileName => delete CREATURE_TEXT_BY_FILE[fileName]);
      Object.entries(dynamicTextByFile).forEach(([fileName, text]) => {
        CREATURE_TEXT_BY_FILE[fileName] = text;
      });
      summaryByCreatureKey = new Map();
      initializeRandomOrder();

      return { ok: true, source: DRAWINGS_MANIFEST_JS_PATH, n_items: CREATURE_ITEMS.length };
    } catch (error) {
      return {
        ok: false,
        source: DRAWINGS_MANIFEST_JS_PATH,
        n_items: 0,
        error: error instanceof Error ? error.message : "Unknown catalog loading error."
      };
    }
  })();

  return catalogLoadPromise;
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(fileName, csvText) {
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function buildRatingsFileName() {
  return `CrCrCr_RatingsData_${raterId || "R-000"}.csv`;
}

function buildRatingsCsv(rows) {
  const header = [
    "rater_id",
    "order_index",
    "image_file",
    "laboratory_id",
    "participant_id",
    "creature",
    "phase",
    "creature_text",
    "draw_likeability",
    "draw_quality",
    "draw_humor",
    "draw_unusual",
    "draw_creativity",
    "full_likeability",
    "full_quality",
    "full_humor",
    "full_unusual",
    "full_creativity",
    "comments"
  ];
  const lines = [header.map(csvEscape).join(",")];

  rows.forEach(row => {
    const vals = [
      row.rater_id,
      row.order_index,
      row.image_file,
      row.laboratory_id,
      row.participant_id,
      row.creature,
      row.phase,
      row.creature_text,
      row.draw_likeability,
      row.draw_quality,
      row.draw_humor,
      row.draw_unusual,
      row.draw_creativity,
      row.full_likeability,
      row.full_quality,
      row.full_humor,
      row.full_unusual,
      row.full_creativity,
      row.comments
    ];
    lines.push(vals.map(csvEscape).join(","));
  });

  return lines.join("\n");
}

function getProgressStorageKey(forRaterId) {
  return `${RATERS_PROGRESS_STORAGE_PREFIX}:${RATERS_TASK_KEY}:${forRaterId}`;
}

function readSavedProgress(forRaterId) {
  try {
    const raw = localStorage.getItem(getProgressStorageKey(forRaterId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== RATERS_PROGRESS_VERSION) return null;
    if (parsed.rater_id !== forRaterId) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function clearSavedProgress(forRaterId) {
  try {
    localStorage.removeItem(getProgressStorageKey(forRaterId));
  } catch (error) {
    // Ignore storage cleanup errors.
  }
}

function buildOrderedItemsFromFileNames(fileNames) {
  if (!Array.isArray(fileNames) || fileNames.length !== CREATURE_ITEMS.length) return null;

  const byFile = new Map(CREATURE_ITEMS.map(item => [item.file_name, item]));
  const seen = new Set();
  const restored = [];

  for (const fileName of fileNames) {
    if (typeof fileName !== "string" || seen.has(fileName)) return null;
    const item = byFile.get(fileName);
    if (!item) return null;
    seen.add(fileName);
    restored.push(item);
  }

  return restored;
}

function initializeRandomOrder() {
  orderedItems = shuffle(CREATURE_ITEMS);
  previewItems = orderedItems.slice(0, 50);
}

function applyRestoredOrder(savedProgress) {
  const restored = buildOrderedItemsFromFileNames(savedProgress?.ordered_file_names);
  if (!restored) return false;
  orderedItems = restored;
  previewItems = orderedItems.slice(0, 50);
  return true;
}

initializeRandomOrder();

const RATER_INSTRUCTIONS_HTML = `
<div class="instructions-word-wrap" style="font-family: Arial, Helvetica, sans-serif; color: #e5e7eb;">
  <h2 style="margin:0 0 8px 0; font-size:24px;">Rater Protocol</h2>
  <p style="margin:0 0 12px 0;">In this study, you will evaluate creatures created by participants in a pilot experiment.</p>

  <h3 style="margin:14px 0 6px 0; font-size:18px;">Instructions Participants Received</h3>
  <p style="margin:0 0 8px 0;">Participants received the following instructions:</p>
  <div style="font-style: italic;">
    <p style="margin:0 0 8px 0;">Imagine a planet in another galaxy. In this task, you are asked to imagine 3 different creatures that live on that planet.</p>
    <p style="margin:0 0 4px 0;"><b>IMPORTANT:</b></p>
    <ul style="margin:0 0 12px 22px;">
      <li>Use your imagination and design a creature that is as creative as possible (both the drawing and the description).</li>
      <li>Please do not copy any real Earth creature (living or extinct) or any known fictional character/creature.</li>
      <li>Do not worry about your artistic skills.</li>
    </ul>
  </div>

  <h3 style="margin:14px 0 6px 0; font-size:18px;">Phase 1: Drawing Evaluation</h3>
  <p style="margin:0 0 8px 0;">First, evaluate only the creature drawing, without seeing the participant's written description yet.</p>
  <p style="margin:0 0 8px 0;">For each drawing, rate the following dimensions on a 1-10 scale.</p>

  <p style="margin:8px 0 4px 0;"><b>1. Likeability</b>: How much do you like the creation?</p>
  <ul style="margin:0 0 8px 22px;">
    <li><b>1</b> = I do not like it at all</li>
    <li><b>10</b> = I like it very much</li>
  </ul>
  <p style="margin:0 0 8px 0;">This evaluation is fully subjective. Rate how much you visually like the drawing (Kharkhurin, 2014).</p>
  <p style="margin:0 0 8px 0;">Example: A very cute dog might receive a 10 for likeability if you like it, even if you do not find it creative.</p>

  <p style="margin:8px 0 4px 0;"><b>2. Technical quality</b>: How technically well made is the creation?</p>
  <ul style="margin:0 0 8px 22px;">
    <li><b>1</b> = Very low technical quality</li>
    <li><b>10</b> = Very high technical quality</li>
  </ul>
  <p style="margin:0 0 8px 0;">This scale helps separate drawing execution quality from idea originality.</p>
  <p style="margin:0 0 8px 0;">Example: A drawing may be technically poor but present a very original idea. In that case, it could score low in technical quality but high in creativity/originality.</p>

  <p style="margin:8px 0 4px 0;"><b>3. Humor</b>: How funny does the creation seem to you?</p>
  <ul style="margin:0 0 8px 22px;">
    <li><b>1</b> = Not funny at all</li>
    <li><b>10</b> = Very funny</li>
  </ul>
  <p style="margin:0 0 8px 0;">Rate whether the creature creates humor, playful surprise, or a comic effect, regardless of originality or creativity.</p>

  <p style="margin:8px 0 4px 0;"><b>4. Unusualness</b>: How unusual is the creation?</p>
  <ul style="margin:0 0 8px 22px;">
    <li><b>1</b> = Very similar to an Earth creature</li>
    <li><b>10</b> = Not similar at all to an Earth creature</li>
  </ul>
  <p style="margin:0 0 8px 0;">Examples: A creature identical to a dog would receive a 1 because it reproduces something existing. A creature you have never seen before and find surprising could receive a 10.</p>

  <p style="margin:8px 0 4px 0;"><b>5. Creativity</b>: After considering all previous dimensions, provide a global judgment of creativity.</p>
  <ul style="margin:0 0 8px 22px;">
    <li><b>1</b> = Not creative at all</li>
    <li><b>10</b> = Extremely creative</li>
  </ul>

  <h3 style="margin:14px 0 6px 0; font-size:18px;">Phase 2: Full Concept Evaluation</h3>
  <p style="margin:0 0 8px 0;">Once you rate all dimensions for the drawing only, you can reveal the participant's description. With both pieces of information, rate the same dimensions again for the full creature concept.</p>

  <h3 style="margin:14px 0 6px 0; font-size:18px;">Open Comment</h3>
  <p style="margin:0 0 8px 0;">For each creature you will have an open comment box.</p>
  <p style="margin:0 0 4px 0;">You can use this field to:</p>
  <ul style="margin:0 0 12px 22px;">
    <li>add observations about the creature</li>
    <li>explain any uncertainty you had when rating a dimension</li>
    <li>justify any especially difficult score</li>
  </ul>

  <h3 style="margin:14px 0 6px 0; font-size:18px;">Recommendations for Raters</h3>
  <p style="margin:0 0 4px 0;"><b>1. Avoid rating on a bad day</b></p>
  <p style="margin:0 0 8px 0;">Some studies show that mood can affect originality judgments. If you feel you are having a bad day, it is better to postpone rating (Lloyd-Cox et al., 2022).</p>
  <p style="margin:0 0 4px 0;"><b>2. Take breaks during rating</b></p>
  <p style="margin:0 0 8px 0;">It is not recommended to rate all creatures in one sitting. Fatigue and reduced motivation can increase disagreement between raters (Ceh et al., 2021). Periodic breaks are recommended.</p>
  <p style="margin:0 0 4px 0;"><b>3. Be consistent when using the scale</b></p>
  <p style="margin:0 0 4px 0;">At first, everything may seem very original, and later you may start seeing patterns and similar creatures, which can shift your scoring criteria. To support consistent ratings, we show a full catalog from the beginning.</p>
  <p style="margin:0 0 4px 0;">In this catalog:</p>
  <ul style="margin:0 0 0 22px;">
    <li>you can see all creatures from the beginning.</li>
    <li>you can enter any creature to rate it, and once completed it shows a green checkmark.</li>
    <li>you can return to previously rated creatures and adjust scores if needed.</li>
  </ul>
</div>
`;

const raterSetupTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div class="screen">
      <div class="screen-card narrow">
        <h2 class="center">Rater setup</h2>
        <p class="center">Please enter your rater ID before starting.</p>
        <div class="stack" style="margin-top:12px;">
          <label for="rater-id-input" style="text-align:center;">Rater ID (R-XXX)</label>
          <input type="text" id="rater-id-input" placeholder="R-001" value="R-001" style="width:50%; margin:0 auto; display:block; background:#0b1220; color:var(--ink); border:1px solid var(--border); border-radius:10px; padding:8px 10px; font:inherit;" />
          <p id="rater-id-warning" class="warning center" style="display:none; margin:0;">Please use format R-XXX (e.g., R-001).</p>
        </div>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="rater-id-continue">Continue</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const input = document.getElementById("rater-id-input");
    const warning = document.getElementById("rater-id-warning");
    const btn = document.getElementById("rater-id-continue");
    const setWarning = (text, color = "#dc2626", show = true) => {
      if (!warning) return;
      warning.textContent = text;
      warning.style.color = color;
      warning.style.display = show ? "block" : "none";
    };

    if (btn) btn.disabled = true;
    setWarning("Loading catalog from DrawingsNDescriptions...", "#9ca3af", true);

    loadCatalogFromDrawingsFolder().then(result => {
      if (result?.ok) {
        if (btn) btn.disabled = false;
        setWarning("", "#dc2626", false);
      } else {
        if (btn) btn.disabled = true;
        setWarning(`Catalog load failed: ${result?.error || "unknown error"}`, "#dc2626", true);
      }
    });

    const finish = () => {
      const value = String(input?.value || "").trim().toUpperCase();
      if (!/^R-\d{3}$/.test(value)) {
        setWarning("Please use format R-XXX (e.g., R-001).", "#dc2626", true);
        return;
      }
      raterId = value;
      setWarning("", "#dc2626", false);

      const savedProgress = readSavedProgress(value);
      let resumeSelected = false;
      if (savedProgress) {
        const savedAt = new Date(savedProgress.updated_at || Date.now()).toLocaleString("en-US");
        resumeSelected = window.confirm(
          `A saved session for ${value} was found (${savedAt}).\n\nPress OK to resume, or Cancel to start from scratch.`
        );
      }

      if (resumeSelected && savedProgress && applyRestoredOrder(savedProgress)) {
        pendingResumeData = savedProgress;
      } else {
        pendingResumeData = null;
        clearSavedProgress(value);
        initializeRandomOrder();
      }

      jsPsych.finishTrial({ rater_id: value, resumed: resumeSelected });
    };

    btn?.addEventListener("click", finish);
    input?.addEventListener("keydown", e => {
      if (e.key === "Enter") finish();
    });
  },
  data: { screen: "rater_setup" }
};

const instructionsTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div class="screen">
      <div class="screen-card">
        <div class="instructions-modal-content">
          ${RATER_INSTRUCTIONS_HTML}
        </div>
        <p style="margin-top:10px;">You can reopen these instructions anytime using the top-right button in the catalog.</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="instructions-continue">Continue</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("instructions-continue");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "rater_instructions" }
};

const collageTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div class="screen">
      <div class="screen-card">
        <h2 class="center">Preview</h2>
        <p class="center">These are some of the creatures you will evaluate later. Review them to get a general impression of their creativity.</p>
        <div id="collage-grid" class="collage-grid"></div>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="collage-start">Start</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const grid = document.getElementById("collage-grid");
    if (grid) {
      previewItems.forEach(item => {
        const img = document.createElement("img");
        img.src = item.image_path;
        img.alt = item.file_name;
        grid.append(img);
      });
    }
    const btn = document.getElementById("collage-start");
    btn?.addEventListener("click", () => jsPsych.finishTrial());
  },
  data: { screen: "rater_collage" }
};

const ratingTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div class="screen">
      <div class="screen-card">
        <div id="catalog-view">
          <div class="catalog-top">
            <h2 style="margin:0;">Catalog</h2>
            <div class="catalog-right">
              <p id="catalog-status" class="catalog-status"></p>
              <button class="btn" id="catalog-instructions" style="padding:8px 12px; font-size:14px;">Instructions</button>
            </div>
          </div>
          <p>Use the catalog to navigate creatures in random order. Completed creatures show a green checkmark.</p>
          <div id="catalog-grid" class="catalog-grid"></div>
          <p id="catalog-warning" class="warning"></p>
          <div class="row" style="margin-top:8px;">
            <button class="btn primary" id="catalog-start">Start</button>
            <div style="display:flex; flex-direction:column; align-items:flex-end;">
              <button class="btn" id="catalog-save-progress">Save progress</button>
              <p id="catalog-save-status" style="margin:4px 0 0 0; font-size:12px; color:#9ca3af; min-height:16px;"></p>
            </div>
            <button class="btn" id="catalog-finish">Finish and save</button>
          </div>
        </div>
        <div id="instructions-overlay" class="instructions-overlay hidden">
          <div class="instructions-modal">
            <button class="btn instructions-close-x" id="instructions-close-x" aria-label="Close instructions">×</button>
            <div class="instructions-modal-content">
              ${RATER_INSTRUCTIONS_HTML}
            </div>
            <div class="row" style="justify-content:flex-end;">
              <button class="btn primary" id="instructions-close">Close</button>
            </div>
          </div>
        </div>

        <div id="detail-view" class="hidden">
          <div class="topline">
            <h2 style="margin:0;">Creature Rating</h2>
            <div id="rating-progress" class="progress"></div>
          </div>
          <div class="rating-media">
            <div class="media-left">
              <img id="rating-image" class="creature-image" alt="Creature to rate" />
            </div>
            <div id="description-wrap" class="description-box hidden">
              <p id="creature-text"></p>
            </div>
          </div>
          <div id="rating-fields" class="questions-layout">
            <div class="question-column">
              <p class="question-column-title">Based on the drawing only...</p>
              <div id="draw-fields"></div>
              <div class="row" style="justify-content:flex-start; margin-top:10px;">
                <button class="btn" id="show-description-btn">Show description</button>
              </div>
            </div>
            <div id="full-column" class="question-column hidden">
              <p class="question-column-title">Now, based on drawing and description together...</p>
              <div id="full-fields"></div>
            </div>
          </div>
          <div class="open-comment">
            <label for="comment-input">Comments or notes...</label>
            <textarea id="comment-input" placeholder="Comments or notes..."></textarea>
          </div>
          <p id="rating-warning" class="warning"></p>
          <div class="row" style="margin-top:8px;">
            <button class="btn" id="rating-prev">Previous</button>
            <button class="btn primary" id="rating-next">Next</button>
            <button class="btn" id="rating-catalog">Catalog</button>
            <div style="display:flex; flex-direction:column; align-items:flex-end;">
              <button class="btn" id="rating-save-progress">Save progress</button>
              <p id="rating-save-status" style="margin:4px 0 0 0; font-size:12px; color:#9ca3af; min-height:16px;"></p>
            </div>
            <span id="rating-finish-hint" class="hidden" style="font-size:12px; margin-left:8px; white-space:nowrap;">Done. Go to the catalog to review or finish.</span>
          </div>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const catalogView = document.getElementById("catalog-view");
    const catalogGrid = document.getElementById("catalog-grid");
    const catalogStatus = document.getElementById("catalog-status");
    const catalogSaveStatus = document.getElementById("catalog-save-status");
    const catalogWarning = document.getElementById("catalog-warning");
    const catalogStart = document.getElementById("catalog-start");
    const catalogSaveProgress = document.getElementById("catalog-save-progress");
    const catalogFinish = document.getElementById("catalog-finish");
    const catalogInstructionsBtn = document.getElementById("catalog-instructions");
    const instructionsOverlay = document.getElementById("instructions-overlay");
    const instructionsCloseBtn = document.getElementById("instructions-close");
    const instructionsCloseXBtn = document.getElementById("instructions-close-x");

    const detailView = document.getElementById("detail-view");
    const ratingMedia = detailView?.querySelector(".rating-media");
    const progress = document.getElementById("rating-progress");
    const image = document.getElementById("rating-image");
    const fields = document.getElementById("rating-fields");
    const drawFields = document.getElementById("draw-fields");
    const fullFields = document.getElementById("full-fields");
    const fullColumn = document.getElementById("full-column");
    const commentInput = document.getElementById("comment-input");
    const warning = document.getElementById("rating-warning");
    const prevBtn = document.getElementById("rating-prev");
    const nextBtn = document.getElementById("rating-next");
    const catalogBtn = document.getElementById("rating-catalog");
    const ratingSaveProgress = document.getElementById("rating-save-progress");
    const ratingSaveStatus = document.getElementById("rating-save-status");
    const ratingFinishHint = document.getElementById("rating-finish-hint");
    const showDescriptionBtn = document.getElementById("show-description-btn");
    const descriptionWrap = document.getElementById("description-wrap");
    const creatureText = document.getElementById("creature-text");

    const drafts = new Map();
    let currentIndex = 0;
    let currentView = "catalog";
    let hasRenderedCurrent = false;
    const resumeData = pendingResumeData;
    pendingResumeData = null;

    const getCurrentMeta = () => orderedItems[currentIndex];

    const createEmptyDraft = () => ({
      description_shown: false,
      draw_atractivo: null,
      draw_calidad_tecnica: null,
      draw_humor: null,
      draw_inusual: null,
      draw_creatividad: null,
      full_atractivo: null,
      full_calidad_tecnica: null,
      full_humor: null,
      full_inusual: null,
      full_creatividad: null,
      comments: ""
    });

    const formatSaveTime = iso => {
      const date = new Date(iso || Date.now());
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    };

    const updateSaveStatus = (text, isError = false) => {
      const color = isError ? "#fca5a5" : "#9ca3af";
      if (catalogSaveStatus) {
        catalogSaveStatus.textContent = text;
        catalogSaveStatus.style.color = color;
      }
      if (ratingSaveStatus) {
        ratingSaveStatus.textContent = text;
        ratingSaveStatus.style.color = color;
      }
    };

    const makeLikert = ({ key, title, left, right, value }) => {
      const wrap = document.createElement("div");
      wrap.className = "field";

      const titleEl = document.createElement("p");
      titleEl.className = "field-title";
      titleEl.innerHTML = title;
      wrap.append(titleEl);

      const options = document.createElement("div");
      options.className = "likert-options";

      for (let i = 1; i <= 10; i += 1) {
        const label = document.createElement("label");
        label.className = "likert-choice";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `likert_${key}`;
        input.value = String(i);
        input.dataset.key = key;

        if (value === i) {
          input.checked = true;
          label.classList.add("is-selected");
        }

        input.addEventListener("change", () => {
          const all = options.querySelectorAll(".likert-choice");
          all.forEach(el => el.classList.remove("is-selected"));
          label.classList.add("is-selected");
          persistCurrentDraft();
          saveProgress(false);
          refreshShowDescriptionAvailability();
          applyCompletionUiState(countCompleted());
        });

        const number = document.createElement("span");
        number.textContent = String(i);
        label.append(input, number);
        options.append(label);
      }

      const ends = document.createElement("div");
      ends.className = "likert-ends";
      const leftEl = document.createElement("span");
      const rightEl = document.createElement("span");
      leftEl.textContent = left;
      rightEl.textContent = right;
      ends.append(leftEl, rightEl);

      wrap.append(options, ends);
      return wrap;
    };

    const readLikert = key => {
      const selected = fields.querySelector(`input[data-key="${key}"]:checked`);
      return selected ? Number(selected.value) : null;
    };

    const hasBaseRatings = draft => {
      if (!draft) return false;
      const base = [draft.draw_atractivo, draft.draw_calidad_tecnica, draft.draw_humor, draft.draw_inusual, draft.draw_creatividad];
      return base.every(v => Number.isInteger(v) && v >= 1 && v <= 10);
    };

    const isDraftComplete = draft => {
      if (!draft || !draft.description_shown) return false;
      const required = [
        draft.draw_atractivo,
        draft.draw_calidad_tecnica,
        draft.draw_humor,
        draft.draw_inusual,
        draft.draw_creatividad,
        draft.full_atractivo,
        draft.full_calidad_tecnica,
        draft.full_humor,
        draft.full_inusual,
        draft.full_creatividad
      ];
      return required.every(v => Number.isInteger(v) && v >= 1 && v <= 10);
    };

    const ensureDraft = meta => {
      const key = meta.file_name;
      if (!drafts.has(key)) {
        drafts.set(key, createEmptyDraft());
      }
      return drafts.get(key);
    };

    const countCompleted = () => {
      return orderedItems.reduce((acc, meta) => acc + (isDraftComplete(drafts.get(meta.file_name)) ? 1 : 0), 0);
    };

    const applyCompletionUiState = completed => {
      if (!catalogStart || !catalogFinish || !ratingFinishHint) return;
      const allDone = completed === orderedItems.length;
      if (allDone) {
        catalogStart.classList.add("hidden");
      } else {
        catalogStart.classList.remove("hidden");
      }
      catalogFinish.style.background = allDone ? "#7e22ce" : "";
      catalogFinish.style.borderColor = allDone ? "#7e22ce" : "";
      catalogFinish.style.color = allDone ? "#ffffff" : "";
      if (allDone) {
        ratingFinishHint.classList.remove("hidden");
      } else {
        ratingFinishHint.classList.add("hidden");
      }
    };

    const firstIncompleteIndex = () => {
      for (let i = 0; i < orderedItems.length; i += 1) {
        if (!isDraftComplete(drafts.get(orderedItems[i].file_name))) return i;
      }
      return 0;
    };

    const refreshShowDescriptionAvailability = () => {
      const meta = getCurrentMeta();
      if (!meta || !showDescriptionBtn) return;
      const draft = ensureDraft(meta);
      if (draft.description_shown) {
        showDescriptionBtn.disabled = true;
        showDescriptionBtn.title = "";
        return;
      }
      const baseReady = hasBaseRatings(draft);
      showDescriptionBtn.disabled = !baseReady;
      showDescriptionBtn.title = baseReady ? "" : "Complete the five drawing questions first.";
    };

    const persistCurrentDraft = () => {
      const meta = getCurrentMeta();
      if (!meta || !hasRenderedCurrent) return;
      const current = ensureDraft(meta);
      current.draw_atractivo = readLikert("draw_atractivo");
      current.draw_calidad_tecnica = readLikert("draw_calidad_tecnica");
      current.draw_humor = readLikert("draw_humor");
      current.draw_inusual = readLikert("draw_inusual");
      current.draw_creatividad = readLikert("draw_creatividad");
      current.full_atractivo = readLikert("full_atractivo");
      current.full_calidad_tecnica = readLikert("full_calidad_tecnica");
      current.full_humor = readLikert("full_humor");
      current.full_inusual = readLikert("full_inusual");
      current.full_creatividad = readLikert("full_creatividad");
      current.comments = commentInput ? commentInput.value : "";
      drafts.set(meta.file_name, current);
    };

    const serializeDrafts = () => {
      const out = {};
      drafts.forEach((draft, fileName) => {
        out[fileName] = { ...draft };
      });
      return out;
    };

    const restoreDrafts = rawDrafts => {
      if (!rawDrafts || typeof rawDrafts !== "object") return;
      const validFiles = new Set(orderedItems.map(item => item.file_name));
      const numericKeys = [
        "draw_atractivo",
        "draw_calidad_tecnica",
        "draw_humor",
        "draw_inusual",
        "draw_creatividad",
        "full_atractivo",
        "full_calidad_tecnica",
        "full_humor",
        "full_inusual",
        "full_creatividad"
      ];

      Object.entries(rawDrafts).forEach(([fileName, rawDraft]) => {
        if (!validFiles.has(fileName)) return;
        const safeDraft = createEmptyDraft();
        if (rawDraft && typeof rawDraft === "object") {
          safeDraft.description_shown = Boolean(rawDraft.description_shown);
          numericKeys.forEach(key => {
            const value = rawDraft[key];
            safeDraft[key] = Number.isInteger(value) && value >= 1 && value <= 10 ? value : null;
          });
          safeDraft.comments = typeof rawDraft.comments === "string" ? rawDraft.comments : "";
        }
        drafts.set(fileName, safeDraft);
      });
    };

    const saveProgress = (manual = false) => {
      if (!raterId) return false;
      persistCurrentDraft();
      const payload = {
        version: RATERS_PROGRESS_VERSION,
        task_key: RATERS_TASK_KEY,
        rater_id: raterId,
        updated_at: new Date().toISOString(),
        ordered_file_names: orderedItems.map(item => item.file_name),
        current_index: currentIndex,
        current_view: currentView,
        drafts_by_file: serializeDrafts()
      };

      try {
        localStorage.setItem(getProgressStorageKey(raterId), JSON.stringify(payload));
        const when = formatSaveTime(payload.updated_at);
        updateSaveStatus(manual ? `Progress saved at ${when}.` : `Auto-saved at ${when}.`);
        return true;
      } catch (error) {
        updateSaveStatus("Could not save progress in this browser.", true);
        return false;
      }
    };

    const renderCatalog = () => {
      if (!catalogGrid || !catalogStatus || !catalogFinish || !catalogStart) return;
      catalogGrid.innerHTML = "";
      orderedItems.forEach((meta, idx) => {
        const draft = drafts.get(meta.file_name);
        const complete = isDraftComplete(draft);
        const card = document.createElement("button");
        card.type = "button";
        card.className = "catalog-card";
        card.innerHTML = `
          <span class="catalog-order-badge${complete ? " is-complete" : ""}">
            ${idx + 1}
            ${complete ? '<span class="catalog-order-check">✓</span>' : ""}
          </span>
          <img src="${meta.image_path}" alt="${meta.file_name}" />
          <div class="catalog-num">Creature ${meta.creature_id}</div>
        `;
        card.addEventListener("click", () => {
          if (catalogWarning) catalogWarning.textContent = "";
          openDetail(idx);
        });
        catalogGrid.append(card);
      });

      const completed = countCompleted();
      catalogStatus.textContent = `${completed} / ${orderedItems.length} rated`;
      catalogStart.textContent = completed === 0 ? "Start" : "Resume";
      catalogFinish.disabled = completed !== orderedItems.length;
      applyCompletionUiState(completed);
      if (completed === orderedItems.length && catalogWarning) {
        catalogWarning.textContent = "";
      }
    };

    const openCatalog = () => {
      persistCurrentDraft();
      currentView = "catalog";
      if (warning) warning.textContent = "";
      if (detailView) detailView.classList.add("hidden");
      if (catalogView) catalogView.classList.remove("hidden");
      renderCatalog();
    };

    const renderCurrent = () => {
      const meta = getCurrentMeta();
      if (!meta || !image || !progress || !fields || !drawFields || !fullFields || !fullColumn || !warning || !nextBtn || !showDescriptionBtn || !descriptionWrap || !creatureText) return;

      const draft = ensureDraft(meta);

      progress.textContent = `${currentIndex + 1} / ${orderedItems.length}`;
      image.src = meta.image_path;
      image.alt = meta.file_name;

      const metadataText = summaryByCreatureKey.get(getCreatureKey(meta)) || "";
      creatureText.textContent = metadataText;

      if (draft.description_shown) {
        descriptionWrap.classList.remove("hidden");
      } else {
        descriptionWrap.classList.add("hidden");
      }
      if (commentInput) commentInput.value = draft.comments || "";
      refreshShowDescriptionAvailability();

      drawFields.innerHTML = "";
      drawFields.append(
        makeLikert({
          key: "draw_atractivo",
          title: "How much do you <b>like</b> the creation?",
          left: "Do not like it at all",
          right: "Like it very much",
          value: draft.draw_atractivo
        }),
        makeLikert({
          key: "draw_calidad_tecnica",
          title: "How much <b>technical quality</b> does the creation have?",
          left: "Very low technical quality",
          right: "Very high technical quality",
          value: draft.draw_calidad_tecnica
        }),
        makeLikert({
          key: "draw_humor",
          title: "How <b>funny</b> does the creation seem to you?",
          left: "Not funny at all",
          right: "Very funny",
          value: draft.draw_humor
        }),
        makeLikert({
          key: "draw_inusual",
          title: "How <b>unusual</b> is the creation?",
          left: "Very similar to an Earth creature",
          right: "Not similar at all to an Earth creature",
          value: draft.draw_inusual
        }),
        makeLikert({
          key: "draw_creatividad",
          title: "What is your global judgment of the creation's <b>creativity</b>?",
          left: "Not creative at all",
          right: "Extremely creative",
          value: draft.draw_creatividad
        })
      );

      if (draft.description_shown) {
        fullColumn.classList.remove("hidden");
        fullFields.innerHTML = "";
        fullFields.append(
          makeLikert({
            key: "full_atractivo",
            title: "How much do you <b>like</b> the creation?",
            left: "Do not like it at all",
            right: "Like it very much",
            value: draft.full_atractivo
          }),
          makeLikert({
            key: "full_calidad_tecnica",
            title: "How much <b>technical quality</b> does the creation have?",
            left: "Very low technical quality",
            right: "Very high technical quality",
            value: draft.full_calidad_tecnica
          }),
          makeLikert({
            key: "full_humor",
            title: "How <b>funny</b> does the creation seem to you?",
            left: "Not funny at all",
            right: "Very funny",
            value: draft.full_humor
          }),
          makeLikert({
            key: "full_inusual",
            title: "How <b>unusual</b> is the creation?",
            left: "Very similar to an Earth creature",
            right: "Not similar at all to an Earth creature",
            value: draft.full_inusual
          }),
          makeLikert({
            key: "full_creatividad",
            title: "What is your global judgment of the creation's <b>creativity</b>?",
            left: "Not creative at all",
            right: "Extremely creative",
            value: draft.full_creatividad
          })
        );
      } else {
        fullFields.innerHTML = "";
        fullColumn.classList.add("hidden");
      }

      warning.textContent = "";
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === orderedItems.length - 1;
      applyCompletionUiState(countCompleted());
      hasRenderedCurrent = true;
    };

    const openDetail = idx => {
      persistCurrentDraft();
      currentIndex = Math.max(0, Math.min(orderedItems.length - 1, idx));
      currentView = "detail";
      if (catalogView) catalogView.classList.add("hidden");
      if (detailView) detailView.classList.remove("hidden");
      renderCurrent();
    };

    const handleShowDescription = () => {
      const meta = getCurrentMeta();
      if (!meta) return;
      persistCurrentDraft();
      const draft = ensureDraft(meta);
      if (!hasBaseRatings(draft)) return;
      draft.description_shown = true;
      drafts.set(meta.file_name, draft);
      saveProgress(false);
      renderCurrent();
      if (ratingMedia) {
        ratingMedia.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const handleNext = () => {
      if (currentIndex < orderedItems.length - 1) {
        openDetail(currentIndex + 1);
        if (ratingMedia) {
          ratingMedia.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    const handlePrev = () => {
      if (currentIndex > 0) openDetail(currentIndex - 1);
    };

    const buildRows = () => {
      const rows = [];
      for (let i = 0; i < orderedItems.length; i += 1) {
        const meta = orderedItems[i];
        const draft = drafts.get(meta.file_name);
        if (!isDraftComplete(draft)) return null;
        const creatureTextValue = summaryByCreatureKey.get(getCreatureKey(meta)) || "";
        rows.push({
          rater_id: raterId,
          order_index: i + 1,
          image_file: meta.file_name,
          laboratory_id: meta.laboratory_id,
          participant_id: meta.participant_id,
          creature: meta.creature_number,
          phase: meta.phase,
          creature_text: creatureTextValue,
          draw_likeability: draft.draw_atractivo,
          draw_quality: draft.draw_calidad_tecnica,
          draw_humor: draft.draw_humor,
          draw_unusual: draft.draw_inusual,
          draw_creativity: draft.draw_creatividad,
          full_likeability: draft.full_atractivo,
          full_quality: draft.full_calidad_tecnica,
          full_humor: draft.full_humor,
          full_unusual: draft.full_inusual,
          full_creativity: draft.full_creatividad,
          comments: draft.comments || ""
        });
      }
      return rows;
    };

    const handleFinish = () => {
      persistCurrentDraft();
      const rows = buildRows();
        if (!rows) {
        if (catalogWarning) catalogWarning.textContent = "Please complete all creatures before finishing.";
        renderCatalog();
        return;
      }
      ratingResponses = rows;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearSavedProgress(raterId);
      jsPsych.finishTrial({ n_ratings: rows.length });
    };

    const handleBeforeUnload = () => {
      saveProgress(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    catalogStart?.addEventListener("click", () => openDetail(firstIncompleteIndex()));
    catalogFinish?.addEventListener("click", handleFinish);
    catalogInstructionsBtn?.addEventListener("click", () => {
      instructionsOverlay?.classList.remove("hidden");
    });
    instructionsCloseBtn?.addEventListener("click", () => {
      instructionsOverlay?.classList.add("hidden");
    });
    instructionsCloseXBtn?.addEventListener("click", () => {
      instructionsOverlay?.classList.add("hidden");
    });
    instructionsOverlay?.addEventListener("click", e => {
      if (e.target === instructionsOverlay) {
        instructionsOverlay.classList.add("hidden");
      }
    });
    showDescriptionBtn?.addEventListener("click", handleShowDescription);
    prevBtn?.addEventListener("click", handlePrev);
    nextBtn?.addEventListener("click", handleNext);
    catalogBtn?.addEventListener("click", openCatalog);
    catalogSaveProgress?.addEventListener("click", () => saveProgress(true));
    ratingSaveProgress?.addEventListener("click", () => saveProgress(true));
    commentInput?.addEventListener("input", () => {
      const meta = getCurrentMeta();
      if (!meta) return;
      const draft = ensureDraft(meta);
      draft.comments = commentInput.value;
      drafts.set(meta.file_name, draft);
      saveProgress(false);
    });

    loadSummaryData();
    if (resumeData) {
      restoreDrafts(resumeData.drafts_by_file);
      const savedIndex = Number.isInteger(resumeData.current_index) ? resumeData.current_index : 0;
      currentIndex = Math.max(0, Math.min(orderedItems.length - 1, savedIndex));
      currentView = resumeData.current_view === "detail" ? "detail" : "catalog";
      const savedAt = new Date(resumeData.updated_at || Date.now()).toLocaleString("en-US");
      updateSaveStatus(`Recovered saved progress (${savedAt}).`);
    } else {
      updateSaveStatus("No saved progress loaded.");
    }

    if (currentView === "detail") {
      openDetail(currentIndex);
    } else {
      openCatalog();
    }
  },
  data: { screen: "rater_rating" }
};

const saveDataTrial = {
  timeline: [{
    type: jsPsychPipe,
    action: "save",
    experiment_id: RATERS_PIPE_EXPERIMENT_ID,
    filename: () => osfUploadFileName,
    data_string: () => buildRatingsCsv(ratingResponses)
  }],
  conditional_function: () => Boolean(RATERS_PIPE_EXPERIMENT_ID),
  on_timeline_start: () => {
    const subject_id = jsPsych.randomization.randomID(10);
    osfUploadFileName = `${subject_id}.csv`;
  },
  data: { screen: "rater_osf_upload" }
};


const endTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: `
    <div class="screen">
      <div class="screen-card narrow">
        <h2 class="center">Evaluation Complete</h2>
        <p class="center">Thank you for your ratings.</p>
        <p class="center" id="export-message">Preparing ratings CSV...</p>
        <div class="row" style="margin-top:12px;">
          <button class="btn primary" id="download-ratings">Download again</button>
        </div>
      </div>
    </div>
  `,
  on_load: () => {
    const btn = document.getElementById("download-ratings");
    const msg = document.getElementById("export-message");
    const fileName = buildRatingsFileName();
    const csv = buildRatingsCsv(ratingResponses);
    const saveCsv = () => {
      downloadCsv(fileName, csv);
      if (msg) {
        msg.textContent = `CSV saved as ${fileName}.`;
      }
      if (msg && RATERS_PIPE_EXPERIMENT_ID) {
        msg.textContent = `CSV saved as ${fileName} and sent to OSF via DataPipe.`;
      } else if (msg) {
        msg.textContent = `CSV saved as ${fileName}. Automatic upload is not configured.`;
      }
    };

    saveCsv();
    btn?.addEventListener("click", saveCsv);
  },
  data: { screen: "rater_end" }
};

const timeline = [raterSetupTrial, instructionsTrial, ratingTrial, saveDataTrial, endTrial];
jsPsych.run(timeline);
