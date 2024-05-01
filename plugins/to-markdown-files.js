import fs from 'fs';
import path from 'path';

function generateMarkdownFromDeclaration(options = { declaration: {}, exampleTemplateFn: () => ''}) {
    let markdown = ``;
    if (options.declaration.tagName) {
        markdown += `# ${options.declaration.tagName}\n`;
    }

    if (options.declaration.description) {
        markdown += `\n${(options.declaration.description || '')}\n`;
    }

    if (options.declaration.summary) {
        markdown += `\n${options.declaration.summary || ''}\n`;
    }

    if (options.declaration.examples && options.declaration.examples.length > 0) {
        // markdown += `\n## Examples:\n`;
        options.declaration.examples.forEach((example) => {
            if (example.name) {
                markdown += `\n### ${example.name}\n`;
            }
            if (options.exampleTemplateFn) {
                markdown += `\n${options.exampleTemplateFn(example.description)}\n`;
            } else {
                markdown += `\n${example.description}\n`;
            }
        });
    }
    
    let api = '';

    if ((options.declaration.slots || []).length > 0) {
        api += `\n## Slots:\n\n| Name | Description |\n| --- | --- |\n`;
        (options.declaration.slots || []).forEach(slot => {
            api += `| ${slot.name || ''} | ${slot.description || ''} |\n`;
        });
    }

    const attributes = options.declaration.attributes || [];
    const hasNonPrivateAttributes = attributes.length > 0 && attributes.some(attribute => options.declaration.members.find(m => m.name === attribute.fieldName)?.privacy !== 'private');
    if (hasNonPrivateAttributes) {
        api += `\n## Attributes:\n\n| Name | Type | Default | Description | Field Name |\n| --- | --- | --- | --- | --- |\n`;
        attributes.forEach(attribute => {
            const member = options.declaration.members.find(m => m.name === attribute.fieldName);
            if (member && member.privacy !== 'private') {
                api += `| ${attribute.name || ''} | ${(attribute.expandedType || {}).text?.replaceAll("|", "\\|") || (attribute.type || {}).text || ''} | ${attribute.default || ''} | ${attribute.description || ''} | ${attribute.fieldName || ''} |\n`;
            }
        });
    }

    const hasNonPrivateMembers = (options.declaration.members || []).some(member => member.privacy !== 'private');
    if ((options.declaration.members || []).length > 0 && hasNonPrivateMembers) {
        api += `\n## Properties:\n\n| Name | Type | Default | Description | Attribute |\n| --- | --- | --- | --- | --- |\n`;
        (options.declaration.members || []).forEach(member => {
            if (member.privacy !== 'private') {
                api += `| ${member.name || ''} | ${(member.expandedType || {}).text?.replaceAll("|", "\\|") || (member.type || {}).text || ''} | ${member.default || ''} | ${member.description || ''} | ${member.attribute || ''} |\n`;
            }
        });
    }

    if ((options.declaration.events || []).length > 0) {
        api += `\n## Events:\n\n| Name | Type | Description |\n| --- | --- | --- |\n`;
        (options.declaration.events || []).forEach(event => {
            api += `| ${event.name || ''} | ${(event.type || {}).text || ''} | ${event.description || ''} |\n`;
        });
    }

    if ((options.declaration.cssProperties || []).length > 0) {
        api += `\n## CSS Properties:\n\n| Name | Description | Default |\n| --- | --- | --- |\n`;
        (options.declaration.cssProperties || []).forEach(property => {
            api += `| ${property.name || ''} | ${property.description || ''} | ${property.default || ''} |\n`;
        });
    }

    if ((options.declaration.cssParts || []).length > 0) {
        api += `\n## CSS Parts:\n\n| Name | Description |\n| --- | --- |\n`;
        (options.declaration.cssParts || []).forEach(part => {
            api += `| ${part.name || ''} | ${part.description || ''} |\n`;
        });
    }

    if (options.declaration.superclass) {
        api += `\n## Superclass: \n  - Name: ${(options.declaration.superclass || {}).name || ''}\n  - Package: ${(options.declaration.superclass || {}).package || ''}\n\n`;
    }

    // if (api) {
    //     markdown += `\n<details>\n<summary>API</summary>\n\n${api}\n</details>\n`
    // }

    return markdown + api;
}

export default function toMarkdownFiles(options = { outDir: './markdown', clearDir: false, exampleTemplateFn: () => ''}) {
    return {
        // Make sure to always give your plugin a name! This helps when debugging
        name: 'to-markdown-files',
        packageLinkPhase({ customElementsManifest, context }) {
            const declarations = customElementsManifest.modules.flatMap(module => module.declarations).filter(declaration => declaration.customElement);

            // Ensure the output directory exists
            if (!fs.existsSync(options.outDir)) {
                fs.mkdirSync(options.outDir, { recursive: true });
            }

            // Clear the directory if clearDir option is true
            if (options.clearDir) {
                const files = fs.readdirSync(options.outDir);
                for (const file of files) {
                    fs.unlinkSync(path.join(options.outDir, file));
                }
            }

            function toDashCase(str) {
                return str
                    .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
                    .replace(/^-/, '');
            }
            
            declarations.forEach(declaration => {
                const markdownContent = generateMarkdownFromDeclaration({declaration, exampleTemplateFn: options.exampleTemplateFn});
                const filePath = path.join(options.outDir, `${toDashCase(declaration.name)}.md`);
                fs.writeFileSync(filePath, markdownContent);
            });
        },
    }
}