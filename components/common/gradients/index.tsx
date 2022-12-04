import styles from './index.module.css';

const COLORS = ['blue', 'pink', 'orange', 'yellow'] as const;
const DEFAULT_VALUES: GradientsData = {
  blue: { x: 100, y: 50, scale: 1, zIndex: -4, hex: '#9CABD2' },
  pink: { x: 110, y: 10, scale: 0.8, zIndex: -3, hex: '#F5ACA8' },
  orange: { x: 170, y: -100, scale: 0.4, zIndex: -1, hex: '#E5954E' },
  yellow: { x: 160, y: -80, scale: 0.45, zIndex: -2, hex: '#F4BB65CC' },
};

type GradientData = {
  x: number;
  y: number;
  scale: number;
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
      {Object.keys(colors).map((color) => {
        const { x, y, scale, zIndex, hex } =
          colors[color as keyof GradientsData];

        return (
          <div
            key={color}
            className={styles.gradient}
            style={{
              transform: `scale(${scale})`,
              top: `${x}px`,
              left: `${y}px`,
              zIndex,
              ['--color' as string]: hex,
            }}
          />
        );
      })}
    </div>
  );
}
