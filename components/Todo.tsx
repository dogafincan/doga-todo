type Props = {
  todo: string;
};

export default function Todo({ todo }: Props) {
  return (
    <div className="rounded text-3xl py-3.5 px-5 dark:bg-black bg-white">
      {todo}
    </div>
  );
}
