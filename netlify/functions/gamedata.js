const THEMES = {
backyard:{emoji:'🏡',name:'Backyard',items:[
 ['In-ground swimming pool',9],['Full outdoor kitchen with built-in grill',8],['Fire pit with stone seating',7],
 ['Trampoline',5],['Hot tub',8],['Treehouse',6],['Hammock between two oak trees',5],['Outdoor pizza oven',7],
 ['Basketball hoop',5],['Vegetable garden beds',4],['String lights across the patio',4],['Zip line',6],
 ['Putting green',6],['Gazebo with curtains',6],['Chicken coop',4],['Koi pond',6],
 ['Outdoor movie screen and projector',7],['Sandbox',3],['Badminton net',3],['Greenhouse',5],
 ['Fenced dog run',4],['Adirondack chairs, set of four',3]]},
gaming:{emoji:'🎮',name:'Gaming Room',items:[
 ['4K OLED TV mounted on the wall',8],['Custom gaming PC with RGB lighting',9],['Full arcade cabinet',8],
 ['Racing simulator rig with force feedback wheel',8],['Massage gaming chair',6],
 ['Retro console shelf (NES, SNES, N64)',5],['VR headset and play space',7],['Surround sound speaker system',6],
 ['Mini fridge stocked with drinks',4],['LED strip lighting',3],['Pinball machine',7],['Foosball table',5],
 ['Wall of framed game art',4],['Streaming setup with green screen',6],['Bean bag chairs',2],
 ['Snack bar counter',4],['Soundproofing panels',5],['Ping pong table',4],['Poster of a favorite game',2],
 ['Bluetooth controller charging station',3]]},
bunker:{emoji:'🛡️',name:'Underground Bunker',items:[
 ['Blast door entrance',8],['Air filtration and ventilation system',8],['Backup diesel generator',7],
 ['Freeze-dried food pantry, one-year supply',7],['Water purification system',7],
 ['Medical bay with first-aid supplies',6],['Bunk beds for six',5],['Solar panel array',7],
 ['Ham radio communication station',6],['Gun safe with security lock',6],['Hydroponic grow room',6],
 ['Reinforced concrete walls',6],['Composting toilet',3],['Board game and book library',3],
 ['Water storage tanks',5],['Escape tunnel',7],['Security camera system',5],['Workshop with hand tools',4],
 ['Rec room with a pool table',4],['Emergency battery bank',5]]},
vacation:{emoji:'🏝️',name:'Perfect Vacation',items:[
 ['Overwater bungalow in Bora Bora',9],['Private chef for the week',7],['First-class flights',7],
 ['Helicopter tour over the coastline',6],['Scuba diving excursion',6],
 ['Beachfront villa with an infinity pool',8],['Spa day with a full-body massage',5],
 ['Guided hike to a waterfall',4],['Sunset sailing cruise',5],['Local cooking class',3],
 ['Rooftop dinner reservation',4],['Rental convertible for the trip',5],['Snorkeling with sea turtles',6],
 ['Overnight stay in a treehouse resort',5],['Street food tour',3],['Museum and gallery pass',3],
 ['Hot air balloon ride at sunrise',6],['Beachside hammock and a good book',2],
 ['Souvenir shopping afternoon',2],['Late checkout upgrade',2]]},
superhero:{emoji:'🦸',name:'Superhero Draft',items:[
 ['Flight',9],['Super strength',8],['Telepathy',7],['Invisibility',6],['Super speed',8],
 ['Regeneration / healing factor',8],['Energy blasts',7],['Time manipulation',9],['Shapeshifting',6],
 ['Telekinesis',7],['X-ray vision',4],['Elemental control (fire and ice)',6],['Force field projection',6],
 ['Enhanced senses',4],['Weather control',6],['Teleportation',8],['Sidekick partner',3],
 ['High-tech utility belt',4],['Signature costume with a cape',2],['Secret hideout lair',4],
 ['Loyal sidekick vehicle',3],['Catchphrase and a theme song',2]]},
perfectlife:{emoji:'✨',name:'Perfect Life',items:[
 ['Financially independent, no debt',9],['Loving, supportive close friends',8],
 ['Dream career doing meaningful work',8],['Excellent health into old age',9],['A house you truly love',7],
 ['Strong, happy marriage',8],['Time for hobbies every week',5],['World travel every year',6],
 ['A dog that adores you',5],['Skill mastery in something creative',5],
 ['A big garden to grow food in',4],['Weekly family dinners',4],['A reliable, comfortable car',3],
 ['Quiet mornings with good coffee',3],['A book club you love',2],['Season tickets to your favorite team',3],
 ['A well-stocked home library',3],['A standing Friday night tradition',2],['Neighbors who become friends',3],
 ['A garden shed workshop',2]]},
fruit:{emoji:'🍑',name:'Best Fruit',items:[
 ['Mango',8],['Strawberry',7],['Pineapple',7],['Watermelon',6],['Grapes',6],['Blueberries',7],['Peach',6],
 ['Cherries',7],['Dragon fruit',6],['Banana',5],['Apple',5],['Kiwi',5],['Raspberry',6],['Pomegranate',6],
 ['Orange',5],['Fig',5],['Lychee',6],['Cantaloupe',4]]},
movies:{emoji:'🎬',name:'Best Movies',items:[
 ['The Godfather',9],['The Shawshank Redemption',9],['Jurassic Park',7],['The Dark Knight',8],
 ['Pulp Fiction',8],['Titanic',7],['Inception',8],['Forrest Gump',7],['The Matrix',8],['Jaws',7],
 ['Back to the Future',6],['Gladiator',6],['The Lion King',6],['Toy Story',6],['Casablanca',6],
 ['Goodfellas',7],['Parasite',7],['The Grand Budapest Hotel',5],['La La Land',5],['Rocky',5]]},
tvshows:{emoji:'📺',name:'Best TV Shows',items:[
 ['Breaking Bad',9],['The Sopranos',8],['The Wire',8],['Game of Thrones',7],['Friends',6],['The Office',6],
 ['Stranger Things',6],['Seinfeld',6],['The Crown',5],['Better Call Saul',7],['Chernobyl',6],['Fargo',6],
 ['Succession',7],['The Bear',6],['True Detective',6],['Cheers',4],['Parks and Recreation',5],
 ['Curb Your Enthusiasm',5],['The West Wing',5],['Ted Lasso',5]]},
music:{emoji:'🎤',name:'Best Music Artists',items:[
 ['The Beatles',9],['Beyoncé',8],['Michael Jackson',9],['Taylor Swift',8],['Kendrick Lamar',8],['Queen',8],
 ['Stevie Wonder',8],['Adele',6],['Prince',8],['Rihanna',6],['Radiohead',6],['Bob Dylan',7],
 ['Whitney Houston',7],['Kanye West',6],['Nirvana',6],['Fleetwood Mac',6],['Frank Ocean',5],['Daft Punk',5],
 ['Amy Winehouse',6],['The Rolling Stones',7]]}
};

