import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://default:z7LfwsPBZcA3@ep-calm-morning-a4pa6dj1-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

// GET method to fetch trips
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM trips');
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    return NextResponse.json({ error: 'Failed to fetch data from database' }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const client = await pool.connect();
    const data = await request.json();

    const { tripId, transporter, currenStatus, tripStartTime } = data;

    // Ensure that tripId is provided
    if (!tripId) {
      return NextResponse.json({ error: 'Trip ID is required' }, { status: 400 });
    }

    const queryText = `
      UPDATE trips 
      SET 
        transporter = $2, 
        "currenStatus" = $3, 
        "tripStartTime" = $4 
      WHERE "tripId" = $1 
      RETURNING *;
    `;
    const values = [tripId, transporter, currenStatus, tripStartTime];

    const result = await client.query(queryText, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, trip: result.rows[0] });
  } catch (error) {
    console.error('Error updating trip data:', error);
    return NextResponse.json({ error: 'Failed to update trip in database' }, { status: 500 });
  }
}



// POST method to add trip details
export async function POST(request: Request) {
  try {
    const client = await pool.connect();
    const data = await request.json();

    const { tripId, source, dest, phoneNumber, transporter } = data;

    const queryText = `
      INSERT INTO trips ("tripId", source, dest, "phoneNumber", transporter) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [tripId, source, dest, phoneNumber, transporter];

    const result = await client.query(queryText, values);
    client.release();

    return NextResponse.json({ success: true, trip: result.rows[0] });
  } catch (error) {
    console.error('Error inserting trip data:', error);
    return NextResponse.json({ error: 'Failed to add trip to the database' }, { status: 500 });
  }
}
