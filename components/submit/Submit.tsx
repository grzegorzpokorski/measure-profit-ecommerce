type SubmitProps = {
  label: string;
};

export const Submit = ({ label }: SubmitProps) => {
  return <input type="submit" value={label} className={"bg-zinc-600 text-white cursor-pointer"} />;
};
