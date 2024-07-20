interface Props {
  text: string;
}

const FormTitle: React.FC<Props> = ({ text }: Props) => {
  return (
    <h2 className="mb-8 capitalize font-palanquin font-semibold text-secondary text-2xl lg:text-3xl tracking-wide">
      {text}
    </h2>
  );
};

export default FormTitle;
