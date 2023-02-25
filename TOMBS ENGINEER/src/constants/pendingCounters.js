import { i18n } from "src/boot/i18n";
const t = i18n.t;
export const pendingCounters = {
  associations: {
    routeName: "registration-requests",
    routeParams: {},
    routeQueries: {
      tab: 2,
      status: 1,
    },
    apiKey: "associationsJoiningRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.associations"),
  },
  providers: {
    routeName: "registration-requests",
    routeParams: {},
    routeQueries: {
      tab: 1,
      status: 1,
    },
    apiKey: "providersJoiningRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.providers"),
  },
  assiginingRequests: {
    routeName: "assigningRequests",
    routeParams: {},
    routeQueries: {},
    apiKey: "assigningRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.assiginingRequests"),
  },
  donorEnitiesRequests: {
    routeName: "registration-requests",
    routeParams: {},
    routeQueries: {
      tab: 3,
      status: 1,
    },
    apiKey: "donorsJoiningRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.donorEnitiesRequests"),
  },
  donorEnitiesProfile: {
    routeName: "donorsRequestsList",
    routeParams: {},
    routeQueries: {},
    apiKey: "donorsEditRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.donorsprofiles"),
  },
  providersProfiles: {
    routeName: "providersRequestsList",
    routeParams: {},
    routeQueries: {},
    apiKey: "providersEditRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.providersProfiles"),
  },
  associationsprofiles: {
    routeName: "associationsRequestsList",
    routeParams: {},
    routeQueries: {},
    apiKey: "associationsEditRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.associationsprofiles"),
  },
  withdraws: {
    routeName: "superAdmin-withdraw-amounts",
    routeParams: {},
    routeQueries: {},
    apiKey: "collectingRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.withdraws"),
  },
  refund: {
    routeName: "refund-requests",
    routeParams: {},
    routeQueries: {},
    apiKey: "refundRequestsCount",
    counterName: t("superAdminpendingRequestsCounters.refund"),
  },
};
