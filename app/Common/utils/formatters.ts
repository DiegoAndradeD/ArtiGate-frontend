// Types
import { format, parseISO } from "date-fns";

class Formatters {
  static formatPhoneNumber(phoneNumber: string = ""): string {
    if (!phoneNumber) return "";
    const cleanNumber: string = phoneNumber.replace(/\D/g, "");

    const formattedNumber: string = cleanNumber.replace(
      /(\d{1,2})(\d{1,2})?(\d{1,4})?(\d{1,4})?/,
      (_, countryCode, areaCode, prefix, suffix) => {
        let formatted: string = "+";
        if (countryCode) formatted += `${countryCode}`;
        if (areaCode) formatted += `${areaCode}`;
        if (prefix) formatted += `${prefix}`;
        if (suffix) formatted += `${suffix}`;
        return formatted;
      }
    );

    return formattedNumber || phoneNumber;
  }

  static addBrTags(text: string): string {
    return text.replace(/\n/g, "<br>");
  }

  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  }

  static formatEnumValueToStringRepresentation = (
    value: string,
    enumObject: object,
    stringRepresentation: { [key: string]: string }
  ): string | null => {
    const upperValue = value.toUpperCase();
    if (Object.keys(enumObject).includes(upperValue)) {
      return stringRepresentation[
        upperValue as keyof typeof stringRepresentation
      ];
    }
    return null;
  };
  static createEnumMap<T extends Record<string, string>>(
    enumObj: T,
    enumStringRepresentationMap: Record<string, string>
  ): { value: string; label: string }[] {
    return Object.entries(enumObj).map(([key, value]) => ({
      value,
      label: enumStringRepresentationMap[key.toUpperCase()],
    }));
  }
  static parseArrayParam<T>(
    param: string | undefined,
    separator: string = ","
  ): T[] {
    return param ? (param.split(separator) as unknown as T[]) : [];
  }
  static isoToTimeInput(isoDate: string) {
    if (!isoDate) return "";
    const date = parseISO(isoDate);
    return format(date, "HH:mm");
  }
  static formatCurrencyBRL(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  static getMetricPercentage(value: number, total: number): string {
    if (total === 0) return "0%";
    return `${((value / total) * 100).toFixed(0)}%`;
  }
}

export default Formatters;
