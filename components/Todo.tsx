type Props = {
  todo: string;
};

export default function Todo({ todo }: Props) {
  return (
    <div className="flex h-20 items-center rounded-3xl bg-white py-3.5 px-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none">
      {todo}
    </div>
  );
}
