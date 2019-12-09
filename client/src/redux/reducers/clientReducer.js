import log from 'src/util/log';
import generator from 'generate-password';

const initState = {
  id: generator.generate({length: 16, numbers: true})
}

const clientReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default clientReducer;