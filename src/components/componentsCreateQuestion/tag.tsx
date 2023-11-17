import { Badge } from "@shadcn/components/ui/badge"

interface TagProps {
  tagName: string
}

const Tag: React.FC<TagProps> = ({tagName}) => {
  return (
    <Badge>{ tagName }</Badge>
  )
}

export default Tag;