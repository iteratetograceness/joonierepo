import { useRouter } from 'next/router'

const JoonieProject = () => {
  const { query } = useRouter()

  return <p>{query.slug}</p>
}

export default JoonieProject
