import { videoExtensions, imageExtensions } from "src/constants/extensions";
import { i18n } from "src/boot/i18n";
const formatter = {
  arabicDateFormatter(date) {
    if (!date) {
      return null;
    }

    let gregorianDate = new Date(date).toLocaleDateString("ar-EG-u-nu-latn", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return gregorianDate;
  },

  arabicDateFormatterHijri(date) {
    if (!date) {
      return null;
    }

    let HijriDate = new Date(date).toLocaleDateString("ar-SA-u-nu-latn", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return HijriDate;
    // return new Date(date).toLocaleDateString("en-SA", {
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric",
    // });
  },
  convertToHijriDate(date) {
    const d = uq(date);
    return {
      day: d.hd,
      month: d.hm,
      year: d.hy,
      fullDate: d,
    };
  },

  converHijriDateToGregorianDate(hijriDate) {
    const dateObj = uq(hijriDate);
    const gregorianDate = dateObj.date;
    return gregorianDate;
  },

  formatAMPM(date) {
    let hours = date?.getHours();
    let minutes = date?.getMinutes();
    let ampm = hours >= 12 ? "م" : "ص";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  },

  arabicNumberToEnglishNumbers(s) {
    return s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  },
  convertDateMask(date, exp = "/") {
    if (!date) {
      return null;
    }
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join(exp);
  },

  formatHijriDate(date) {
    const hD = uq(date?.substr(0, 4), date?.substr(5, 2), date?.substr(8, 2));
    let HijriDate = new Date(hD.date).toLocaleDateString("ar-SA-u-nu-latn", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return HijriDate;
  },

  getCurrentTime(comingDate, mode = 24) {
    let date = new Date(comingDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (mode == 12) {
      hours < 12 ? (hours = hours) : (hours = hours - 12);

      return `${hours}:${minutes} ${
        hours < 12 ? i18n.t("globals.am") : i18n.t("globals.pm")
      }`;
    } else {
      return `${hours}:${minutes}`;
    }
  },

  checkDateInPast(date) {
    const FutureFormat = new Date(date);
    FutureFormat.setHours(23, 59, 59);
    const nowFormat = new Date();
    if (FutureFormat - nowFormat >= 0) {
      return false;
    } else {
      return true;
    }
  },

  extractStringFromBase64(base64) {
    return base64.substring(base64.indexOf(",") + 1);
  },
  extractExtensionFromFileName(fileName) {
    const fileNameSplitted = fileName.split(".");
    const extension = fileNameSplitted[fileNameSplitted.length - 1];
    const lowerCaseExt = extension.toLowerCase();
    return lowerCaseExt;
  },
  // could be moved to another file
  isImageExtension(extension) {
    const isImageExtension = imageExtensions.includes(extension);
    return isImageExtension;
  },

  isVideoExtension(extension) {
    const isVideoExtension = videoExtensions.includes(extension);
    return isVideoExtension;
  },

  getImageURl(response) {
    let imageSRC = `${
      apiConfigs.baseURL
    }/api/AppGeneralSettings/images?filePath=${encodeURIComponent(
      response?.filePath
    )}`;
    return imageSRC;
  },
  base64ToFileObj({ base64, fileName, filePath }) {
    const extension = this.extractExtensionFromFileName(fileName);
    const isImage = this.isImageExtension(extension);
    let type;
    let src;
    if (isImage) {
      src = `data:image/${extension};base64,${base64}`;
      type = "image";
    } else if (this.isVideoExtension(extension)) {
      src = `data:video/${extension};base64,${base64}`;
      type = "video";
    } else {
      src = `data:application/${extension};base64,${base64}`;
      type = "application";
    }
    const fullExtention = `${type}/${extension}`;
    const fileObj = {
      src,
      fileName,
      extension,
      type,
      fullExtention,
      filePath,
      base64,
    };
    return fileObj;
  },

  handleAndGetFileData(base64Response, url) {
    let file = {
      src: "",
      fileName: "",
      extension: "",
      type: "",
      fullExtention: "",
      filePath: "",
      base64: "",
    };
    if (base64Response) {
      if (base64Response.isUseUrl) {
        const base64Obj = {
          base64: base64Response.base64,
          fileName: base64Response.fileName,
          filePath: base64Response?.filePath,
        };
        const getExtraData = this.base64ToFileObj(base64Obj);
        let file = {
          src: this.getImageURl(base64Response),
          fileName: base64Response?.fileName,
          extension: getExtraData?.extension,
          type: getExtraData?.type,
          fullExtention: getExtraData?.fullExtention,
          filePath: base64Response?.filePath,
          base64: null,
        };
        return file;
      }
      const base64Obj = {
        base64: base64Response.base64,
        fileName: base64Response.fileName,
        filePath: base64Response?.filePath,
      };
      file = formatter.base64ToFileObj(base64Obj);
    } else {
      if (url) {
        const fileURL = url;
        const splittedFileURL = fileURL.split("/");
        const fileName = splittedFileURL[splittedFileURL.length - 1];
        const extension = this.extractExtensionFromFileName(fileName);
        file = {
          src: fileURL,
          fileName,
          extension,
        };
      }
    }
    return file;
  },
  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex?.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  },
  handleColorToBeWhiteOrBlack(rgb) {
    let red = rgb[0];
    let green = rgb[1];
    let blue = rgb[2];

    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      return "#000000";
    } else {
      return "#FFFFFF";
    }
  },

  trimString(value, charsNum = 20) {
    if (value.length > charsNum) {
      return {
        value: `${value.substring(0, charsNum)}`,
        trimed: true,
      };
    }
    return {
      value: value,
      trimed: false,
    };
  },

  openBase64InNewTab(data, mimeType) {
    var byteCharacters = window.atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: mimeType + ";base64" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  },
  downloadFile(file) {
    if (file.base64) {
      this.openBase64InNewTab(file.base64, file.fullExtention);
    } else if (file.src) {
      window.open(file.src);
    }
  },

  // getArabicDateTime(date) {
  //   const arabicDate = this.arabicDateFormatter(date);
  //   const arabicTime = this.getTimeInArabic(date);
  //   const arabicDateTime = `${arabicDate}, ${arabicTime}`;
  //   return arabicDateTime;
  // },

  getArabicDateTime(date) {
    const currentDate = new Date(date);
    const arabicDateTime = new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(currentDate);
    return arabicDateTime;
  },

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  removeHighlight(route) {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((link) => {
      // if (link.attributes?.href?.value == route?.path) {
      //   link.classList.remove("q-router-link--active");
      // }

      link.classList.remove("q-router-link--active");
    });
  },

  isObject(value) {
    return Object.prototype.toString.call(value).indexOf("Object") !== -1;
  },
  isArray(value) {
    return Array.isArray(value);
  },
  windowResizelistener() {
    let width = window.innerWidth;
    addEventListener("resize", (e) => {
      width = e.target.innerWidth;
    });
    return { width, sm: width < 600 };
  },
  colorfilterConverter(incomingColor) {
    class Color {
      constructor(r, g, b) {
        this.set(r, g, b);
      }

      toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
          this.b
        )})`;
      }

      set(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
      }

      hueRotate(angle = 0) {
        angle = (angle / 180) * Math.PI;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        this.multiply([
          0.213 + cos * 0.787 - sin * 0.213,
          0.715 - cos * 0.715 - sin * 0.715,
          0.072 - cos * 0.072 + sin * 0.928,
          0.213 - cos * 0.213 + sin * 0.143,
          0.715 + cos * 0.285 + sin * 0.14,
          0.072 - cos * 0.072 - sin * 0.283,
          0.213 - cos * 0.213 - sin * 0.787,
          0.715 - cos * 0.715 + sin * 0.715,
          0.072 + cos * 0.928 + sin * 0.072,
        ]);
      }

      grayscale(value = 1) {
        this.multiply([
          0.2126 + 0.7874 * (1 - value),
          0.7152 - 0.7152 * (1 - value),
          0.0722 - 0.0722 * (1 - value),
          0.2126 - 0.2126 * (1 - value),
          0.7152 + 0.2848 * (1 - value),
          0.0722 - 0.0722 * (1 - value),
          0.2126 - 0.2126 * (1 - value),
          0.7152 - 0.7152 * (1 - value),
          0.0722 + 0.9278 * (1 - value),
        ]);
      }

      sepia(value = 1) {
        this.multiply([
          0.393 + 0.607 * (1 - value),
          0.769 - 0.769 * (1 - value),
          0.189 - 0.189 * (1 - value),
          0.349 - 0.349 * (1 - value),
          0.686 + 0.314 * (1 - value),
          0.168 - 0.168 * (1 - value),
          0.272 - 0.272 * (1 - value),
          0.534 - 0.534 * (1 - value),
          0.131 + 0.869 * (1 - value),
        ]);
      }

      saturate(value = 1) {
        this.multiply([
          0.213 + 0.787 * value,
          0.715 - 0.715 * value,
          0.072 - 0.072 * value,
          0.213 - 0.213 * value,
          0.715 + 0.285 * value,
          0.072 - 0.072 * value,
          0.213 - 0.213 * value,
          0.715 - 0.715 * value,
          0.072 + 0.928 * value,
        ]);
      }

      multiply(matrix) {
        const newR = this.clamp(
          this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
        );
        const newG = this.clamp(
          this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
        );
        const newB = this.clamp(
          this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
        );
        this.r = newR;
        this.g = newG;
        this.b = newB;
      }

      brightness(value = 1) {
        this.linear(value);
      }
      contrast(value = 1) {
        this.linear(value, -(0.5 * value) + 0.5);
      }

      linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
      }

      invert(value = 1) {
        this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
      }

      hsl() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h,
          s,
          l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;

            case g:
              h = (b - r) / d + 2;
              break;

            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }

        return {
          h: h * 100,
          s: s * 100,
          l: l * 100,
        };
      }

      clamp(value) {
        if (value > 255) {
          value = 255;
        } else if (value < 0) {
          value = 0;
        }
        return value;
      }
    }

    class Solver {
      constructor(target, baseColor) {
        this.target = target;
        this.targetHSL = target.hsl();
        this.reusedColor = new Color(0, 0, 0);
      }

      solve() {
        const result = this.solveNarrow(this.solveWide());
        return {
          values: result.values,
          loss: result.loss,
          filter: this.css(result.values),
        };
      }

      solveWide() {
        const A = 5;
        const c = 15;
        const a = [60, 180, 18000, 600, 1.2, 1.2];

        let best = { loss: Infinity };
        for (let i = 0; best.loss > 25 && i < 3; i++) {
          const initial = [50, 20, 3750, 50, 100, 100];
          const result = this.spsa(A, a, c, initial, 1000);
          if (result.loss < best.loss) {
            best = result;
          }
        }
        return best;
      }

      solveNarrow(wide) {
        const A = wide.loss;
        const c = 2;
        const A1 = A + 1;
        const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa(A, a, c, wide.values, 500);
      }

      spsa(A, a, c, values, iters) {
        const alpha = 1;
        const gamma = 0.16666666666666666;

        let best = null;
        let bestLoss = Infinity;
        const deltas = new Array(6);
        const highArgs = new Array(6);
        const lowArgs = new Array(6);

        for (let k = 0; k < iters; k++) {
          const ck = c / Math.pow(k + 1, gamma);
          for (let i = 0; i < 6; i++) {
            deltas[i] = Math.random() > 0.5 ? 1 : -1;
            highArgs[i] = values[i] + ck * deltas[i];
            lowArgs[i] = values[i] - ck * deltas[i];
          }

          const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
          for (let i = 0; i < 6; i++) {
            const g = (lossDiff / (2 * ck)) * deltas[i];
            const ak = a[i] / Math.pow(A + k + 1, alpha);
            values[i] = fix(values[i] - ak * g, i);
          }

          const loss = this.loss(values);
          if (loss < bestLoss) {
            best = values.slice(0);
            bestLoss = loss;
          }
        }
        return { values: best, loss: bestLoss };

        function fix(value, idx) {
          let max = 100;
          if (idx === 2 /* saturate */) {
            max = 7500;
          } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
            max = 200;
          }

          if (idx === 3 /* hue-rotate */) {
            if (value > max) {
              value %= max;
            } else if (value < 0) {
              value = max + (value % max);
            }
          } else if (value < 0) {
            value = 0;
          } else if (value > max) {
            value = max;
          }
          return value;
        }
      }

      loss(filters) {
        // Argument is array of percentages.
        const color = this.reusedColor;
        color.set(0, 0, 0);

        color.invert(filters[0] / 100);
        color.sepia(filters[1] / 100);
        color.saturate(filters[2] / 100);
        color.hueRotate(filters[3] * 3.6);
        color.brightness(filters[4] / 100);
        color.contrast(filters[5] / 100);

        const colorHSL = color.hsl();
        return (
          Math.abs(color.r - this.target.r) +
          Math.abs(color.g - this.target.g) +
          Math.abs(color.b - this.target.b) +
          Math.abs(colorHSL.h - this.targetHSL.h) +
          Math.abs(colorHSL.s - this.targetHSL.s) +
          Math.abs(colorHSL.l - this.targetHSL.l)
        );
      }

      css(filters) {
        function fmt(idx, multiplier = 1) {
          return Math.round(filters[idx] * multiplier);
        }
        return `invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(
          2
        )}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(
          4
        )}%) contrast(${fmt(5)}%)`;
      }
    }

    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex?.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
          ]
        : null;
    }
    const rgb = hexToRgb(incomingColor);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();
    return result.filter;
  },
  logger(data) {
    console.log(data);
  },
  isArray(value) {
    return Array.isArray(value);
  },
};

export default formatter;
