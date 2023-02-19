import { PUBLIC_SWELL_STORE_ID, PUBLIC_SWELL_PUBLIC_KEY } from '$env/static/public';
import swell from 'swell-js';

const options = {
	useCamelCase: true
};

swell.init(PUBLIC_SWELL_STORE_ID, PUBLIC_SWELL_PUBLIC_KEY, options);

export default swell;
