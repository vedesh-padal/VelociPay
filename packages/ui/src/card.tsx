
export const Card = ({title, children, className}: { title: string, className?: string, children: React.ReactNode }): JSX.Element => {
  return (
    <div className={`border p-4 ${className}`}>
      <h1 className="text-xl border-b-[1px] border-gray-400 pb-[6px] mb-1">
        { title }
      </h1>
      <div className="pl-1">{ children }</div>
    </div>
  )
}
