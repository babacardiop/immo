export type CityEntry = {
  name: string;
  region: string;
};

export type QuartierEntry = {
  name: string;
  city: string;
  region: string;
  aliases?: string[];
};
