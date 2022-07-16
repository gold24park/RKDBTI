const customMediaQuery = (maxWidth: number): string => {
  return `@media (max-width: ${maxWidth}px)`;
};

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(922),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
};

export const size = {
  navbar_height: 60,
  container_width: 500,
  container_height: 1080,
  content_padding: 20,
  button_height: 60
}