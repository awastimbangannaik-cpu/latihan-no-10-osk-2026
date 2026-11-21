import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

type Segment =
  | { type: 'text'; content: string }
  | { type: 'inline'; content: string }
  | { type: 'display'; content: string };

function tokenizeMathAndBold(input: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === '$' && input[i + 1] === '$') {
      const end = input.indexOf('$$', i + 2);
      if (end !== -1) {
        segments.push({ type: 'display', content: input.slice(i + 2, end).trim() });
        i = end + 2;
        continue;
      }
    }
    if (input[i] === '$') {
      const end = input.indexOf('$', i + 1);
      if (end !== -1) {
        segments.push({ type: 'inline', content: input.slice(i + 1, end).trim() });
        i = end + 1;
        continue;
      }
    }
    const nextDollar = input.indexOf('$', i);
    if (nextDollar === -1) {
      segments.push({ type: 'text', content: input.slice(i) });
      break;
    }
    segments.push({ type: 'text', content: input.slice(i, nextDollar) });
    i = nextDollar;
  }

  return segments;
}

function renderBoldText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => tokenizeMathAndBold(text), [text]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <React.Fragment key={idx}>{renderBoldText(seg.content)}</React.Fragment>;
        }
        try {
          const html = katex.renderToString(seg.content, {
            displayMode: seg.type === 'display',
            throwOnError: false,
            strict: false,
          });
          if (seg.type === 'display') {
            return (
              <span
                key={idx}
                className="block my-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <span
              key={idx}
              className="inline-block align-middle mx-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx}>{seg.content}</code>;
        }
      })}
    </span>
  );
};

interface MathBlockProps {
  latex: string;
  label?: string;
  accent?: boolean;
}

export const MathBlock: React.FC<MathBlockProps> = ({ latex, label, accent = false }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <div
      className={`rounded-xl border px-4 py-3 my-2.5 ${
        accent
          ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/90 border-teal-200'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      {label && (
        <div className="text-xs font-semibold text-teal-800 mb-1 tracking-wide">{label}</div>
      )}
      <div
        className="overflow-x-auto text-slate-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
