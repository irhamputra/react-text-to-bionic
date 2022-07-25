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
  const htmlSeparator = React.useMemo(() => {
    return separator === '**' ? separator : separator.split('').splice(1, 0, '/').join('');
  }, [separator]);

  const text2bionic = React.useMemo(
    () => text.textVide(render, { fixationPoint, sep: htmlSeparator }),
    [fixationPoint, htmlSeparator, render]
  );

  const purify = React.useMemo(() => DOMPurify.sanitize(text2bionic), [text2bionic]);

  return <span style={sx} className={className} dangerouslySetInnerHTML={{ __html: purify }} />;
};

export default ReactBionic;
