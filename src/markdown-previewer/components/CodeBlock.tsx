import React from 'react';
import hljs from 'highlight.js';
import {ReactBaseProps, ReactMarkdownProps} from 'react-markdown/src/ast-to-react';

function getHtml(className: string | undefined, markup: string) {
    if (className) {
        const language = hljs.getLanguage(className.split('language-')[1]);
        return hljs.highlight(markup, {language: language?.name as string}).value;
    }
    return '';
}

export default function CodeBlock(props: ReactBaseProps & ReactMarkdownProps) {
    if (props.inline) {
        return (
            <code>{props.children}</code>
        );
    }

    return (
        <pre>
            <code
                dangerouslySetInnerHTML={{__html: getHtml(props.className as string, props.children[0] as string)}}
                className={`${props.className} hljs`}
            />
        </pre>
    );
}