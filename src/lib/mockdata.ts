export type Movie = {
  id: number;
  title: string;
  media: "movie" | "tv";
  year: number;
  genre: string[];
  rating: number;
  duration: string;
  description: string;
  poster: string;
};

const movieData: Omit<Movie, "media">[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    duration: "2h 22m",
    description:
      "Two imprisoned men bond over years, finding hope and redemption amid the brutality of prison life.",
    poster:
      "https://placehold.co/300x450/111827/ffffff?text=The+Shawshank+Redemption",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    rating: 9.2,
    duration: "2h 55m",
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    poster: "https://placehold.co/300x450/3b2f2f/ffffff?text=The+Godfather",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: "2h 32m",
    description:
      "Batman faces the Joker in a battle that tests justice, chaos, and the soul of Gotham.",
    poster: "https://placehold.co/300x450/1f2937/ffffff?text=The+Dark+Knight",
  },
  {
    id: 4,
    title: "The Godfather Part II",
    year: 1974,
    genre: ["Crime", "Drama"],
    rating: 9.0,
    duration: "3h 22m",
    description:
      "The early life and career of Vito Corleone and the continuing story of Michael Corleone unfold in parallel.",
    poster: "https://placehold.co/300x450/4b2e2c/ffffff?text=Godfather+II",
  },
  {
    id: 5,
    title: "12 Angry Men",
    year: 1957,
    genre: ["Drama"],
    rating: 9.0,
    duration: "1h 36m",
    description:
      "A jury deliberates a murder case and slowly uncovers the truth behind a single reasonable doubt.",
    poster: "https://placehold.co/300x450/374151/ffffff?text=12+Angry+Men",
  },
  {
    id: 6,
    title: "Schindler's List",
    year: 1993,
    genre: ["Biography", "Drama", "History"],
    rating: 9.0,
    duration: "3h 15m",
    description:
      "A German industrialist saves more than a thousand Polish Jews during the Holocaust by employing them in his factories.",
    poster:
      "https://placehold.co/300x450/1f2937/ffffff?text=Schindler%27s+List",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.9,
    duration: "3h 21m",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron while Frodo and Sam continue toward Mordor.",
    poster:
      "https://placehold.co/300x450/3f3f46/ffffff?text=LOTR+Return+of+the+King",
  },
  {
    id: 8,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    duration: "2h 34m",
    description:
      "A crime epic interweaving hitmen, a boxer, a gangster, and a briefcase of mystery.",
    poster: "https://placehold.co/300x450/0f172a/ffffff?text=Pulp+Fiction",
  },
  {
    id: 9,
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    genre: ["Western"],
    rating: 8.8,
    duration: "2h 58m",
    description:
      "Three gunslingers compete to find a buried fortune in a tense, dusty showdown.",
    poster: "https://placehold.co/300x450/4b5563/ffffff?text=Good+Bad+Ugly",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.8,
    duration: "2h 58m",
    description:
      "A hobbit sets out on a long journey to destroy the One Ring and save Middle-earth.",
    poster:
      "https://placehold.co/300x450/374151/ffffff?text=Fellowship+of+the+Ring",
  },
  {
    id: 11,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    duration: "2h 22m",
    description:
      "A man with a low IQ leads an extraordinary life through pivotal moments in American history.",
    poster: "https://placehold.co/300x450/1d4ed8/ffffff?text=Forrest+Gump",
  },
  {
    id: 12,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
    genre: ["Action", "Adventure", "Fantasy"],
    rating: 8.7,
    duration: "2h 4m",
    description:
      "Luke trains with Yoda while Darth Vader hunts down the Rebel Alliance and the Jedi.",
    poster:
      "https://placehold.co/300x450/111827/ffffff?text=Empire+Strikes+Back",
  },
  {
    id: 13,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: "2h 28m",
    description:
      "A thief steals secrets by entering dreams and must plant an idea in a target’s subconscious.",
    poster: "https://placehold.co/300x450/0f172a/ffffff?text=Inception",
  },
  {
    id: 14,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    duration: "2h 16m",
    description:
      "A hacker discovers reality is a simulation and joins a rebellion against the machines.",
    poster: "https://placehold.co/300x450/111827/ffffff?text=The+Matrix",
  },
  {
    id: 15,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    duration: "2h 25m",
    description:
      "The rise and fall of Henry Hill in the New York mob world is narrated with brutal honesty.",
    poster: "https://placehold.co/300x450/7c2d12/ffffff?text=Goodfellas",
  },
  {
    id: 16,
    title: "One Flew Over the Cuckoo's Nest",
    year: 1975,
    genre: ["Drama"],
    rating: 8.7,
    duration: "2h 13m",
    description:
      "A rebellious patient challenges the authority of a controlling psychiatric institution.",
    poster: "https://placehold.co/300x450/1f2937/ffffff?text=Cuckoo%27s+Nest",
  },
  {
    id: 17,
    title: "Se7en",
    year: 1995,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    duration: "2h 7m",
    description:
      "Two detectives pursue a serial killer who murders according to the seven deadly sins.",
    poster: "https://placehold.co/300x450/1f2937/ffffff?text=Se7en",
  },
  {
    id: 18,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.7,
    duration: "2h 49m",
    description:
      "A team of explorers ventures through a wormhole in search of a new home for humanity.",
    poster: "https://placehold.co/300x450/0f172a/ffffff?text=Interstellar",
  },
  {
    id: 19,
    title: "Spirited Away",
    year: 2001,
    genre: ["Animation", "Adventure", "Family"],
    rating: 8.6,
    duration: "2h 5m",
    description:
      "A young girl becomes trapped in a mysterious bathhouse world and must find a way home.",
    poster: "https://placehold.co/300x450/4338ca/ffffff?text=Spirited+Away",
  },
  {
    id: 20,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    duration: "1h 58m",
    description:
      "An FBI trainee seeks help from an imprisoned killer to catch another serial murderer.",
    poster:
      "https://placehold.co/300x450/111827/ffffff?text=Silence+of+the+Lambs",
  },
  {
    id: 21,
    title: "Saving Private Ryan",
    year: 1998,
    genre: ["Drama", "War"],
    rating: 8.6,
    duration: "2h 49m",
    description:
      "A team of soldiers is sent behind enemy lines to find and bring home one surviving brother.",
    poster:
      "https://placehold.co/300x450/7c2d12/ffffff?text=Saving+Private+Ryan",
  },
  {
    id: 22,
    title: "The Green Mile",
    year: 1999,
    genre: ["Crime", "Drama", "Fantasy"],
    rating: 8.6,
    duration: "3h 9m",
    description:
      "The miraculous powers of a death row inmate affect the lives of those around him.",
    poster: "https://placehold.co/300x450/0f766e/ffffff?text=The+Green+Mile",
  },
  {
    id: 23,
    title: "Gladiator",
    year: 2000,
    genre: ["Action", "Drama"],
    rating: 8.5,
    duration: "2h 35m",
    description:
      "A betrayed Roman general rises to power in the gladiatorial arena to avenge his family.",
    poster: "https://placehold.co/300x450/9a5f00/ffffff?text=Gladiator",
  },
  {
    id: 24,
    title: "The Prestige",
    year: 2006,
    genre: ["Drama", "Mystery", "Sci-Fi"],
    rating: 8.5,
    duration: "2h 18m",
    description:
      "Rival magicians become locked in a deadly obsession with each other and their craft.",
    poster: "https://placehold.co/300x450/111827/ffffff?text=The+Prestige",
  },
  {
    id: 25,
    title: "The Departed",
    year: 2006,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.5,
    duration: "2h 31m",
    description:
      "An undercover cop and a mole in the police force play a deadly game in Boston.",
    poster: "https://placehold.co/300x450/4b5563/ffffff?text=The+Departed",
  },
  {
    id: 26,
    title: "Memento",
    year: 2000,
    genre: ["Mystery", "Thriller"],
    rating: 8.4,
    duration: "1h 53m",
    description:
      "A man with short-term memory loss searches for his wife’s killer using notes and tattoos.",
    poster: "https://placehold.co/300x450/374151/ffffff?text=Memento",
  },
  {
    id: 27,
    title: "The Intouchables",
    year: 2011,
    genre: ["Biography", "Comedy", "Drama"],
    rating: 8.5,
    duration: "1h 52m",
    description:
      "An unlikely friendship forms between a wealthy quadriplegic and his caretaker from the projects.",
    poster: "https://placehold.co/300x450/4f46e5/ffffff?text=The+Intouchables",
  },
  {
    id: 28,
    title: "Whiplash",
    year: 2014,
    genre: ["Drama", "Music"],
    rating: 8.5,
    duration: "1h 47m",
    description:
      "A young drummer is pushed to perfection by a relentless music teacher.",
    poster: "https://placehold.co/300x450/0f172a/ffffff?text=Whiplash",
  },
  {
    id: 29,
    title: "The Lion King",
    year: 1994,
    genre: ["Animation", "Adventure", "Drama"],
    rating: 8.5,
    duration: "1h 28m",
    description:
      "A young lion prince faces betrayal and learns the responsibilities of kingship.",
    poster: "https://placehold.co/300x450/f59e0b/ffffff?text=The+Lion+King",
  },
  {
    id: 30,
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.4,
    duration: "3h 1m",
    description:
      "The Avengers assemble for a final battle to reverse the devastation caused by Thanos.",
    poster: "https://placehold.co/300x450/1d4ed8/ffffff?text=Avengers+Endgame",
  },
  {
    id: 31,
    title: "Jurassic Park",
    year: 1993,
    genre: ["Adventure", "Sci-Fi", "Thriller"],
    rating: 8.2,
    duration: "2h 7m",
    description:
      "A theme park filled with living dinosaurs turns deadly when the island’s systems fail.",
    poster: "https://placehold.co/300x450/10b981/ffffff?text=Jurassic+Park",
  },
  {
    id: 32,
    title: "Titanic",
    year: 1997,
    genre: ["Drama", "Romance"],
    rating: 7.9,
    duration: "3h 14m",
    description:
      "A romance blossoms aboard the doomed RMS Titanic as the ship heads toward its fate.",
    poster: "https://placehold.co/300x450/1d4ed8/ffffff?text=Titanic",
  },
  {
    id: 33,
    title: "The Social Network",
    year: 2010,
    genre: ["Biography", "Drama"],
    rating: 7.8,
    duration: "2h 0m",
    description:
      "The creation of Facebook unfolds through legal battles and personal betrayals.",
    poster:
      "https://placehold.co/300x450/111827/ffffff?text=The+Social+Network",
  },
  {
    id: 34,
    title: "La La Land",
    year: 2016,
    genre: ["Comedy", "Drama", "Music"],
    rating: 8.0,
    duration: "2h 8m",
    description:
      "A jazz pianist and an aspiring actress chase their artistic dreams in Los Angeles.",
    poster: "https://placehold.co/300x450/ef4444/ffffff?text=La+La+Land",
  },
  {
    id: 35,
    title: "Parasite",
    year: 2019,
    genre: ["Comedy", "Drama", "Thriller"],
    rating: 8.5,
    duration: "2h 12m",
    description:
      "A poor family schemes to infiltrate the household of a wealthy elite and alter their fortunes.",
    poster: "https://placehold.co/300x450/111827/ffffff?text=Parasite",
  },
  {
    id: 36,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.1,
    duration: "2h 0m",
    description:
      "In a post-apocalyptic wasteland, Furiosa and Max flee a tyrannical ruler in a high-speed chase.",
    poster: "https://placehold.co/300x450/f97316/ffffff?text=Mad+Max+Fury+Road",
  },
  {
    id: 37,
    title: "The Usual Suspects",
    year: 1995,
    genre: ["Crime", "Mystery", "Thriller"],
    rating: 8.5,
    duration: "1h 46m",
    description:
      "A police lineup of criminals leads investigators to a mysterious and elusive mastermind.",
    poster: "https://placehold.co/300x450/374151/ffffff?text=Usual+Suspects",
  },
  {
    id: 38,
    title: "Fight Club",
    year: 1999,
    genre: ["Drama"],
    rating: 8.8,
    duration: "2h 19m",
    description:
      "An insomniac office worker and a charismatic soap salesman form an underground fight club.",
    poster: "https://placehold.co/300x450/1f2937/ffffff?text=Fight+Club",
  },
  {
    id: 39,
    title: "The Pianist",
    year: 2002,
    genre: ["Biography", "Drama", "Music"],
    rating: 8.5,
    duration: "2h 30m",
    description:
      "A Jewish pianist hides from the Nazis in occupied Warsaw while trying to survive.",
    poster: "https://placehold.co/300x450/7c3aed/ffffff?text=The+Pianist",
  },
  {
    id: 40,
    title: "Arrival",
    year: 2016,
    genre: ["Drama", "Sci-Fi"],
    rating: 7.9,
    duration: "1h 56m",
    description:
      "A linguist works with a team of scientists to communicate with extraterrestrial visitors.",
    poster: "https://placehold.co/300x450/0ea5e9/ffffff?text=Arrival",
  },
  {
    id: 41,
    title: "No Country for Old Men",
    year: 2007,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.1,
    duration: "2h 2m",
    description:
      "A hunter stumbles upon a drug deal gone wrong and becomes the target of a relentless killer.",
    poster:
      "https://placehold.co/300x450/44403c/ffffff?text=No+Country+for+Old+Men",
  },
  {
    id: 42,
    title: "The Wolf of Wall Street",
    year: 2013,
    genre: ["Biography", "Comedy", "Crime"],
    rating: 8.2,
    duration: "3h 0m",
    description:
      "A stockbroker’s rise to wealth is fueled by fraud, excess, and a lifestyle of rapid self-destruction.",
    poster:
      "https://placehold.co/300x450/16a34a/ffffff?text=Wolf+of+Wall+Street",
  },
  {
    id: 43,
    title: "Dune",
    year: 2021,
    genre: ["Action", "Adventure", "Drama"],
    rating: 8.0,
    duration: "2h 35m",
    description:
      "A noble family’s struggle for power on a desert planet unfolds amid prophecy and political intrigue.",
    poster: "https://placehold.co/300x450/f59e0b/ffffff?text=Dune",
  },
  {
    id: 44,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: ["Adventure", "Comedy", "Drama"],
    rating: 8.1,
    duration: "1h 39m",
    description:
      "An eccentric concierge and a lobby boy get swept up in a theft and a grand romantic mystery.",
    poster:
      "https://placehold.co/300x450/eab308/ffffff?text=Grand+Budapest+Hotel",
  },
  {
    id: 45,
    title: "Inside Out",
    year: 2015,
    genre: ["Animation", "Adventure", "Comedy"],
    rating: 8.1,
    duration: "1h 35m",
    description:
      "A young girl’s emotions navigate the complexity of growing up and moving to a new city.",
    poster: "https://placehold.co/300x450/a78bfa/ffffff?text=Inside+Out",
  },
  {
    id: 46,
    title: "Coco",
    year: 2017,
    genre: ["Animation", "Adventure", "Family"],
    rating: 8.4,
    duration: "1h 45m",
    description:
      "A young musician travels to the Land of the Dead to uncover his family’s hidden history.",
    poster: "https://placehold.co/300x450/f97316/ffffff?text=Coco",
  },
  {
    id: 47,
    title: "Black Panther",
    year: 2018,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.3,
    duration: "2h 14m",
    description:
      "After his father’s death, T’Challa returns to Wakanda to assume the throne and confront threats abroad.",
    poster: "https://placehold.co/300x450/111827/ffffff?text=Black+Panther",
  },
  {
    id: 48,
    title: "Ex Machina",
    year: 2014,
    genre: ["Drama", "Sci-Fi", "Thriller"],
    rating: 7.7,
    duration: "1h 48m",
    description:
      "A programmer evaluates the intelligence of a humanoid robot and stumbles into a dangerous moral dilemma.",
    poster: "https://placehold.co/300x450/1e293b/ffffff?text=Ex+Machina",
  },
  {
    id: 49,
    title: "Moonlight",
    year: 2016,
    genre: ["Drama"],
    rating: 7.4,
    duration: "1h 51m",
    description:
      "A young Black man grows up searching for identity, love, and peace in a fractured world.",
    poster: "https://placehold.co/300x450/0f172a/ffffff?text=Moonlight",
  },
  {
    id: 50,
    title: "The Batman",
    year: 2022,
    genre: ["Action", "Crime", "Drama"],
    rating: 7.8,
    duration: "2h 56m",
    description:
      "Batman investigates a string of crimes in Gotham while confronting corruption and personal loss.",
    poster: "https://placehold.co/300x450/111827/ffffff?text=The+Batman",
  },
];

export const mockMovies: Movie[] = movieData.map((movie) => ({
  ...movie,
  media: "movie",
}));

export default mockMovies;
