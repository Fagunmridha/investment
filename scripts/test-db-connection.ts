/**
 * Database Connection Test Script
 * Run with: npx tsx scripts/test-db-connection.ts
 * or: ts-node scripts/test-db-connection.ts
 */

import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('Testing database connection...\n')

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in your environment variables')
    console.log('\nPlease create a .env file with:')
    console.log('DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"')
    console.log('\nFor Neon PostgreSQL, use the connection pooling URL:')
    console.log('DATABASE_URL="postgresql://user:password@ep-xxx-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require"')
    process.exit(1)
  }

  // Mask the password in the URL for display
  const maskedUrl = process.env.DATABASE_URL.replace(
    /:([^:@]+)@/,
    ':****@'
  )
  console.log(`📡 Connecting to: ${maskedUrl}\n`)

  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  })

  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Successfully connected to the database!')

    // Test a simple query
    const userCount = await prisma.user.count()
    console.log(`✅ Database query successful! Found ${userCount} users.`)

    console.log('\n🎉 Database connection is working correctly!')
  } catch (error: any) {
    console.error('\n❌ Database connection failed!\n')
    
    if (error.code === 'P1001') {
      console.error('Error: Cannot reach database server')
      console.error('\nPossible solutions:')
      console.error('1. Check if your database server is running')
      console.error('2. Verify your DATABASE_URL is correct')
      console.error('3. Check your network connection')
      console.error('4. For Neon: Ensure you\'re using the pooler endpoint (ends with -pooler)')
      console.error('5. Check if your IP is whitelisted (if required)')
    } else if (error.code === 'P1000') {
      console.error('Error: Authentication failed')
      console.error('\nPossible solutions:')
      console.error('1. Check your database username and password')
      console.error('2. Verify your credentials in DATABASE_URL')
    } else if (error.code === 'P1003') {
      console.error('Error: Database does not exist')
      console.error('\nPossible solutions:')
      console.error('1. Create the database first')
      console.error('2. Check the database name in DATABASE_URL')
    } else {
      console.error('Error details:', error.message)
    }
    
    console.error('\nFull error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

