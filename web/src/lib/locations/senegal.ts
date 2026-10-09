/**
 * Seed / fallback référentiel villes · quartiers Sénégal.
 * Sources : Vie-Publique.sn (RGPH 2023), Wikipedia dépts Dakar/Pikine/…,
 * thesaurus commercial EverGreen (`dossier/annexes/cartes/quartiers.csv`).
 * Runtime source of truth = tables Prisma City / Quartier (admin-editable).
 */

import {
  filterCityNames,
  filterQuartierEntries,
} from "@/lib/locations/filter";

export type QuartierEntry = {
  name: string;
  city: string;
  aliases?: string[];
};

export const SENEGAL_CITIES: string[] = [
  "Dakar",
  "Pikine",
  "Guédiawaye",
  "Rufisque",
  "Keur Massar",
  "Thiès",
  "Mbour",
  "Saly",
  "Tivaouane",
  "Khombole",
  "Pout",
  "Joal-Fadiouth",
  "Ngaparou",
  "Somone",
  "Popenguine",
  "Nguékhokh",
  "Diamniadio",
  "Saint-Louis",
  "Kaolack",
  "Ziguinchor",
  "Tambacounda",
  "Louga",
  "Diourbel",
  "Fatick",
  "Kolda",
  "Matam",
  "Kaffrine",
  "Kédougou",
  "Sédhiou",
  "Touba",
  "Mbacké",
  "Bargny",
  "Bambilor",
  "Sébikotane",
  "Richard-Toll",
  "Dagana",
  "Podor",
  "Linguère",
  "Kébémer",
  "Nioro du Rip",
  "Guinguinéo",
  "Foundiougne",
  "Gossas",
  "Bambey",
  "Vélingara",
  "Bignona",
  "Oussouye",
  "Goudomp",
  "Bounkiling",
  "Bakel",
  "Goudiry",
  "Koungheul",
  "Koumpentoum",
  "Birkelane",
  "Malem Hoddar",
  "Kanel",
  "Ranérou",
  "Salémata",
  "Saraya",
  "Médina Yoro Foulah",
].sort((a, b) => a.localeCompare(b, "fr"));

