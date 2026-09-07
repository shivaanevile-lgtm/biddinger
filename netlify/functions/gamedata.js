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
videogames:{emoji:'🎮',name:'Best Video Games',items:[
 ['The Legend of Zelda: Breath of the Wild',9],['Elden Ring',9],['Minecraft',8],['Red Dead Redemption 2',9],
 ['The Witcher 3',9],['Super Mario Odyssey',8],['Portal 2',8],['Grand Theft Auto V',8],
 ['Dark Souls',8],['Half-Life 2',8],['Tetris',7],['Fortnite',6],['Stardew Valley',7],
 ['Hollow Knight',8],['God of War',8],['Among Us',5],['Halo: Combat Evolved',8],
 ['Celeste',7],['Rocket League',7],['Animal Crossing: New Horizons',6],['Doom Eternal',7],
 ['Balatro',7]]},
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

// For a custom theme that's a PLACE you're kitting out, the interesting items
// are the things that go IN it — not variations of the place itself. This is a
// generic amenity bank (the generator is offline and can't know what a
// "treehouse" specifically contains, so these are chosen to suit any space).
const CUSTOM_SPACE_ITEMS = [
 ['A 65-inch flat-screen TV',8],['A full gaming setup',8],['A mini fridge stocked with drinks',6],
 ['String lights',4],['A zipline off the side',7],['A projector and screen',7],
 ['Surround sound speakers',6],['A bean bag pit',5],['A hammock',4],
 ['Wi-Fi that never drops',7],['Air conditioning',7],['A wood stove',6],
 ['A skylight',6],['A rope ladder',3],['A secret trapdoor entrance',7],
 ['A snack bar counter',5],['A coffee machine',5],['A record player',5],
 ['Blackout curtains',4],['Heated floors',6],['A telescope',5],
 ['A bookshelf wall',5],['Neon signage',5],['A pull-out sofa bed',5],
 ['Solar panels on the roof',6],['A pizza oven',7],['A dartboard',4],
 ['A pool table',7],['An arcade cabinet',7],['A cozy reading nook',5],
 ['Panoramic windows',7],['A hot tub',8],['A whiteboard wall',3],
 ['A drinks fridge with a glass door',6],['Motion-sensor lighting',4],
 ['A hidden storage compartment',5],['A spiral staircase',6],['A balcony',7],
 ['Bunk beds',4],['A charging station for every device',5]
];

