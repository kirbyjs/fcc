import React from 'react';
import hljs from 'highlight.js';

type CodeBlockProps = {
    language: string
    value: string | null
}
export default function CodeBlock(props: CodeBlockProps) {
    if (!props.value){
        return null;
    }
    const language = hljs.getLanguage(props.language);
    const html = language ? hljs.highlight(props.language, props.value).value : props.value;
    const className = language ? 'language-' + props.language : 'nohighlighting';

    return (
        <pre>
            <code
                dangerouslySetInnerHTML={{__html: html}}
                className={`${className} hljs ${props.language}`}
            />
        </pre>
    );
}