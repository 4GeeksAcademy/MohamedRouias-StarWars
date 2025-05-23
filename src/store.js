export const initialStore = ()=>{
  return{
    characters: [], // Lista de personajes
    planets: [], // Lista de planetas
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){

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
      if (state.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return state;
      }
        return{
          ...state,
          favorites: [...state.favorites, action.payload]
      };

      case  'remove_favorite':
        return {
          ...state,
          favorites: state.favorites.filter(fav =>!(fav.uid === action.payload.uid && fav.type === action.payload.type))
        };
      
    default:
      throw Error(`Unknown action type. ${action.payload}`);
  }    
}