const CUSTOM_ADJ = ['Vintage {T}','Luxury {T}','Limited-Edition {T}','Handcrafted {T}','Deluxe {T}','Rare {T}'];
const CUSTOM_FEAT = ['{T} with a secret menu','{T} signed by its creator','{T} with a lifetime warranty',
 '{T} featured in a magazine','{T} with a hidden compartment','{T} built by local artisans',
 '{T} with a members-only waitlist','{T} that took a year to make'];
const CUSTOM_FILLER = ['A basic {t} starter kit','A gently used {t}','An entry-level {t}','A {t} sample pack',
 'A no-frills {t}','A budget {t}','A secondhand {t}','A travel-size {t}'];

const FOOTBALL = {
 pool:{
  GK:[['Alisson Becker',9],['Ederson',8],['Thibaut Courtois',9],['Marc-André ter Stegen',8],
      ['Gianluigi Donnarumma',8],['Emiliano Martínez',8],['Jan Oblak',8],['Mike Maignan',8],
      ['Yassine Bounou',7],['David Raya',7],['André Onana',7],['Nick Pope',7],['Bernd Leno',6],
      ['Robert Sánchez',6],['Diogo Costa',7]],
  DEF:[['Virgil van Dijk',9],['Rúben Dias',9],['William Saliba',8],['Antonio Rüdiger',8],['Achraf Hakimi',8],
      ['Trent Alexander-Arnold',8],['Alphonso Davies',8],['Theo Hernández',8],['Josko Gvardiol',8],
      ['Kim Min-jae',7],['Marquinhos',8],['Éder Militão',7],['John Stones',7],['Kyle Walker',7],
      ['Jules Koundé',7],['Dayot Upamecano',7],['Manuel Akanji',7],['Ben White',6],['Cristian Romero',7],
      ['Lisandro Martínez',7],['Milan Škriniar',7],['Gabriel Magalhães',7],['Nathan Aké',6],['Reece James',7],
      ['Alessandro Bastoni',8],['Federico Dimarco',7],['Nuno Mendes',7],['Raphaël Varane',7],
      ['Pau Torres',6],['Ronald Araújo',7]],
  MID:[['Kevin De Bruyne',9],['Jude Bellingham',9],['Rodri',9],['Bukayo Saka',9],['Pedri',8],['Gavi',7],
      ['Federico Valverde',8],['Martin Ødegaard',8],['Bruno Fernandes',8],['Declan Rice',8],['Vitinha',7],
      ['Frenkie de Jong',7],['Jamal Musiala',8],['Florian Wirtz',8],['Enzo Fernández',7],
      ['Moisés Caicedo',7],['Alexis Mac Allister',7],['Aurélien Tchouaméni',7],['Eduardo Camavinga',7],
      ['Nicolò Barella',7],['Sandro Tonali',7],['Ismaël Bennacer',6],['Fabián Ruiz',6],['Marco Verratti',7],
      ['İlkay Gündoğan',7],['Casemiro',7],['Christian Eriksen',6],['Dominik Szoboszlai',7],
      ['Joshua Kimmich',8],['Leon Goretzka',6]],
  ATT:[['Erling Haaland',10],['Kylian Mbappé',10],['Vinícius Júnior',9],['Harry Kane',9],['Mohamed Salah',9],
      ['Lautaro Martínez',8],['Victor Osimhen',8],['Ousmane Dembélé',8],['Rafael Leão',7],
      ['Khvicha Kvaratskhelia',8],['Phil Foden',8],['Julian Álvarez',7],['Randal Kolo Muani',6],
      ['Marcus Rashford',6],['Darwin Núñez',6],['Serhou Guirassy',6],['Alexander Isak',8],
      ['Ollie Watkins',6],['Cody Gakpo',6],['Nicolas Jackson',6],['Gabriel Jesus',6],['Dušan Vlahović',6],
      ['Federico Chiesa',6],['Kingsley Coman',6]]
 },
 icons:{
  GK:[['Gianluigi Buffon',9],['Iker Casillas',9],['Petr Čech',9],['Manuel Neuer',9],['Edwin van der Sar',8],
      ['Oliver Kahn',9],['José Luis Chilavert',8],['David Seaman',8]],
  DEF:[['Paolo Maldini',10],['Franco Baresi',9],['Cafu',9],['Roberto Carlos',9],['Sergio Ramos',9],
      ['Fabio Cannavaro',9],['Ashley Cole',8],['Philipp Lahm',9]],
  MID:[['Zinedine Zidane',10],['Andrea Pirlo',9],['Xavi Hernández',9],['Andrés Iniesta',9],
      ['Steven Gerrard',9],['Frank Lampard',8],['Michael Ballack',8],['Paul Scholes',8]],
  ATT:[['Pelé',10],['Diego Maradona',10],['Ronaldo Nazário',10],['Thierry Henry',9],['Ronaldinho',9],
      ['Zlatan Ibrahimović',9],['Didier Drogba',8],['Alan Shearer',8]]
 }
};
const FOOTBALL_CATS = ['GK','DEF','MID','ATT'];
const FOOTBALL_REQUIRED = {GK:1,DEF:1,MID:2,ATT:1};

