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
  <Tag className={`flex items-center gap-2 ${className}`}>
    <span className="inline-block w-2 h-6 rounded-sm bg-blue-500" />
    <span>{children}</span>
  </Tag>
)

export default TitleWithTag
