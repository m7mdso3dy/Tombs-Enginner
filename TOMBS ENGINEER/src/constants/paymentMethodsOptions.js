import { PaymentMethodEnum } from "src/configs/Enums";
import { i18n } from "src/boot/i18n";

const t = i18n.t;

export const paymentMethodsOptions = [
  {
    id: null,
    value: null,
    name: t("all"),
    label: t("all"),
  },
  {
    id: PaymentMethodEnum.Free,
    value: PaymentMethodEnum.Free,
    name: t("enums.PaymentMethod.Free"),
    label: t("enums.PaymentMethod.Free"),
  },
  {
    id: PaymentMethodEnum.BySuperAdmin,
    value: PaymentMethodEnum.BySuperAdmin,
    name: t("enums.PaymentMethod.BySuperAdmin"),
    label: t("enums.PaymentMethod.BySuperAdmin"),
  },
  {
    id: PaymentMethodEnum.Visa,
    value: PaymentMethodEnum.Visa,
    name: t("enums.PaymentMethod.Visa"),
    label: t("enums.PaymentMethod.Visa"),
  },
  {
    id: PaymentMethodEnum.MasterCard,
    value: PaymentMethodEnum.MasterCard,
    name: t("enums.PaymentMethod.MasterCard"),
    label: t("enums.PaymentMethod.MasterCard"),
  },

  // {
  //   id: PaymentMethodEnum.Mada,
  //   value: PaymentMethodEnum.Mada,
  //   name: t("enums.PaymentMethod.Mada"),
  //   label: t("enums.PaymentMethod.Mada"),
  // },
  // {
  //   id: PaymentMethodEnum.StcPay,
  //   value: PaymentMethodEnum.StcPay,
  //   name: t("enums.PaymentMethod.StcPay"),
  //   label: t("enums.PaymentMethod.StcPay"),
  // },
  // {
  //   id: PaymentMethodEnum.AppPay,
  //   value: PaymentMethodEnum.AppPay,
  //   name: t("enums.PaymentMethod.AppPay"),
  //   label: t("enums.PaymentMethod.AppPay"),
  // },
];
