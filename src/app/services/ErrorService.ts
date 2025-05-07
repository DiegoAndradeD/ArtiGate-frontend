import _ from "lodash";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

type ErrorWithMessage = {
  message: string;
};

class ErrorService {
  static isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      (typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, unknown>).message === "string") ||
      _.isArray((error as Record<string, unknown>).message)
    );
  }
  static isObjectStructure(errorMessage: string): boolean {
    try {
      const parsed = JSON.parse(errorMessage);
      return (
        typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      );
    } catch (e) {
      return false;
    }
  }

  static toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (this.isErrorWithMessage(maybeError)) return maybeError;
    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      // fallback in case there's an error stringify the maybeError
      // like with circular references for example.
      return new Error(String(maybeError));
    }
  }
  static httpErrorHandler<T extends FieldValues>(
    error: unknown,
    setError?: UseFormSetError<T>
  ) {
    const errorResponse = error as {
      response: {
        data: { statusCode: number; message: string };
      };
    };

    const errorMessage = ErrorService.toErrorWithMessage(
      errorResponse.response.data
    ).message;

    const isArray = _.isArray(errorMessage);
    const isObject = this.isObjectStructure(errorMessage);

    if (isArray) {
      return toast.error(errorMessage[0]);
    }

    if (isObject) {
      const parsedErrorMessage = JSON.parse(errorMessage);

      if (typeof parsedErrorMessage.message === "object") {
        Object.entries(parsedErrorMessage.message).forEach(
          ([field, messages]) => {
            if (setError) {
              setError(field as Path<T>, {
                message: (messages as string[])[0],
              });
            }
          }
        );
      }
      return;
    }

    toast.error(errorMessage);
  }
  static serverActionHttpErrorHandler(error: unknown): string {
    const errorResponse = error as {
      response: {
        data: { statusCode: number; message: string };
      };
    };
    const errorMessage = ErrorService.toErrorWithMessage(
      errorResponse.response.data
    ).message;
    const isArray = _.isArray(errorMessage);

    if (isArray) {
      return errorMessage[0];
    }
    return errorMessage;
  }
}

export default ErrorService;
