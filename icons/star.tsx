import { IconType } from './types';

export function Star({ width = 34, height = 33, color = 'currentColor' }: IconType) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 34 33'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M17 0L19.8174 11.1496L30.2911 6.40067L23.3306 15.5551L33.5738 20.7829L22.0768 21.0486L24.376 32.3165L17 23.4934L9.62398 32.3165L11.9232 21.0486L0.426226 20.7829L10.6694 15.5551L3.70887 6.40067L14.1826 11.1496L17 0Z'
				fill={color}
			/>
		</svg>
	);
}