const FOOTBALL = {
 pool:{
  GK:[['Alisson Becker',9],['Ederson',8],['Thibaut Courtois',9],['Marc-André ter Stegen',8],
      ['Gianluigi Donnarumma',8],['Emiliano Martínez',8],['Jan Oblak',8],['Mike Maignan',8],
      ['Yassine Bounou',7],['David Raya',7],['André Onana',7],['Nick Pope',7],['Bernd Leno',6],
      ['Robert Sánchez',6],['Diogo Costa',7],['Yann Sommer',7]],
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
      ['Joshua Kimmich',8],['Leon Goretzka',6],['Hakan Çalhanoğlu',8],['Henrikh Mkhitaryan',6]],
  ATT:[['Erling Haaland',10],['Kylian Mbappé',10],['Vinícius Júnior',9],['Harry Kane',9],['Mohamed Salah',9],
      ['Lautaro Martínez',8],['Victor Osimhen',8],['Ousmane Dembélé',8],['Rafael Leão',7],
      ['Khvicha Kvaratskhelia',8],['Phil Foden',8],['Julian Álvarez',7],['Randal Kolo Muani',6],
      ['Marcus Rashford',6],['Darwin Núñez',6],['Serhou Guirassy',6],['Alexander Isak',8],
      ['Ollie Watkins',6],['Cody Gakpo',6],['Nicolas Jackson',6],['Gabriel Jesus',6],['Dušan Vlahović',6],
      ['Federico Chiesa',6],['Kingsley Coman',6],['Marcus Thuram',7]]
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
const PIZZA = {
 pool:{
  CRUST:[['Neapolitan thin crust',8],['New York foldable slice',8],['Deep dish',7],['Stuffed crust',7],
      ['Sourdough crust',7],['Detroit-style pan',7],['Cauliflower crust',3],['Thin cracker crust',5],
      ['Garlic butter crust',6],['Wood-fired charred crust',8]],
  SAUCE:[['San Marzano tomato',8],['Garlic white sauce',7],['Spicy arrabbiata',7],['Basil pesto',7],
      ['BBQ sauce',5],['Vodka sauce',7],['Hot honey drizzle',7],['Plain canned tomato',3],
      ['Alfredo',5],['Olive oil and garlic (no sauce)',5]],
  CHEESE:[['Fresh buffalo mozzarella',9],['Low-moisture mozzarella',7],['Burrata',8],['Four-cheese blend',8],
      ['Smoked provolone',7],['Ricotta dollops',6],['Parmesan',6],['Vegan cheese',3],
      ['Extra cheese, double portion',7],['Goat cheese',6]],
  TOPPING:[['Pepperoni',8],['Italian sausage',7],['Fresh basil',6],['Prosciutto',8],['Mushrooms',6],
      ['Caramelized onions',6],['Hot soppressata',8],['Bell peppers',4],['Black olives',4],
      ['Pineapple',4],['Jalapeños',6],['Bacon',7],['Artichoke hearts',5],['Anchovies',3],
      ['Arugula',5],['Cherry tomatoes',5],['Roasted garlic',6],['Ground beef',5]]
 }
};
const PIZZA_CATS = ['CRUST','SAUCE','CHEESE','TOPPING'];
const PIZZA_REQUIRED = {CRUST:1,SAUCE:1,CHEESE:1,TOPPING:2};

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
   catShort:{GENRE:'Genre',DIRECTOR:'Director',ACTOR:'Actor',SETTING:'Setting'}, resultView:'list'},
 pizza:{name:'Build A Pizza', emoji:'🍕', cats:PIZZA_CATS, required:PIZZA_REQUIRED, pool:PIZZA.pool, icons:null,
   catLabel:{CRUST:'🥖 Crust',SAUCE:'🥫 Sauce',CHEESE:'🧀 Cheese',TOPPING:'🍅 Topping'},
   catShort:{CRUST:'Crust',SAUCE:'Sauce',CHEESE:'Cheese',TOPPING:'Topping'}, resultView:'list'}
};

