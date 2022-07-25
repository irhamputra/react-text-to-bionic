import * as React from 'react';
import * as text from 'text-vide';
import * as DOMPurify from 'dompurify';

type Props = {
  render: string;
  fixationPoint?: 1 | 2 | 3 | 4 | 5;
  separator?: '<b>' | '<strong>' | '**' | undefined;
  sx?: React.CSSProperties;
  className?: string;
};

const ReactBionic: React.FC<Props> = ({ sx, className, render, fixationPoint = 1, separator = '<b>' }) => {
  const defaultSeparator = React.useMemo(
    () => [separator, separator.split('').splice(1, 0, '/').join('')],
    [separator]
  );

  const htmlSeparator = React.useMemo(() => {
    return separator === '**' ? separator : defaultSeparator;
  }, [defaultSeparator, separator]);

  const text2bionic = React.useMemo(
    () => text.textVide(render, { fixationPoint, sep: separator ? htmlSeparator : defaultSeparator }),
    [defaultSeparator, fixationPoint, htmlSeparator, render, separator]
  );

  const purify = React.useMemo(() => DOMPurify.sanitize(text2bionic), [text2bionic]);

  return <span style={sx} className={className} dangerouslySetInnerHTML={{ __html: purify }} />;
};

export default ReactBionic;
