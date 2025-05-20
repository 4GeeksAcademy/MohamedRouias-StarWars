export const initialStore=()=>{
  return{
    characters: [], // Lista de personajes
    planets: [], // Lista de planetas
    favorites: [] // Lista para los favoritos
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
        planets: action.payload // Carga
      }
    
    case 'add_favorite':
      //Evitamos que se repitan 
      if (store.favorites.includes(action.payload)) return store;
        return{
          ...store,
          favorites: [...store.favorites, action.payload]
      };

      case  'remove_favorite':
        return {
          ...store,
          favorites: store.favorites.filter(name => name !== action.payload)
        };
      
    default:
      throw Error(`Unknown action type. ${action.payload}`);
  }    
}
