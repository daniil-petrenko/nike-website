import {deleteAsync} from 'del';

// Config
import path from '../config/path.js';

// Direction delete function
export default () => {
	return deleteAsync(path.root);
}

