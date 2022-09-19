type Props = {
  todo: string;
};

export default function Todo({ todo }: Props) {
  return (
    <div className="border rounded text-3xl py-3.5 px-5 bg-white">{todo}</div>
  );
}
