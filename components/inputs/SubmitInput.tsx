type SubmitInputType = {
  value: string;
};

export const SubmitInput = ({ value }: SubmitInputType) => {
  return (
    <input
      type="submit"
      value={value}
      className={
        "p-2 bg-zinc-600 text-white hover:bg-zinc-700 focus:bg-zinc-700 disabled:bg-red-500 cursor-pointer"
      }
    />
  );
};
