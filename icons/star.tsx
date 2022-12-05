import { SVGType } from './types';

export default function Star({ width = 15, height = 15 }: SVGType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.5 0L14.5716 8.52619L22.2729 4.89463L17.1549 11.8951L24.6866 15.8928L16.2329 16.096L17.9235 24.7126L12.5 17.9656L7.07645 24.7126L8.76709 16.096L0.313401 15.8928L7.84513 11.8951L2.72711 4.89463L10.4284 8.52619L12.5 0Z'
        fill='var(--foreground)'
      />
    </svg>
  );
}
