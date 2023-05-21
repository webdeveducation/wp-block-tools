export function convertStyleStringToReact(styleString: string) {
  const styles: { [key: string]: string } = {};

  // Split the style string into individual style declarations
  const declarations = styleString.split(';');

  declarations.forEach((declaration) => {
    // Split each style declaration into property and value
    const [property, value] = declaration.split(':');

    if (property && value) {
      // Remove leading/trailing whitespaces from property and value
      const formattedProperty = property.trim();
      const formattedValue = value.trim();

      // Convert CSS property to camelCase for React
      const camelCasedProperty = formattedProperty.replace(
        /-([a-z])/g,
        (match, letter) => letter.toUpperCase()
      );

      // Add the style to the styles object
      styles[camelCasedProperty] = formattedValue;
    }
  });

  return styles;
}
