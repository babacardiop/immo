export type CityEntry = {
  name: string;
  region: string;
};

export type CommuneEntry = {
  name: string;
  city: string;
  region: string;
};

export type QuartierEntry = {
  name: string;
  commune: string;
  city: string;
  region: string;
  aliases?: string[];
};