// club = the side they're most associated with (current club for actives,
// peak/defining club for icons). nation = international side.
const FOOTBALL_META = {
 // --- GK pool ---
 'Alisson Becker':['Liverpool','Brazil'],
 'Ederson':['Manchester City','Brazil'],
 'Thibaut Courtois':['Real Madrid','Belgium'],
 'Marc-André ter Stegen':['Barcelona','Germany'],
 'Gianluigi Donnarumma':['Paris Saint-Germain','Italy'],
 'Emiliano Martínez':['Aston Villa','Argentina'],
 'Jan Oblak':['Atlético Madrid','Slovenia'],
 'Mike Maignan':['AC Milan','France'],
 'Yassine Bounou':['Al-Hilal','Morocco'],
 'David Raya':['Arsenal','Spain'],
 'André Onana':['Manchester United','Cameroon'],
 'Nick Pope':['Newcastle United','England'],
 'Bernd Leno':['Fulham','Germany'],
 'Robert Sánchez':['Chelsea','Spain'],
 'Diogo Costa':['Porto','Portugal'],
 'Yann Sommer':['Inter Milan','Switzerland'],
 // --- GK icons ---
 'Gianluigi Buffon':['Juventus','Italy'],
 'Iker Casillas':['Real Madrid','Spain'],
 'Petr Čech':['Chelsea','Czechia'],
 'Manuel Neuer':['Bayern Munich','Germany'],
 'Edwin van der Sar':['Manchester United','Netherlands'],
 'Oliver Kahn':['Bayern Munich','Germany'],
 'José Luis Chilavert':['Vélez Sarsfield','Paraguay'],
 'David Seaman':['Arsenal','England'],
 // --- DEF pool ---
 'Virgil van Dijk':['Liverpool','Netherlands'],
 'Rúben Dias':['Manchester City','Portugal'],
 'William Saliba':['Arsenal','France'],
 'Antonio Rüdiger':['Real Madrid','Germany'],
 'Achraf Hakimi':['Paris Saint-Germain','Morocco'],
 'Trent Alexander-Arnold':['Liverpool','England'],
 'Alphonso Davies':['Bayern Munich','Canada'],
 'Theo Hernández':['AC Milan','France'],
 'Josko Gvardiol':['Manchester City','Croatia'],
 'Kim Min-jae':['Bayern Munich','South Korea'],
 'Marquinhos':['Paris Saint-Germain','Brazil'],
 'Éder Militão':['Real Madrid','Brazil'],
 'John Stones':['Manchester City','England'],
 'Kyle Walker':['Manchester City','England'],
 'Jules Koundé':['Barcelona','France'],
 'Dayot Upamecano':['Bayern Munich','France'],
 'Manuel Akanji':['Manchester City','Switzerland'],
 'Ben White':['Arsenal','England'],
 'Cristian Romero':['Tottenham Hotspur','Argentina'],
 'Lisandro Martínez':['Manchester United','Argentina'],
 'Milan Škriniar':['Paris Saint-Germain','Slovakia'],
 'Gabriel Magalhães':['Arsenal','Brazil'],
 'Nathan Aké':['Manchester City','Netherlands'],
 'Reece James':['Chelsea','England'],
 'Alessandro Bastoni':['Inter Milan','Italy'],
 'Federico Dimarco':['Inter Milan','Italy'],
 'Nuno Mendes':['Paris Saint-Germain','Portugal'],
 'Raphaël Varane':['Manchester United','France'],
 'Pau Torres':['Aston Villa','Spain'],
 'Ronald Araújo':['Barcelona','Uruguay'],
 // --- DEF icons ---
 'Paolo Maldini':['AC Milan','Italy'],
 'Franco Baresi':['AC Milan','Italy'],
 'Cafu':['AC Milan','Brazil'],
 'Roberto Carlos':['Real Madrid','Brazil'],
 'Sergio Ramos':['Real Madrid','Spain'],
 'Fabio Cannavaro':['Real Madrid','Italy'],
 'Ashley Cole':['Chelsea','England'],
 'Philipp Lahm':['Bayern Munich','Germany'],
 // --- MID pool ---
 'Kevin De Bruyne':['Manchester City','Belgium'],
 'Jude Bellingham':['Real Madrid','England'],
 'Rodri':['Manchester City','Spain'],
 'Bukayo Saka':['Arsenal','England'],
 'Pedri':['Barcelona','Spain'],
 'Gavi':['Barcelona','Spain'],
 'Federico Valverde':['Real Madrid','Uruguay'],
 'Martin Ødegaard':['Arsenal','Norway'],
 'Bruno Fernandes':['Manchester United','Portugal'],
 'Declan Rice':['Arsenal','England'],
 'Vitinha':['Paris Saint-Germain','Portugal'],
 'Frenkie de Jong':['Barcelona','Netherlands'],
 'Jamal Musiala':['Bayern Munich','Germany'],
 'Florian Wirtz':['Bayer Leverkusen','Germany'],
 'Enzo Fernández':['Chelsea','Argentina'],
 'Moisés Caicedo':['Chelsea','Ecuador'],
 'Alexis Mac Allister':['Liverpool','Argentina'],
 'Aurélien Tchouaméni':['Real Madrid','France'],
 'Eduardo Camavinga':['Real Madrid','France'],
 'Nicolò Barella':['Inter Milan','Italy'],
 'Sandro Tonali':['Newcastle United','Italy'],
 'Ismaël Bennacer':['AC Milan','Algeria'],
 'Fabián Ruiz':['Paris Saint-Germain','Spain'],
 'Marco Verratti':['Paris Saint-Germain','Italy'],
 'İlkay Gündoğan':['Barcelona','Germany'],
 'Casemiro':['Manchester United','Brazil'],
 'Christian Eriksen':['Manchester United','Denmark'],
 'Dominik Szoboszlai':['Liverpool','Hungary'],
 'Joshua Kimmich':['Bayern Munich','Germany'],
 'Leon Goretzka':['Bayern Munich','Germany'],
 'Hakan Çalhanoğlu':['Inter Milan','Turkey'],
 'Henrikh Mkhitaryan':['Inter Milan','Armenia'],
 // --- MID icons ---
 'Zinedine Zidane':['Real Madrid','France'],
 'Andrea Pirlo':['AC Milan','Italy'],
 'Xavi Hernández':['Barcelona','Spain'],
 'Andrés Iniesta':['Barcelona','Spain'],
 'Steven Gerrard':['Liverpool','England'],
 'Frank Lampard':['Chelsea','England'],
 'Michael Ballack':['Bayern Munich','Germany'],
 'Paul Scholes':['Manchester United','England'],
 // --- ATT pool ---
 'Erling Haaland':['Manchester City','Norway'],
 'Kylian Mbappé':['Real Madrid','France'],
 'Vinícius Júnior':['Real Madrid','Brazil'],
 'Harry Kane':['Bayern Munich','England'],
 'Mohamed Salah':['Liverpool','Egypt'],
 'Lautaro Martínez':['Inter Milan','Argentina'],
 'Victor Osimhen':['Napoli','Nigeria'],
 'Ousmane Dembélé':['Paris Saint-Germain','France'],
 'Rafael Leão':['AC Milan','Portugal'],
 'Khvicha Kvaratskhelia':['Napoli','Georgia'],
 'Phil Foden':['Manchester City','England'],
 'Julian Álvarez':['Atlético Madrid','Argentina'],
 'Randal Kolo Muani':['Paris Saint-Germain','France'],
 'Marcus Rashford':['Manchester United','England'],
 'Darwin Núñez':['Liverpool','Uruguay'],
 'Serhou Guirassy':['Borussia Dortmund','Guinea'],
 'Alexander Isak':['Newcastle United','Sweden'],
 'Ollie Watkins':['Aston Villa','England'],
 'Cody Gakpo':['Liverpool','Netherlands'],
 'Nicolas Jackson':['Chelsea','Senegal'],
 'Gabriel Jesus':['Arsenal','Brazil'],
 'Dušan Vlahović':['Juventus','Serbia'],
 'Federico Chiesa':['Liverpool','Italy'],
 'Kingsley Coman':['Bayern Munich','France'],
 'Marcus Thuram':['Inter Milan','France'],
 // --- ATT icons ---
 'Pelé':['Santos','Brazil'],
 'Diego Maradona':['Napoli','Argentina'],
 'Ronaldo Nazário':['Real Madrid','Brazil'],
 'Thierry Henry':['Arsenal','France'],
 'Ronaldinho':['Barcelona','Brazil'],
 'Zlatan Ibrahimović':['AC Milan','Sweden'],
 'Didier Drogba':['Chelsea','Ivory Coast'],
 'Alan Shearer':['Newcastle United','England']
};

