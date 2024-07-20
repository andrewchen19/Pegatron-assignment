interface Props {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
  size?: string;
}

const FormSelect = ({ label, name, defaultValue, options, size }: Props) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-montserrat">{label}</span>
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`select select-bordered ${size || "select-sm lg:select-md"}`}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
