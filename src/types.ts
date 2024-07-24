export interface DidYouKnow {
  text: string;
}

export interface News {
  title: string;
}

export type City = {
  code: string;
  name: string;
  image: string;
  info: string;
  news: News[];
  did_you_know: string;
};

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export type Data = {
  code: string;
  name: string;
  states: State[];
};