const SANDWICH = {
 pool:{
  BREAD:[['Sourdough',6],['Brioche bun',7],['Rye',5],['Ciabatta',6],['White sandwich bread',3],['Whole wheat',4],['Pretzel bun',6],['Baguette',6]],
  MEAT:[['Turkey breast',5],['Roast beef',7],['Fried chicken cutlet',7],['Bacon',8],['Prosciutto',8],['Salami',6],['Pulled pork',7],['Grilled steak',8],['Ham',5],['Meatball',6]],
  CHEESE:[['Swiss',5],['Cheddar',6],['Pepper jack',6],['Provolone',5],['Mozzarella',5],['Brie',7],['Blue cheese',6],['American',4]],
  CONDIMENT:[['Mayo',4],['Mustard',4],['Ranch',5],['Sriracha mayo',6],['BBQ sauce',5],['Pesto',6],['Honey mustard',5],['Chipotle aioli',6]],
  TOPPING:[['Lettuce',3],['Tomato',4],['Red onion',3],['Pickles',4],['Avocado',7],['Caramelized onions',6],['Jalapeños',5],['Arugula',4],['Coleslaw',5],['Fried egg',6]]
 }
};
const SANDWICH_CATS = ['BREAD','MEAT','CHEESE','CONDIMENT','TOPPING'];
const SANDWICH_REQUIRED = {BREAD:1,MEAT:1,CHEESE:1,CONDIMENT:1,TOPPING:1};

