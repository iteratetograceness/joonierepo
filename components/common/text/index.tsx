import { forwardRef } from 'react';
import inter from '../../../utils/inter';
import source_code_pro from '../../../utils/source-code-pro';

type Props = {
  content: string;
  heading?: boolean;
  mono?: boolean; // TODO: update type so that mono cannot be used with heading
  className?: string;
};

const Text = forwardRef<HTMLHeadingElement | HTMLParagraphElement, Props>(
  function Text(
    { content, heading = false, mono = false, className = undefined },
    ref,
  ) {
    if (heading) {
      return (
        <h1
          ref={ref}
          className={`${className} ${
            mono ? source_code_pro.className : inter.className
          }`}
        >
          {content}
        </h1>
      );
    }

    return (
      <p
        ref={ref}
        className={`${className} ${
          mono ? source_code_pro.className : inter.className
        }`}
      >
        {content}
      </p>
    );
  },
);

export default Text;
