import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";

export type FormFieldProps<FormData extends FieldValues> = {
  type: string;
  placeholder: string;
  label: Path<FormData>;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  required: boolean;
  valueAsNumber?: boolean;
};

export const FormField = <FormData extends FieldValues>({
  register,
  label,
  required,
  type,
  placeholder,
  name,
  valueAsNumber,
  error,
}: FormFieldProps<FormData>) => (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
);
