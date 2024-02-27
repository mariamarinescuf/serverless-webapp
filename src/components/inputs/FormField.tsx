import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
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

export function FormField<FormData extends FieldValues>({
  register,
  type,
  placeholder,
  name,
  valueAsNumber,
  error,
}: FormFieldProps<FormData>) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
}
