import { Source_Code_Pro } from '@next/font/google';

type Props = {
  content: string;
  heading?: boolean;
  mono?: boolean; // TODO: update type so that mono cannot be used with heading
  className?: string;
};

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

export default function Text({
  content,
  heading = false,
  mono = false,
  className = undefined,
}: Props) {
  if (heading) {
    return <h1 className={className}>{content}</h1>;
  }

  return (
    <p className={`${className} ${mono ? sourceCodePro.className : undefined}`}>
      {content}
    </p>
  );
}
