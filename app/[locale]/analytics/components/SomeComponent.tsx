export const SomeComponent = ({ click }: any) => {
  const layer = '8';
  return (
    <button
      onClick={() => {
        click(layer);
      }}
    >
      Lets Check
    </button>
  );
};
