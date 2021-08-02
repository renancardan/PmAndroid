
export const initialState = {
    nome: '',
    email:'',
    id:'',
    status:0,
    nomeCompleto:'',
    telefone:'',
    data_nasc:'',
    cidade:'',
    estado:'',
    lat: '',
    log: '',
    idoc: '',
    variTemp:'',
};

export const UserReducer = (state, action) => {
    switch(action.type) {
        case 'setVari':
            return { ...state, variTemp: action.payload.variTemp };
        break;
        case 'setIdoc':
            return { ...state, idoc: action.payload.idoc };
        break;
        case 'setNome':
            return { ...state, nome: action.payload.nome };
        break;
        case 'setLat':
            return { ...state, lat: action.payload.lat };
        break;
        case 'setLog':
            return { ...state, log: action.payload.log };
        break;
        case 'setStatus':
            return { ...state, status: action.payload.status };
        break;
        case 'setEmail':
            return { ...state, email: action.payload.email };
        break;
        case 'setId':
            return { ...state, id: action.payload.id };
        break;
        case 'setNomecompleto':
            return { ...state, nomeCompleto: action.payload.nomeCompleto };
        break;
        case 'setTelefone':
            return { ...state, telefone: action.payload.telefone };
        break;
        case 'setData_nasc':
            return { ...state, data_nasc: action.payload.data_nasc };
        break;
        case 'setCidade':
            return { ...state, cidade: action.payload.cidade };
        break;
        case 'setEstado':
            return { ...state, estado: action.payload.estado };
        break;
        default:
            return state;
    }
}