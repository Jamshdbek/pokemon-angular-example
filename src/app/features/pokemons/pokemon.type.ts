export type PokemonList = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  id: number;
  order: number;
  name: string;
  height: number;
  abilities: Ability[];
  spices: Species;
  types: Type[];
  weight: number;
  sprites: Sprite;
  stats: Stat[];
};

type Ability = {
  ability: {
    name: string;
  };
};

type Species = {
  url: string;
};

type Type = {
  slot: number;
  type: {
    name: string;
  };
};

type Sprite = {
  front_default: string;
};

type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};
