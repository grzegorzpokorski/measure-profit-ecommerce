type SubmitInputType = {
  value: string;
};

export const SubmitInput = ({ value }: SubmitInputType) => {
  return <input type="submit" value={value} />;
};
