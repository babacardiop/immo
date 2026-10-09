export type QuartierSeedEntry = {
  name: string;
  city: string;
  aliases?: string[];
};

/**
 * Thesaurus commercial + communes (Dakar region first).
 * Les communes admin seules (Yoff, Ouakam…) ne suffisent pas : les cités /
 * lotissements (Cité Djily Mbaye, Liberté 6…) sont ce que tape le marché.
 */
export const SENEGAL_QUARTIERS_SEED: QuartierSeedEntry[] = [
  // —— Dakar ouest / Almadies
  { name: "Almadies", city: "Dakar", aliases: ["les almadies"] },
  { name: "Ngor", city: "Dakar" },
  { name: "Virage", city: "Dakar" },
  { name: "Ouakam", city: "Dakar" },
  { name: "Mamelles", city: "Dakar", aliases: ["les mamelles"] },
  { name: "Yoff", city: "Dakar" },
  { name: "Yoff Tonghor", city: "Dakar", aliases: ["tonghor"] },
  { name: "Yoff BCEAO", city: "Dakar", aliases: ["bceao yoff"] },
  { name: "Yoff Apecsy", city: "Dakar", aliases: ["apecsy"] },
  {
    name: "Cité Djily Mbaye",
    city: "Dakar",
    aliases: ["djily mbaye", "cite djily mbaye", "djily"],
  },
  { name: "Diamalaye", city: "Dakar" },
  { name: "Nord Foire", city: "Dakar", aliases: ["foire nord"] },
  { name: "Ouest Foire", city: "Dakar", aliases: ["foire ouest"] },
  { name: "Sud Foire", city: "Dakar", aliases: ["foire sud"] },
  { name: "Foire", city: "Dakar" },

  // —— Mermoz / Sacré-Cœur / Point E
  { name: "Mermoz", city: "Dakar" },
  {
    name: "Sacré-Cœur",
    city: "Dakar",
    aliases: ["sacre-coeur", "sacre coeur"],
  },
  { name: "Sacré-Cœur 3", city: "Dakar", aliases: ["sacre-coeur 3"] },
  { name: "Point E", city: "Dakar", aliases: ["point-e"] },
  { name: "Fann", city: "Dakar" },
  { name: "Fann Hock", city: "Dakar" },
  { name: "Fann Résidence", city: "Dakar", aliases: ["fann residence"] },
  { name: "Amitié", city: "Dakar" },
  { name: "Amitié 1", city: "Dakar" },
  { name: "Amitié 2", city: "Dakar" },
  { name: "Amitié 3", city: "Dakar" },

  // —— Plateau / Médina
  { name: "Plateau", city: "Dakar", aliases: ["dakar-plateau"] },
  { name: "Médina", city: "Dakar", aliases: ["medina"] },
  { name: "Gueule Tapée", city: "Dakar", aliases: ["gueule tapee"] },
  { name: "Fass", city: "Dakar" },
  { name: "Colobane", city: "Dakar" },
  { name: "Gorée", city: "Dakar", aliases: ["goree"] },
  { name: "Rebeuss", city: "Dakar" },
  { name: "Tilène", city: "Dakar", aliases: ["tilene"] },

  // —— Grand Dakar / Sicap / Liberté
  { name: "Grand Dakar", city: "Dakar" },
  { name: "Biscuiterie", city: "Dakar" },
  { name: "Dieuppeul", city: "Dakar" },
  { name: "Derklé", city: "Dakar", aliases: ["derkle"] },
  {
    name: "Dieuppeul-Derklé",
    city: "Dakar",
    aliases: ["dieuppeul-derkle"],
  },
  { name: "HLM", city: "Dakar", aliases: ["h.l.m"] },
  { name: "HLM Grand Yoff", city: "Dakar" },
  { name: "Hann", city: "Dakar" },
  { name: "Hann Bel-Air", city: "Dakar", aliases: ["hann-bel air", "bel-air"] },
  { name: "Hann Maristes", city: "Dakar", aliases: ["maristes"] },
  { name: "Sicap-Liberté", city: "Dakar", aliases: ["sicap liberte"] },
  { name: "Sicap Baobabs", city: "Dakar", aliases: ["baobabs"] },
  { name: "Sicap Karack", city: "Dakar", aliases: ["karack"] },
  { name: "Sicap Mermoz", city: "Dakar" },
  { name: "Sicap Amitié", city: "Dakar" },
  { name: "Liberté 1", city: "Dakar", aliases: ["liberte 1"] },
  { name: "Liberté 2", city: "Dakar", aliases: ["liberte 2"] },
  { name: "Liberté 3", city: "Dakar", aliases: ["liberte 3"] },
  { name: "Liberté 4", city: "Dakar", aliases: ["liberte 4"] },
  { name: "Liberté 5", city: "Dakar", aliases: ["liberte 5"] },
  { name: "Liberté 6", city: "Dakar", aliases: ["liberte 6"] },
  {
    name: "Liberté 6 Extension",
    city: "Dakar",
    aliases: ["liberte 6 extension", "l6 extension"],
  },
  { name: "Cité Keur Gorgui", city: "Dakar", aliases: ["keur gorgui"] },
  { name: "Cité Oasis", city: "Dakar" },
  { name: "Cité Assemblée", city: "Dakar" },

  // —— Grand Yoff / Parcelles / Patte d'Oie
  { name: "Grand Yoff", city: "Dakar" },
  {
    name: "Parcelles Assainies",
    city: "Dakar",
    aliases: ["parcelles", "pa", "unité 15", "unite 15"],
  },
  { name: "Parcelles Unité 7", city: "Dakar", aliases: ["unite 7"] },
  { name: "Parcelles Unité 9", city: "Dakar", aliases: ["unite 9"] },
  { name: "Parcelles Unité 10", city: "Dakar", aliases: ["unite 10"] },
  { name: "Parcelles Unité 11", city: "Dakar", aliases: ["unite 11"] },
  { name: "Parcelles Unité 12", city: "Dakar", aliases: ["unite 12"] },
  { name: "Parcelles Unité 13", city: "Dakar", aliases: ["unite 13"] },
  { name: "Parcelles Unité 14", city: "Dakar", aliases: ["unite 14"] },
  { name: "Parcelles Unité 15", city: "Dakar", aliases: ["unite 15"] },
  { name: "Parcelles Unité 16", city: "Dakar", aliases: ["unite 16"] },
  { name: "Parcelles Unité 17", city: "Dakar", aliases: ["unite 17"] },
  { name: "Parcelles Unité 19", city: "Dakar", aliases: ["unite 19"] },
  { name: "Parcelles Unité 20", city: "Dakar", aliases: ["unite 20"] },
  { name: "Parcelles Unité 21", city: "Dakar", aliases: ["unite 21"] },
  { name: "Parcelles Unité 22", city: "Dakar", aliases: ["unite 22"] },
  { name: "Parcelles Unité 24", city: "Dakar", aliases: ["unite 24"] },
  { name: "Parcelles Unité 25", city: "Dakar", aliases: ["unite 25"] },
  { name: "Parcelles Unité 26", city: "Dakar", aliases: ["unite 26"] },
  { name: "Patte d'Oie", city: "Dakar", aliases: ["patte d oie"] },
  { name: "Cambérène", city: "Dakar", aliases: ["camberene"] },
  { name: "Cité des Eaux", city: "Dakar" },
  { name: "Cité Millionnaire", city: "Dakar" },
  { name: "VDN", city: "Dakar", aliases: ["voie de degagement nord"] },

  // —— Pikine
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
  { name: "Grand Mbao", city: "Pikine" },
  { name: "Petit Mbao", city: "Pikine" },
  { name: "Keur Massar", city: "Pikine" },

  // —— Guédiawaye
  { name: "Golf Sud", city: "Guédiawaye" },
  { name: "Médina Gounass", city: "Guédiawaye", aliases: ["medina gounass"] },
  {
    name: "Ndiarème Limamoulaye",
    city: "Guédiawaye",
    aliases: ["ndiareme"],
  },
  { name: "Sam Notaire", city: "Guédiawaye" },
  { name: "Wakhinane Nimzatt", city: "Guédiawaye", aliases: ["wakhinane"] },
  { name: "Cité Sotrac", city: "Guédiawaye" },

  // —— Keur Massar
  { name: "Keur Massar Nord", city: "Keur Massar" },
  { name: "Keur Massar Sud", city: "Keur Massar" },
  { name: "Jaxaay-Parcelles", city: "Keur Massar", aliases: ["jaxaay"] },
  { name: "Jaxaay", city: "Keur Massar" },
  { name: "Malika", city: "Keur Massar" },
  { name: "Yeumbeul Nord", city: "Keur Massar", aliases: ["yeumbeul"] },
  { name: "Yeumbeul Sud", city: "Keur Massar" },
  { name: "Niague", city: "Keur Massar" },
  { name: "Lac Rose", city: "Keur Massar", aliases: ["lac rose"] },
  { name: "Tivaouane Peulh", city: "Keur Massar" },

  // —— Rufisque / couronne
  { name: "Rufisque Est", city: "Rufisque" },
  { name: "Rufisque Nord", city: "Rufisque" },
  { name: "Rufisque Ouest", city: "Rufisque" },
  { name: "Rufisque Centre", city: "Rufisque" },
  { name: "Bambilor", city: "Rufisque", aliases: ["bambylor"] },
  { name: "Bargny", city: "Rufisque" },
  { name: "Diamniadio", city: "Rufisque" },
  { name: "Sangalkam", city: "Rufisque" },
  { name: "Sébikotane", city: "Rufisque", aliases: ["sebikotane"] },
  { name: "Sendou", city: "Rufisque" },
  {
    name: "Tivaouane Peulh-Niaga",
    city: "Rufisque",
    aliases: ["niaga"],
  },
  { name: "Yenne", city: "Rufisque", aliases: ["yène"] },
  { name: "Kounoune", city: "Rufisque" },

  // —— Thiès
  { name: "Thiès Est", city: "Thiès", aliases: ["thies est"] },
  { name: "Thiès Nord", city: "Thiès", aliases: ["thies nord"] },
  { name: "Thiès Ouest", city: "Thiès", aliases: ["thies ouest"] },
  { name: "Thiès Centre", city: "Thiès" },
  { name: "Pout", city: "Thiès" },
  { name: "Kayar", city: "Thiès" },
  { name: "Keur Moussa", city: "Thiès" },
  { name: "Mont Rolland", city: "Thiès" },

  // —— Mbour / Petite Côte
  { name: "Saly Portudal", city: "Mbour", aliases: ["saly"] },
  { name: "Saly Centre", city: "Mbour" },
  { name: "Saly Nord", city: "Mbour" },
  { name: "Ngaparou", city: "Mbour" },
  { name: "Somone", city: "Mbour" },
  { name: "Popenguine", city: "Mbour", aliases: ["popenguine-ndayane"] },
  { name: "Joal-Fadiouth", city: "Mbour", aliases: ["joal", "fadiouth"] },
  { name: "Nguékhokh", city: "Mbour", aliases: ["nguekhokh"] },
  { name: "Malicounda", city: "Mbour" },
  { name: "Sindia", city: "Mbour" },
  { name: "Diass", city: "Mbour" },
  { name: "Thiadiaye", city: "Mbour" },
  { name: "Mbour Centre", city: "Mbour" },
  { name: "Warang", city: "Mbour" },
  { name: "Ndayane", city: "Mbour" },

  // —— Saly as city
  { name: "Saly Portudal", city: "Saly", aliases: ["centre"] },
  { name: "Saly Nord", city: "Saly" },
  { name: "Ngaparou", city: "Saly" },
  { name: "Somone", city: "Saly" },

  // —— Saint-Louis
  { name: "Saint-Louis Centre", city: "Saint-Louis" },
  { name: "Sor", city: "Saint-Louis" },
  { name: "Ndar Toute", city: "Saint-Louis" },
  { name: "Hydrobase", city: "Saint-Louis" },

  // —— Touba / Mbacké
  { name: "Touba Mosquée", city: "Touba" },
  { name: "Touba Darou Minane", city: "Touba" },
  { name: "Mbacké Centre", city: "Mbacké" },

  // —— Kaolack / Ziguinchor (pôles)
  { name: "Kaolack Centre", city: "Kaolack" },
  { name: "Léona", city: "Kaolack", aliases: ["leona"] },
  { name: "Ziguinchor Centre", city: "Ziguinchor" },
  { name: "Boutoute", city: "Ziguinchor" },
];
