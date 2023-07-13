interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Product Discovery Analyst'],
  customerRoles: [],
  tenantRoles: ['Product Discovery Analyst'],
  tenantName: 'Analyst',
  applicationName: 'invenire',
  addOns: ['chat'],
};
