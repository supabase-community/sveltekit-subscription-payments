import { env } from '$env/dynamic/public';

export const toDateTime = (secs: number) => {
	var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
	t.setSeconds(secs);
	return t;
};

export const getURL = () => {
	let url =
		env.PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		env.PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
		'http://localhost:3000/';
	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`;
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
	return url;
};

export function getValid<T extends readonly string[]>(value: string | null, valid: T): T[number] {
	return valid.includes(value as T[number]) ? (value as T[number]) : valid[0];
}
