'use client';
Object.defineProperty(exports, '__esModule', { value: true });

function convertStyleStringToReact(styleString) {
    const styles = {};
    // Split the style string into individual style declarations
    const declarations = styleString.split(';');
    declarations.forEach((declaration) => {
        // Split each style declaration into property and value
        // (cater for the style value having : for example background: url(http://test.com/img.jpg)))
        const property = declaration.substring(0, declaration.indexOf(':'));
        const value = declaration.substring(declaration.indexOf(':') + 1);
        if (property && value) {
            // Remove leading/trailing whitespaces from property and value
            const formattedProperty = property.trim();
            const formattedValue = value.trim();
            // Convert CSS property to camelCase for React
            const camelCasedProperty = formattedProperty.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
            // Add the style to the styles object
            styles[camelCasedProperty] = formattedValue;
        }
    });
    return styles;
}

exports.convertStyleStringToReact = convertStyleStringToReact;
//# sourceMappingURL=convertStyleStringToReact.js.map
