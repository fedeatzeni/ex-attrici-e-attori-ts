// Milestone 1
// Crea un type alias Person per rappresentare una persona generica.

// Il tipo deve includere le seguenti proprietà:

// id: numero identificativo, non modificabile
// name: nome completo, stringa non modificabile
// birth_year: anno di nascita, numero
// death_year: anno di morte, numero opzionale
// biography: breve biografia, stringa
// image: URL dell'immagine, stringa

type Person = {
	readonly id: number,
	readonly name: string,
	birth_year: number,
	death_year?: number,
	biography: string,
	image: string
}

// Milestone 2
// Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

// most_famous_movies: una tuple di 3 stringhe
// awards: una stringa
// nationality: una stringa tra un insieme definito di valori.
// Le nazionalità accettate sono: American, British, Australian, Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese.

type Actress = Person & {
	most_famous_movies: [string, string, string],
	awards: string,
	nationality: "American" | "British" | "Australian" | "Israeli-American" | "South-African" | "French" | "Indian" | "Israeli" | "Spanish" | "South-Korean" | "Chinese"
}

// Milestone 3
// Crea una funzione getActress che, dato un id, effettua una chiamata a:

// GET /actresses/:id
// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

function isActress(data: unknown): data is Actress {
	return (
		typeof data === "object" && data !== null &&
		"id" in data && typeof data.id === "number" && // id 
		"birth_year" in data && typeof data.birth_year === "number" && //birth_year
		"death_year" in data && typeof data.death_year === "number" && //death_year
		"biography" in data && typeof data.biography === "string" && //biography
		"image" in data && typeof data.image === "string" && //image
		"most_famous_movies" in data &&
		data.most_famous_movies instanceof Array &&
		data.most_famous_movies.length === 3 &&
		data.most_famous_movies.every(el => typeof el === "string") &&
		"awards" in data && typeof data.awards === "string" && //awards
		"nationality" in data && typeof data.nationality === "string"  //nationality
	)
}

async function getActress(id: number): Promise<Actress | null> {
	try {
		const response = await fetch(`http://localhost:3333/actresses/${id}`)
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (!isActress(dati)) throw new Error("Errore nei dati")
		// console.log(dati);
		return dati
	}
	catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("Errore sconosciuto:", error);
		}
		return null;
	}
}

getActress(2)