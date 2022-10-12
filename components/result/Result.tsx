import { ResultType } from "../form/Form";

export const Result = ({ valuable, percentage }: ResultType) => {
  return (
    <>
      <p>
        <span>Wartościowo: {Number(valuable).toFixed(2)} PLN</span>
      </p>
      <p>
        <span>Wartościowo: </span>
        {Number(percentage).toFixed(2)}%
      </p>
    </>
  );
};
