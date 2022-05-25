import { useRouter } from 'next/router'

const Project = () => {
  const { query } = useRouter()

  return <p>{query.slug}</p>
}

export default Project