// Club legends, used ONLY by the rivalry drafts so they play as all-time
// squads. The standard 5-a-side draft keeps its current-players-plus-rare-
// icons pool untouched.
const FOOTBALL_LEGENDS = {
 GK:[
  ['Santiago Cañizares',8],['Claudio Bravo',7],['Víctor Valdés',8],['Peter Schmeichel',9],
  ['Joe Hart',7],['Dino Zoff',9],['Walter Zenga',8],['Julio César',8],['David de Gea',8],
  ['Jens Lehmann',8],['Hugo Lloris',8],['Thibaut Courtois',9]
 ],
 DEF:[
  ['Carles Puyol',9],['Gerard Piqué',8],['Dani Alves',9],['Éric Abidal',8],
  ['Fernando Hierro',8],['Michel Salgado',7],['Marcelo',9],['Pepe',8],
  ['Rio Ferdinand',9],['Nemanja Vidić',9],['Gary Neville',8],['Denis Irwin',8],
  ['Vincent Kompany',9],['Pablo Zabaleta',8],['Alessandro Nesta',9],['Javier Zanetti',9],
  ['Marco Materazzi',7],['Tony Adams',8],['Lauren',7],['John Terry',8],['Branislav Ivanović',7],
  ['Ledley King',8],['Kyle Naughton',5]
 ],
 MID:[
  ['Luka Modrić',9],['Guti',7],['Claude Makélélé',8],['Sergio Busquets',9],
  ['Deco',8],['Rivaldo',9],['Paul Pogba',7],['Roy Keane',9],['Ryan Giggs',9],
  ['David Silva',9],['Yaya Touré',9],['Clarence Seedorf',9],['Gennaro Gattuso',8],
  ['Kaká',9],['Esteban Cambiasso',8],['Wesley Sneijder',8],['Patrick Vieira',9],
  ['Robert Pirès',8],['Cesc Fàbregas',8],['Michael Essien',8],['Eden Hazard',9],
  ['Luka Modric',8],['Rafael van der Vaart',7],['Mousa Dembélé',7]
 ],
 ATT:[
  ['Raúl',9],['Cristiano Ronaldo',10],['Karim Benzema',9],['Alfredo Di Stéfano',10],
  ['Lionel Messi',10],['Samuel Eto\'o',9],['Luis Suárez',9],['Neymar',9],
  ['Wayne Rooney',9],['Eric Cantona',9],['Ruud van Nistelrooy',9],['Andy Cole',8],
  ['Sergio Agüero',10],['Carlos Tevez',8],['Andriy Shevchenko',9],['Marco van Basten',10],
  ['Filippo Inzaghi',8],['Ronaldo Nazário',10],['Diego Milito',8],['Dennis Bergkamp',9],
  ['Ian Wright',8],['Frank Lampard',9],['Gianfranco Zola',8],['Harry Kane',9],
  ['Gareth Bale',9],['Jürgen Klinsmann',8]
 ]
};

