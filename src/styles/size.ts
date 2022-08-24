const customMediaQuery = (maxWidth: number): string => {
  return `@media (max-width: ${maxWidth}px)`;
};

export const size = {
  navbar_height: 60,
  container_width: 650,
  container_height: 1000,
  content_padding: 20,
  button_height: 60,
  tablet: {
    container_height: 880
  },
  mobile: {
    navbar_height: 50,
    button_height: 50,
  }
}

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(922),
  tablet: `@media (max-height: ${size.container_height}px) and (min-height: 768px)`,
  phone: customMediaQuery(576),
};

