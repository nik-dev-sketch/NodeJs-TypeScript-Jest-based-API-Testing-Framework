export const enum CustomerApiUrls {
  COMMON_CUSTOMER = '/cds-au/v1/common/customer',
  CUSTOMER_DETAIL = '/cds-au/v1/common/customer/detail',
  CUSTOMER_STATUS = '/cds-au/v1/discovery/status',
  CUSTOMER_OUTAGES = '/cds-au/v1/discovery/outages',
}

export const enum AccountsRelatedApiUrls {
  COMMON_ENERGY = '/cds-au/v1/energy/accounts',
  ENERGY_DETAIL = '/cds-au/v1/energy/accounts/{accountId}',
  ACCOUNT_BALANCE = '/cds-au/v1/energy/accounts/{accountId}/balance',
  ACCOUNTS_BALANCES = '/cds-au/v1/energy/accounts/balances',
  AGREED_PAYMENT = '/cds-au/v1/energy/accounts/{accountId}/payment-schedule',
  CONCESSIONS = '/cds-au/v1/energy/accounts/{accountId}/concessions',
  ACCOUNT_INVOICES = '/cds-au/v1/energy/accounts/{accountId}/invoices',
  ACCOUNT_INVOICE = '/cds-au/v1/energy/accounts/invoices',
  ACCOUNT_BILLINGS = '/cds-au/v1/energy/accounts/{accountId}/billing',
  ACCOUNT_BILLING = '/cds-au/v1/energy/accounts/billing',
}

export const enum ServicepointsApiUrls {
  SERVICEPOINTS = '/cds-au/v1/energy/electricity/servicepoints',
  SERVICEPOINT_DETAIL = '/cds-au/v1/energy/electricity/servicepoints/{servicePointId}',
  SERVICEPOINT_USAGE = '/cds-au/v1/energy/electricity/servicepoints/{servicePointId}/usage',
  SERVICEPOINTS_USAGE = '/cds-au/v1/energy/electricity/servicepoints/usage',
  SERVICEPOINTS_DER = '/cds-au/v1/energy/electricity/servicepoints/der',
  SERVICEPOINT_DER = '/cds-au/v1/energy/electricity/servicepoints/{servicePointId}/der',
}

export const enum CdrApis {
  FACADE_API = 'facadeApi',
  CUSTOMER_API = 'customerApi',
  METER_API = 'meterApi',
  PAYMENTS_API = 'paymentsApi',
  ACCOUNTS_API = 'accountsApi',
}

export const enum databaseApis {
  graphDataQuery = '/GraphData/query',
}

export const enum secondaryDHApiUris {
  SECONDARY_DH_SERVICEPOINTS = '/cds-au/v1/secondary/energy/electricity/servicepoints',
  SECONDARY_DH_SERVICEPOINT_DETAIL = '/cds-au/v1/secondary/energy/electricity/servicepoints/{servicePointId}',
  SECONDARY_DH_SERVICEPOINT_USAGE = '/cds-au/v1/secondary/energy/electricity/servicepoints/{servicePointId}/usage',
  SECONDARY_DH_SERVICEPOINTS_SPECIFIC_USAGE = '/cds-au/v1/secondary/energy/electricity/servicepoints/usage',
  SECONDARY_DH_SERVICEPOINTS_SPECIFIC_DER = '/cds-au/v1/secondary/energy/electricity/servicepoints/der',
  SECONDARY_DH_SERVICEPOINT_DER = '/cds-au/v1/energy/secondary/electricity/servicepoints/{servicePointId}/der',
}