// club + nation for every legend above
const FOOTBALL_LEGEND_META = {
 'Santiago Cañizares':['Real Madrid','Spain'],'Claudio Bravo':['Barcelona','Chile'],
 'Víctor Valdés':['Barcelona','Spain'],'Peter Schmeichel':['Manchester United','Denmark'],
 'Joe Hart':['Manchester City','England'],'Dino Zoff':['Inter Milan','Italy'],
 'Walter Zenga':['Inter Milan','Italy'],'Julio César':['Inter Milan','Brazil'],
 'David de Gea':['Manchester United','Spain'],'Jens Lehmann':['Arsenal','Germany'],
 'Hugo Lloris':['Tottenham Hotspur','France'],
 'Carles Puyol':['Barcelona','Spain'],'Gerard Piqué':['Barcelona','Spain'],
 'Dani Alves':['Barcelona','Brazil'],'Éric Abidal':['Barcelona','France'],
 'Fernando Hierro':['Real Madrid','Spain'],'Michel Salgado':['Real Madrid','Spain'],
 'Marcelo':['Real Madrid','Brazil'],'Pepe':['Real Madrid','Portugal'],
 'Rio Ferdinand':['Manchester United','England'],'Nemanja Vidić':['Manchester United','Serbia'],
 'Gary Neville':['Manchester United','England'],'Denis Irwin':['Manchester United','Ireland'],
 'Vincent Kompany':['Manchester City','Belgium'],'Pablo Zabaleta':['Manchester City','Argentina'],
 'Alessandro Nesta':['AC Milan','Italy'],'Javier Zanetti':['Inter Milan','Argentina'],
 'Marco Materazzi':['Inter Milan','Italy'],'Tony Adams':['Arsenal','England'],
 'Lauren':['Arsenal','Cameroon'],'John Terry':['Chelsea','England'],
 'Branislav Ivanović':['Chelsea','Serbia'],'Ledley King':['Tottenham Hotspur','England'],
 'Kyle Naughton':['Tottenham Hotspur','England'],
 'Luka Modrić':['Real Madrid','Croatia'],'Guti':['Real Madrid','Spain'],
 'Claude Makélélé':['Real Madrid','France'],'Sergio Busquets':['Barcelona','Spain'],
 'Deco':['Barcelona','Portugal'],'Rivaldo':['Barcelona','Brazil'],
 'Paul Pogba':['Manchester United','France'],'Roy Keane':['Manchester United','Ireland'],
 'Ryan Giggs':['Manchester United','Wales'],'David Silva':['Manchester City','Spain'],
 'Yaya Touré':['Manchester City','Ivory Coast'],'Clarence Seedorf':['AC Milan','Netherlands'],
 'Gennaro Gattuso':['AC Milan','Italy'],'Kaká':['AC Milan','Brazil'],
 'Esteban Cambiasso':['Inter Milan','Argentina'],'Wesley Sneijder':['Inter Milan','Netherlands'],
 'Patrick Vieira':['Arsenal','France'],'Robert Pirès':['Arsenal','France'],
 'Cesc Fàbregas':['Arsenal','Spain'],'Michael Essien':['Chelsea','Ghana'],
 'Eden Hazard':['Chelsea','Belgium'],'Luka Modric':['Tottenham Hotspur','Croatia'],
 'Rafael van der Vaart':['Tottenham Hotspur','Netherlands'],'Mousa Dembélé':['Tottenham Hotspur','Belgium'],
 'Raúl':['Real Madrid','Spain'],'Cristiano Ronaldo':['Real Madrid','Portugal'],
 'Karim Benzema':['Real Madrid','France'],'Alfredo Di Stéfano':['Real Madrid','Argentina'],
 'Lionel Messi':['Barcelona','Argentina'],"Samuel Eto'o":['Barcelona','Cameroon'],
 'Luis Suárez':['Barcelona','Uruguay'],'Neymar':['Barcelona','Brazil'],
 'Wayne Rooney':['Manchester United','England'],'Eric Cantona':['Manchester United','France'],
 'Ruud van Nistelrooy':['Manchester United','Netherlands'],'Andy Cole':['Manchester United','England'],
 'Sergio Agüero':['Manchester City','Argentina'],'Carlos Tevez':['Manchester City','Argentina'],
 'Andriy Shevchenko':['AC Milan','Ukraine'],'Marco van Basten':['AC Milan','Netherlands'],
 'Filippo Inzaghi':['AC Milan','Italy'],'Diego Milito':['Inter Milan','Argentina'],
 'Dennis Bergkamp':['Arsenal','Netherlands'],'Ian Wright':['Arsenal','England'],
 'Gianfranco Zola':['Chelsea','Italy'],'Gareth Bale':['Tottenham Hotspur','Wales'],
 'Jürgen Klinsmann':['Tottenham Hotspur','Germany']
};

