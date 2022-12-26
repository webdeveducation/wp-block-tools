export const getBorderRadiusStyle = (attributes: any) => {
  const borderRadiusStyle: any = {};
  if (typeof attributes.style?.border?.radius === 'object') {
    const { radius } = attributes.style.border;
    borderRadiusStyle.borderBottomLeftRadius = radius.bottomLeft;
    borderRadiusStyle.borderTopLeftRadius = radius.topLeft;
    borderRadiusStyle.borderTopRightRadius = radius.topRight;
    borderRadiusStyle.borderBottomRightRadius = radius.bottomRight;
  } else if (attributes.style?.border?.radius) {
    borderRadiusStyle.borderRadius = attributes.style.border.radius;
  }

  return borderRadiusStyle;
};
