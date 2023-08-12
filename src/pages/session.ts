import { withMethods } from '@/lib/api-middlewares/with-methods'
import { authOptions } from '@/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const apiKey = req.headers.authorization

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const session = await getServerSession(authOptions)

    return res.status(200).json(session)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withMethods(['GET'], handler)
