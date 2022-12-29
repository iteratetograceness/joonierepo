import { SVGType } from './types';

export default function Sparkle({ width = 43, height = 45 }: SVGType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 43 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.5 0.0449219L27.307 16.1029L43 22.0449L27.307 27.9869L21.5 44.0449L15.693 27.9869L0 22.0449L15.693 16.1029L21.5 0.0449219Z'
        fill='currentColor'
      />
    </svg>
  );
}
