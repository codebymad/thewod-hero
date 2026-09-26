import Markdown from 'react-markdown'

interface MarkdownComponentProps {
    markdown: string;
}

function MarkdownComponent({ markdown }: MarkdownComponentProps) {
    return (
        <Markdown
            components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-bold mb-2" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-base font-bold mb-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-sm font-bold mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 space-y-1 mb-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 space-y-1 mb-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                code: ({ node, ...props }) => <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono" {...props} />,
                pre: ({ node, ...props }) => <pre className="bg-gray-900 text-gray-100 p-4 rounded mb-2 overflow-x-auto" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                hr: ({ node, ...props }) => <hr className="my-4 border-gray-300" {...props} />,
                table: ({ node, ...props }) => <table className="border-collapse border border-gray-300 w-full mb-2" {...props} />,
                th: ({ node, ...props }) => <th className="border border-gray-300 px-2 py-1 bg-gray-200 dark:bg-gray-700" {...props} />,
                td: ({ node, ...props }) => <td className="border border-gray-300 px-2 py-1" {...props} />,
            }}
        >
            {markdown}
        </Markdown>
    )
}

export default MarkdownComponent;