interface TitleWithTagProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

const TitleWithTag: React.FC<TitleWithTagProps> = ({
  children,
  className = '',
  as: Tag = 'h2'
}) => (
  <Tag className={`flex items-center gap-2 md:gap-3 ${className}`}>
    <span className="inline-block h-6 w-2 rounded-sm bg-blue-500 md:h-8 md:w-1.5 md:rounded-full lg:h-10" />
    <span className="md:text-balance">{children}</span>
  </Tag>
)

export default TitleWithTag