// Kit colours for the jersey rendering on the results pitch.
// [primary, secondary, stripe?]
const CLUB_KITS = {
 'Real Madrid':['#FFFFFF','#00529F',false],
 'Barcelona':['#A50044','#004D98',true],
 'Manchester City':['#6CABDD','#1C2C5B',false],
 'Manchester United':['#DA291C','#000000',false],
 'AC Milan':['#FB090B','#000000',true],
 'Inter Milan':['#0068A8','#000000',true],
 'Arsenal':['#EF0107','#FFFFFF',false],
 'Chelsea':['#034694','#FFFFFF',false],
 'Tottenham Hotspur':['#FFFFFF','#132257',false],
 'Liverpool':['#C8102E','#00B2A9',false],
 'Bayern Munich':['#DC052D','#0066B2',false],
 'Paris Saint-Germain':['#004170','#DA291C',false],
 'Juventus':['#FFFFFF','#000000',true],
 'Napoli':['#12A0D7','#FFFFFF',false],
 'Atlético Madrid':['#CB3524','#FFFFFF',true],
 'Newcastle United':['#241F20','#FFFFFF',true],
 'Aston Villa':['#95BFE5','#670E36',false],
 'Borussia Dortmund':['#FDE100','#000000',false],
 'Bayer Leverkusen':['#E32221','#000000',false],
 'Porto':['#00428C','#FFFFFF',true],
 'Fulham':['#FFFFFF','#000000',false],
 'Al-Hilal':['#0E4CFD','#FFFFFF',false],
 'Santos':['#FFFFFF','#000000',false],
 'Vélez Sarsfield':['#FFFFFF','#0B4EA2',false]
};
function kitFor(name){
  const club = clubOf(name);
  return (club && CLUB_KITS[club]) || ['#F5EFE3','#2B2620',false];
}

