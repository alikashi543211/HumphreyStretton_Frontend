export const urls = {

    // Host 
    devUrl: 'http://humphrey.test/api/',
    // stagingUrl: 'http://192.168.0.143:8007/api/',
    stagingUrl: 'https://api.humphery.io-devs.us/api/',
    awsUrl: 'https://rod.humphreystretton.com/backend/api/',

    // AUTH
    login: 'auth/login',
    logout: 'auth/logout',
    forgotPasswordMail: 'auth/forgot-password',
    verifyPasswordToken: 'auth/verify-forgot-password-code',
    resetPassword: 'auth/reset-password',
    setupAccount: 'auth/setup-account',
    skipPasswordUpdate: 'auth/skip-update-password',


    // Administration
    // Users
    getUsersList: 'administration/users/listing',
    addUser: 'administration/users/store',
    deleteUser: 'administration/users/delete',
    updateUser: 'administration/users/update',

    // ROles
    getRolesList: 'administration/roles/listing',
    addRole: 'administration/roles/store',
    deleteRole: 'administration/roles/delete',
    updateRole: 'administration/roles/update',
    getPermissionsList: 'administration/roles/permissions/listing',

    // Admin Settings
    getAdminSettings: 'administration/settings/listing',
    getSageListing: 'administration/settings/sage/listing',
    updateSageListing: 'administration/settings/sage/update',
    updateAdminSettings: 'administration/settings/update',

    // Rod
    rodListing: 'rod/work-orders/listing',
    storeWorkOrder: 'rod/work-orders/store',
    updateInvoiceNo: 'rod/work-orders/update',
    updateWorkOrder: 'rod/work-orders/update',
    getWorkOrder: 'rod/work-orders/details',
    multiOrderUpdate: 'rod/work-orders/update-multiple',
    updateOrderStatus: 'rod/work-orders/update-status',
    bulkStatusUpdate: 'rod/work-orders/bulk-update-status',
    getCustomerOrders: 'rod/work-orders/get-customer-orders/listing',
    getJobNotes: 'rod/job-notes/listing',
    addJobNote: 'rod/job-notes/store',
    deleteJobNote: 'rod/job-notes/delete',
    getTicketNo: 'rod/delivery-notes/ticket-no',
    addDeliveryNote: 'rod/delivery-notes/store',
    updateDeliveryNote: 'rod/delivery-notes/update',
    getDeliveryNotes: 'rod/delivery-notes/listing',
    uploadFiles: 'rod/work-orders/files/store',
    removeFile: 'rod/work-orders/files/delete',
    downloadRod: 'rod/work-orders/download',
    multipleJobNotes: 'rod/job-notes/update-multiple',
    getWorkOrdersCustomers: 'rod/customers/listing',
    getWorkOrdersEmployees: 'rod/employees/listing',
    getJobNoteRoles: 'rod/roles/listing',
    quotationImport: 'rod/work-orders/file/store',
    getSageCustomerId: 'rod/customers/fetch-from-sage',
    searchSageCustomerId: 'rod/customers/search-from-sage',

    // Job List
    jobListListing: 'job-list/job/listing',
    detailJobList: 'job-list/job/detail',
    updateJobList: 'job-list/job/update',
    uploadJobListQuotation: 'job-list/job/file/store',

    // Products
    productListing: 'rod/work-orders/products',

    // Customers
    customerListing: 'phonebook/customers/listing',
    customerAdd: 'phonebook/customers/store',
    customerUpdate: 'phonebook/customers/update',
    customerDelete: 'phonebook/customers/delete',
    customerOrdersPdfEmail: 'phonebook/customers/download-pdf',

    supplierListing: 'phonebook/suppliers/listing',
    supplierAdd: 'phonebook/suppliers/store',
    supplierUpdate: 'phonebook/suppliers/update',
    supplierDelete: 'phonebook/suppliers/delete',

    employeeListing: 'phonebook/employees/listing',
    employeeAdd: 'phonebook/employees/store',
    employeeUpdate: 'phonebook/employees/update',
    employeeDelete: 'phonebook/employees/delete',

    // Delivery List
    deliveryListing: 'delivery-list/delivery/listing',
    updateDeliveryListStatus: 'delivery-list/delivery/update-status',
    updateDeliveryList: 'delivery-list/delivery/update',
    downloadDeliveryList: 'delivery-list/delivery/download',
    updateDeliveryListOrder: 'delivery-list/delivery/update-order',
    deliveryTagsListing: 'delivery-list/delivery/delivery-tags/listing',

    // Storage
    updateStorage: 'delivery-list/storage/update',
    storageListing: 'delivery-list/storage/listing',

    // Load Analytics
    loadAnalytic: 'delivery-list/delivery/load-analytics/listing',

    // FSC
    fscListing: 'fsc/customer-orders/listing',
    fscCustomerOrderDownload: 'fsc/customer-orders/download',
    addPurchaseOrder: 'fsc/purchase-orders/store',
    purchaseOrderListing: 'fsc/purchase-orders/listing',
    updateOrder: 'fsc/purchase-orders/update',
    deleteOrder: 'fsc/purchase-orders/delete',
    fscWorkOrderListing: 'fsc/orders/listing',
    fscSupplierListing: 'fsc/suppliers/listing',
    fscPurchaseOrderDownload: 'fsc/purchase-orders/download',
    fscHistory: 'fsc/history',
    fscComplete: 'fsc/purchase-orders/update-status',

    // Accounts
    accountStats: 'accounts/stats',
    customerTotals: 'accounts/customer-total-listing',
    accountsDownloadCustomerTotal: 'accounts/download',

    salesOrdersCustomerListing: 'accounts/sale-order/customers/listing',
    salesOrdersRodListing: 'accounts/sale-order/work-order-listing',
    salesOrdersListing: 'accounts/sale-order/listing',
    addSalesOrder: 'accounts/sale-order/store',
    updateSalesOrderStatus: 'accounts/sale-order/update-status',
    updateSalesOrder: 'accounts/sale-order/update',
    deleteSalesOrder: 'accounts/sale-order/delete',
    accountsDownloadSalesOrder: 'accounts/sale-order/download',

    accountsPurchaseOrdersListing: 'accounts/purchase-cost/listing',
    addAccountsPurchaseOrder: 'accounts/purchase-cost/store',
    updateAccountsPurchaseOrderStatus: 'accounts/purchase-cost/update-status',
    updateAccountsPurchaseOrder: 'accounts/purchase-cost/update',
    deletePurchaseOrder: 'accounts/purchase-cost/delete',
    accountsUserListing: 'accounts/users/listing',
    accountsWorkOrdersListing: 'accounts/work-orders/listing',
    accountsSupplierListing: 'accounts/suppliers/listing',
    accountsDowloadMonthlyCost: 'accounts/purchase-cost/download',

    fixedCostListing: 'accounts/fixed-cost/listing',
    addFixedCost: 'accounts/fixed-cost/store',
    updateFixedCost: 'accounts/fixed-cost/update',
    deleteFixedCost: 'accounts/fixed-cost/delete',

    creditCheckListing: 'accounts/credit-check/listing',
    creditCheckShow: 'accounts/credit-check/show',

    // Storage
    accountsStorageListing: 'accounts/storage/listing',

    // Sage Invoices
    sageInvoiceListing: 'accounts/sage/invoice/listing',
    sageInvoiceVerification: 'accounts/sage/invoice/verification/update',
    sageResendInvoiceListing: 'accounts/sage/retry-create-sage-invoice',
    sendSageInvoice: 'accounts/sage/invoice/update',

    // History
    historyListing: 'history/listing',
    historyReorder: 'history/reorder',
    historyDownload: 'history/download',

    // Dashboard
    dashboardStats: 'dashboard/stats',
    dashboardCharts: 'dashboard/charts',

    // Settings
    updatePassword: 'settings/update-password',
    updateProfile: 'settings/update-details',
    updateNoticationDetails: 'settings/update-notifications-details'
};