type SubmitInputType = {
  value: string;
  disabled: boolean;
};

export const SubmitInput = ({ value, disabled }: SubmitInputType) => {
  return (
    <input
      type="submit"
      value={value}
      disabled={disabled}
      className={
        "p-2 text-white bg-zinc-600 hover:bg-zinc-700 focus:bg-zinc-700 disabled:hover:bg-zinc-600 cursor-pointer disabled:cursor-not-allowed "
      }
    />
  );
};
