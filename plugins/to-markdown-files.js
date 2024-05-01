import fs from 'fs';
import path from 'path';

function generateMarkdownFromDeclaration(options = { declaration: {}, tagTemplates: {}}) {
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

    if (options.tagTemplates) {
        Object.keys(options.tagTemplates).forEach(tag => {
            const template = options.tagTemplates[tag];

            if (options.declaration[tag] && Array.isArray(options.declaration[tag]) && options.declaration[tag].length > 0) {
                
                if (template.title) {
                    markdown += `\n## ${template.title || ''}:\n`;
                }

                options.declaration[tag].forEach((item) => {
                    if (template.template) {
                        markdown += `\n${template.template(item)}\n`;
                    } else {
                        markdown += `\n${item}\n`;
                    }
                });
            } else if (options.declaration[tag]) {
                if (template.title) {
                    markdown += `\n## ${template.title || ''}:\n`;
                }

                if (template.template) {
                    markdown += `\n${template.template(options.declaration[tag])}\n`;
                } else {
                    markdown += `\n${options.declaration[tag]}\n`;
                }
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

export default function toMarkdownFiles(options = { outDir: './markdown', clearDir: false, tagTemplates: {}}) {
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
                const markdownContent = generateMarkdownFromDeclaration({declaration, tagTemplates: options.tagTemplates});
                const filePath = path.join(options.outDir, `${toDashCase(declaration.name)}.md`);
                fs.writeFileSync(filePath, markdownContent);
            });
        },
    }
}