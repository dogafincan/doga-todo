type Props = {
  todo: string;
};

export default function Todo({ todo }: Props) {
  return (
    <div className="flex items-center rounded-3xl text-2xl py-3.5 px-8 dark:bg-slate-900 bg-white dark:border dark:border-slate-50/50 shadow dark:shadow-none h-20">
      {todo}
    </div>
  );
}
