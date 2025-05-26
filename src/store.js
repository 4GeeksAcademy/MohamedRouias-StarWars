export const initialStore = () => {
  return {
    characters: [], // Lista de personajes
    planets: [],
    favorites: [] // Lista de planetas
   
  };
};



export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'set_characters':
      return {
        ...store,
        characters: action.payload // Carga la lista en el array ccharacters[]
      };

    case 'set_planets':
      return {
        ...store,
        planets: action.payload
      };

    case 'learn_more':

      return {
        ...store,
        characters: store.characters.map(character =>
          character.id === action.payload.id ? action.payload : character
        )
      };

    case 'add_favorite':
      //Evitamos que se repitan 
      if (store.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
      };

    default:
      throw Error(`Unknown action type. ${action.payload}`);
  }
}
