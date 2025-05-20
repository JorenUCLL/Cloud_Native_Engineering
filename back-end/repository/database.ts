import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

// Test de database connectie
database.$connect()
    .then(() => {
        console.log('Successfully connected to database')
    })
    .catch((error) => {
        console.error('Database connection failed:', error)
    })

export default database
