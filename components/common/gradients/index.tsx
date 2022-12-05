import styles from './index.module.css';

const COLORS = ['blue', 'pink', 'orange', 'yellow'] as const;
const DEFAULT_VALUES: GradientsData = {
  blue: { x: 100, y: 50, width: 650, zIndex: -4, hex: '#9CABD2' },
  pink: { x: 240, y: 100, width: 450, zIndex: -3, hex: '#F5ACA8' },
  orange: { x: 375, y: 75, width: 250, zIndex: -1, hex: '#E5954E' },
  yellow: { x: 300, y: 150, width: 300, zIndex: -2, hex: '#F4BB65CC' },
};

type GradientData = {
  x: number;
  y: number;
  width: number;
  zIndex: number;
  hex: string;
};

type GradientsData = { [color in typeof COLORS[number]]: GradientData };

type Props = {
  colors?: GradientsData;
};

export function Gradients({ colors = DEFAULT_VALUES }: Props) {
  return (
    <div className={styles.container}>
      {Object.keys(colors).map((color, i) => {
        const { x, y, width, zIndex, hex } =
          colors[color as keyof GradientsData];

        return (
          <div
            key={color}
            className={styles.gradient}
            style={{
              top: `${x}px`,
              left: `${y}px`,
              width: `${width}px`,
              zIndex,
              ['--color' as string]: hex,
              ['--animation-order' as string]: i,
            }}
          />
        );
      })}
    </div>
  );
}
