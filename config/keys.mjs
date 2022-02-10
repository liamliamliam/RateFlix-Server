import devKeys from './dev.mjs';
import prodKeys from './prod.mjs';

export default process.env.NODE_ENV === 'production' ? prodKeys : devKeys;
