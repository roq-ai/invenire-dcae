const mapping: Record<string, string> = {
  analysts: 'analyst',
  criteria: 'criteria',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