// Rivalry drafts: same engine as the 5-a-side draft, but the pool is limited
// to two rival clubs. Built programmatically from FOOTBALL_META so they stay
// in sync with the player pool automatically.
const RIVALRIES = {
  rivals_clasico:   { name:'El Clásico Draft',      emoji:'⚡', clubs:['Real Madrid','Barcelona'] },
  rivals_manchester:{ name:'Manchester Derby Draft',emoji:'⚡', clubs:['Manchester City','Manchester United'] },
  rivals_milan:     { name:'Milan Derby Draft',     emoji:'⚡', clubs:['AC Milan','Inter Milan'] },
  rivals_london:    { name:'London Derby Draft',    emoji:'⚡', clubs:['Arsenal','Chelsea','Tottenham Hotspur'] }
};
function buildRivalryPool(clubs){
  const pool = {};
  FOOTBALL_CATS.forEach(cat => {
    const all = (FOOTBALL.pool[cat]||[])
      .concat(FOOTBALL.icons[cat]||[])
      .concat(FOOTBALL_LEGENDS[cat]||[]);
    const seen = {};
    pool[cat] = all.filter(p => {
      if (seen[p[0]]) return false;            // a few names appear in both banks
      const m = FOOTBALL_META[p[0]] || FOOTBALL_LEGEND_META[p[0]];
      if (!m || clubs.indexOf(m[0]) === -1) return false;
      seen[p[0]] = true;
      return true;
    }).map(p => [p[0], p[1]]);
  });
  return pool;
}

Object.keys(RIVALRIES).forEach(key => {
  const rv = RIVALRIES[key];
  CATEGORY_THEMES[key] = {
    name: rv.name, emoji: rv.emoji, cats: FOOTBALL_CATS, required: FOOTBALL_REQUIRED,
    pool: buildRivalryPool(rv.clubs), icons: null, rivalClubs: rv.clubs,
    catLabel:{GK:'⚽ Goalkeeper',DEF:'⚽ Defender',MID:'⚽ Midfielder',ATT:'⚽ Attacker'},
    catShort:{GK:'GK',DEF:'DEF',MID:'MID',ATT:'ATT'}, resultView:'pitch'
  };
});

/* Stable numeric IDs. Assigned once in a fixed traversal order so the client
   and the server always agree on which number means which item. */
const ITEM_BY_ID = {};
const ID_BY_NAME = {};
(function assignItemIds(){
  let n = 0;
  const add = (name, r, themeKey, cat) => {
    n++;
    ITEM_BY_ID[n] = { id:n, name, r, themeKey, cat };
    ID_BY_NAME[themeKey + '|' + name] = n;
  };
  Object.keys(THEMES).forEach(k => THEMES[k].items.forEach(it => add(it[0], it[1], k, null)));
  Object.keys(CATEGORY_THEMES).forEach(k => {
    const t = CATEGORY_THEMES[k];
    t.cats.forEach(c => {
      (t.pool[c]||[]).forEach(it => add(it[0], it[1], k, c));
      if (t.icons && t.icons[c]) t.icons[c].forEach(it => add(it[0], it[1], k, c));
    });
  });
})();
function itemIdFor(name, themeKey){ return ID_BY_NAME[themeKey + '|' + name]; }
function footballMeta(name){ return FOOTBALL_META[name] || FOOTBALL_LEGEND_META[name] || null; }
function clubOf(name){ const m = footballMeta(name); return m ? m[0] : null; }
function nationOf(name){ const m = footballMeta(name); return m ? m[1] : null; }
function itemById(id){ return ITEM_BY_ID[parseInt(id,10)]; }
/* END GAME DATA */

module.exports = { THEMES, FOOTBALL, FOOTBALL_META, FOOTBALL_LEGENDS, FOOTBALL_LEGEND_META, CLUB_KITS, kitFor, FOOTBALL_CATS, FOOTBALL_REQUIRED, SANDWICH, SANDWICH_CATS, SANDWICH_REQUIRED, MOVIE, MOVIE_CATS, MOVIE_REQUIRED, PIZZA, PIZZA_CATS, PIZZA_REQUIRED, RIVALRIES, CATEGORY_THEMES, ITEM_BY_ID, ID_BY_NAME, itemIdFor, itemById, clubOf, nationOf };
