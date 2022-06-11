import { NextApiResponse } from 'next'
import { StatusCode } from '@components/error'

type ErrorProps = {
  statusCode: number
}

const Error = ({ statusCode }: ErrorProps) => <StatusCode statusCode={statusCode} />

type ErrorInitialProps = {
  res: NextApiResponse
  err: Error & {
    statusCode?: number
  }
}

Error.getInitialProps = ({ res, err }: ErrorInitialProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