export const SENEGAL_QUARTIERS: QuartierEntry[] = [
  { name: "Almadies", city: "Dakar", aliases: ["les almadies"] },
  { name: "Ngor", city: "Dakar" },
  { name: "Virage", city: "Dakar" },
  { name: "Ouakam", city: "Dakar" },
  { name: "Mamelles", city: "Dakar", aliases: ["les mamelles"] },
  { name: "Yoff", city: "Dakar" },
  { name: "Mermoz", city: "Dakar", aliases: ["mermoz-sacre-coeur"] },
  {
    name: "Sacré-Cœur",
    city: "Dakar",
    aliases: ["sacre-coeur", "sacre coeur", "mermoz-sacré-cœur"],
  },
  { name: "Point E", city: "Dakar", aliases: ["point-e", "pointe"] },
  { name: "Fann", city: "Dakar", aliases: ["fann-point e-amitié"] },
  { name: "Amitié", city: "Dakar" },
  { name: "Plateau", city: "Dakar", aliases: ["dakar-plateau"] },
  { name: "Médina", city: "Dakar", aliases: ["medina"] },
  {
    name: "Gueule Tapée",
    city: "Dakar",
    aliases: ["gueule tapee-fass-colobane", "fass", "colobane"],
  },
  { name: "Fass", city: "Dakar" },
  { name: "Colobane", city: "Dakar" },
  { name: "Gorée", city: "Dakar", aliases: ["goree"] },
  { name: "Grand Dakar", city: "Dakar" },
  { name: "Biscuiterie", city: "Dakar" },
  {
    name: "Dieuppeul-Derklé",
    city: "Dakar",
    aliases: ["dieuppeul", "derkle", "derklé"],
  },
  { name: "HLM", city: "Dakar", aliases: ["h.l.m", "hlm grand dakar"] },
  {
    name: "Hann Bel-Air",
    city: "Dakar",
    aliases: ["hann-bel air", "hann", "bel-air"],
  },
  {
    name: "Sicap-Liberté",
    city: "Dakar",
    aliases: ["sicap", "liberte", "liberté", "sicap liberte"],
  },
  { name: "Liberté 6", city: "Dakar", aliases: ["liberte 6"] },
  { name: "Grand Yoff", city: "Dakar" },
  {
    name: "Parcelles Assainies",
    city: "Dakar",
    aliases: ["parcelles", "pa"],
  },
  { name: "Patte d'Oie", city: "Dakar", aliases: ["patte d oie"] },
  { name: "Cambérène", city: "Dakar", aliases: ["camberene"] },
  { name: "Pikine Est", city: "Pikine" },
  { name: "Pikine Nord", city: "Pikine" },
  { name: "Pikine Ouest", city: "Pikine" },
  { name: "Dalifort", city: "Pikine" },
  {
    name: "Djidah Thiaroye Kao",
    city: "Pikine",
    aliases: ["djidah thiaroye kaw"],
  },
  { name: "Guinaw Rail Nord", city: "Pikine" },
  { name: "Guinaw Rail Sud", city: "Pikine" },
  { name: "Thiaroye Gare", city: "Pikine" },
  { name: "Thiaroye-sur-Mer", city: "Pikine", aliases: ["thiaroye sur mer"] },
  {
    name: "Tivaouane Diacksao",
    city: "Pikine",
    aliases: ["tivaouane-diacksao"],
  },
  {
    name: "Diamaguène Sicap Mbao",
    city: "Pikine",
    aliases: ["diamagueune-sicap mbao", "sicap mbao"],
  },
  { name: "Mbao", city: "Pikine" },
  { name: "Golf Sud", city: "Guédiawaye", aliases: ["golf sud"] },
  { name: "Médina Gounass", city: "Guédiawaye", aliases: ["medina gounass"] },
  {
    name: "Ndiarème Limamoulaye",
    city: "Guédiawaye",
    aliases: ["ndiareme", "ndiárème"],
  },
  { name: "Sam Notaire", city: "Guédiawaye" },
  { name: "Wakhinane Nimzatt", city: "Guédiawaye", aliases: ["wakhinane"] },
  { name: "Keur Massar Nord", city: "Keur Massar" },
  { name: "Keur Massar Sud", city: "Keur Massar" },
  { name: "Jaxaay-Parcelles", city: "Keur Massar", aliases: ["jaxaay"] },
  { name: "Malika", city: "Keur Massar" },
  { name: "Yeumbeul Nord", city: "Keur Massar", aliases: ["yeumbeul"] },
  { name: "Yeumbeul Sud", city: "Keur Massar" },
  { name: "Rufisque Est", city: "Rufisque" },
  { name: "Rufisque Nord", city: "Rufisque" },
  { name: "Rufisque Ouest", city: "Rufisque" },
  { name: "Bambilor", city: "Rufisque", aliases: ["bambylor"] },
  { name: "Bargny", city: "Rufisque" },
  { name: "Diamniadio", city: "Rufisque" },
  { name: "Sangalkam", city: "Rufisque" },
  { name: "Sébikotane", city: "Rufisque", aliases: ["sebikotane"] },
  { name: "Sendou", city: "Rufisque" },
  {
    name: "Tivaouane Peulh-Niaga",
    city: "Rufisque",
    aliases: ["tivaouane peulh-niagha", "niaga"],
  },
  { name: "Yenne", city: "Rufisque", aliases: ["yène"] },
  { name: "Thiès Est", city: "Thiès", aliases: ["thies est"] },
  { name: "Thiès Nord", city: "Thiès", aliases: ["thies nord"] },
  { name: "Thiès Ouest", city: "Thiès", aliases: ["thies ouest"] },
  { name: "Pout", city: "Thiès" },
  { name: "Kayar", city: "Thiès" },
  { name: "Keur Moussa", city: "Thiès" },
  { name: "Saly Portudal", city: "Mbour", aliases: ["saly"] },
  { name: "Ngaparou", city: "Mbour" },
  { name: "Somone", city: "Mbour" },
  { name: "Popenguine", city: "Mbour", aliases: ["popenguine-ndayane"] },
  { name: "Joal-Fadiouth", city: "Mbour", aliases: ["joal", "fadiouth"] },
  { name: "Nguékhokh", city: "Mbour", aliases: ["nguekhokh"] },
  { name: "Malicounda", city: "Mbour" },
  { name: "Sindia", city: "Mbour" },
  { name: "Diass", city: "Mbour" },
  { name: "Thiadiaye", city: "Mbour" },
  { name: "Saly Portudal", city: "Saly", aliases: ["centre", "saly nord"] },
  { name: "Ngaparou", city: "Saly" },
  { name: "Somone", city: "Saly" },
];

/** Fallback filters (static seed) — prefer DB-backed lists in UI. */
export function filterCities(query: string, limit = 12): string[] {
  return filterCityNames(SENEGAL_CITIES, query, limit);
}

export function filterQuartiers(
  query: string,
  city?: string | null,
  limit = 12,
): QuartierEntry[] {
  return filterQuartierEntries(SENEGAL_QUARTIERS, query, city, limit);
}

export function quartiersForCity(city?: string | null): QuartierEntry[] {
  return filterQuartierEntries(SENEGAL_QUARTIERS, "", city, 500);
}