const MOVIE = {
 pool:{
  GENRE:[['Sci-fi epic',8],['Romantic comedy',5],['Heist thriller',7],['Slasher horror',6],['High-fantasy adventure',8],
      ['Buddy-cop comedy',5],['Space opera',8],['Coming-of-age drama',5],['Noir detective mystery',6],
      ['Superhero origin story',6],['Post-apocalyptic survival',6],['Courtroom drama',5]],
  DIRECTOR:[['Directed by Christopher Nolan',9],['Directed by Steven Spielberg',9],['Directed by Martin Scorsese',9],
      ['Directed by Quentin Tarantino',8],['Directed by Denis Villeneuve',8],['Directed by Greta Gerwig',7],
      ['Directed by Jordan Peele',7],['Directed by Bong Joon-ho',8],['Directed by James Cameron',8],
      ['Directed by Wes Anderson',7],['Directed by Ridley Scott',7],['Directed by Taika Waititi',6],
      ['Directed by Ryan Coogler',7],['Directed by Sofia Coppola',6],['Directed by Guillermo del Toro',8]],
  ACTOR:[['Starring Robert Downey Jr.',9],['Starring George Clooney',8],['Starring Tom Holland',7],
      ['Starring Meryl Streep',9],['Starring Leonardo DiCaprio',9],['Starring Denzel Washington',9],
      ['Starring Zendaya',7],['Starring Timothée Chalamet',7],['Starring Margot Robbie',8],['Starring Brad Pitt',8],
      ['Starring Viola Davis',8],['Starring Tom Hanks',8],['Starring Florence Pugh',7],['Starring Michael B. Jordan',7],
      ['Starring Cate Blanchett',8],['Starring Ryan Gosling',7],['Starring Emma Stone',8],['Starring Dwayne Johnson',6],
      ['Starring Anya Taylor-Joy',7],['Starring Idris Elba',7],['Starring Scarlett Johansson',7],
      ['Starring Jennifer Lawrence',7],['Starring Chris Hemsworth',6],['Starring Awkwafina',6],['Starring Paul Mescal',6]],
  SETTING:[['Outer space',8],['A haunted mansion',6],['A neon-lit cyberpunk city',8],['A remote desert town',5],['A cruise ship',5],
      ['Ancient Rome',6],['A post-apocalyptic wasteland',6],['A small snowed-in cabin',5],['Deep underwater',7],
      ['A bustling 1920s speakeasy',6],['The Wild West',6],['A dystopian megacity',7]]
 }
};
const MOVIE_CATS = ['GENRE','DIRECTOR','ACTOR','SETTING'];
const MOVIE_REQUIRED = {GENRE:1,DIRECTOR:1,ACTOR:2,SETTING:1};

// Unified registry for every category-based (position-draft-style) theme.
// icons:null means no rare/legendary sub-pool for that theme (football only, for now).
const CATEGORY_THEMES = {
 football:{name:'5-a-Side Draft', emoji:'⚽', cats:FOOTBALL_CATS, required:FOOTBALL_REQUIRED, pool:FOOTBALL.pool, icons:FOOTBALL.icons,
   catLabel:{GK:'⚽ Goalkeeper',DEF:'⚽ Defender',MID:'⚽ Midfielder',ATT:'⚽ Attacker'},
   catShort:{GK:'GK',DEF:'DEF',MID:'MID',ATT:'ATT'}, resultView:'pitch'},
 sandwich:{name:'Build A Sandwich', emoji:'🥪', cats:SANDWICH_CATS, required:SANDWICH_REQUIRED, pool:SANDWICH.pool, icons:null,
   catLabel:{BREAD:'🍞 Bread',MEAT:'🥩 Meat',CHEESE:'🧀 Cheese',CONDIMENT:'🫙 Condiment',TOPPING:'🥬 Topping'},
   catShort:{BREAD:'Bread',MEAT:'Meat',CHEESE:'Cheese',CONDIMENT:'Condiment',TOPPING:'Topping'}, resultView:'list'},
 movie:{name:'Build Your Perfect Movie', emoji:'🎬', cats:MOVIE_CATS, required:MOVIE_REQUIRED, pool:MOVIE.pool, icons:null,
   catLabel:{GENRE:'🎭 Genre',DIRECTOR:'🎥 Director',ACTOR:'⭐ Actor',SETTING:'🌍 Setting'},
   catShort:{GENRE:'Genre',DIRECTOR:'Director',ACTOR:'Actor',SETTING:'Setting'}, resultView:'list'}
};

module.exports = { THEMES, FOOTBALL, FOOTBALL_CATS, FOOTBALL_REQUIRED, SANDWICH, SANDWICH_CATS, SANDWICH_REQUIRED, MOVIE, MOVIE_CATS, MOVIE_REQUIRED, CATEGORY_THEMES };
