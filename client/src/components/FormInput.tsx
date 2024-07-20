interface Props {
  label: string;
  type: string;
  name: string;
  defaultValue?: string;
  size?: string;
  placeholder?: string;
}

const FormInput = ({
  label,
  type,
  name,
  defaultValue,
  size,
  placeholder,
}: Props) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-montserrat">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered ${size || "input-sm lg:input-md"}`}
      />
    </div>
  );
};

export default FormInput;
