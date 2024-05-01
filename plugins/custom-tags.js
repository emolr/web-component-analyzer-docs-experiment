// Modified from https://github.com/break-stuff/cem-tools/blob/main/packages/custom-jsdoc-tags/src/cem-plugin.ts
// modified to work with custom tags on classes and also properties

import { parse } from 'comment-parser';

let userOptions = {
  tags: {}
};

export function customJSDocTagsPlugin(options = { tags: {} }) {
  userOptions = options;

  return {
    name: "custom-jsdoc-tags-plugin",
    analyzePhase({ ts, node, moduleDoc }) {
      if(node.kind !== ts.SyntaxKind.ClassDeclaration) {
        return;
      }

      const className = node.name.getText();
const component = moduleDoc?.declarations?.find(declaration => declaration.name === className);
const customTags = Object.keys(userOptions.tags || {});

node.jsDoc?.forEach(jsDoc => {
  jsDoc?.tags?.forEach(tag => {
    const tagName = tag.tagName.getText();

    if (customTags.includes(tagName)) {
      const tagOptions  = userOptions.tags[tagName];
      if(!tagOptions) {
        return;
      }

      const propName = tagOptions.mappedName || tagName;
      const existingProp = component[propName];
      
      // Extract the name and description from tag.comment
      const match = tag.comment.match(/^(.+) -\s?(.*)$/s);
      const cemTagName = match ? match[1].trim() : '';
      const cemDescription = match ? match[2].trim() : tag.comment;
      
      const cemTag = {
        name: cemTagName,
        default: tag.default,
        description: cemDescription,
        type: tag.typeExpression ? { text: tag.typeExpression.getText() } : undefined
      };
      if(!existingProp && tagOptions.isArray) {
        component[propName] = [cemTag];
      } else if (Array.isArray(component[propName])) {
        component[propName].push(cemTag);
      } else if (existingProp && !Array.isArray(component[propName])) {
        
        component[propName] = [component[propName], cemTag];
      } else {
        component[propName] = cemTag;
      }
    }
  });
});

      // Iterate over the properties of the class
      node.members?.forEach(member => {
        // Skip if the member is private
        if (member.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword)) {
          return;
        }
      
        if (member.jsDoc) {
          member.jsDoc.forEach(jsDoc => {
            jsDoc.tags?.forEach(tag => {
              const tagName = tag.tagName.getText();
              if (customTags.includes(tagName)) {
                const propName = userOptions.tags[tagName].mappedName;
                const existingProp = component[propName];
                // Extract the name and description from tag.comment
                const match = tag.comment.match(/^(.+) -\s?(.*)$/s);
                const cemTagName = match ? match[1].trim() : member.name.getText();
                const cemDescription = match ? match[2].trim() : tag.comment;
                const cemTag = {
                  name: cemTagName,
                  description: cemDescription,
                  type: tag.typeExpression ? { text: tag.typeExpression.getText() } : undefined
                };
                
                if(!existingProp && userOptions.tags[tagName]?.isArray) {
                  component[propName] = [cemTag];
                } else if (Array.isArray(component[propName])) {
                  component[propName].push(cemTag);
                } else if (existingProp && !Array.isArray(component[propName])) {
                  component[propName] = [component[propName], cemTag];
                } else {
                  component[propName] = cemTag;
                }
              }
            });
          });
        }
      });
    }
  }
}