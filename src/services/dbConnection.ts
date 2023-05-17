import { Pool } from 'pg'
import { dbConnection } from '../defines'

const pool = new Pool({ ...dbConnection })
pool.connect()

export default pool
