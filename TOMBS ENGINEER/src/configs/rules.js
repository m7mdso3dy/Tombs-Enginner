import { i18n } from "src/boot/i18n";
import { checkIfNullOrUndefined } from "src/helpers/utils";
import formatter from "./formatter";
const { t } = i18n;
const disableDay = {
  friday: 5,
  Saturday: 6,
};
export default {
  inputRang_20_100: [
    (val) => (val && val.length > 0) || t("signUp.required"),
    (val) => (val.length > 19 && val.length < 100) || t("signUp.range20_100"),
  ],
  optionalStartDate: [
    (val) => {
      return (
        new Date(val) <= new Date() ||
        !val ||
        val?.length === 0 ||
        t("signUp.endDateC")
      );
    },
  ],
  optionalEndDate: [
    (val) => {
      return (
        new Date(val) >= new Date() ||
        !val ||
        val?.length === 0 ||
        t("signUp.startDateC")
      );
    },
  ],
  atLeastOneLetterOptional: [
    (val) =>
      new RegExp(/^(?=[a-zA-Z\u0600-\u06FF]).*?$/).test(val) ||
      !val ||
      val?.length === 0 ||
      t("validations.validName"),
  ],
  atLeastOneLetter: [
    (val) =>
      new RegExp(/^(?=[a-zA-Z\u0600-\u06FF]).*?$/).test(val) ||
      t("validations.validName"),
  ],
  onlyNumbers: [
    (val) =>
      new RegExp(/^[\u0660-\u06690-9]*$/).test(val) ||
      !val ||
      val?.length === 0 ||
      t("validations.onlyNumbers"),
  ],
  // onlyNumbers: [
  //   (val) => new RegExp(/^[\u0660-\u06690-9]*$/).test(val) || t("validations.onlyNumbers"),
  // ],
  onlyLetters: [
    (val) =>
      new RegExp(
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]*$/
      ).test(val) ||
      !val ||
      val.length == 0 ||
      t("validations.lettersOnly"),
  ],
  onlyLettersAndSpaces: [
    (val) =>
      new RegExp(
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]*$/
      ).test(val) ||
      !val ||
      val.length == 0 ||
      t("validations.lettersOnly"),
  ],
  onlyArabic: [
    (val) =>
      new RegExp(/^[\u0600-\u06FF\s]*$/).test(val) ||
      !val ||
      val?.length == 0 ||
      t("validations.onlyArabic"),
  ],
  onlyEnglish: [
    (val) =>
      new RegExp(/^[a-zA-z\s]*$/).test(val) || t("validations.onlyEnglish"),
  ],
  adressRules: [
    (val) =>
      new RegExp(/^[\u0621-\u064A0-9 ]+$/).test(val) ||
      t("validations.invalidAdress"),
  ],
  IBAN_Validation(optional) {
    if (optional) {
      return [
        (val) =>
          !val ||
          val?.length == 0 ||
          new RegExp(/^SA\d{4}[A-Z0-9]{18}$/).test(val) ||
          t("validations.enterValidIban"),
      ];
    }
    return [
      (val) =>
        new RegExp(/^SA\d{4}[A-Z0-9]{18}$/).test(val) ||
        t("validations.enterValidIban"),
    ];
  },
  bankAccountValidation(optional) {
    if (optional) {
      return [
        (val) => {
          console.log(val > 0);
          return (
            val?.length == 0 ||
            Number(val) > 0 ||
            t("validations.enterValidAccountNumber")
          );
        },
      ];
    }
    return [
      (val) => Number(val) > 0 || t("validations.enterValidAccountNumber"),
    ];
  },
  newValueIfRelatedValueChanges(relatedValueObj, oldValue) {
    return [
      (newVal) => {
        const relatedOldVal = relatedValueObj.old?.toString() || "";
        const relatedNewVal = relatedValueObj.new?.toString() || "";
        if (relatedOldVal !== relatedNewVal) {
          if (oldValue === newVal.filePath) {
            return "يجب تغيير هذه القيمة";
          }
        }
      },
    ];
  },
  onlyArabicWithoutNums: [
    (val) =>
      (val.length > 0 &&
        new RegExp(/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\ ]+$/).test(
          val
        )) ||
      t("validations.onlyArabic"),
  ],
  onlyLettersAndNumbers: [
    (val) =>
      new RegExp(
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9]*$/
      ).test(val) || t("validations.onlyLettersAndNumbers"),
  ],
  onlyArabicAndSymbols: [
    (val) =>
      new RegExp(
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF][\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF!@#\$%\^\&*\)\(+=._-\s]*$/
      ).test(val) ||
      !val ||
      t("validations.onlyLettersAndSymbols"),
  ],
  atLeastOneLetter: [
    (val) =>
      new RegExp(/^(?=[a-zA-Z\u0600-\u06FF]).*?$/).test(val) ||
      t("validations.validName"),
  ],
  noSymbols: [
    (val) =>
      !new RegExp(/(?=[!@#\$%\^\&*\)\(+=._-]).*?$/).test(val) ||
      t("validations.noSymbols"),
  ],
  notEmptyArray: [
    (val) => {
      return val.length === 0 ? t("ads.selectOneAtLeast") : true;
    },
  ],
  requiredRule: [
    (val) =>
      (val && val.length > 0) ||
      val > 0 ||
      formatter.isObject(val) ||
      t("withdraws.required"),
    (val) => !new RegExp(/\s{2,}/).test(val) || t("validations.noMoreOneSpace"),
  ],
  requiredRuleOnly: [
    (val) =>
      (val && val.length > 0) ||
      val > 0 ||
      formatter.isObject(val) ||
      t("withdraws.required"),
  ],
  requiredRuleAcceptZero: [
    (val) =>
      (val && val.length > 0) ||
      (val >= 0 && !checkIfNullOrUndefined(val)) ||
      t("withdraws.required"),
  ],
  requiredRuleAcceptZero_negtive: [(val) => val || t("withdraws.required")],

  notRequired: [(val) => val == undefined],

  noSpace: [
    (val) => new RegExp(/^\S*$/).test(val) || t("validations.validVlaue"),
  ],

  noSpaces: [
    (val) => !new RegExp(/\s{2,}/).test(val) || t("validations.noMoreOneSpace"),
  ],

  phoneRules: [
    (val) =>
      (val?.length > 0 && new RegExp(/^(0)(1|5)[0-9]{8}$/).test(val)) ||
      // (new RegExp(
      //   /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
      // ).test(val) ||
      //   new RegExp(
      //     /^(009661|9661|\+9661|01)(1|2|3|4|5|6|7|8|9)([0-9]{7})$/
      //   ).test(val))) ||
      t("signUp.wrongNumber"),
  ],

  phoneRulesOptional: [
    (val) =>
      !val ||
      val?.length == 0 ||
      new RegExp(/^(0)(1|5)[0-9]{8}$/).test(val) ||
      t("signUp.wrongNumber"),
  ],
  passRulesOptional: [
    (val) => !val || val.length > 0 || "يجب إدخال كلمة المرور",
    (val) =>
      !val ||
      (val.length > 0 &&
        new RegExp(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/
        ).test(val)) ||
      t("signUp.pswValidationMsg"),
  ],

  emailRules: [
    (val) =>
      (val?.length > 0 &&
        new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(val)) ||
      t("signUp.invalidEmail"),
  ],
  emailRulesOptional: [
    (val) =>
      !val ||
      val.length == 0 ||
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(val) ||
      t("signUp.invalidEmail"),
  ],
  passRules: [
    (val) => (val && val.length > 0) || "يجب إدخال كلمة المرور",
    (val) =>
      (val.length > 0 &&
        new RegExp(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/
        ).test(val)) ||
      t("signUp.pswValidationMsg"),
  ],

  sendError(err, text) {
    return [() => err || `${text}`];
  },

  confirmPass(password) {
    return [(val) => val === password || "كلمةالمرور غير متشابهه"];
  },

  gtChar(eleLength, optionalType) {
    return [
      (val) =>
        val?.length > eleLength ||
        `${t("validations.mustBe")} ${t("validations.gt")} ${eleLength} ${
          optionalType ? optionalType : ""
        }`,
    ];
  },
  maxChar(max) {
    return [
      (val) =>
        val?.length >= max ||
        ` ${t("validations.mustBe")} ${t("validations.gt")} ${max} ${t(
          "validations.chars"
        )}`,
    ];
  },
  minChar(min) {
    return [
      (val) =>
        val?.length <= min ||
        ` ${t("validations.mustBe")} ${t("validations.lessThan")} ${min} ${t(
          "validations.chars"
        )}`,
    ];
  },
  excatChar(value) {
    return [
      (val) =>
        val?.length == value ||
        ` ${t("validations.mustBe")} ${value} ${t("validations.chars")}`,
    ];
  },
  excatNumbers(value) {
    return [
      (val) =>
        val?.length == value ||
        ` ${t("validations.mustBe")} ${value} ${t("validations.numbers")}`,
    ];
  },
  maxVal(max, optional) {
    if (optional) {
      return [
        (val) =>
          val <= max ||
          !val ||
          !val.length == 0 ||
          t("validations.maxVal") + " " + max,
      ];
    }
    return [(val) => val <= max || t("validations.maxVal") + " " + max];
  },
  minVal(min, optional) {
    if (optional) {
      return [
        (val) => {
          return (
            Number(val) >= Number(min) ||
            !val ||
            !val.length == 0 ||
            t("validations.minVal") + " " + min
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          Number(val) >= Number(min) || t("validations.minVal") + " " + min
        );
      },
    ];
  },
  range(min, max, inputType, inputValue, optional) {
    if (optional) {
      return [
        min == 1 && inputType
          ? (val) =>
              val.length == 0 ||
              !val ||
              (String(val)?.length >= min && String(val)?.length <= max) ||
              `${inputValue ? inputValue : ""} ${t(
                "validations.mustConsistOf"
              )} ${max} ${inputType ? inputType : ""} ${t(
                "validations.atMost"
              )} (${String(val)?.length})`
          : (val) =>
              val.length == 0 ||
              !val ||
              (String(val)?.length >= min && String(val)?.length <= max) ||
              `${inputValue ? inputValue : ""} ${t("validations.mustBe")} ${t(
                "validations.from"
              )} ${min} ${t("validations.to")} ${max} ${
                inputType ? inputType : ""
              }  (${String(val)?.length})`,
      ];
    } else {
      return [
        min == 1 && inputType
          ? (val) =>
              (String(val)?.length >= min && String(val)?.length <= max) ||
              `${inputValue ? inputValue : ""} ${t(
                "validations.mustConsistOf"
              )} ${max} ${inputType ? inputType : ""} ${t(
                "validations.atMost"
              )} (${String(val)?.length})`
          : (val) =>
              (String(val)?.length >= min && String(val)?.length <= max) ||
              `${inputValue ? inputValue : ""} ${t("validations.mustBe")} ${t(
                "validations.from"
              )} ${min} ${t("validations.to")} ${max} ${
                inputType ? inputType : ""
              }  (${String(val)?.length})`,
      ];
    }
  },
  validDate(optional) {
    if (optional) {
      (val) => {
        return (
          val.length == 0 ||
          val == 0 ||
          !isNaN(new Date(val).getTime()) ||
          t("signUp.invalidDate")
        );
      };
    }
    return [
      (val) => !isNaN(new Date(val).getTime()) || t("signUp.invalidDate"),
    ];
  },
  dateGtSpecficdateinHijri(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) > new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gt")} ${date}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) > new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.gt")} ${date}`
        );
      },
    ];
  },
  dateGtESpecficdateinHijri(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) >= new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gtOrEqual")} ${date}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) >= new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.gtOrEqual")} ${date}`
        );
      },
    ];
  },
  dateGtSpecficdate(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) > new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
              dateValue
            )
              .toISOString()
              .substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) > new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.gtOrEqual")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  dateGtOrEqSpecficdateMonth(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return [
      (val) => {
        return (
          new Date(val) > new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 7)}`
        );
      },
    ];
  },

  datGt(date, optional, numberOfDates) {
    const dateValue = new Date(date);
    dateValue.setDate(
      dateValue.getDate() + (Number(numberOfDates) ? Number(numberOfDates) : 1)
    );
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) > new Date(dateValue) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
              dateValue
            )
              .toISOString()
              .substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) > new Date(dateValue) ||
          `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  dateGtESpecficdate(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) >= new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t(
              "validations.gtOrEqual"
            )} ${new Date(dateValue).toISOString().substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        let dateVal, valVal;
        dateVal = new Date(date);
        valVal = new Date(val);
        return (
          valVal.setHours(0, 0, 0, 0) >= dateVal.setHours(0, 0, 0, 0) ||
          `${t("validations.mustBe")} ${t("validations.gtOrEqual")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  dateGtASpecficdate(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) > new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t(
              "validations.gtOrEqual"
            )} ${new Date(dateValue).toISOString().substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) > new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.gtOrEqual")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  dateLtSpecficdateinHijri(date, optional) {
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) < new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.lt")} ${date}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) < new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.lt")} ${date}`
        );
      },
    ];
  },
  dateLtESpecficdateinHijri(date, optional) {
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) <= new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.ltOrEqual")} ${date}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) <= new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.ltOrEqual")} ${date}`
        );
      },
    ];
  },
  dateLtSpecficdate(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) < new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.lt")} ${new Date(
              dateValue
            )
              .toISOString()
              .substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable  ltOrEqual
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) < new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.lt")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  dateLtESpecficdate(date, optional) {
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) <= new Date(date) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t(
              "validations.ltOrEqual"
            )} ${new Date(dateValue).toISOString().substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable  ltOrEqual
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) <= new Date(date) ||
          `${t("validations.mustBe")} ${t("validations.ltOrEqual")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  datGt(date, optional, numberOfDates) {
    const dateValue = new Date(date);
    /*  dateValue.setDate(
      dateValue.getDate() + (Number(numberOfDates) ? Number(numberOfDates) : 1)
    ); */

    let endDate = "",
      count = 0;
    endDate = new Date(dateValue.setDate(dateValue.getDate()));
    while (count < numberOfDates) {
      endDate = new Date(dateValue.setDate(dateValue.getDate() + 1));
      if (
        endDate.getDay() != disableDay.friday &&
        endDate.getDay() != disableDay.Saturday
      ) {
        count++;
      }
    }

    if (optional) {
      return [
        (val) => {
          return (
            new Date(val) > new Date(endDate) ||
            !val ||
            val.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
              endDate
            )
              .toISOString()
              .substring(0, 10)}`
            //compound sentense that tell the user that the date must be greater than the send date
            //instead of making a rule for every spesfic date
            //i18n rules are used in more than one place that why i cut it so it can be reusable
          );
        },
      ];
    }
    return [
      (val) => {
        return (
          new Date(val) > new Date(dateValue) ||
          `${t("validations.mustBe")} ${t("validations.gt")} ${new Date(
            dateValue
          )
            .toISOString()
            .substring(0, 10)}`
        );
      },
    ];
  },
  numberGt(value, optional, type) {
    if (optional) {
      return [
        (val) => {
          const numVal = Number(val);
          return (
            numVal > value ||
            (typeof val !== "number" && !numVal) ||
            numVal.length == 0 ||
            `${t("validations.mustBe")} ${t("validations.gt")} ${value} ${type}`
          );
        },
        //compound sentense that tell the user that the date must be greater than the send date
        //instead of making a rule for every spesfic date
        //i18n rules are used in more than one place that why i cut it so it can be reusable
      ];
    }
    return [
      (val) =>
        val > value ||
        `${t("validations.mustBe")} ${t("validations.gt")} ${value} ${type}`,
      //compound sentense that tell the user that the date must be greater than the send date
      //instead of making a rule for every spesfic date
      //i18n rules are used in more than one place that why i cut it so it can be reusable
    ];
  },

  numberGt_E(value, optional, type) {
    if (optional) {
      return [
        (val) =>
          val >= value ||
          !val ||
          val.length == 0 ||
          `${t("validations.mustBe")} ${t(
            "validations.gtOrEqual"
          )} ${value} ${type}`,
        //compound sentense that tell the user that the date must be greater than the send date
        //instead of making a rule for every spesfic date
        //i18n rules are used in more than one place that why i cut it so it can be reusable
      ];
    }
    return [
      (val) =>
        val >= value ||
        `${t("validations.mustBe")} ${t(
          "validations.gtOrEqual"
        )} ${value} ${type} `,
      //compound sentense that tell the user that the date must be greater than the send date
      //instead of making a rule for every spesfic date
      //i18n rules are used in more than one place that why i cut it so it can be reusable
    ];
  },

  numberLt(value, optional, type) {
    if (optional) {
      return [
        (val) =>
          val < value ||
          !val ||
          val.length == 0 ||
          `${t("validations.mustBe")} ${t("validations.lt")} ${value} ${type}`,
        //compound sentense that tell the user that the date must be greater than the send date
        //instead of making a rule for every spesfic date
        //i18n rules are used in more than one place that why i cut it so it can be reusable
      ];
    }
    return [
      (val) =>
        val < value ||
        `${t("validations.mustBe")} ${t("validations.lt")} ${value} ${type}`,
      //compound sentense that tell the user that the date must be greater than the send date
      //instead of making a rule for every spesfic date
      //i18n rules are used in more than one place that why i cut it so it can be reusable
    ];
  },

  numberLt_E(value, optional, type) {
    if (optional) {
      return [
        (val) =>
          val <= value ||
          !val ||
          val.length == 0 ||
          `${t("validations.mustBe")} ${t("validations.lt")} ${value} ${type}`,
        //compound sentense that tell the user that the date must be greater than the send date
        //instead of making a rule for every spesfic date
        //i18n rules are used in more than one place that why i cut it so it can be reusable
      ];
    }
    return [
      (val) =>
        val <= value ||
        `${t("validations.mustBe")} ${t(
          "validations.ltOrEqual"
        )} ${value} ${type} `,
      //compound sentense that tell the user that the date must be greater than the send date
      //instead of making a rule for every spesfic date
      //i18n rules are used in more than one place that why i cut it so it can be reusable
    ];
  },
};
